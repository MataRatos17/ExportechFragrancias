import React, { useState, useMemo } from 'react';
import { ArrowRight, ShoppingCart, Heart, SlidersHorizontal } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import FloatingChat from '../components/FloatingChat';
import { acessorios } from '../data/mock';
import { useToast } from '../hooks/use-toast';

const tagColor = {
  'Económico': 'bg-[#B49838]/20 text-[#D8AF73]',
  'Novo': 'bg-[#C0C0C0] text-[#0a0a0a]',
  'Destaque': 'bg-[#B49838]/20 text-[#D8AF73]',
  'Popular': 'bg-[#D8AF73] text-[#0a0a0a]',
};

const categorias = ['Todos', ...Array.from(new Set(acessorios.map(a => a.category)))];
const ordenacoes = [
  { label: 'Destaque', fn: () => 0 },
  { label: 'Preço: Menor', fn: (a, b) => a.priceRaw - b.priceRaw },
  { label: 'Preço: Maior', fn: (a, b) => b.priceRaw - a.priceRaw },
];

const catColor = {
  Recargas: '#D8AF73',
  Instalação: '#C0C0C0',
  Automação: '#B49838',
  Manutenção: '#888888',
  Kits: '#D8AF73',
};

const Acessorios = () => {
  const [cat, setCat] = useState('Todos');
  const [order, setOrder] = useState(0);
  const { toast } = useToast();

  const products = useMemo(() =>
    [...acessorios]
      .filter(a => cat === 'Todos' || a.category === cat)
      .sort(ordenacoes[order].fn),
    [cat, order]
  );

  const addCart = (name) => toast({ title: 'Adicionado ao carrinho', description: `${name} foi adicionado.` });
  const addWish = () => toast({ title: 'Adicionado à lista de desejos' });

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
                Acessórios
              </h1>
              <p className="text-[#888888] text-[17px] leading-[1.8] max-w-2xl">
                Recargas, suportes, módulos de automação e kits. Tudo o que precisa para tirar o máximo partido dos seus difusores.
              </p>
            </div>
            <div className="flex gap-3 flex-shrink-0">
              <Link to="/difusores"
                className="inline-flex items-center gap-2 border border-[#C0C0C0]/20 hover:border-[#D8AF73]/60 text-[#C0C0C0] hover:text-[#D8AF73] px-6 py-3 text-[11px] tracking-[0.2em] font-bold uppercase transition-colors">
                Difusores
              </Link>
              <Link to="/fragrancias"
                className="inline-flex items-center gap-2 border border-[#C0C0C0]/20 hover:border-[#D8AF73]/60 text-[#C0C0C0] hover:text-[#D8AF73] px-6 py-3 text-[11px] tracking-[0.2em] font-bold uppercase transition-colors">
                Fragrâncias
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── FILTROS COM ANIMAÇÃO ── */}
      <section className="bg-[#0a0a0a] py-8 px-6 border-b border-[#C0C0C0]/10 sticky top-[125px] z-30">
        <div className="max-w-[1400px] mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2 flex-wrap">
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
                    borderColor: isActive ? accent : 'rgba(192,192,192,0.15)',
                    color: isActive ? '#C0C0C0' : '#888888',
                  }}
                  onMouseEnter={e => { if (!isActive) { e.currentTarget.style.borderColor = `${accent}60`; e.currentTarget.style.color = '#C0C0C0'; } }}
                  onMouseLeave={e => { if (!isActive) { e.currentTarget.style.borderColor = 'rgba(192,192,192,0.15)'; e.currentTarget.style.color = '#888888'; } }}
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
              <button onClick={() => setCat('Todos')} className="mt-4 hover:text-[#C0C0C0] text-[13px] font-bold underline" style={{ color: '#D8AF73' }}>Ver todos</button>
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
                      onClick={addWish}
                      className="absolute top-4 right-4 w-9 h-9 bg-[#0a0a0a]/80 backdrop-blur rounded-full flex items-center justify-center text-[#C0C0C0] transition-colors opacity-0 group-hover:opacity-100 hover:text-[#0a0a0a]"
                      style={{ '--tw-bg-opacity': 1 }}
                      onMouseEnter={e => { e.currentTarget.style.background = '#D8AF73'; }}
                      onMouseLeave={e => { e.currentTarget.style.background = 'rgba(10,10,10,0.8)'; }}
                      aria-label="Lista de desejos"
                    >
                      <Heart size={15} />
                    </button>
                  </div>

                  <div className="p-7">
                    <p className="text-[10px] tracking-[0.25em] font-bold uppercase mb-1" style={{ color: catColor[p.category] || '#D8AF73' }}>
                      {p.category}
                    </p>
                    <h3 className="text-[#C0C0C0] text-[19px] font-black uppercase tracking-tight mb-1">{p.name}</h3>
                    <p className="text-[#888888] text-[12px] italic mb-3">{p.subtitle}</p>
                    <p className="text-[#888888] text-[13px] leading-relaxed mb-4 line-clamp-3">{p.desc}</p>
                    <p className="text-[#C0C0C0] text-[22px] font-black mb-5">{p.price}</p>
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

      {/* ── PROGRAMA RECARGA ── */}
      <section className="bg-[#141414] py-20 px-6 border-t border-[#C0C0C0]/10">
        <div className="max-w-[1100px] mx-auto grid lg:grid-cols-2 gap-14 items-center">
          <div>
            <p className="text-[12px] tracking-[0.3em] font-bold uppercase mb-4" style={{ color: '#D8AF73' }}>
              Programa de Recargas
            </p>
            <h2 className="font-display text-[#C0C0C0] text-[34px] md:text-[44px] font-black uppercase leading-[1] tracking-tight mb-6">
              Nunca fique sem<br />
              <span style={{ color: '#D8AF73' }}>a sua fragrância</span>
            </h2>
            <p className="text-[#888888] text-[15px] leading-[1.8] mb-8">
              Subscreva o nosso programa de recargas automáticas e receba a sua fragrância em casa ou no espaço de negócio com a periodicidade que definir. Sem preocupações, sem interrupções.
            </p>
            <div className="space-y-4">
              {[
                { ciclo: 'Mensal', desc: 'Entrega mensal com 5% de desconto', destaque: false },
                { ciclo: 'Bimestral', desc: 'Entrega de 2 em 2 meses com 10% de desconto', destaque: true },
                { ciclo: 'Trimestral', desc: 'Entrega trimestral com 15% de desconto', destaque: false },
              ].map(({ ciclo, desc, destaque }) => (
                <div key={ciclo}
                  className={`flex items-center justify-between p-5 border transition-colors ${destaque ? 'bg-[#B49838]/8' : 'hover:border-[#D8AF73]/20'}`}
                  style={{ borderColor: destaque ? '#D8AF73' : 'rgba(192,192,192,0.1)' }}>
                  <div>
                    <p className="text-[#C0C0C0] font-bold text-[15px]">{ciclo}</p>
                    <p className="text-[#888888] text-[13px]">{desc}</p>
                  </div>
                  {destaque && (
                    <span className="text-[10px] tracking-[0.2em] font-bold uppercase px-3 py-1 text-[#0a0a0a]"
                      style={{ background: 'linear-gradient(90deg, #B49838, #D8AF73)' }}>
                      Mais Popular
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
          <div className="hidden lg:block aspect-square relative overflow-hidden">
            <img
              src="https://images.pexels.com/photos/4202325/pexels-photo-4202325.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=800&w=800"
              alt="Recargas de fragrâncias"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#141414]/60 to-transparent" />
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-[#050505] py-20 px-6 border-t border-[#C0C0C0]/10">
        <div className="max-w-[900px] mx-auto text-center">
          <h2 className="font-display text-[#C0C0C0] text-[36px] md:text-[48px] font-black uppercase leading-[1] tracking-tight mb-5">
            Precisa de ajuda a<br />
            <span style={{ color: '#D8AF73' }}>escolher o acessório certo?</span>
          </h2>
          <p className="text-[#888888] text-[16px] leading-relaxed mb-10 max-w-xl mx-auto">
            A nossa equipa técnica está disponível para o ajudar a encontrar a solução mais adequada ao seu difusor e espaço.
          </p>
          <Link
            to="/contactos"
            className="inline-flex items-center gap-3 px-10 py-4 text-[12px] tracking-[0.25em] font-bold uppercase transition-all hover:gap-5 group text-[#0a0a0a] hover:opacity-90"
            style={{ background: 'linear-gradient(90deg, #B49838, #D8AF73)' }}
          >
            Falar com Técnico <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </section>

      <Footer />
      <FloatingChat />
    </div>
  );
};

export default Acessorios;
