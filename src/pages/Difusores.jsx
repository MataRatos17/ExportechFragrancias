import React, { useState, useMemo } from 'react';
import { ArrowRight, ShoppingCart, Heart, CheckCircle, SlidersHorizontal } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import FloatingChat from '../components/FloatingChat';
import { difusores } from '../data/mock';
import { useToast } from '../hooks/use-toast';

const tagColor = {
  'Mais Vendido': 'bg-[#D8AF73] text-[#0a0a0a]',
  'Novo':         'bg-[#C0C0C0] text-[#0a0a0a]',
  'Destaque':     'bg-[#B49838]/20 text-[#D8AF73]',
};

const categorias = ['Todos', ...Array.from(new Set(difusores.map(d => d.category)))];
const ordenacoes = [
  { label: 'Destaque',     fn: () => 0 },
  { label: 'Preço: Menor', fn: (a, b) => a.priceRaw - b.priceRaw },
  { label: 'Preço: Maior', fn: (a, b) => b.priceRaw - a.priceRaw },
];

/* Gold tone per category */
const catColor = {
  Profissional: '#D8AF73',
  Compacto:     '#C0C0C0',
  Industrial:   '#B49838',
  Parede:       '#888888',
  Ultrassónico: '#D8AF73',
};

const Difusores = () => {
  const [cat, setCat] = useState('Todos');
  const [order, setOrder] = useState(0);
  const { toast } = useToast();

  const products = useMemo(() =>
    [...difusores]
      .filter(d => cat === 'Todos' || d.category === cat)
      .sort(ordenacoes[order].fn),
    [cat, order]
  );

  const addCart = (name) => toast({ title: 'Adicionado ao carrinho', description: `${name} foi adicionado.` });

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <Header />

      {/* ── HERO ── */}
      <section className="bg-[#050505] pt-44 pb-20 px-6 border-b border-[#C0C0C0]/10">
        <div className="max-w-[1400px] mx-auto">
          <p className="text-[13px] tracking-[0.3em] font-bold uppercase mb-5"
             style={{ color: '#D8AF73' }}>
            Aromatização
          </p>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div>
              <h1 className="font-display text-[#C0C0C0] text-[52px] md:text-[78px] font-black uppercase leading-[0.92] tracking-tight mb-5">
                Difusores
              </h1>
              <p className="text-[#888888] text-[17px] leading-[1.8] max-w-2xl">
                Tecnologia de nebulização a frio que preserva a integridade das fragrâncias. Soluções para cada dimensão de espaço.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── FILTROS COM ANIMAÇÃO ── */}
      <section className="bg-[#0a0a0a] py-8 px-6 border-b border-[#C0C0C0]/10 sticky top-[125px] z-30">
        <div className="max-w-[1400px] mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2 flex-wrap">
            <div className="flex gap-3 flex-shrink-0">
              <Link to="/fragrancias"
                className="flex items-center gap-2 px-4 py-2 text-[11px] tracking-[0.18em] font-bold uppercase transition-all border">
                Fragrâncias
              </Link>
            </div>
            {categorias.map(c => {
              const isActive = cat === c;
              const accent = catColor[c] || '#D8AF73';
              return (
                <button
                  key={c}
                  onClick={() => setCat(c)}
                  className={`btn-pulse flex items-center gap-2 px-4 py-2 text-[11px] tracking-[0.18em] font-bold uppercase transition-all border ${isActive ? 'act' : ''}`}
                  style={{
                    backgroundColor: isActive ? `${accent}22` : 'transparent',
                    borderColor:      isActive ? accent : 'rgba(192,192,192,0.15)',
                    color:            isActive ? '#C0C0C0' : '#888888',
                  }}
                  onMouseEnter={e => { if (!isActive) { e.currentTarget.style.borderColor = `${accent}60`; e.currentTarget.style.color = '#C0C0C0'; }}}
                  onMouseLeave={e => { if (!isActive) { e.currentTarget.style.borderColor = 'rgba(192,192,192,0.15)'; e.currentTarget.style.color = '#888888'; }}}
                >
                  {c !== 'Todos' && (
                    <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: catColor[c] || '#D8AF73' }} />
                  )}
                  {c}
                </button>
              );
            })}
          </div>
          <div className="flex items-center gap-3">
            <span className="text-[#888888] text-[12px] hidden sm:block">
              {products.length} produto{products.length !== 1 ? 's' : ''}
            </span>
            <div className="flex items-center gap-2 border border-[#C0C0C0]/15 px-3 py-2">
              <SlidersHorizontal size={13} className="text-[#888888]" />
              <select
                value={order}
                onChange={e => setOrder(Number(e.target.value))}
                className="bg-transparent text-[#C0C0C0] text-[11px] font-bold tracking-wider outline-none cursor-pointer"
              >
                {ordenacoes.map((o, i) => <option key={o.label} value={i} className="bg-[#0a0a0a]">{o.label}</option>)}
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* ── GRID ── */}
      <section className="bg-[#0a0a0a] py-16 px-6">
        <div className="max-w-[1400px] mx-auto">
          {products.length === 0 ? (
            <div className="text-center py-24">
              <p className="text-[#888888] text-[16px]">Sem produtos nesta categoria.</p>
              <button onClick={() => setCat('Todos')} className="mt-4 text-[#D8AF73] hover:text-[#C0C0C0] text-[13px] font-bold underline">Ver todos</button>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map(p => (
                <div key={p.id} className="group bg-[#141414] border border-[#C0C0C0]/10 overflow-hidden hover:border-[#D8AF73]/30 transition-all duration-300">
                  <div className="relative aspect-square overflow-hidden">
                    <img src={p.image} alt={p.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    {p.tag && (
                      <span className={`absolute top-4 left-4 text-[10px] tracking-[0.2em] font-bold uppercase px-3 py-1.5 ${tagColor[p.tag] || 'bg-[#D8AF73] text-[#0a0a0a]'}`}>
                        {p.tag}
                      </span>
                    )}
                    <button
                      className="absolute top-4 right-4 w-9 h-9 bg-[#0a0a0a]/80 backdrop-blur rounded-full flex items-center justify-center text-[#C0C0C0] hover:bg-[#D8AF73] hover:text-[#0a0a0a] transition-colors opacity-0 group-hover:opacity-100"
                      aria-label="Lista de desejos"
                      onClick={() => toast({ title: 'Adicionado à lista de desejos' })}
                    >
                      <Heart size={15} />
                    </button>
                  </div>

                  <div className="p-7">
                    <p className="text-[10px] tracking-[0.25em] font-bold uppercase mb-1" style={{ color: catColor[p.category] || '#D8AF73' }}>
                      {p.subtitle}
                    </p>
                    <h3 className="text-[#C0C0C0] text-[20px] font-black uppercase tracking-tight mb-1">{p.name}</h3>
                    <p className="text-[#888888] text-[13px] mb-1">{p.cobertura}</p>
                    <p className="text-[#C0C0C0] text-[22px] font-black mb-4">{p.price}</p>
                    <p className="text-[#888888] text-[13px] leading-relaxed mb-5 line-clamp-2">{p.desc}</p>

                    <div className="space-y-1.5 mb-6">
                      {p.specs.slice(0, 3).map(s => (
                        <div key={s} className="flex items-center gap-2 text-[12px] text-[#C0C0C0]">
                          <CheckCircle size={13} className="flex-shrink-0" style={{ color: '#D8AF73' }} />
                          {s}
                        </div>
                      ))}
                    </div>

                    <button
                      onClick={() => addCart(p.name)}
                      className="w-full inline-flex items-center justify-center gap-2 py-3.5 text-[11px] tracking-[0.22em] font-bold uppercase transition-colors text-[#0a0a0a] hover:opacity-90"
                      style={{ background: 'linear-gradient(90deg, #B49838, #D8AF73)' }}
                    >
                      <ShoppingCart size={14} /> Adicionar ao Carrinho
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── STRIP INFORMATIVA ── */}
      <section className="bg-[#141414] py-16 px-6 border-t border-[#C0C0C0]/10">
        <div className="max-w-[1400px] mx-auto grid sm:grid-cols-3 gap-6">
          {[
            { t: 'Instalação Incluída', d: 'Todos os difusores incluem instalação gratuita nas zonas Norte e Centro.' },
            { t: 'Garantia 2 Anos',     d: 'Garantia total de 2 anos em peças e mão de obra para todos os equipamentos.' },
            { t: 'Suporte Técnico',     d: 'Equipa de suporte disponível de segunda a sexta, das 9h às 18h.' },
          ].map(({ t, d }) => (
            <div key={t} className="flex gap-4 items-start p-6 border border-[#C0C0C0]/10 hover:border-[#D8AF73]/30 transition-colors group">
              <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center transition-colors"
                   style={{ background: 'rgba(180,152,56,0.12)' }}>
                <CheckCircle size={18} style={{ color: '#D8AF73' }} />
              </div>
              <div>
                <p className="text-[#C0C0C0] font-bold text-[14px] mb-1">{t}</p>
                <p className="text-[#888888] text-[13px] leading-relaxed">{d}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-[#050505] py-20 px-6 border-t border-[#C0C0C0]/10">
        <div className="max-w-[900px] mx-auto text-center">
          <h2 className="font-display text-[#C0C0C0] text-[36px] md:text-[48px] font-black uppercase leading-[1] tracking-tight mb-5">
            Não sabe qual escolher?
          </h2>
          <p className="text-[#888888] text-[16px] leading-relaxed mb-10 max-w-xl mx-auto">
            Os nossos especialistas ajudam-no a encontrar o difusor ideal para o seu espaço, totalmente sem compromisso.
          </p>
          <Link
            to="/contactos"
            className="inline-flex items-center gap-3 px-10 py-4 text-[12px] tracking-[0.25em] font-bold uppercase transition-all hover:gap-5 group text-[#0a0a0a] hover:opacity-90"
            style={{ background: 'linear-gradient(90deg, #B49838, #D8AF73)' }}
          >
            Pedir Aconselhamento <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </section>

      <Footer />
      <FloatingChat />
    </div>
  );
};

export default Difusores;
