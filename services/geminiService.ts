/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import { GoogleGenerativeAI } from "@google/generative-ai";
import { SERVICES, CLIENTS } from '../constants';

const getSystemInstructionText = (): string => {
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
  
  const apiKey = "AIzaSyDYXoEyCXnMenpbNXjMw_JtnA5N6BuSsBM"; 
  const genAI = new GoogleGenerativeAI(apiKey);

  try {
    // FIX: Format systemInstruction harus berupa object dengan property parts
    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-flash",
      systemInstruction: {
        role: "system",
        parts: [{ text: getSystemInstructionText() }],
      },
    }, { apiVersion: "v1" });

    // Validasi & Transformasi History
    let formattedHistory = history
      .filter((msg) => msg.text && msg.text.trim() !== "")
      .map((h) => ({
        role: h.role === "model" ? "model" : "user",
        parts: [{ text: h.text }],
      }));

    // Aturan: Harus dimulai oleh user
    while (formattedHistory.length > 0 && formattedHistory[0].role === "model") {
      formattedHistory.shift();
    }

    const chatSession = model.startChat({
      history: formattedHistory,
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 300,
      },
    });

    const result = await chatSession.sendMessage(newMessage);
    const response = await result.response;
    return response.text();

  } catch (error: any) {
    console.error("Gemini API Error Detail:", error);
    
    // Jika masih error "systemInstruction", kita gunakan fallback tanpa system instruction
    if (error.message?.includes("systemInstruction")) {
       return "Konfigurasi AI sedang diperbarui, silakan coba lagi.";
    }

    return "Maaf, sedang ada kendala teknis pada sistem AI kami.";
  }
};