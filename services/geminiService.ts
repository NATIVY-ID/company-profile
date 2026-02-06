
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

export const sendMessageToGemini = async (history: {role: string, text: string}[], newMessage: string): Promise<string> => {
  // Inisialisasi SDK di dalam fungsi sesuai panduan
  // process.env.API_KEY akan otomatis terisi oleh sistem
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
  
  // Bersihkan history agar sesuai dengan struktur yang diharapkan model
  const formattedHistory = history
    .filter(msg => msg.text && msg.text.trim() !== "")
    .map(h => ({
      role: h.role === 'model' ? 'model' : 'user',
      parts: [{ text: h.text }]
    }));

  // Pastikan percakapan dimulai oleh user jika history ada
  const contents = [...formattedHistory];
  if (contents.length > 0 && contents[0].role === 'model') {
    contents.shift();
  }
  
  // Tambahkan pesan terbaru
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

    // Mengambil teks langsung dari properti .text (bukan metode .text())
    const text = response.text;
    
    if (!text) {
      throw new Error("Respons kosong dari AI.");
    }

    return text;
  } catch (error: any) {
    console.error("Gemini SDK Error:", error);
    throw error;
  }
};
