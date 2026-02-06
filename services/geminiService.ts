/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import { GoogleGenerativeAI } from "@google/generative-ai";
import { SERVICES, CLIENTS } from '../constants';

/**
 * Mengonstruksi instruksi sistem untuk menjaga kepribadian bot Nativy.id
 */
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
  Language: Respond in Indonesian (unless asked otherwise).
  Tone: Professional, visionary, and concise. 
  Constraint: Keep answers under 3 sentences.`;
};

/**
 * Fungsi utama untuk mengirim pesan ke Gemini
 */
export const sendMessageToGemini = async (
  history: { role: string; text: string }[], 
  newMessage: string
): Promise<string> => {
  
  // 1. Inisialisasi API (Gunakan Environment Variable untuk keamanan)
  const apiKey = "AIzaSyDYXoEyCXnMenpbNXjMw_JtnA5N6BuSsBM"; 
  const genAI = new GoogleGenerativeAI(apiKey);

  try {
    // 2. Pilih Model & Masukkan System Instruction
    // Menggunakan gemini-1.5-flash untuk kecepatan (sesuai kebutuhan "Build Fast")
    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-flash",
      systemInstruction: getSystemInstruction(),
    });

    // 3. Siapkan History Percakapan
    // Pastikan history mengikuti format: { role: 'user' | 'model', parts: [{ text: string }] }
    const formattedHistory = history
      .filter((msg) => msg.text && msg.text.trim() !== "") // Buang pesan kosong
      .map((h) => ({
        role: h.role === "model" ? "model" : "user",
        parts: [{ text: h.text }],
      }));

    // 4. Mulai Chat Session
    const chatSession = model.startChat({
      history: formattedHistory,
      generationConfig: {
        temperature: 0.7,
        topP: 0.95,
        topK: 40,
        maxOutputTokens: 200, // Menjaga jawaban tetap singkat
      },
    });

    // 5. Kirim Pesan dan Tunggu Hasil
    const result = await chatSession.sendMessage(newMessage);
    const response = await result.response;
    const text = response.text();

    return text || "Maaf, saya tidak mendapatkan respons yang valid.";

  } catch (error: any) {
    console.error("Gemini API Error:", error);

    // Tangani error autentikasi atau kuota
    const errorMessage = error.message || "";
    if (
      errorMessage.includes("API_KEY_INVALID") || 
      errorMessage.includes("API_KEY_NOT_FOUND") ||
      errorMessage.includes("403")
    ) {
      throw new Error("AUTH_REQUIRED");
    }

    if (errorMessage.includes("429")) {
      return "Maaf, trafik sedang padat. Silakan coba lagi dalam beberapa saat.";
    }

    return "Maaf, sedang ada kendala teknis pada sistem AI kami.";
  }
};