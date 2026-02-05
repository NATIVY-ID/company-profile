/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';

const Hero: React.FC = () => {
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const element = document.getElementById(targetId);
    if (element) {
      const headerOffset = 85;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  };

  return (
    <section className="relative w-full h-screen min-h-[700px] overflow-hidden bg-[#3D3430]">
      <div className="absolute inset-0 w-full h-full">
        <img 
            src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=2000" 
            alt="Nativy Office Studio" 
            className="w-full h-full object-cover grayscale opacity-30 mix-blend-overlay"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#3D3430]/80 via-[#3D3430]/40 to-[#E8D8C9]"></div>
      </div>

      <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-6">
        <div className="animate-fade-in-up">
          <div className="mb-10 flex flex-col items-center">
             <div className="relative w-24 h-24 mb-6">
                <div className="absolute inset-0 border-4 border-[#E8D8C9] rounded-full animate-pulse opacity-20"></div>
                <div className="absolute inset-2 border-2 border-[#E8D8C9] rounded-full"></div>
                <div className="absolute inset-0 flex items-center justify-center font-serif text-3xl text-[#E8D8C9]">N</div>
             </div>
             <span className="block text-xs md:text-sm font-medium uppercase tracking-[0.4em] text-[#E8D8C9] opacity-80">
               Software Development & Digital Creative
             </span>
          </div>
          
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-serif font-normal text-white tracking-tight mb-8">
            Build Fast, <br/><span className="italic text-[#E8D8C9]">Scale Smart.</span>
          </h1>
          
          <p className="max-w-xl mx-auto text-lg md:text-xl text-[#E8D8C9] font-light leading-relaxed mb-12 opacity-90">
            Nativy.id delivers bespoke digital solutions for governance, education, and enterprises. 
            Excellence in every line of code, beauty in every pixel.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <a 
              href="#services" 
              onClick={(e) => handleNavClick(e, 'services')}
              className="px-10 py-4 bg-[#E8D8C9] text-[#3D3430] rounded-none text-sm font-semibold uppercase tracking-widest hover:bg-white transition-all duration-500 shadow-xl"
            >
              Explore Services
            </a>
            <a 
              href="#clients" 
              onClick={(e) => handleNavClick(e, 'clients')}
              className="px-10 py-4 border border-[#E8D8C9] text-[#E8D8C9] rounded-none text-sm font-semibold uppercase tracking-widest hover:bg-[#E8D8C9] hover:text-[#3D3430] transition-all duration-500"
            >
              Our Portfolio
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;