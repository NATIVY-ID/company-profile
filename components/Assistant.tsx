
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage } from '../types';
import { sendMessageToGemini } from '../services/geminiService';

// Fix: Simplified global Window augmentation with inline types to resolve subsequent property declaration errors
declare global {
  interface Window {
    aistudio?: {
      hasSelectedApiKey: () => Promise<boolean>;
      openSelectKey: () => Promise<void>;
    };
  }
}

const Assistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: 'Halo! Saya Konsultan Digital Nativy.id. Ada yang bisa saya bantu untuk "Build Fast and Scale Smart" bisnis Anda hari ini?', timestamp: Date.now() }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const [needsAuth, setNeedsAuth] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isOpen, isThinking]);

  // Check if API key is available or needs selection
  useEffect(() => {
    const checkKeyStatus = async () => {
      // If we are in the AI Studio environment
      if (window.aistudio) {
        try {
          const hasKey = await window.aistudio.hasSelectedApiKey();
          if (!hasKey) {
            setNeedsAuth(true);
          }
        } catch (e) {
          console.error("Error checking key status:", e);
        }
      } else if (!process.env.API_KEY) {
        // Fallback for when outside AI Studio and no env var present
        setNeedsAuth(true);
      }
    };
    checkKeyStatus();
  }, []);

  const handleConnectAI = async () => {
    if (window.aistudio) {
      try {
        await window.aistudio.openSelectKey();
        // Guideline: Assume the key selection was successful after triggering openSelectKey
        setNeedsAuth(false);
        setMessages(prev => [...prev, { 
          role: 'model', 
          text: 'AI berhasil terhubung. Silakan ajukan pertanyaan Anda kembali.', 
          timestamp: Date.now() 
        }]);
      } catch (e) {
        console.error("Failed to open key selector:", e);
      }
    } else {
      // In a real Vercel/Production deployment outside AI Studio, 
      // the developer must provide API_KEY in environment variables.
      alert("Akses ke pemilihan kunci API tidak tersedia. Pastikan variabel lingkungan API_KEY telah diatur di server.");
    }
  };

  const handleSend = async () => {
    if (!inputValue.trim() || isThinking) return;

    const userText = inputValue.trim();
    const userMsg: ChatMessage = { role: 'user', text: userText, timestamp: Date.now() };
    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsThinking(true);

    try {
      const history = messages.map(m => ({ role: m.role, text: m.text }));
      const responseText = await sendMessageToGemini(history, userText);
      
      const aiMsg: ChatMessage = { role: 'model', text: responseText, timestamp: Date.now() };
      setMessages(prev => [...prev, aiMsg]);
      setNeedsAuth(false); // Reset if it was successful
    } catch (error: any) {
      console.error("Chat error:", error);
      
      const errorMsg = error?.message || "";
      if (
        errorMsg.includes("API key") || 
        errorMsg.includes("AUTH_REQUIRED") || 
        errorMsg.includes("403") || 
        errorMsg.includes("401") ||
        errorMsg.includes("not found") ||
        errorMsg.includes("Requested entity was not found")
      ) {
        setNeedsAuth(true);
        setMessages(prev => [...prev, { 
          role: 'model', 
          text: 'Maaf, otorisasi AI diperlukan. Silakan klik tombol di bawah untuk menghubungkan kunci API Anda.', 
          timestamp: Date.now() 
        }]);
      } else {
        setMessages(prev => [...prev, { 
          role: 'model', 
          text: 'Maaf, terjadi kesalahan teknis. Silakan coba sesaat lagi.', 
          timestamp: Date.now() 
        }]);
      }
    } finally {
      setIsThinking(false);
    }
  };

  return (
    <div className="fixed bottom-8 right-8 z-50 flex flex-col items-end font-sans">
      {isOpen && (
        <div className="bg-[#E8D8C9] rounded-sm shadow-2xl shadow-[#3D3430]/30 w-[90vw] sm:w-[400px] h-[600px] mb-6 flex flex-col overflow-hidden border border-[#3D3430]/10 animate-slide-up-fade">
          {/* Header */}
          <div className="bg-[#DBC9B8] p-5 border-b border-[#3D3430]/10 flex justify-between items-center shadow-sm">
            <div className="flex items-center gap-3">
                <div className="w-2.5 h-2.5 bg-[#3D3430] rounded-full animate-pulse"></div>
                <span className="font-serif font-bold text-[#3D3430] text-lg">Nativy Consultant</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-[#3D3430]/40 hover:text-[#3D3430] transition-colors p-1">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Chat Area */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-[#E8D8C9]" ref={scrollRef}>
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in-up`}>
                <div 
                  className={`max-w-[85%] p-4 text-sm leading-relaxed whitespace-pre-wrap ${
                    msg.role === 'user' 
                      ? 'bg-[#3D3430] text-[#E8D8C9] shadow-md' 
                      : 'bg-white/70 backdrop-blur-md border border-[#3D3430]/5 text-[#3D3430] shadow-sm'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            
            {needsAuth && (
              <div className="flex flex-col items-center gap-4 py-6 px-4 animate-fade-in-up bg-white/30 rounded-lg border border-[#3D3430]/5">
                <p className="text-[10px] text-[#3D3430]/60 uppercase tracking-widest text-center leading-relaxed">
                  Koneksi AI Memerlukan Otorisasi
                </p>
                <button 
                  onClick={handleConnectAI}
                  className="bg-[#3D3430] text-[#E8D8C9] px-6 py-3 text-xs font-bold uppercase tracking-widest hover:bg-[#524641] transition-all shadow-lg flex items-center gap-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 0 1 3 3m3 0a6 6 0 0 1-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1 1 21.75 8.25Z" />
                  </svg>
                  Hubungkan AI Consultant
                </button>
                <p className="text-[9px] text-[#3D3430]/40 text-center italic">
                  Klik tombol di atas untuk memilih kunci API yang valid jika environment variable tidak terdeteksi.
                </p>
              </div>
            )}

            {isThinking && (
               <div className="flex justify-start">
                 <div className="bg-white/70 border border-[#3D3430]/5 p-4 flex gap-1.5 items-center shadow-sm">
                   <div className="w-1.5 h-1.5 bg-[#3D3430]/40 rounded-full animate-bounce"></div>
                   <div className="w-1.5 h-1.5 bg-[#3D3430]/40 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                   <div className="w-1.5 h-1.5 bg-[#3D3430]/40 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                 </div>
               </div>
            )}
          </div>

          {/* Input Area */}
          <div className="p-5 bg-[#E8D8C9] border-t border-[#3D3430]/10">
            <div className="flex gap-2">
              <input 
                type="text" 
                disabled={isThinking}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder={needsAuth ? "Otorisasi diperlukan..." : "Tanya Nativy apa saja..."}
                className="flex-1 bg-white/90 border border-[#3D3430]/10 focus:border-[#3D3430] px-4 py-3 text-sm outline-none transition-all placeholder-[#3D3430]/30 text-[#3D3430] disabled:opacity-50"
              />
              <button 
                onClick={handleSend}
                disabled={!inputValue.trim() || isThinking}
                className="bg-[#3D3430] text-[#E8D8C9] px-5 hover:bg-[#524641] transition-all disabled:opacity-30 flex items-center justify-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}

      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="bg-[#3D3430] text-[#E8D8C9] w-16 h-16 flex items-center justify-center rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300 z-50 border-2 border-[#E8D8C9]/20"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.2} stroke="currentColor" className="w-8 h-8">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z" />
        </svg>
      </button>
    </div>
  );
};

export default Assistant;