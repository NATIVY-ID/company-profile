
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
  LAYANAN KAMI: ${serviceContext}.
  KONTAK: Email (nativy.id@gmail.com), IG (@nativy.id), WA (082386199996).
  ATURAN: Jawab dalam Bahasa Indonesia, profesional, visioner, dan maksimal 3 kalimat. Jangan gunakan format JSON.`;
};

// Nilai API Key diinjeksi langsung sesuai permintaan user untuk pengetesan
const TEST_API_KEY = 'AIzaSyDYXoEyCXnMenpbNXjMw_JtnA5N6BuSsBM';

export const sendMessageToGemini = async (history: {role: string, text: string}[], newMessage: string): Promise<string> => {
  // Gunakan API Key yang diinjeksi atau dari environment variable jika tersedia
  const apiKey = process.env.API_KEY || TEST_API_KEY;
  
  const ai = new GoogleGenAI({ apiKey: apiKey });
  
  const formattedHistory = history
    .filter(msg => msg.text && msg.text.trim() !== "")
    .map(h => ({
      role: h.role === 'model' ? 'model' : 'user',
      parts: [{ text: h.text }]
    }));

  const contents = [...formattedHistory];
  if (contents.length > 0 && contents[0].role === 'model') {
    contents.shift();
  }
  
  contents.push({
    role: 'user',
    parts: [{ text: newMessage }]
  });

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: contents,
      config: {
        systemInstruction: getSystemInstruction(),
        temperature: 0.7,
      },
    });

    const text = response.text;
    
    if (!text) {
      throw new Error("Respons kosong dari AI.");
    }

    return text;
  } catch (error: any) {
    console.error("Gemini SDK Error Details:", error);
    throw error;
  }
};
