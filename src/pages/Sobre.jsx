import React, { useState, useEffect, useRef } from 'react';
import { Award, Leaf, Users, Sparkles, ArrowRight, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import FloatingChat from '../components/FloatingChat';

// --- DADOS (Constantes) ---
const values = [
  { Icon: Sparkles, title: 'Excelência Olfativa', desc: 'Fragrâncias exclusivas desenvolvidas com mestres perfumistas internacionais.' },
  { Icon: Leaf, title: 'Sustentabilidade', desc: 'Compromisso com ingredientes naturais e embalagens eco-responsáveis.' },
  { Icon: Users, title: 'Proximidade', desc: 'Acompanhamento dedicado e personalizado em cada projeto e parceria.' },
  { Icon: Award, title: 'Qualidade Certificada', desc: 'Standards rigorosos certificados ISO em toda a cadeia produtiva.' },
];

const milestones = [
  { year: '2008', title: 'Fundação', desc: 'Nascemos em Matosinhos com a missão de transformar espaços através do olfato.' },
  { year: '2012', title: 'Expansão Nacional', desc: 'Abertura do showroom em Batalha e alcance a todo o território continental.' },
  { year: '2016', title: 'Certificação ISO', desc: 'Obtemos certificação ISO, reforçando o nosso compromisso com a qualidade.' },
  { year: '2019', title: '500 Clientes', desc: 'Ultrapassamos os 500 clientes activos em sectores como hotelaria, retalho e saúde.' },
  { year: '2022', title: 'Linha Premium', desc: 'Lançamento da linha de fragrâncias exclusivas desenvolvidas com perfumistas de Grasse.' },
  { year: '2024', title: 'Internacionalização', desc: 'Primeiros parceiros em Espanha e no Brasil, levando a nossa essência além-fronteiras.' },
];

const team = [
  { name: 'Ricardo Oliveira', role: 'CEO & Fundador', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80' },
  { name: 'Ana Ferreira', role: 'Directora Criativa', img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80' },
  { name: 'João Mendes', role: 'Director Comercial', img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80' },
  { name: 'Sofia Pinto', role: 'Gestora de Projetos', img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=400&q=80' },
];

const certs = [
  { code: 'ISO 9001', label: 'Gestão da Qualidade' },
  { code: 'ISO 14001', label: 'Gestão Ambiental' },
  { code: 'IFRA', label: 'Segurança de Fragrâncias' },
  { code: 'PT 2030', label: 'Programa de Financiamento' },
];

// --- COMPONENTE DE CONTAGEM ---
const CountUp = ({ end, visible }) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!visible) { setCount(0); return; }
    let start = 0;
    const duration = 2000;
    const increment = end / (duration / 30);
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 30);
    return () => clearInterval(timer);
  }, [end, visible]);
  return <span>{count}</span>;
};

