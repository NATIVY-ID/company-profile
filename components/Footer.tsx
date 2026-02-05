/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/


import React, { useState } from 'react';
import { BRAND_NAME, INSTAGRAM_LINK } from '../constants';

interface FooterProps {
  onLinkClick: (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => void;
}

const Footer: React.FC<FooterProps> = ({ onLinkClick }) => {
  const [subscribeStatus, setSubscribeStatus] = useState<'idle' | 'loading' | 'success'>('idle');
  const [email, setEmail] = useState('');

  const handleSubscribe = () => {
    if (!email) return;
    setSubscribeStatus('loading');
    setTimeout(() => {
      setSubscribeStatus('success');
      setEmail('');
    }, 1500);
  };

  return (
    <footer className="bg-[#DBC9B8] pt-24 pb-12 px-6 text-[#3D3430]">
      <div className="max-w-[1800px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-12">
        
        <div className="md:col-span-4">
          <h4 className="text-2xl font-serif font-bold text-[#3D3430] mb-6">{BRAND_NAME}</h4>
          <p className="max-w-xs font-light leading-relaxed opacity-80">
            Build Fast, Scale Smart. <br/>
            High-performance software solutions and digital creative strategy for a connected world.
          </p>
        </div>

        <div className="md:col-span-2">
          <h4 className="font-bold text-[#3D3430] mb-6 tracking-wide text-xs uppercase">Expertise</h4>
          <ul className="space-y-4 font-light text-sm">
            <li><a href="#services" onClick={(e) => onLinkClick(e, 'services')} className="hover:opacity-60 transition-opacity">Software Solution</a></li>
            <li><a href="#services" onClick={(e) => onLinkClick(e, 'services')} className="hover:opacity-60 transition-opacity">Digital Creative</a></li>
            <li><a href="#services" onClick={(e) => onLinkClick(e, 'services')} className="hover:opacity-60 transition-opacity">Mobile Apps</a></li>
            <li><a href="#services" onClick={(e) => onLinkClick(e, 'services')} className="hover:opacity-60 transition-opacity">Cloud Systems</a></li>
          </ul>
        </div>
        
        <div className="md:col-span-2">
          <h4 className="font-bold text-[#3D3430] mb-6 tracking-wide text-xs uppercase">Company</h4>
          <ul className="space-y-4 font-light text-sm">
            <li><a href="#about" onClick={(e) => onLinkClick(e, 'about')} className="hover:opacity-60 transition-opacity">Our Vision</a></li>
            <li><a href="#clients" onClick={(e) => onLinkClick(e, 'clients')} className="hover:opacity-60 transition-opacity">Clients</a></li>
            <li><a href="#journal" onClick={(e) => onLinkClick(e, 'journal')} className="hover:opacity-60 transition-opacity">Insights</a></li>
          </ul>
        </div>

        <div className="md:col-span-4">
          <h4 className="font-bold text-[#3D3430] mb-6 tracking-wide text-xs uppercase">Connect</h4>
          <div className="flex flex-col gap-4">
            <input 
              type="email" 
              placeholder="Newsletter signup..." 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={subscribeStatus === 'loading' || subscribeStatus === 'success'}
              className="bg-transparent border-b border-[#3D3430]/30 py-2 text-lg outline-none focus:border-[#3D3430] transition-colors placeholder-[#3D3430]/40 text-[#3D3430] disabled:opacity-50" 
            />
            <button 
              onClick={handleSubscribe}
              disabled={subscribeStatus !== 'idle' || !email}
              className="self-start text-xs font-bold uppercase tracking-widest mt-2 hover:opacity-60 transition-opacity disabled:opacity-30"
            >
              {subscribeStatus === 'idle' && 'Subscribe'}
              {subscribeStatus === 'loading' && 'Joining...'}
              {subscribeStatus === 'success' && 'Welcome to Nativy'}
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-[1800px] mx-auto mt-20 pt-8 border-t border-[#3D3430]/10 flex flex-col md:flex-row justify-between items-center text-[10px] uppercase tracking-widest opacity-60">
        <p>&copy; {new Date().getFullYear()} Nativy Studio. All Rights Reserved.</p>
        <p>Created by <a href={INSTAGRAM_LINK} target="_blank" rel="noopener noreferrer" className="font-bold hover:underline">@nativy.id</a></p>
      </div>
    </footer>
  );
};

export default Footer;
