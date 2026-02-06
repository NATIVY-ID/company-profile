
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
  We have experience with Korlantas Polri (Security/Gov), Universitas Jember (Education), and others.
  
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
    // Inisialisasi GoogleGenAI dengan API_KEY dari environment variable
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    // Membangun array contents yang berisi riwayat dan pesan baru
    const contents = [
      ...history.map(h => ({
        role: h.role,
        parts: [{ text: h.text }]
      })),
      {
        role: 'user',
        parts: [{ text: newMessage }]
      }
    ];

    // Menggunakan ai.models.generateContent yang lebih robust untuk deployment
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: contents,
      config: {
        systemInstruction: getSystemInstruction(),
        temperature: 0.7,
        topP: 0.95,
      },
    });

    // Mengambil teks langsung dari response
    const responseText = response.text;
    
    if (!responseText) {
      throw new Error("Empty response from Gemini");
    }

    return responseText;

  } catch (error) {
    console.error("Gemini API Error details:", error);
    // Memberikan pesan fallback yang informatif jika terjadi error di sisi klien/API
    return "Maaf, saat ini saya mengalami kendala koneksi dengan pusat data Nativy. Silakan hubungi kami langsung melalui WhatsApp (082386199996) untuk konsultasi segera.";
  }
};
