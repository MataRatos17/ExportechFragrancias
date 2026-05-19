import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, ShoppingCart, Heart, Wind, Sparkles, Clock, MapPin, ChevronRight } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import FloatingChat from '../components/FloatingChat';
import { fragrancias } from '../data/mock';
import { useToast } from '../hooks/use-toast';

const intensidadeLabel = ['', 'Muito Leve', 'Leve', 'Moderada', 'Intensa', 'Muito Intensa'];
const familiaColor = { Oriental:'#D8AF73', Fresco:'#C0C0C0', Amadeirado:'#B49838', Floral:'#D8AF73', Cítrico:'#B49838' };

/* ── Pyramid of notes ── */
const NotesPyramid = ({ notas, label, icon, delay = 0 }) => (
  <div className="flex-1 text-center" style={{ animation: `fade-in-up 0.6s ease ${delay}ms both` }}>
    <div className="text-[10px] tracking-[0.25em] font-bold uppercase mb-3" style={{ color: '#D8AF73' }}>
      {icon} {label}
    </div>
    <div className="flex flex-wrap justify-center gap-1.5">
      {notas.map(n => (
        <span key={n}
          className="text-[12px] text-[#C0C0C0] border border-[#C0C0C0]/20 px-3 py-1.5 rounded-full">
          {n}
        </span>
      ))}
    </div>
  </div>
);

/* ── Intensity bar ── */
const IntensityBar = ({ value }) => (
  <div className="flex items-center gap-3">
    <div className="flex gap-1">
      {[1,2,3,4,5].map(i => (
        <div key={i} className="h-2 w-8 rounded-full transition-all"
          style={{ background: i <= value ? 'linear-gradient(90deg,#B49838,#D8AF73)' : 'rgba(192,192,192,0.15)' }} />
      ))}
    </div>
    <span className="text-[#888888] text-[12px]">{intensidadeLabel[value]}</span>
  </div>
);

