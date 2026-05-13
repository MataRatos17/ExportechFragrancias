import React, { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { testimonials } from '../data/mock';

const Testimonials = () => {
  const [idx, setIdx] = useState(0);

  const next = useCallback(() => {
    setIdx((i) => (i + 1) % testimonials.length);
  }, []);

  const prev = useCallback(() => {
    setIdx((i) => (i - 1 + testimonials.length) % testimonials.length);
  }, []);

  useEffect(() => {
    const t = setInterval(next, 6000);
    return () => clearInterval(t);
  }, [next]);

  return (
    <section className="bg-[#141414] py-24 px-6 border-t border-[#C0C0C0]/10">
      <div className="max-w-[1400px] mx-auto grid md:grid-cols-2 gap-16 items-center">
        <div>
          <h2 className="font-display text-[#C0C0C0] text-[42px] md:text-[56px] font-black uppercase leading-[0.95] tracking-tight">
            Os nossos aromas<br />
            <span className="text-[#C0C0C0]">transformam</span><br />
            espaços e<br/>experiências
          </h2>
        </div>

        <div className="relative">
          <Quote className="absolute -top-6 -left-2 text-[#C0C0C0]/20" size={64} />
          <div className="min-h-[260px] relative">
            {testimonials.map((t, i) => (
              <div
                key={`testimonial-${t.name}`}
                className={`transition-opacity duration-700 ${idx === i ? 'opacity-100 relative' : 'opacity-0 absolute inset-0 pointer-events-none'}`}
              >
                <p className="text-[#C0C0C0] text-[18px] leading-[1.7] mb-8 italic">
                  &ldquo;{t.text}&rdquo;
                </p>
                <div className="border-l-2 border-[#C0C0C0] pl-4">
                  <div className="text-[#C0C0C0] font-bold text-[15px] tracking-wide">{t.name}</div>
                  <div className="text-[#888888] text-[13px]">{t.role}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-4 mt-10">
            <button
              onClick={prev}
              className="w-11 h-11 border border-[#C0C0C0]/20 hover:bg-[#C0C0C0] hover:border-[#C0C0C0] hover:text-[#0a0a0a] text-[#C0C0C0] transition-all flex items-center justify-center"
              aria-label="Previous"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={next}
              className="w-11 h-11 border border-[#C0C0C0]/20 hover:bg-[#C0C0C0] hover:border-[#C0C0C0] hover:text-[#0a0a0a] text-[#C0C0C0] transition-all flex items-center justify-center"
              aria-label="Next"
            >
              <ChevronRight size={18} />
            </button>
            <div className="flex gap-2 ml-3">
              {testimonials.map((t, i) => (
                <button
                  key={`dot-${t.name}`}
                  onClick={() => setIdx(i)}
                  className={`h-1 transition-all ${idx === i ? 'w-8 bg-[#C0C0C0]' : 'w-4 bg-[#C0C0C0]/25'}`}
                  aria-label={`Slide ${i+1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