const Sobre = () => {
  const [heroVisible, setHeroVisible] = useState(false);
  const [statsVisible, setStatsVisible] = useState(false);
  const [historyVisible, setHistoryVisible] = useState(false);
  const [valuesVisible, setValuesVisible] = useState(false);

  const heroRef = useRef(null);
  const statsRef = useRef(null);
  const historyRef = useRef(null);
  const valuesRef = useRef(null);

  useEffect(() => {
    const options = { threshold: 0.15 };
    
    const createObs = (setVis) => new IntersectionObserver(([entry]) => {
        setVis(entry.isIntersecting);
    }, options);

    const hObs = createObs(setHeroVisible);
    const sObs = createObs(setStatsVisible);
    const hiObs = createObs(setHistoryVisible);
    const vObs = createObs(setValuesVisible);

    if (heroRef.current) hObs.observe(heroRef.current);
    if (statsRef.current) sObs.observe(statsRef.current);
    if (historyRef.current) hiObs.observe(historyRef.current);
    if (valuesRef.current) vObs.observe(valuesRef.current);

    return () => { 
        hObs.disconnect(); 
        sObs.disconnect(); 
        hiObs.disconnect(); 
        vObs.disconnect();
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a0a] overflow-x-hidden">
      <Header />

      {/* ── HERO ── */}
      <section ref={heroRef} className="relative bg-[#050505] pt-44 pb-0 overflow-hidden border-b border-[#C0C0C0]/10">
        <div className="max-w-[1400px] mx-auto px-6 grid lg:grid-cols-2 gap-0 items-end">
          <div className={`pb-20 transition-all duration-1000 ease-out ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <p className="text-[#D8AF73] text-[13px] tracking-[0.3em] font-bold uppercase mb-5">Quem Somos</p>
            <h1 className="font-display text-[#C0C0C0] text-[52px] md:text-[78px] font-black uppercase leading-[0.92] tracking-tight mb-8">
              A arte de<br /> <span className="text-[#C0C0C0]">aromatizar</span><br /> espaços
            </h1>
            <p className="text-[#888888] text-[17px] leading-[1.8] max-w-xl mb-10">
              Somos especialistas em marketing olfativo desde 2008. Criamos identidades olfativas exclusivas para marcas que procuram transformar a experiência dos seus clientes.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/contactos" className="inline-flex items-center gap-3 bg-[#C0C0C0] hover:bg-[#B49838] text-[#0a0a0a] px-8 py-4 text-[12px] tracking-[0.25em] font-bold uppercase transition-all group">
                Fale Connosco <ArrowRight size={15} />
              </Link>
            </div>
          </div>
          <div className={`hidden lg:block h-[560px] relative transition-all duration-1000 delay-300 ${heroVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
            <img src="https://images.unsplash.com/photo-1608571424634-58ae03e6edcf?auto=format&fit=crop&w=900&q=80" alt="Atelier" className="w-full h-full object-cover" />
          </div>
        </div>
      </section>

      {/* ── STATS ANIMADAS ── */}
      <section ref={statsRef} className="bg-[#141414] py-16 px-6 border-b border-[#C0C0C0]/10">
        <div className="max-w-[1400px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { n: 500, prefix: '+', label: 'Clientes Activos', color: 'text-[#C0C0C0]' },
            { n: 15, prefix: '+', label: 'Anos de Mercado', color: 'text-[#D8AF73]' }, 
            { n: 3, prefix: '', label: 'Espaços em Portugal', color: 'text-[#D8AF73]' }, 
            { n: 50, prefix: '+', label: 'Fragrâncias Exclusivas', color: 'text-[#C0C0C0]' },
          ].map((item, idx) => (
            <div key={item.label} 
              className={`text-center py-6 border border-[#C0C0C0]/10 transition-all duration-700 ${statsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              style={{ transitionDelay: statsVisible ? `${idx * 150}ms` : '0ms' }}
            >
              <p className={`font-display ${item.color} text-[48px] font-black leading-none mb-2`}>
                {item.prefix}<CountUp end={item.n} visible={statsVisible} />
              </p>
              <p className="text-[#D8AF73] text-[12px] tracking-[0.2em] font-bold uppercase">{item.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── HISTÓRIA ── */}
      <section ref={historyRef} className="bg-[#0a0a0a] py-24 px-6">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center mb-16">
            <p className={`text-[#C0C0C0] text-[12px] tracking-[0.3em] font-bold uppercase mb-4 transition-all duration-700 ${historyVisible ? 'opacity-100' : 'opacity-0'}`}>A Nossa História</p>
            <h2 className={`font-display text-[#C0C0C0] text-[38px] md:text-[52px] font-black uppercase leading-[1] tracking-tight transition-all duration-700 delay-100 ${historyVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
              Mais de uma década a<br /><span className="text-[#C0C0C0]">criar memórias olfativas</span>
            </h2>
          </div>
          <div className="relative">
            <div className={`absolute left-1/2 -translate-x-px top-0 bottom-0 w-px bg-[#C0C0C0]/15 hidden md:block transition-all duration-1000 ${historyVisible ? 'opacity-100' : 'opacity-0'}`} />
            <div className="space-y-12">
              {milestones.map(({ year, title, desc }, i) => (
                <div key={year} className={`relative grid md:grid-cols-2 gap-6 md:gap-16 items-center ${i % 2 === 0 ? '' : 'md:[&>*:first-child]:order-last'}`}>
                  
                  <div className={`bg-[#141414] border border-[#C0C0C0]/10 p-8 transition-all duration-1000 ease-out 
                    ${historyVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}
                    ${i % 2 !== 0 ? 'md:text-right' : ''}`}
                    style={{ transitionDelay: historyVisible ? `${(i * 200) + 600}ms` : '0ms' }}
                  >
                    <p className="text-[#C0C0C0] text-[11px] tracking-[0.3em] font-bold uppercase mb-2">{year}</p>
                    <h3 className="text-[#C0C0C0] text-[20px] font-black uppercase tracking-tight mb-2">{title}</h3>
                    <p className="text-[#888888] text-[14px] leading-relaxed">{desc}</p>
                  </div>

                  <div className={`hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-[#C0C0C0] rounded-full ring-4 ring-[#0a0a0a] z-10 transition-all duration-1000
                    ${historyVisible ? 'opacity-100 scale-100 rotate-0' : 'opacity-0 scale-0 rotate-180'}`}
                    style={{ transitionDelay: historyVisible ? `${i * 200}ms` : '0ms' }}
                  />
                  <div />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── VALORES ── */}
      <section ref={valuesRef} className="bg-[#141414] py-24 px-6 border-t border-[#C0C0C0]/10">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center mb-16">
            <p className={`text-[#D8AF73] text-[12px] tracking-[0.3em] font-bold uppercase mb-4 transition-all duration-700 ${valuesVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>Os Nossos Valores</p>
            <h2 className={`font-display text-[#C0C0C0] text-[38px] md:text-[52px] font-black uppercase leading-[1] tracking-tight transition-all duration-700 delay-100 ${valuesVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>Aquilo em que acreditamos</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map(({ Icon, title, desc }, idx) => (
              <div key={title} 
                className={`bg-[#0a0a0a] border border-[#C0C0C0]/10 p-9 transition-all duration-1000 transform hover:-translate-y-2 group
                ${valuesVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-12 scale-95'}`}
                style={{ transitionDelay: valuesVisible ? `${idx * 200}ms` : '0ms' }}
              >
                <div className="w-14 h-14 bg-[#C0C0C0]/10 text-[#C0C0C0] flex items-center justify-center mb-6 group-hover:bg-[#C0C0C0] group-hover:text-[#0a0a0a] transition-all duration-500">
                  <Icon size={26} className={`${valuesVisible ? 'rotate-0' : 'rotate-45'} transition-transform duration-1000 delay-500`} />
                </div>
                <h3 className="font-display text-[#C0C0C0] text-[18px] font-black uppercase tracking-tight mb-3">{title}</h3>
                <p className="text-[#888888] text-[14px] leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* ── CERTIFICAÇÕES ── */}
      <section className="bg-[#0a0a0a] py-24 px-6 border-t border-[#C0C0C0]/10">
        <div className="max-w-[1400px] mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-[#D8AF73] text-[12px] tracking-[0.3em] font-bold uppercase mb-4">Certificações</p>
            <h2 className="font-display text-[#C0C0C0] text-[38px] md:text-[48px] font-black uppercase leading-[1] tracking-tight mb-6">Qualidade certificada</h2>
            <p className="text-[#888888] text-[16px] leading-[1.8] mb-8">Elevados padrões de segurança e responsabilidade ambiental.</p>
            <div className="space-y-3">
              {['Seguro para humanos e animais', 'REACH Compliance', 'Rastreabilidade total'].map(p => (
                <div key={p} className="flex items-center gap-3 text-[#C0C0C0] text-[14px]">
                  <CheckCircle size={16} className="text-[#C0C0C0]" /> {p}
                </div>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {certs.map(({ code, label }) => (
              <div key={code} className="bg-[#0a0a0a] border border-[#C0C0C0]/15 p-8 text-center hover:border-[#C0C0C0] transition-colors duration-500">
                <p className="font-display text-[#C0C0C0] text-[22px] font-black mb-2">{code}</p>
                <p className="text-[#888888] text-[12px] tracking-[0.15em] uppercase">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
      <FloatingChat />
    </div>
  );
};

export default Sobre;