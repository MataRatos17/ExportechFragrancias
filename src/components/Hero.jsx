import React, { useState, useEffect, useCallback } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { heroSlides } from '../data/mock';

const Hero = () => {
  const [current, setCurrent] = useState(0);
  const [prev, setPrev]       = useState(null);
  const [animating, setAnimating] = useState(false);
  const total = heroSlides.length;

  const goTo = useCallback((idx) => {
    if (animating) return;
    setPrev(current);
    setCurrent(idx);
    setAnimating(true);
    setTimeout(() => { setPrev(null); setAnimating(false); }, 900);
  }, [current, animating]);

  const next = useCallback(() => goTo((current + 1) % total), [goTo, current, total]);
  const goBack = useCallback(() => goTo((current - 1 + total) % total), [goTo, current, total]);

  useEffect(() => {
    const t = setInterval(next, 6000);
    return () => clearInterval(t);
  }, [next]);

  const slide = heroSlides[current];

  return (
    <section className="relative w-full h-[100vh] min-h-[680px] overflow-hidden">

      {/* ── Slides ── */}
      {heroSlides.map((s, i) => (
        <div
          key={i}
          className="absolute inset-0 bg-cover bg-center transition-opacity"
          style={{
            backgroundImage: `url(${s.image})`,
            opacity: i === current ? 1 : i === prev ? 0 : 0,
            transition: 'opacity 0.9s ease-in-out',
            zIndex: i === current ? 2 : i === prev ? 1 : 0,
          }}
        />
      ))}

      {/* ── Overlay gradiente ── */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-transparent z-10" />

      {/* ── Conteúdo ── */}
      <div className="relative z-20 max-w-[1400px] mx-auto px-6 h-full flex flex-col justify-center pt-32">
        <div
          key={current}
          className="max-w-2xl animate-fade-in-up"
        >
          <p className="text-[#D8AF73] text-[13px] tracking-[0.28em] font-semibold mb-6 uppercase">
            {slide.label}
          </p>
          <h1 className="font-display text-[#C0C0C0] text-[54px] md:text-[78px] leading-[0.95] font-black uppercase tracking-tight mb-10 whitespace-pre-line">
            {slide.title}
          </h1>
          {slide.href.startsWith('/') ? (
            <Link
              to={slide.href}
              className="inline-flex items-center gap-3 bg-[#C0C0C0] hover:bg-[#B49838] text-[#0a0a0a] px-9 py-4 text-[12px] tracking-[0.25em] font-bold uppercase transition-all duration-300 hover:gap-5 group"
            >
              {slide.cta}
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </Link>
          ) : (
            <a
              href={slide.href}
              className="inline-flex items-center gap-3 bg-[#C0C0C0] hover:bg-[#B49838] text-[#0a0a0a] px-9 py-4 text-[12px] tracking-[0.25em] font-bold uppercase transition-all duration-300 hover:gap-5 group"
            >
              {slide.cta}
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </a>
          )}
        </div>
      </div>

      {/* ── Controlos laterais ── */}
      <button
        onClick={goBack}
        aria-label="Anterior"
        className="absolute left-5 top-1/2 -translate-y-1/2 z-30 w-11 h-11 border border-[#C0C0C0]/25 hover:border-[#D8AF73] hover:bg-[#D8AF73]/15 text-[#C0C0C0] hover:text-[#D8AF73] flex items-center justify-center transition-all"
      >
        <ChevronLeft size={20} />
      </button>
      <button
        onClick={next}
        aria-label="Próximo"
        className="absolute right-5 top-1/2 -translate-y-1/2 z-30 w-11 h-11 border border-[#C0C0C0]/25 hover:border-[#D8AF73] hover:bg-[#D8AF73]/15 text-[#C0C0C0] hover:text-[#D8AF73] flex items-center justify-center transition-all"
      >
        <ChevronRight size={20} />
      </button>

      {/* ── Dots ── */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 flex items-center gap-3">
        {heroSlides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Slide ${i + 1}`}
            className="transition-all duration-500"
            style={{
              width:  i === current ? '2rem' : '0.75rem',
              height: '3px',
              background: i === current ? '#D8AF73' : 'rgba(192,192,192,0.35)',
            }}
          />
        ))}
      </div>

      {/* ── Scroll indicator ── */}
      <div className="absolute bottom-8 right-8 z-30 hidden lg:flex flex-col items-center gap-2">
        <div className="w-[2px] h-12 bg-[#C0C0C0]/20 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1/2 bg-[#D8AF73] animate-scroll-indicator" />
        </div>
      </div>

      {/* ── Slide counter ── */}
      <div className="absolute top-1/2 right-8 -translate-y-1/2 z-30 hidden lg:flex flex-col items-center gap-3">
        <span className="text-[#D8AF73] font-black text-[22px] leading-none">
          {String(current + 1).padStart(2, '0')}
        </span>
        <div className="w-px h-10 bg-[#C0C0C0]/20" />
        <span className="text-[#888888] text-[14px] leading-none">
          {String(total).padStart(2, '0')}
        </span>
      </div>
    </section>
  );
};

export default Hero;
