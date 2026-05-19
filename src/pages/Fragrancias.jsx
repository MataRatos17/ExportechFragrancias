import React, { useState, useMemo } from 'react';
import { ArrowRight, ShoppingCart, Heart, SlidersHorizontal, Wind } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import FloatingChat from '../components/FloatingChat';
import { fragrancias } from '../data/mock';
import { useToast } from '../hooks/use-toast';

const tagColor = {
  'Mais Vendida': 'bg-[#D8AF73] text-[#0a0a0a]',
  'Novo':         'bg-[#C0C0C0] text-[#0a0a0a]',
  'Destaque':     'bg-[#B49838]/20 text-[#D8AF73]',
};
const familiaColor = {
  Oriental: '#D8AF73', Fresco: '#C0C0C0', Amadeirado: '#B49838',
  Floral: '#D8AF73', Cítrico: '#B49838', default: '#C0C0C0',
};
const familias   = ['Todas', ...Array.from(new Set(fragrancias.map(f => f.category)))];
const ordenacoes = [
  { label: 'Destaque',     fn: () => 0 },
  { label: 'Preço: Menor', fn: (a, b) => a.priceRaw - b.priceRaw },
  { label: 'Preço: Maior', fn: (a, b) => b.priceRaw - a.priceRaw },
  { label: 'Nome A–Z',     fn: (a, b) => a.name.localeCompare(b.name) },
];

/* ── Card with hover notes overlay ── */
const FragCard = ({ f }) => {
  const [hovered, setHovered] = useState(false);
  const { toast } = useToast();
  const accent = familiaColor[f.category] || familiaColor.default;

  return (
    <div
      className="group bg-[#141414] border border-[#C0C0C0]/10 overflow-hidden transition-all duration-300 flex flex-col"
      style={{ borderColor: hovered ? `${accent}40` : undefined }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image + hover overlay */}
      <div className="relative aspect-square overflow-hidden flex-shrink-0">
        <img
          src={f.image} alt={f.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
          style={{ transform: hovered ? 'scale(1.08)' : 'scale(1)' }}
        />

        {/* Tag */}
        {f.tag && (
          <span className={`absolute top-3 left-3 text-[10px] tracking-[0.2em] font-bold uppercase px-3 py-1.5 z-20 ${tagColor[f.tag]}`}>
            {f.tag}
          </span>
        )}

        {/* Wishlist */}
        <button
          onClick={e => { e.preventDefault(); toast({ title: 'Adicionado à lista de desejos' }); }}
          className="absolute top-3 right-3 z-20 w-9 h-9 rounded-full flex items-center justify-center text-[#C0C0C0] transition-all opacity-0 group-hover:opacity-100"
          style={{ background: 'rgba(10,10,10,0.75)', backdropFilter: 'blur(4px)' }}
          onMouseEnter={e => { e.currentTarget.style.background = '#D8AF73'; e.currentTarget.style.color = '#0a0a0a'; }}
          onMouseLeave={e => { e.currentTarget.style.background = 'rgba(10,10,10,0.75)'; e.currentTarget.style.color = '#C0C0C0'; }}
        >
          <Heart size={14} />
        </button>

        {/* ── HOVER NOTES OVERLAY ── */}
        <div
          className="absolute inset-0 z-10 flex flex-col justify-end p-5 transition-all duration-400"
          style={{
            background: 'linear-gradient(to top, rgba(5,5,5,0.97) 0%, rgba(5,5,5,0.85) 55%, rgba(5,5,5,0.4) 100%)',
            opacity: hovered ? 1 : 0,
            transform: hovered ? 'translateY(0)' : 'translateY(8px)',
          }}
        >
          {/* Family colour bar */}
          <div className="w-8 h-0.5 mb-4 rounded-full" style={{ background: accent }} />

          {/* Notes pyramid */}
          <div className="space-y-2.5">
            {[
              { tier: 'Topo',    notes: f.notasTopo },
              { tier: 'Coração', notes: f.notasCoracao },
              { tier: 'Base',    notes: f.notasBase },
            ].map(({ tier, notes }) => (
              <div key={tier} className="flex items-start gap-2">
                <span
                  className="text-[9px] tracking-[0.2em] font-bold uppercase mt-0.5 flex-shrink-0 w-14"
                  style={{ color: accent }}
                >
                  {tier}
                </span>
                <span className="text-[#C0C0C0] text-[11px] leading-tight">
                  {notes.join(' · ')}
                </span>
              </div>
            ))}
          </div>

          {/* View detail CTA */}
          <Link
            to={`/fragrancias/${f.id}`}
            className="mt-5 inline-flex items-center gap-2 text-[11px] tracking-[0.2em] font-bold uppercase transition-colors"
            style={{ color: accent }}
            onClick={e => e.stopPropagation()}
          >
            Ver detalhes <ArrowRight size={12} />
          </Link>
        </div>
      </div>

      {/* Card body */}
      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-center gap-2 mb-1.5">
          <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: accent }} />
          <p className="text-[10px] tracking-[0.22em] font-bold uppercase" style={{ color: accent }}>
            {f.category}
          </p>
        </div>

        <Link to={`/fragrancias/${f.id}`} className="block group/title mb-1">
          <h3 className="text-[#C0C0C0] text-[17px] font-black uppercase tracking-tight group-hover/title:text-[#D8AF73] transition-colors">
            {f.name}
          </h3>
        </Link>

        <div className="flex items-center gap-1.5 mb-2">
          <Wind size={11} style={{ color: '#D8AF73' }} className="flex-shrink-0" />
          <p className="text-[11px] italic" style={{ color: '#D8AF73' }}>{f.notas}</p>
        </div>

        <p className="text-[#888888] text-[12px] leading-relaxed mb-4 flex-1 line-clamp-2">{f.desc}</p>

        <div className="flex items-center justify-between mt-auto pt-3 border-t border-[#C0C0C0]/8">
          <p className="text-[#C0C0C0] text-[20px] font-black">{f.price}</p>
          <button
            onClick={() => toast({ title: 'Adicionado ao carrinho', description: `${f.name} adicionado.` })}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 text-[10px] tracking-[0.2em] font-bold uppercase text-[#0a0a0a] hover:opacity-85 transition-opacity"
            style={{ background: 'linear-gradient(90deg,#B49838,#D8AF73)' }}
          >
            <ShoppingCart size={12} />
            Adicionar
          </button>
        </div>
      </div>
    </div>
  );
};