const FragranciaDetalhe = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [qty, setQty] = useState(1);
  const [wished, setWished] = useState(false);

  const frag = fragrancias.find(f => f.id === id);
  if (!frag) return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
      <div className="text-center">
        <p className="text-[#888888] text-[18px] mb-4">Fragrância não encontrada.</p>
        <Link to="/fragrancias" className="text-[#D8AF73] hover:text-[#C0C0C0]">← Voltar às fragrâncias</Link>
      </div>
    </div>
  );

  const outros = fragrancias.filter(f => f.id !== id && f.category === frag.category).slice(0, 3);
  const accentColor = familiaColor[frag.category] || '#D8AF73';

  const addCart = () => toast({ title: 'Adicionado ao carrinho', description: `${qty}× ${frag.name} adicionado.` });

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <Header />

      {/* ── Breadcrumb ── */}
      <div className="bg-[#050505] pt-36 pb-4 px-6 border-b border-[#C0C0C0]/10">
        <div className="max-w-[1400px] mx-auto flex items-center gap-2 text-[12px] text-[#888888]">
          <Link to="/" className="hover:text-[#D8AF73] transition-colors">Início</Link>
          <ChevronRight size={12} />
          <Link to="/fragrancias" className="hover:text-[#D8AF73] transition-colors">Fragrâncias</Link>
          <ChevronRight size={12} />
          <span className="text-[#C0C0C0]">{frag.name}</span>
        </div>
      </div>

      {/* ── Main product section ── */}
      <section className="bg-[#0a0a0a] py-16 px-6">
        <div className="max-w-[1400px] mx-auto grid lg:grid-cols-2 gap-16 items-start">

          {/* ── LEFT: Image ── */}
          <div className="sticky top-32">
            <div className="relative bg-[#141414] border border-[#C0C0C0]/10 overflow-hidden aspect-square">
              <img src={frag.image} alt={frag.name}
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" />

              {/* Tag */}
              {frag.tag && (
                <span className="absolute top-5 left-5 text-[11px] tracking-[0.2em] font-bold uppercase px-4 py-2 text-[#0a0a0a]"
                  style={{ background: 'linear-gradient(90deg,#B49838,#D8AF73)' }}>
                  {frag.tag}
                </span>
              )}

              {/* Family colour stripe */}
              <div className="absolute bottom-0 left-0 right-0 h-1"
                style={{ background: `linear-gradient(90deg, ${accentColor}, transparent)` }} />
            </div>

            {/* Volume info */}
            <div className="mt-4 flex gap-3">
              {['100 ml', '250 ml', '500 ml'].map(v => (
                <button key={v}
                  className="flex-1 py-2 text-[12px] tracking-wider font-bold border transition-colors text-[#C0C0C0]"
                  style={{ borderColor: v === frag.volume ? accentColor : 'rgba(192,192,192,0.15)',
                    color: v === frag.volume ? accentColor : undefined }}>
                  {v}
                </button>
              ))}
            </div>
          </div>

          {/* ── RIGHT: Details ── */}
          <div>
            {/* Category + family */}
            <div className="flex items-center gap-2 mb-4">
              <span className="w-2 h-2 rounded-full" style={{ background: accentColor }} />
              <span className="text-[11px] tracking-[0.3em] font-bold uppercase" style={{ color: accentColor }}>
                {frag.category} · {frag.familia}
              </span>
            </div>

            <h1 className="font-display text-[#C0C0C0] text-[48px] md:text-[60px] font-black uppercase leading-[0.92] tracking-tight mb-2">
              {frag.name}
            </h1>
            <p className="text-[#888888] text-[16px] italic mb-6">{frag.subtitle}</p>

            <p className="font-black text-[36px] mb-8" style={{ color: '#D8AF73' }}>{frag.price}</p>

            {/* Short desc */}
            <p className="text-[#888888] text-[15px] leading-[1.8] mb-8">{frag.descLonga}</p>

            {/* Specs row */}
            <div className="grid grid-cols-2 gap-4 mb-10">
              {[
                { Icon: Clock, label: 'Duração', value: frag.duracao },
                { Icon: Wind, label: 'Intensidade', isIntensity: true },
                { Icon: Sparkles, label: 'Acordes', value: frag.acordes.join(', ') },
                { Icon: MapPin, label: 'Ideal para', value: frag.espacos[0] + ` +${frag.espacos.length - 1}` },
              ].map(({ Icon, label, value, isIntensity }) => (
                <div key={label} className="bg-[#141414] border border-[#C0C0C0]/10 p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Icon size={14} style={{ color: '#D8AF73' }} />
                    <span className="text-[10px] tracking-[0.22em] font-bold uppercase text-[#888888]">{label}</span>
                  </div>
                  {isIntensity
                    ? <IntensityBar value={frag.intensidade} />
                    : <p className="text-[#C0C0C0] text-[13px] font-semibold">{value}</p>
                  }
                </div>
              ))}
            </div>

            {/* Mood tags */}
            <div className="mb-10">
              <p className="text-[11px] tracking-[0.25em] font-bold uppercase text-[#888888] mb-3">Atmosfera</p>
              <div className="flex flex-wrap gap-2">
                {frag.humor.map(h => (
                  <span key={h} className="text-[11px] tracking-[0.15em] font-bold uppercase px-3 py-1.5 border border-[#C0C0C0]/15 text-[#888888]">
                    {h}
                  </span>
                ))}
              </div>
            </div>

            {/* Add to cart */}
            <div className="flex gap-3">
              <div className="flex items-center border border-[#C0C0C0]/20">
                <button onClick={() => setQty(q => Math.max(1, q-1))}
                  className="w-11 h-12 flex items-center justify-center text-[#C0C0C0] hover:text-[#D8AF73] transition-colors text-[18px]">
                  −
                </button>
                <span className="w-10 text-center text-[#C0C0C0] font-bold">{qty}</span>
                <button onClick={() => setQty(q => q+1)}
                  className="w-11 h-12 flex items-center justify-center text-[#C0C0C0] hover:text-[#D8AF73] transition-colors text-[18px]">
                  +
                </button>
              </div>
              <button onClick={addCart}
                className="flex-1 inline-flex items-center justify-center gap-2 py-3.5 text-[12px] tracking-[0.22em] font-bold uppercase text-[#0a0a0a] hover:opacity-90 transition-opacity"
                style={{ background: 'linear-gradient(90deg,#B49838,#D8AF73)' }}>
                <ShoppingCart size={15} />
                Adicionar ao Carrinho
              </button>
              <button onClick={() => { setWished(w => !w); toast({ title: wished ? 'Removido da lista' : 'Adicionado à lista de desejos' }); }}
                className="w-12 h-12 flex items-center justify-center border transition-colors"
                style={{ borderColor: wished ? '#D8AF73' : 'rgba(192,192,192,0.2)', color: wished ? '#D8AF73' : '#888888' }}>
                <Heart size={16} fill={wished ? '#D8AF73' : 'none'} />
              </button>
            </div>

            {/* Spaces */}
            <div className="mt-8 pt-8 border-t border-[#C0C0C0]/10">
              <p className="text-[11px] tracking-[0.25em] font-bold uppercase text-[#888888] mb-3">Espaços recomendados</p>
              <div className="flex flex-wrap gap-2">
                {frag.espacos.map(e => (
                  <span key={e} className="text-[12px] text-[#C0C0C0] bg-[#141414] border border-[#C0C0C0]/10 px-3 py-1.5">
                    {e}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Notes Pyramid ── */}
      <section className="bg-[#141414] py-20 px-6 border-t border-[#C0C0C0]/10">
        <div className="max-w-[1100px] mx-auto">
          <div className="text-center mb-12">
            <p className="text-[11px] tracking-[0.3em] font-bold uppercase mb-3" style={{ color: '#D8AF73' }}>Composição Olfativa</p>
            <h2 className="font-display text-[#C0C0C0] text-[32px] md:text-[42px] font-black uppercase tracking-tight">
              Pirâmide de Notas
            </h2>
          </div>

          {/* Visual pyramid */}
          <div className="relative mb-12">
            {/* Pyramid shape */}
            <div className="flex flex-col items-center gap-4">
              {/* Topo */}
              <div className="w-full max-w-[320px] bg-[#0a0a0a] border border-[#C0C0C0]/10 p-6 text-center relative">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 text-[10px] tracking-[0.3em] font-bold uppercase px-3 py-1"
                  style={{ background: '#D8AF73', color: '#0a0a0a' }}>
                  NOTAS DE TOPO
                </div>
                <p className="text-[11px] text-[#888888] mb-1 mt-2">Primeira impressão · 15–30 min</p>
                <div className="flex flex-wrap justify-center gap-2 mt-3">
                  {frag.notasTopo.map(n => (
                    <span key={n} className="text-[#C0C0C0] text-[13px] font-semibold">{n}</span>
                  ))}
                </div>
              </div>

              {/* Coração */}
              <div className="w-full max-w-[480px] bg-[#0a0a0a] border border-[#C0C0C0]/10 p-6 text-center relative">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 text-[10px] tracking-[0.3em] font-bold uppercase px-3 py-1"
                  style={{ background: '#B49838', color: '#0a0a0a' }}>
                  NOTAS DE CORAÇÃO
                </div>
                <p className="text-[11px] text-[#888888] mb-1 mt-2">O corpo · 30 min a 4 horas</p>
                <div className="flex flex-wrap justify-center gap-2 mt-3">
                  {frag.notasCoracao.map(n => (
                    <span key={n} className="text-[#C0C0C0] text-[13px] font-semibold">{n}</span>
                  ))}
                </div>
              </div>

              {/* Base */}
              <div className="w-full bg-[#0a0a0a] border border-[#C0C0C0]/10 p-6 text-center relative">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 text-[10px] tracking-[0.3em] font-bold uppercase px-3 py-1 text-[#0a0a0a]"
                  style={{ background: 'linear-gradient(90deg,#B49838,#D8AF73)' }}>
                  NOTAS DE BASE
                </div>
                <p className="text-[11px] text-[#888888] mb-1 mt-2">A alma · 4+ horas</p>
                <div className="flex flex-wrap justify-center gap-3 mt-3">
                  {frag.notasBase.map(n => (
                    <span key={n} className="text-[#C0C0C0] text-[13px] font-semibold">{n}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Acordes */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {frag.acordes.map((a, i) => (
              <div key={a} className="bg-[#0a0a0a] border border-[#C0C0C0]/10 p-4 text-center">
                <div className="w-2 h-2 rounded-full mx-auto mb-2"
                  style={{ background: i % 2 === 0 ? '#D8AF73' : '#B49838' }} />
                <p className="text-[#C0C0C0] text-[12px] font-bold uppercase tracking-wider">{a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Related ── */}
      {outros.length > 0 && (
        <section className="bg-[#0a0a0a] py-20 px-6 border-t border-[#C0C0C0]/10">
          <div className="max-w-[1400px] mx-auto">
            <div className="flex items-end justify-between mb-10">
              <div>
                <p className="text-[11px] tracking-[0.3em] font-bold uppercase mb-2" style={{ color: '#D8AF73' }}>
                  Família {frag.category}
                </p>
                <h2 className="font-display text-[#C0C0C0] text-[28px] md:text-[36px] font-black uppercase tracking-tight">
                  Também pode gostar
                </h2>
              </div>
              <Link to="/fragrancias"
                className="hidden sm:flex items-center gap-2 text-[12px] tracking-[0.2em] font-bold uppercase transition-colors text-[#888888] hover:text-[#D8AF73]">
                Ver todas <ArrowRight size={14} />
              </Link>
            </div>

            <div className="grid sm:grid-cols-3 gap-5">
              {outros.map(f => (
                <Link key={f.id} to={`/fragrancias/${f.id}`}
                  className="group bg-[#141414] border border-[#C0C0C0]/10 overflow-hidden hover:border-[#D8AF73]/35 transition-all duration-300 block">
                  <div className="aspect-square overflow-hidden">
                    <img src={f.image} alt={f.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  </div>
                  <div className="p-5">
                    <p className="text-[10px] tracking-[0.22em] font-bold uppercase mb-1" style={{ color: accentColor }}>{f.category}</p>
                    <h3 className="text-[#C0C0C0] text-[16px] font-black uppercase tracking-tight mb-1">{f.name}</h3>
                    <p className="font-black text-[18px]" style={{ color: '#D8AF73' }}>{f.price}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── CTA ── */}
      <section className="bg-[#050505] py-16 px-6 border-t border-[#C0C0C0]/10">
        <div className="max-w-[900px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <p className="text-[#C0C0C0] font-bold text-[15px] mb-1">Quer uma fragrância exclusiva para a sua marca?</p>
            <p className="text-[#888888] text-[14px]">Desenvolvemos composições 100% personalizadas.</p>
          </div>
          <Link to="/contactos"
            className="flex-shrink-0 inline-flex items-center gap-2 px-8 py-3.5 text-[12px] tracking-[0.22em] font-bold uppercase text-[#0a0a0a] hover:opacity-90 transition-opacity"
            style={{ background: 'linear-gradient(90deg,#B49838,#D8AF73)' }}>
            Pedir Orçamento <ArrowRight size={14} />
          </Link>
        </div>
      </section>

      <Footer />
      <FloatingChat />
    </div>
  );
};

export default FragranciaDetalhe;
