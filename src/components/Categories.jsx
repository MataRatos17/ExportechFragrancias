import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { categoryCards } from '../data/mock';

const Categories = () => (
  <section className="bg-[#141414] py-24 px-6">
    <div className="max-w-[1400px] mx-auto">
      {/* Usamos flex e justify-center para que os 2 cards fiquem no meio */}
      <div className="flex flex-wrap justify-center gap-8">
        {categoryCards.map((card, idx) => (
          <div
            key={card.title}
            className="group relative h-[520px] w-full md:w-[450px] overflow-hidden rounded-sm cursor-pointer"
            style={{ animationDelay: `${idx * 150}ms` }}
          >
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
              style={{ backgroundImage: `url(${card.image})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/20" />
            <div className="relative z-10 h-full flex flex-col justify-end p-9">
              <h3 className="font-display text-[#C0C0C0] text-[34px] font-black uppercase tracking-tight mb-3">
                {card.title}
              </h3>
              <p className="text-[#C0C0C0]/90 text-[15px] leading-relaxed mb-6 max-w-[320px]">
                {card.desc}
              </p>
              <Link
                to={card.href}
                className="inline-flex items-center gap-2 text-[#C0C0C0] hover:text-[#C0C0C0] text-[12px] tracking-[0.22em] font-bold uppercase transition-all w-fit border-b border-[#C0C0C0] hover:border-[#C0C0C0] pb-1 group-hover:gap-3"
              >
                {card.cta}
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Categories;