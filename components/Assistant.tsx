/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage } from '../types';
import { sendMessageToGemini } from '../services/geminiService';

const Assistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: 'Hello! Welcome to Nativy.id. I am your Digital Solutions assistant. How can I help you "Build Fast and Scale Smart" today?', timestamp: Date.now() }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!inputValue.trim()) return;

    const userMsg: ChatMessage = { role: 'user', text: inputValue, timestamp: Date.now() };
    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsThinking(true);

    try {
      const history = messages.map(m => ({ role: m.role, text: m.text }));
      const responseText = await sendMessageToGemini(history, userMsg.text);
      
      const aiMsg: ChatMessage = { role: 'model', text: responseText, timestamp: Date.now() };
      setMessages(prev => [...prev, aiMsg]);
    } catch (error) {
        // Error handled in service
    } finally {
      setIsThinking(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="fixed bottom-8 right-8 z-50 flex flex-col items-end font-sans">
      {isOpen && (
        <div className="bg-[#E8D8C9] rounded-none shadow-2xl shadow-[#3D3430]/20 w-[90vw] sm:w-[380px] h-[550px] mb-6 flex flex-col overflow-hidden border border-[#3D3430]/10 animate-slide-up-fade">
          {/* Header */}
          <div className="bg-[#DBC9B8] p-5 border-b border-[#3D3430]/10 flex justify-between items-center">
            <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-[#3D3430] rounded-full animate-pulse"></div>
                <span className="font-serif font-bold text-[#3D3430] text-lg">Consultant</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-[#3D3430]/40 hover:text-[#3D3430] transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Chat Area */}
          <div className="flex-1 overflow-y-auto p-6 space-y-8 bg-[#E8D8C9]" ref={scrollRef}>
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div 
                  className={`max-w-[85%] p-5 text-sm leading-relaxed ${
                    msg.role === 'user' 
                      ? 'bg-[#3D3430] text-[#E8D8C9]' 
                      : 'bg-white/60 backdrop-blur-sm border border-[#3D3430]/5 text-[#3D3430] shadow-sm'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {isThinking && (
               <div className="flex justify-start">
                 <div className="bg-white/60 border border-[#3D3430]/5 p-5 flex gap-1 items-center shadow-sm">
                   <div className="w-1.5 h-1.5 bg-[#3D3430]/40 rounded-full animate-bounce"></div>
                   <div className="w-1.5 h-1.5 bg-[#3D3430]/40 rounded-full animate-bounce delay-75"></div>
                   <div className="w-1.5 h-1.5 bg-[#3D3430]/40 rounded-full animate-bounce delay-150"></div>
                 </div>
               </div>
            )}
          </div>

          {/* Input Area */}
          <div className="p-5 bg-[#E8D8C9] border-t border-[#3D3430]/10">
            <div className="flex gap-2 relative">
              <input 
                type="text" 
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="How can Nativy help?" 
                className="flex-1 bg-white/80 border border-[#3D3430]/10 focus:border-[#3D3430] px-4 py-3 text-sm outline-none transition-colors placeholder-[#3D3430]/40 text-[#3D3430]"
              />
              <button 
                onClick={handleSend}
                disabled={!inputValue.trim() || isThinking}
                className="bg-[#3D3430] text-[#E8D8C9] px-4 hover:bg-[#524641] transition-colors disabled:opacity-50"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}

      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="bg-[#3D3430] text-[#E8D8C9] w-14 h-14 flex items-center justify-center rounded-full shadow-2xl hover:scale-105 transition-all duration-500 z-50 border border-[#E8D8C9]/20"
      >
        {isOpen ? (
             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
             </svg>
        ) : (
            <span className="font-serif italic font-bold text-xl">N</span>
        )}
      </button>
    </div>
  );
};

export default Assistant;
