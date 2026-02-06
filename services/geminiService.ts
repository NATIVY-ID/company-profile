/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import { GoogleGenerativeAI } from "@google/generative-ai";
import { SERVICES, CLIENTS } from '../constants';

const getSystemInstructionText = (): string => {
  const serviceContext = SERVICES.map(s => 
    `- ${s.name}: ${s.description}`
  ).join('\n');

  return `BERTINDAKLAH SEBAGAI: Digital Consultant Nativy.id.
  MANTRA: "Build Fast, Scale Smart."
  SERVICES: ${serviceContext}.
  ATURAN: Jawab dalam Bahasa Indonesia, profesional, maksimal 3 kalimat.
  
  ---
  PERTANYAAN USER: `;
};

export const sendMessageToGemini = async (
  history: { role: string; text: string }[], 
  newMessage: string
): Promise<string> => {
  
  // Gunakan API Key Anda
  const apiKey = "AIzaSyDYXoEyCXnMenpbNXjMw_JtnA5N6BuSsBM"; 
  const genAI = new GoogleGenerativeAI(apiKey);

  try {
    // KUNCINYA: Jangan masukkan systemInstruction di sini untuk menghindari Error 400
    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-flash"
    }, { apiVersion: "v1" });

    let formattedHistory = history
      .filter((msg) => msg.text && msg.text.trim() !== "")
      .map((h) => ({
        role: h.role === "model" ? "model" : "user",
        parts: [{ text: h.text }],
      }));

    // Pastikan history dimulai dari user
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

    // MASUKKAN INSTRUKSI DI SINI:
    // Kita gabungkan instruksi sistem tepat sebelum pertanyaan user
    const promptWithContext = `${getSystemInstructionText()} ${newMessage}`;

    const result = await chatSession.sendMessage(promptWithContext);
    const response = await result.response;
    return response.text();

  } catch (error: any) {
    console.error("Gemini API Error:", error);
    
    // Cek jika errornya karena masalah auth/key
    if (error.message?.includes("API_KEY")) {
      throw new Error("AUTH_REQUIRED");
    }

    return "Maaf, sistem sedang mengalami kendala teknis. Silakan coba lagi.";
  }
};