/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';
import { CLIENTS } from '../constants';

const Clients: React.FC = () => {
  return (
    <section id="clients" className="py-24 bg-[#E8D8C9] border-t border-[#3D3430]/10">
      <div className="max-w-[1800px] mx-auto px-6">
        <div className="text-center mb-16">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#3D3430]/60 mb-4 block">Trusted By Leaders</span>
            <h2 className="text-3xl md:text-4xl font-serif text-[#3D3430]">Our Clients & Partners</h2>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {CLIENTS.map((client, idx) => (
            <div 
              key={idx} 
              className="group flex flex-col items-center justify-center p-8 bg-white/40 border border-[#3D3430]/5 hover:bg-white hover:shadow-xl hover:shadow-[#3D3430]/5 transition-all duration-500 text-center rounded-sm"
            >
              <div className="text-3xl mb-4 grayscale group-hover:grayscale-0 transition-all duration-500 opacity-60 group-hover:opacity-100">
                {client.logo}
              </div>
              <span className="text-[10px] md:text-xs font-medium uppercase tracking-widest text-[#3D3430] opacity-80 group-hover:opacity-100">
                {client.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Clients;