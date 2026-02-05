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
    // Correctly initialize GoogleGenAI with API_KEY from process.env as per guidelines
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    const chat = ai.chats.create({
      model: 'gemini-3-flash-preview',
      config: {
        systemInstruction: getSystemInstruction(),
      },
      history: history.map(h => ({
        role: h.role,
        parts: [{ text: h.text }]
      }))
    });

    const result = await chat.sendMessage({ message: newMessage });
    // Use the .text property directly from GenerateContentResponse
    return result.text || "I'm sorry, I couldn't generate a response.";

  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I apologize, but our internal network is undergoing maintenance. How can I help manually?";
  }
};