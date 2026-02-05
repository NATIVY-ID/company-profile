/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/


import React, { useState, useMemo } from 'react';
import { SERVICES } from '../constants';
import { Service } from '../types';
import ProductCard from './ProductCard';

const categories = ['All', 'Software Solution', 'Digital Agency'];

interface ProductGridProps {
  onProductClick: (service: Service) => void;
}

const ProductGrid: React.FC<ProductGridProps> = ({ onProductClick }) => {
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredServices = useMemo(() => {
    if (activeCategory === 'All') return SERVICES;
    return SERVICES.filter(s => s.category === activeCategory);
  }, [activeCategory]);

  return (
    <section id="services" className="py-32 px-6 md:px-12 bg-[#E8D8C9]">
      <div className="max-w-[1800px] mx-auto">
        <div className="flex flex-col items-center text-center mb-24 space-y-8">
          <span className="text-xs font-bold uppercase tracking-[0.4em] text-[#3D3430]/50">Expertise</span>
          <h2 className="text-4xl md:text-6xl font-serif text-[#3D3430]">Our Solutions</h2>
          
          <div className="flex flex-wrap justify-center gap-8 pt-4 border-t border-[#3D3430]/10 w-full max-w-2xl">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`text-xs uppercase tracking-widest pb-1 border-b transition-all duration-300 ${
                  activeCategory === cat 
                    ? 'border-[#3D3430] text-[#3D3430]' 
                    : 'border-transparent text-[#3D3430]/40 hover:text-[#3D3430]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-x-12 gap-y-24">
          {filteredServices.map(service => (
            /* Service and Product are now compatible via types.ts, so 'as any' is removed */
            <ProductCard key={service.id} product={service} onClick={onProductClick} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductGrid;
