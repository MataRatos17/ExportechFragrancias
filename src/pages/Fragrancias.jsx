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

const familias = ['Todas', ...Array.from(new Set(fragrancias.map(f => f.category)))];
const ordenacoes = [
  { label: 'Destaque',     fn: () => 0 },
  { label: 'Preço: Menor', fn: (a, b) => a.priceRaw - b.priceRaw },
  { label: 'Preço: Maior', fn: (a, b) => b.priceRaw - a.priceRaw },
  { label: 'Nome A–Z',     fn: (a, b) => a.name.localeCompare(b.name) },
];

const familiaColor = {
  Oriental:    '#D8AF73',
  Fresca:      '#C0C0C0',
  Amadeirado:  '#B49838',
  Floral:      '#D8AF73',
  Cítrico:     '#B49838',
  default:     '#C0C0C0',
};

const Fragrancias = () => {
  const [familia, setFamilia] = useState('Todas');
  const [order, setOrder] = useState(0);
  const { toast } = useToast();

  const products = useMemo(() =>
    [...fragrancias]
      .filter(f => familia === 'Todas' || f.category === familia)
      .sort(ordenacoes[order].fn),
    [familia, order]
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
                Fragrâncias
              </h1>
              <p className="text-[#888888] text-[17px] leading-[1.8] max-w-2xl">
                Composições exclusivas desenvolvidas com mestres perfumistas. Cada fragrância é uma história pensada para o seu espaço.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAMÍLIAS E NAVEGAÇÃO ── */}
      <section className="bg-[#0a0a0a] py-10 px-6 border-b border-[#C0C0C0]/10 sticky top-[125px] z-30">
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-3 flex-wrap">
            
            {/* Link Difusores: Estilo igual aos botões de filtro */}
            <Link 
              to="/difusores"
              className="btn-pulse inline-flex items-center justify-center px-5 py-2.5 border border-[#C0C0C0]/15 text-[#888888] hover:text-[#C0C0C0] hover:border-[#D8AF73]/60 text-[11px] tracking-[0.18em] font-bold uppercase transition-all"
            >
              Difusores
            </Link>

            {/* Separador subtil */}
            <div className="w-[1px] h-4 bg-[#C0C0C0]/10 mx-1 hidden sm:block" />

            {familias.map(f => {
              const isActive = familia === f;
              const accent = familiaColor[f] || familiaColor.default;
              return (
                <button
                  key={f}
                  onClick={() => setFamilia(f)}
                  className={`btn-pulse flex items-center gap-2 px-5 py-2.5 text-[11px] tracking-[0.18em] font-bold uppercase transition-all border ${isActive ? 'act' : ''}`}
                  style={{
                    backgroundColor: isActive ? `${accent}22` : 'transparent',
                    borderColor:      isActive ? accent : 'rgba(192,192,192,0.15)',
                    color:            isActive ? '#C0C0C0' : '#888888',
                  }}
                  onMouseEnter={e => { if (!isActive) { e.currentTarget.style.borderColor = `${accent}60`; e.currentTarget.style.color = '#C0C0C0'; }}}
                  onMouseLeave={e => { if (!isActive) { e.currentTarget.style.borderColor = 'rgba(192,192,192,0.15)'; e.currentTarget.style.color = '#888888'; }}}
                >
                  {f !== 'Todas' && (
                    <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: accent }} />
                  )}
                  {f}
                </button>
              );
            })}
          </div>

          <div className="flex items-center justify-between md:justify-end gap-4 min-w-[200px]">
            <span className="text-[#888888] text-[12px]">{products.length} fragrância{products.length !== 1 ? 's' : ''}</span>
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
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map(p => (
              <div key={p.id} className="group bg-[#141414] border border-[#C0C0C0]/10 overflow-hidden hover:border-[#D8AF73]/30 transition-all duration-300 flex flex-col">
                <div className="relative aspect-square overflow-hidden">
                  <img src={p.image} alt={p.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                  {p.tag && (
                    <span className={`absolute top-4 left-4 text-[10px] tracking-[0.2em] font-bold uppercase px-3 py-1.5 ${tagColor[p.tag] || 'bg-[#D8AF73] text-[#0a0a0a]'}`}>
                      {p.tag}
                    </span>
                  )}
                  <button
                    onClick={addWish}
                    className="absolute top-4 right-4 w-9 h-9 bg-[#0a0a0a]/80 backdrop-blur rounded-full flex items-center justify-center text-[#C0C0C0] transition-colors opacity-0 group-hover:opacity-100"
                    onMouseEnter={e => { e.currentTarget.style.background = '#D8AF73'; e.currentTarget.style.color = '#0a0a0a'; }}
                    onMouseLeave={e => { e.currentTarget.style.background = 'rgba(10,10,10,0.8)'; e.currentTarget.style.color = '#C0C0C0'; }}
                    aria-label="Lista de desejos"
                  >
                    <Heart size={15} />
                  </button>
                </div>

                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-2 h-2 rounded-full flex-shrink-0"
                          style={{ background: familiaColor[p.category] || familiaColor.default }} />
                    <p className="text-[10px] tracking-[0.22em] font-bold uppercase"
                       style={{ color: familiaColor[p.category] || familiaColor.default }}>
                      {p.category}
                    </p>
                  </div>
                  <h3 className="text-[#C0C0C0] text-[17px] font-black uppercase tracking-tight mb-1">{p.name}</h3>
                  <p className="text-[#888888] text-[12px] mb-1">{p.volume}</p>

                  <div className="flex items-center gap-1.5 mb-3">
                    <Wind size={12} className="flex-shrink-0" style={{ color: '#D8AF73' }} />
                    <p className="text-[11px] italic" style={{ color: '#D8AF73' }}>{p.notas}</p>
                  </div>

                  <p className="text-[#888888] text-[12px] leading-relaxed mb-4 flex-1 line-clamp-3">{p.desc}</p>
                  <p className="text-[#C0C0C0] text-[20px] font-black mb-4">{p.price}</p>

                  <button
                    onClick={() => addCart(p.name)}
                    className="w-full inline-flex items-center justify-center gap-2 py-3 text-[11px] tracking-[0.22em] font-bold uppercase transition-opacity text-[#0a0a0a] hover:opacity-90"
                    style={{ background: 'linear-gradient(90deg, #B49838, #D8AF73)' }}
                  >
                    <ShoppingCart size={13} /> Adicionar
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── IDENTIDADE OLFATIVA ── */}
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
            <p className="text-[#888888] text-[15px] leading-[1.8] mb-6">
              Para além do catálogo, desenvolvemos fragrâncias personalizadas que se tornam a assinatura olfativa única do seu espaço. Um processo colaborativo com os nossos perfumistas, do briefing ao produto final.
            </p>
            <Link
              to="/contactos"
              className="inline-flex items-center gap-3 px-8 py-4 text-[12px] tracking-[0.25em] font-bold uppercase transition-all hover:gap-5 group text-[#0a0a0a] hover:opacity-90"
              style={{ background: 'linear-gradient(90deg, #B49838, #D8AF73)' }}
            >
              Pedir Orçamento <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { t: 'Ingredientes Naturais', d: 'Seleção rigorosa de matérias-primas das melhores regiões produtoras do mundo.' },
              { t: 'Conformidade IFRA',     d: 'Todas as fragrâncias respeitam os standards internacionais de segurança.' },
              { t: 'Exclusividade Total',   d: 'A sua fragrância será protegida e nunca usada em nenhum outro cliente.' },
              { t: 'Recargas Ilimitadas',   d: 'Programa de recargas com entrega direta no seu espaço.' },
            ].map(({ t, d }) => (
              <div key={t} className="bg-[#0a0a0a] border border-[#C0C0C0]/10 p-6 hover:border-[#D8AF73]/30 transition-colors">
                <p className="text-[12px] tracking-[0.15em] font-bold uppercase mb-2" style={{ color: '#D8AF73' }}>{t}</p>
                <p className="text-[#888888] text-[12px] leading-relaxed">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-[#050505] py-20 px-6 border-t border-[#C0C0C0]/10">
        <div className="max-w-[900px] mx-auto text-center">
          <h2 className="font-display text-[#C0C0C0] text-[36px] md:text-[48px] font-black uppercase leading-[1] tracking-tight mb-5">
            Quer experimentar<br />
            <span style={{ color: '#D8AF73' }}>antes de comprar?</span>
          </h2>
          <p className="text-[#888888] text-[16px] leading-relaxed mb-10 max-w-xl mx-auto">
            Encomende o nosso Pack Amostras Explorer — 8 fragrâncias em formato de 30 ml para descobrir a que melhor combina com o seu espaço.
          </p>
          <Link
            to="/acessorios"
            className="inline-flex items-center gap-3 px-10 py-4 text-[12px] tracking-[0.25em] font-bold uppercase transition-all hover:gap-5 group text-[#0a0a0a] hover:opacity-90"
            style={{ background: 'linear-gradient(90deg, #B49838, #D8AF73)' }}
          >
            Ver Pack Amostras <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </section>

      <Footer />
      <FloatingChat />
    </div>
  );
};

export default Fragrancias;