/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/


import React from 'react';
import { JOURNAL_ARTICLES } from '../constants';
import { JournalArticle } from '../types';

interface JournalProps {
  onArticleClick: (article: JournalArticle) => void;
}

const Journal: React.FC<JournalProps> = ({ onArticleClick }) => {
  return (
    <section id="journal" className="bg-[#F5F2EB] py-32 px-6 md:px-12">
      <div className="max-w-[1800px] mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-20 pb-8 border-b border-[#D6D1C7]">
            <div>
                <span className="block text-xs font-bold uppercase tracking-[0.2em] text-[#A8A29E] mb-4">Editorial</span>
                <h2 className="text-4xl md:text-6xl font-serif text-[#2C2A26]">The Journal</h2>
            </div>
            <p className="mt-4 md:mt-0 text-sm text-[#5D5A53] max-w-sm font-light">
              Reflections on engineering, design, and our journey in reshaping digital ecosystems.
            </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
            {JOURNAL_ARTICLES.map((article) => (
                <div key={article.id} className="group cursor-pointer flex flex-col text-left" onClick={() => onArticleClick(article)}>
                    <div className="w-full aspect-[4/5] overflow-hidden mb-8 bg-[#EBE7DE] shadow-lg shadow-[#3D3430]/5">
                        <img 
                            src={article.image} 
                            alt={article.title} 
                            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 grayscale-[0.3] group-hover:grayscale-0"
                        />
                    </div>
                    <div className="flex flex-col flex-1 text-left">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-[#A8A29E] mb-3">{article.date}</span>
                        <h3 className="text-xl font-serif text-[#2C2A26] mb-4 leading-tight group-hover:text-[#3D3430]/60 transition-colors">{article.title}</h3>
                        <p className="text-sm text-[#5D5A53] font-light leading-relaxed line-clamp-3">{article.excerpt}</p>
                    </div>
                </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default Journal;
