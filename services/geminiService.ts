
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import { GoogleGenAI } from "@google/genai";
import { SERVICES, CLIENTS } from '../constants';

const getSystemInstruction = () => {
  const serviceContext = SERVICES.map(s => 
    `- ${s.name}: ${s.description}`
  ).join('\n');

  const clientContext = CLIENTS.map(c => c.name).join(', ');

  return `BERTINDAKLAH SEBAGAI: Digital Consultant Nativy.id.
  MANTRA: "Build Fast, Scale Smart."
  KLIEN KAMI: ${clientContext}.
  LAYANAN: ${serviceContext}.
  KONTAK: Email (nativy.id@gmail.com), IG (@nativy.id), WA (082386199996).
  ATURAN: Jawab dalam Bahasa Indonesia, profesional, visioner, maksimal 3 kalimat.`;
};

export const sendMessageToGemini = async (history: {role: string, text: string}[], newMessage: string): Promise<string> => {
  try {
    const apiKey = process.env.API_KEY;

    if (!apiKey) {
      throw new Error("AUTH_REQUIRED");
    }

    // Inisialisasi GoogleGenAI sesuai panduan terbaru
    const ai = new GoogleGenAI({ apiKey: apiKey });
    
    // API Gemini memerlukan pesan pertama dari 'user'
    const validHistory = history.filter((msg, index) => {
      if (index === 0 && msg.role === 'model') return false;
      return true;
    });

    const contents = [
      ...validHistory.map(h => ({
        role: h.role === 'model' ? 'model' : 'user',
        parts: [{ text: h.text }]
      })),
      {
        role: 'user',
        parts: [{ text: newMessage }]
      }
    ];

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: contents,
      config: {
        systemInstruction: getSystemInstruction(),
        temperature: 0.7,
      },
    });

    if (!response.text) {
      throw new Error("EMPTY_RESPONSE");
    }

    return response.text;

  } catch (error: any) {
    console.error("Gemini API Error:", error);
    
    if (
      error?.message?.includes('API key') || 
      error?.message?.includes('AUTH_REQUIRED') ||
      error?.message?.includes('Requested entity was not found')
    ) {
      throw new Error("AUTH_REQUIRED");
    }
    
    return "Maaf, sistem sedang mengalami kendala teknis. Silakan coba sesaat lagi.";
  }
};
