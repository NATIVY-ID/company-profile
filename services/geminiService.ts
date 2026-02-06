
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
  // Instantiate inside the function as per guideline
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
  
  // Clean history to ensure it starts with a user message if needed, 
  // and format for the generateContent API
  const validHistory = history.filter((msg, index) => {
    if (index === 0 && msg.role === 'model') return false;
    return msg.text && msg.text.trim() !== "";
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
    contents,
    config: {
      systemInstruction: getSystemInstruction(),
      temperature: 0.7,
    },
  });

  // Use .text property directly
  if (!response.text) {
    throw new Error("EMPTY_RESPONSE");
  }

  return response.text;
};
