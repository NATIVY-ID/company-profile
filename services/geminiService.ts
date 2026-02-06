/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import { GoogleGenerativeAI } from "@google/generative-ai";
import { SERVICES, CLIENTS } from '../constants';

const getSystemInstruction = (): string => {
  const serviceContext = SERVICES.map(s => 
    `- ${s.name}: ${s.description} (Target: ${s.category})`
  ).join('\n');

  const clientContext = CLIENTS.map(c => c.name).join(', ');

  return `You are the Digital Consultant for "Nativy.id", a premier Software Solution and Digital Agency. 
  Our Mantra: "Build Fast, Scale Smart."
  Clients: ${clientContext}.
  Services: ${serviceContext}.
  Contact: Email (nativy.id@gmail.com), IG (@nativy.id), WA (082386199996).
  Language: Respond in Indonesian.
  Tone: Professional, visionary, and concise. 
  Constraint: Keep answers under 3 sentences.`;
};

export const sendMessageToGemini = async (
  history: { role: string; text: string }[], 
  newMessage: string
): Promise<string> => {
  
  // Sangat disarankan menggunakan process.env.VITE_GEMINI_KEY di masa depan
  const apiKey = "AIzaSyDYXoEyCXnMenpbNXjMw_JtnA5N6BuSsBM"; 
  const genAI = new GoogleGenerativeAI(apiKey);

  try {
    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-flash",
      systemInstruction: getSystemInstruction(),
    });

    // Validasi & Transformasi History
    let formattedHistory = history
      .filter((msg) => msg.text && msg.text.trim() !== "")
      .map((h) => ({
        role: h.role === "model" ? "model" : "user",
        parts: [{ text: h.text }],
      }));

    /**
     * FIX: Aturan Ketat Google Gemini API
     * Pesan pertama dalam history HARUS bertipe 'user'.
     * Jika pesan pertama adalah 'model', kita hapus sampai menemukan 'user'.
     */
    while (formattedHistory.length > 0 && formattedHistory[0].role === "model") {
      formattedHistory.shift();
    }

    const chatSession = model.startChat({
      history: formattedHistory,
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 250,
      },
    });

    const result = await chatSession.sendMessage(newMessage);
    const response = await result.response;
    const text = response.text();

    return text || "Maaf, saya tidak mendapatkan respons dari AI.";

  } catch (error: any) {
    console.error("Gemini API Error:", error);
    
    // Deteksi error autentikasi
    const msg = error.message || "";
    if (msg.includes("API_KEY_INVALID") || msg.includes("403") || msg.includes("not found")) {
      throw new Error("AUTH_REQUIRED");
    }
    
    // Deteksi error kuota (Rate Limit)
    if (msg.includes("429")) {
      return "Sistem sedang sibuk (Rate Limit). Silakan coba lagi dalam 1 menit.";
    }

    return "Maaf, sedang ada kendala teknis pada sistem AI kami.";
  }
};