const Fragrancias = () => {
  const [familia, setFamilia] = useState('Todas');
  const [order, setOrder]     = useState(0);

  const products = useMemo(() =>
    [...fragrancias]
      .filter(f => familia === 'Todas' || f.category === familia)
      .sort(ordenacoes[order].fn),
    [familia, order]
  );

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <Header />

      {/* ── Hero ── */}
      <section className="bg-[#050505] pt-44 pb-20 px-6 border-b border-[#C0C0C0]/10">
        <div className="max-w-[1400px] mx-auto">
          <p className="text-[13px] tracking-[0.3em] font-bold uppercase mb-5" style={{ color: '#D8AF73' }}>
            Aromatização
          </p>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div>
              <h1 className="font-display text-[#C0C0C0] text-[52px] md:text-[78px] font-black uppercase leading-[0.92] tracking-tight mb-5">
                Fragrâncias
              </h1>
              <p className="text-[#888888] text-[17px] leading-[1.8] max-w-2xl">
                Composições exclusivas desenvolvidas com mestres perfumistas. Passe o cursor sobre cada fragrância para descobrir as notas aromáticas.
              </p>
            </div>
            <Link to="/difusores"
              className="flex-shrink-0 inline-flex items-center gap-2 border border-[#C0C0C0]/20 hover:border-[#D8AF73]/60 text-[#C0C0C0] hover:text-[#D8AF73] px-6 py-3 text-[11px] tracking-[0.2em] font-bold uppercase transition-colors">
              Ver Difusores
            </Link>
          </div>
        </div>
      </section>

      {/* ── Filters ── */}
      <section className="bg-[#0a0a0a] py-8 px-6 border-b border-[#C0C0C0]/10">
        <div className="max-w-[1400px] mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2 flex-wrap">
            {familias.map(f => {
              const isActive = familia === f;
              const accent   = familiaColor[f] || familiaColor.default;
              return (
                <button key={f} onClick={() => setFamilia(f)}
                  className={`btn-pulse flex items-center gap-2 px-4 py-2 text-[11px] tracking-[0.18em] font-bold uppercase transition-all border ${isActive ? 'act' : ''}`}
                  style={{
                    backgroundColor: isActive ? `${accent}22` : 'transparent',
                    borderColor:     isActive ? accent : 'rgba(192,192,192,0.15)',
                    color:           isActive ? '#ffffff' : '#888888',
                  }}>
                  {f !== 'Todas' && <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: familiaColor[f] || '#C0C0C0' }} />}
                  {f}
                </button>
              );
            })}
          </div>
          <div className="flex items-center gap-3">
            <span className="text-[#888888] text-[12px] hidden sm:block">{products.length} fragrância{products.length !== 1 ? 's' : ''}</span>
            <div className="flex items-center gap-2 border border-[#C0C0C0]/15 px-3 py-2">
              <SlidersHorizontal size={13} className="text-[#888888]" />
              <select value={order} onChange={e => setOrder(Number(e.target.value))}
                className="bg-transparent text-[#C0C0C0] text-[11px] font-bold tracking-wider outline-none cursor-pointer">
                {ordenacoes.map((o, i) => <option key={o.label} value={i} className="bg-[#141414]">{o.label}</option>)}
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* ── Grid ── */}
      <section className="bg-[#0a0a0a] py-16 px-6">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {products.map(f => <FragCard key={f.id} f={f} />)}
          </div>
        </div>
      </section>

      {/* ── Identity strip ── */}
      <section className="bg-[#141414] py-20 px-6 border-t border-[#C0C0C0]/10">
        <div className="max-w-[1400px] mx-auto grid lg:grid-cols-2 gap-14 items-center">
          <div>
            <p className="text-[12px] tracking-[0.3em] font-bold uppercase mb-4" style={{ color: '#D8AF73' }}>
              Identidade Olfativa
            </p>
            <h2 className="font-display text-[#C0C0C0] text-[34px] md:text-[44px] font-black uppercase leading-[1] tracking-tight mb-6">
              Criamos a fragrância<br />
              <span style={{ color: '#D8AF73' }}>exclusiva da sua marca</span>
            </h2>
            <p className="text-[#888888] text-[15px] leading-[1.8] mb-8">
              Para além do catálogo, desenvolvemos fragrâncias personalizadas que se tornam a assinatura olfativa única do seu espaço.
            </p>
            <Link to="/contactos"
              className="inline-flex items-center gap-3 px-8 py-4 text-[12px] tracking-[0.25em] font-bold uppercase text-[#0a0a0a] hover:opacity-90 transition-opacity"
              style={{ background: 'linear-gradient(90deg,#B49838,#D8AF73)' }}>
              Pedir Orçamento <ArrowRight size={15} />
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { t: 'Ingredientes Naturais', d: 'Matérias-primas selecionadas nas melhores regiões produtoras do mundo.' },
              { t: 'Conformidade IFRA',     d: 'Todas as fragrâncias respeitam os standards internacionais de segurança.' },
              { t: 'Exclusividade Total',   d: 'A sua fragrância nunca será usada em nenhum outro cliente.' },
              { t: 'Recargas Ilimitadas',   d: 'Programa de recargas com entrega direta no seu espaço.' },
            ].map(({ t, d }) => (
              <div key={t} className="bg-[#0a0a0a] border border-[#C0C0C0]/10 p-5 hover:border-[#D8AF73]/30 transition-colors">
                <p className="text-[11px] tracking-[0.15em] font-bold uppercase mb-2" style={{ color: '#D8AF73' }}>{t}</p>
                <p className="text-[#888888] text-[12px] leading-relaxed">{d}</p>
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

export default Fragrancias;
