/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/


import React from 'react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onClick: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onClick }) => {
  return (
    <div className="group flex flex-col gap-4 cursor-pointer" onClick={() => onClick(product)}>
      <div className="relative w-full aspect-square overflow-hidden bg-[#EBE7DE]">
        <img 
          src={product.imageUrl} 
          alt={product.name} 
          className="w-full h-full object-cover transition-transform duration-1000 ease-in-out group-hover:scale-110 sepia-[0.1]"
        />
        
        <div className="absolute inset-0 bg-[#2C2A26]/0 group-hover:bg-[#2C2A26]/5 transition-colors duration-500 flex items-center justify-center">
            <div className="opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                <span className="bg-white/95 backdrop-blur text-[#2C2A26] px-5 py-2.5 rounded-full text-[10px] uppercase tracking-widest font-bold">
                    View Case Study
                </span>
            </div>
        </div>
      </div>
      
      <div className="text-center">
        <h3 className="text-xl font-serif font-medium text-[#2C2A26] mb-1 group-hover:opacity-70 transition-opacity">{product.name}</h3>
        <p className="text-[10px] font-bold text-[#3D3430]/40 tracking-[0.2em] uppercase">{product.category}</p>
      </div>
    </div>
  );
};

export default ProductCard;
