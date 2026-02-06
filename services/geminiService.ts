
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
  We have experience with Korlantas Polri (Security/Gov), Universitas Jember (Education), and PT. Rolas Nusantara Medika (Healthcare).
  
  Our Services:
  ${serviceContext}
  
  If anyone asks how to contact Nativy or get in touch, provide these specific contact details:
  - Email: nativy.id@gmail.com
  - Instagram: @nativy.id
  - WhatsApp: 082386199996
  
  You should answer questions about our technical capabilities (Next.js, Tailwind, Cloud, Flutter), our design philosophy, and how we handle enterprise projects.
  Keep answers professional and concise (2-3 sentences). 
  If asked about pricing, explain that we provide custom quotes based on project scope.`;
};

export const sendMessageToGemini = async (history: {role: string, text: string}[], newMessage: string): Promise<string> => {
  try {
    // Inisialisasi instance baru untuk memastikan mengambil API_KEY terbaru dari environment.
    // Pastikan variabel 'API_KEY' sudah di-set di Environment Variables Vercel.
    const apiKey = process.env.API_KEY;

    if (!apiKey) {
      console.error("DEBUG: process.env.API_KEY is undefined");
      throw new Error("API_KEY_MISSING");
    }

    const ai = new GoogleGenAI({ apiKey: apiKey });
    
    // ATURAN API GEMINI: 
    // 1. Pesan pertama dalam array 'contents' HARUS memiliki role 'user'.
    // 2. Role harus bergantian secara ketat (user -> model -> user -> model...).
    // Saat ini history kita dimulai dengan pesan 'model' (pesan selamat datang),
    // jadi kita harus membuangnya agar percakapan dimulai dari 'user' (pertanyaan pertama user).
    
    const validHistory = history.filter((msg, index) => {
      // Abaikan pesan pertama jika itu dari 'model' (pesan sambutan bot)
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
        topP: 0.95,
      },
    });

    const responseText = response.text;
    
    if (!responseText) {
      throw new Error("Empty response from Gemini");
    }

    return responseText;

  } catch (error: any) {
    console.error("Gemini API Error details:", error);
    
    // Penanganan error spesifik berdasarkan tipe error yang sering muncul di Vercel
    if (error.message === "API_KEY_MISSING") {
      return "Sistem tidak mendeteksi API_KEY. Pastikan Anda sudah menambahkan 'API_KEY' di Environment Variables Vercel dan melakukan 'Redeploy'.";
    }
    
    if (error?.status === 403 || error?.message?.includes('API key')) {
      return "Kunci API (API Key) ditolak atau tidak valid. Mohon periksa kembali kunci Anda di Google AI Studio dan update di dashboard Vercel.";
    }

    return "Maaf, saya mengalami kendala teknis saat menghubungi pusat AI Nativy. Silakan coba lagi beberapa saat lagi atau hubungi kami langsung di WhatsApp: 082386199996.";
  }
};
