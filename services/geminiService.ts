
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
  Your tone is professional, visionary, tech-savvy yet accessible, and confident.
  
  Our Core Mantra: "Build Fast, Scale Smart. Building Digital Experiences."
  
  Our Clients include: ${clientContext}.
  
  Our Services:
  ${serviceContext}
  
  If anyone asks how to contact Nativy or get in touch, provide these specific contact details:
  - Email: nativy.id@gmail.com
  - Instagram: @nativy.id
  - WhatsApp: 082386199996
  
  Keep answers professional and concise (max 3 sentences). 
  If asked about pricing, explain that we provide custom quotes based on project scope.`;
};

export const sendMessageToGemini = async (history: {role: string, text: string}[], newMessage: string): Promise<string> => {
  try {
    // Mengambil API_KEY dari environment variable
    const apiKey = process.env.API_KEY;

    // Jika API_KEY tidak ditemukan dalam bundle build
    if (!apiKey || apiKey === "undefined" || apiKey === "") {
      console.warn("Gemini API Key tidak ditemukan di process.env.API_KEY");
      throw new Error("API_KEY_MISSING");
    }

    const ai = new GoogleGenAI({ apiKey: apiKey });
    
    // API Gemini memerlukan role user di awal
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

    return response.text || "Maaf, saya tidak bisa memproses permintaan tersebut saat ini.";

  } catch (error: any) {
    console.error("Gemini Error:", error);
    
    if (error.message === "API_KEY_MISSING") {
      return "⚠️ API_KEY terdeteksi kosong. \n\nLangkah Perbaikan: \n1. Buka Dashboard Vercel Anda. \n2. Buka tab 'Deployments'. \n3. Klik titik tiga pada deployment terbaru dan pilih 'Redeploy' (lalu centang 'Use existing Build Cache' jika ada, atau biarkan default). \n\nIni diperlukan agar Vercel memasukkan kunci baru ke dalam kode aplikasi Anda.";
    }
    
    return "Maaf, terjadi kendala teknis. Mohon pastikan koneksi internet Anda stabil atau hubungi admin Nativy melalui WhatsApp (082386199996).";
  }
};
