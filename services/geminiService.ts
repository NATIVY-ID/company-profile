
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import { GoogleGenAI } from "@google/genai";
import { SERVICES, CLIENTS } from '../constants';

const getSystemInstruction = () => {
  const serviceContext = SERVICES.map(s => 
    `- ${s.name}: ${s.description} Target: ${s.category}`
  ).join('\n');

  const clientContext = CLIENTS.map(c => c.name).join(', ');

  return `You are the Digital Consultant for "Nativy.id", a premier Software Solution and Digital Agency. 
  Our Mantra: "Build Fast, Scale Smart."
  Clients: ${clientContext}.
  Services: ${serviceContext}.
  Contact: Email (nativy.id@gmail.com), IG (@nativy.id), WA (082386199996).
  Keep answers professional, visionary, and under 3 sentences.`;
};

export const sendMessageToGemini = async (history: {role: string, text: string}[], newMessage: string): Promise<string> => {
  try {
    // Fix: Create instance right before call and use process.env.API_KEY directly as per guidelines.
    const ai = new GoogleGenAI({ apiKey: "AIzaSyDYXoEyCXnMenpbNXjMw_JtnA5N6BuSsBM" });
    // const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
    
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

    // Fix: Directly access the .text property of the response.
    return response.text || "Maaf, saya tidak mendapatkan respons dari pusat data.";

  } catch (error: any) {
    console.error("Gemini API Error:", error);
    
    // Fix: Refine error detection logic for auth-related issues to include specific guideline strings.
    if (
      error?.message?.includes('API key') || 
      error?.message?.includes('Requested entity was not found.') || 
      error?.message?.includes('not found')
    ) {
      throw new Error("AUTH_REQUIRED");
    }
    
    return "Maaf, sedang ada kendala teknis pada sistem AI kami. Silakan coba sesaat lagi.";
  }
};
