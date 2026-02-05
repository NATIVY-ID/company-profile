/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/


import React from 'react';

const About: React.FC = () => {
  return (
    <section id="about" className="bg-[#DBC9B8]">
      
      <div className="py-24 px-6 md:px-12 max-w-[1800px] mx-auto flex flex-col md:flex-row items-start gap-16 md:gap-32">
        <div className="md:w-1/3">
          <h2 className="text-4xl md:text-6xl font-serif text-[#3D3430] leading-tight">
            Digital Craftsmanship. <br/> Built for Impact.
          </h2>
        </div>
        <div className="md:w-2/3 max-w-2xl">
          <p className="text-lg md:text-xl text-[#3D3430]/70 font-light leading-relaxed mb-8">
            Nativy.id was born from a vision to elevate digital solutions in Indonesia and beyond. We believe that technology shouldn't just function—it should empower and inspire.
          </p>
          <p className="text-lg md:text-xl text-[#3D3430]/70 font-light leading-relaxed mb-8">
            From the bustling labs of Universitas Jember to the critical operations of Korlantas Polri, our team of engineers and designers build systems that touch lives and secure futures. We are the bridge between complex software development and intuitive digital creative.
          </p>
          <div className="w-full h-[350px] md:h-[450px] overflow-hidden group mt-12 shadow-2xl shadow-[#3D3430]/10">
            <img 
              src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&q=80&w=1200" 
              alt="Nativy Collaborative Space" 
              className="w-full h-full object-cover grayscale brightness-95 group-hover:scale-105 transition-transform duration-1000"
            />
          </div>
          <p className="text-[10px] font-bold uppercase tracking-widest text-[#3D3430]/40 mt-4">
            The Nativy Studio, Digital Hub
          </p>
        </div>
      </div>

      <div className="bg-[#E8D8C9] py-24">
        <div className="max-w-[1800px] mx-auto px-6 md:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <div className="order-2 lg:order-1 relative h-[400px] md:h-[500px] overflow-hidden group shadow-2xl shadow-[#3D3430]/5">
                   <img 
                     src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1200" 
                     alt="Cybersecurity and Code" 
                     className="absolute inset-0 w-full h-full object-cover grayscale group-hover:scale-110 transition-all duration-[2s]"
                   />
                   <div className="absolute inset-0 bg-[#3D3430]/10 mix-blend-multiply"></div>
                </div>
                
                <div className="order-1 lg:order-2 flex flex-col justify-center py-6">
                   <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#3D3430]/60 mb-6">Our DNA</span>
                   <h3 className="text-4xl md:text-5xl lg:text-6xl font-serif mb-8 text-[#3D3430] leading-tight">
                     Software that scales <br/><span className="italic">with your vision.</span>
                   </h3>
                   <div className="w-20 h-1 bg-[#3D3430] mb-8"></div>
                   <p className="text-lg text-[#3D3430]/70 font-light leading-relaxed mb-8 max-w-md">
                     We specialize in "Build Fast, Scale Smart." Our engineering team utilizes modern tech stacks like Next.JS and Cloud-Native architectures to ensure your digital ecosystem grows without friction.
                   </p>
                   <p className="text-lg text-[#3D3430]/70 font-light leading-relaxed max-w-md">
                     Whether you are managing complex logistics for the police force or educational platforms for thousands of students, our solutions are engineered for stability and performance.
                   </p>
                </div>
            </div>
        </div>
      </div>
    </section>
  );
};

export default About;