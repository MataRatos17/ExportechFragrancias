import React, { useEffect, useRef, useState } from 'react';
import { stats } from '../data/mock';

const CountUp = ({ end, prefix = '', suffix = '', visible }) => {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    if (!visible) {
      setCount(0);
      return undefined;
    }
    
    const duration = 2000; // Aumentei ligeiramente para ser mais suave
    const stepTime = 30;
    const steps = duration / stepTime;
    const increment = end / steps;
    let current = 0;
    
    const timer = setInterval(() => {
      current += increment;
      if (current >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, stepTime);
    
    return () => clearInterval(timer);
  }, [end, visible]);
  
  return <span>{prefix}{count.toLocaleString()}{suffix}</span>;
};

const Stats = () => {
  const [visible, setVisible] = useState(false);
  const gridRef = useRef(null);

  useEffect(() => {
    const node = gridRef.current;
    if (!node) return undefined;
    
    const obs = new IntersectionObserver(
      ([entry]) => {
        setVisible(entry.isIntersecting);
      },
      { threshold: 0.2 } 
    );
    
    obs.observe(node);
    return () => obs.disconnect();
  }, []);

  return (
    <section className="bg-[#0a0a0a] py-24 px-6 overflow-x-hidden">
      <div className="max-w-[1400px] mx-auto">
        <div className="text-center mb-20">
          <h2 className="font-display text-[#C0C0C0] text-[42px] md:text-[56px] font-black uppercase leading-[0.95] tracking-tight">
            Transforme a Experiência<br />do seu Cliente
          </h2>
        </div>

        {/* Grid ajustado para centralizar os itens caso não ocupem as 4 colunas */}
        <div 
          ref={gridRef} 
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 justify-center justify-items-center"
        >
          {stats.map((s, index) => {
            const isLeft = index < 2;
            
            const animationClass = visible 
              ? 'translate-x-0 opacity-100 scale-100' 
              : isLeft 
                ? '-translate-x-20 opacity-0 scale-90' 
                : 'translate-x-20 opacity-0 scale-90'; 

            return (
              <div
                key={s.title}
                className={`
                  ${s.isGold ? 'bg-[#D8AF73]' : 'bg-[#141414]'} 
                  border border-[#C0C0C0]/10 
                  rounded-full aspect-square w-full max-w-[300px] 
                  flex flex-col items-center justify-center
                  px-10 text-center 
                  transition-all duration-1000 ease-out
                  ${animationClass}
                `}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div className={`font-display text-[48px] md:text-[56px] font-black leading-none mb-4 ${s.isGold ? 'text-black' : 'text-[#C0C0C0]'}`}>
                  <CountUp end={s.value} prefix={s.prefix || ''} suffix={s.suffix || ''} visible={visible} />
                </div>

                <h3 className={`text-[13px] md:text-[14px] tracking-[0.2em] font-bold uppercase mb-3 ${s.isGold ? 'text-black' : 'text-[#C0C0C0]'}`}>
                  {s.title}
                </h3>

                <p className={`text-[12px] md:text-[13px] font-bold leading-relaxed max-w-[200px] ${s.isGold ? 'text-black/80' : 'text-[#888888]'}`}>
                  {s.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Stats;