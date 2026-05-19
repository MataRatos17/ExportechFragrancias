import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, ChevronRight, ShoppingCart, Wifi, Volume2, Timer, Zap, Package, Shield } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import FloatingChat from '../components/FloatingChat';
import { difusores } from '../data/mock';
import { useToast } from '../hooks/use-toast';

const catColor = { Profissional:'#D8AF73', Compacto:'#C0C0C0', Industrial:'#B49838', Parede:'#888888', Ultrassónico:'#D8AF73' };

const DifusorDetalhe = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const [qty, setQty] = useState(1);

  const dif = difusores.find(d => d.id === id);
  if (!dif) return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
      <div className="text-center">
        <p className="text-[#888888] text-[18px] mb-4">Difusor não encontrado.</p>
        <Link to="/difusores" className="text-[#D8AF73] hover:text-[#C0C0C0]">← Voltar aos difusores</Link>
      </div>
    </div>
  );

  const accent = catColor[dif.category] || '#D8AF73';
  const outros = difusores.filter(d => d.id !== id).slice(0, 3);

  const addCart = () => toast({ title: 'Adicionado ao carrinho', description: `${qty}× ${dif.name} adicionado.` });

  const specIcons = { 'WiFi': Wifi, 'Silencioso': Volume2, 'Temporizador': Timer, 'HVAC': Zap };
  const getSpecIcon = (spec) => {
    const key = Object.keys(specIcons).find(k => spec.includes(k));
    return key ? specIcons[key] : CheckCircle;
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <Header />

      {/* ── Breadcrumb ── */}
      <div className="bg-[#050505] pt-36 pb-4 px-6 border-b border-[#C0C0C0]/10">
        <div className="max-w-[1400px] mx-auto flex items-center gap-2 text-[12px] text-[#888888]">
          <Link to="/" className="hover:text-[#D8AF73] transition-colors">Início</Link>
          <ChevronRight size={12} />
          <Link to="/difusores" className="hover:text-[#D8AF73] transition-colors">Difusores</Link>
          <ChevronRight size={12} />
          <span className="text-[#C0C0C0]">{dif.name}</span>
        </div>
      </div>

      {/* ── Main ── */}
      <section className="bg-[#0a0a0a] py-16 px-6">
        <div className="max-w-[1400px] mx-auto grid lg:grid-cols-2 gap-16 items-start">

          {/* LEFT: Image */}
          <div className="sticky top-32">
            <div className="relative bg-[#141414] border border-[#C0C0C0]/10 overflow-hidden aspect-square">
              <img src={dif.image} alt={dif.name}
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" />
              {dif.tag && (
                <span className="absolute top-5 left-5 text-[11px] tracking-[0.2em] font-bold uppercase px-4 py-2 text-[#0a0a0a]"
                  style={{ background: 'linear-gradient(90deg,#B49838,#D8AF73)' }}>
                  {dif.tag}
                </span>
              )}
              <div className="absolute bottom-0 left-0 right-0 h-1"
                style={{ background: `linear-gradient(90deg, ${accent}, transparent)` }} />
            </div>

            {/* Coverage visual */}
            <div className="mt-4 bg-[#141414] border border-[#C0C0C0]/10 p-5">
              <p className="text-[10px] tracking-[0.25em] font-bold uppercase text-[#888888] mb-3">Área de Cobertura</p>
              <div className="flex items-center gap-4">
                <div className="flex-1 h-2 bg-[#C0C0C0]/10 rounded-full overflow-hidden">
                  <div className="h-full rounded-full transition-all duration-1000"
                    style={{
                      width: `${Math.min(100, (dif.priceRaw / 600) * 100)}%`,
                      background: `linear-gradient(90deg, #B49838, ${accent})`,
                    }} />
                </div>
                <span className="text-[#C0C0C0] font-black text-[15px] flex-shrink-0">{dif.cobertura}</span>
              </div>
            </div>
          </div>

          {/* RIGHT: Info */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="w-2 h-2 rounded-full" style={{ background: accent }} />
              <span className="text-[11px] tracking-[0.3em] font-bold uppercase" style={{ color: accent }}>
                {dif.category}
              </span>
            </div>

            <h1 className="font-display text-[#C0C0C0] text-[44px] md:text-[56px] font-black uppercase leading-[0.92] tracking-tight mb-2">
              {dif.name}
            </h1>
            <p className="text-[#888888] text-[15px] italic mb-6">{dif.subtitle}</p>
            <p className="font-black text-[36px] mb-8" style={{ color: '#D8AF73' }}>{dif.price}</p>

            <p className="text-[#888888] text-[15px] leading-[1.8] mb-10">{dif.descLonga}</p>

            {/* Specs */}
            <div className="space-y-2 mb-10">
              <p className="text-[11px] tracking-[0.25em] font-bold uppercase text-[#888888] mb-4">Características</p>
              {dif.specs.map(s => {
                const Icon = getSpecIcon(s);
                return (
                  <div key={s} className="flex items-center gap-3 bg-[#141414] border border-[#C0C0C0]/10 px-4 py-3">
                    <Icon size={15} style={{ color: '#D8AF73' }} className="flex-shrink-0" />
                    <span className="text-[#C0C0C0] text-[14px]">{s}</span>
                  </div>
                );
              })}
            </div>

            {/* Ideal spaces */}
            <div className="mb-10">
              <p className="text-[11px] tracking-[0.25em] font-bold uppercase text-[#888888] mb-3">Ambientes Ideais</p>
              <div className="flex flex-wrap gap-2">
                {dif.ambientes.map(a => (
                  <span key={a} className="text-[12px] text-[#C0C0C0] bg-[#141414] border border-[#C0C0C0]/10 px-3 py-1.5">{a}</span>
                ))}
              </div>
            </div>

            {/* Add to cart */}
            <div className="flex gap-3">
              <div className="flex items-center border border-[#C0C0C0]/20">
                <button onClick={() => setQty(q => Math.max(1, q-1))}
                  className="w-11 h-12 flex items-center justify-center text-[#C0C0C0] hover:text-[#D8AF73] transition-colors text-[18px]">−</button>
                <span className="w-10 text-center text-[#C0C0C0] font-bold">{qty}</span>
                <button onClick={() => setQty(q => q+1)}
                  className="w-11 h-12 flex items-center justify-center text-[#C0C0C0] hover:text-[#D8AF73] transition-colors text-[18px]">+</button>
              </div>
              <button onClick={addCart}
                className="flex-1 inline-flex items-center justify-center gap-2 py-3.5 text-[12px] tracking-[0.22em] font-bold uppercase text-[#0a0a0a] hover:opacity-90 transition-opacity"
                style={{ background: 'linear-gradient(90deg,#B49838,#D8AF73)' }}>
                <ShoppingCart size={15} />
                Adicionar ao Carrinho
              </button>
            </div>

            <p className="text-[#888888] text-[12px] mt-4 text-center">
              Instalação profissional disponível · Contacte-nos para orçamento
            </p>
          </div>
        </div>
      </section>

      {/* ── Technical specs table ── */}
      <section className="bg-[#141414] py-20 px-6 border-t border-[#C0C0C0]/10">
        <div className="max-w-[1100px] mx-auto">
          <div className="text-center mb-12">
            <p className="text-[11px] tracking-[0.3em] font-bold uppercase mb-3" style={{ color: '#D8AF73' }}>Informação Técnica</p>
            <h2 className="font-display text-[#C0C0C0] text-[32px] md:text-[40px] font-black uppercase tracking-tight">
              Especificações
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {[
              { label: 'Autonomia', value: dif.autonomia },
              { label: 'Alimentação', value: dif.voltagem },
              { label: 'Dimensões', value: dif.dimensoes },
              { label: 'Peso', value: dif.peso },
              { label: 'Garantia', value: dif.garantia },
              { label: 'Cobertura', value: dif.cobertura },
            ].map(({ label, value }) => (
              <div key={label} className="flex items-center justify-between bg-[#0a0a0a] border border-[#C0C0C0]/10 px-6 py-4">
                <span className="text-[#888888] text-[13px] tracking-wider uppercase font-bold">{label}</span>
                <span className="text-[#C0C0C0] text-[14px] font-semibold">{value}</span>
              </div>
            ))}
          </div>

          {/* Included items */}
          <div className="mt-8 bg-[#0a0a0a] border border-[#C0C0C0]/10 p-8">
            <div className="flex items-center gap-3 mb-5">
              <Package size={18} style={{ color: '#D8AF73' }} />
              <p className="text-[12px] tracking-[0.25em] font-bold uppercase text-[#C0C0C0]">Incluído na Caixa</p>
            </div>
            <div className="grid sm:grid-cols-2 gap-3">
              {dif.inclui.map(item => (
                <div key={item} className="flex items-center gap-3 text-[14px] text-[#888888]">
                  <CheckCircle size={14} style={{ color: '#D8AF73' }} className="flex-shrink-0" />
                  {item}
                </div>
              ))}
            </div>
          </div>

          {/* Warranty */}
          <div className="mt-4 flex items-center gap-4 bg-[#0a0a0a] border border-[#D8AF73]/20 p-5">
            <Shield size={24} style={{ color: '#D8AF73' }} className="flex-shrink-0" />
            <div>
              <p className="text-[#C0C0C0] font-bold text-[14px] mb-0.5">Garantia {dif.garantia}</p>
              <p className="text-[#888888] text-[13px]">Cobertura total em peças e mão de obra. Suporte técnico incluído.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Other diffusers ── */}
      <section className="bg-[#0a0a0a] py-20 px-6 border-t border-[#C0C0C0]/10">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex items-end justify-between mb-10">
            <h2 className="font-display text-[#C0C0C0] text-[28px] md:text-[36px] font-black uppercase tracking-tight">
              Outros Difusores
            </h2>
            <Link to="/difusores"
              className="hidden sm:flex items-center gap-2 text-[12px] tracking-[0.2em] font-bold uppercase text-[#888888] hover:text-[#D8AF73] transition-colors">
              Ver todos <ArrowRight size={14} />
            </Link>
          </div>
          <div className="grid sm:grid-cols-3 gap-5">
            {outros.map(d => (
              <Link key={d.id} to={`/difusores/${d.id}`}
                className="group bg-[#141414] border border-[#C0C0C0]/10 overflow-hidden hover:border-[#D8AF73]/35 transition-all duration-300 block">
                <div className="aspect-square overflow-hidden">
                  <img src={d.image} alt={d.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                </div>
                <div className="p-5">
                  <p className="text-[10px] tracking-[0.22em] font-bold uppercase mb-1"
                    style={{ color: catColor[d.category] || '#D8AF73' }}>{d.category}</p>
                  <h3 className="text-[#C0C0C0] text-[16px] font-black uppercase tracking-tight mb-1">{d.name}</h3>
                  <p className="text-[#888888] text-[13px] mb-2">{d.cobertura}</p>
                  <p className="font-black text-[18px]" style={{ color: '#D8AF73' }}>{d.price}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-[#050505] py-16 px-6 border-t border-[#C0C0C0]/10">
        <div className="max-w-[900px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <p className="text-[#C0C0C0] font-bold text-[15px] mb-1">Precisa de instalação profissional?</p>
            <p className="text-[#888888] text-[14px]">A nossa equipa técnica instala e configura em todo o território nacional.</p>
          </div>
          <Link to="/contactos"
            className="flex-shrink-0 inline-flex items-center gap-2 px-8 py-3.5 text-[12px] tracking-[0.22em] font-bold uppercase text-[#0a0a0a] hover:opacity-90 transition-opacity"
            style={{ background: 'linear-gradient(90deg,#B49838,#D8AF73)' }}>
            Pedir Instalação <ArrowRight size={14} />
          </Link>
        </div>
      </section>

      <Footer />
      <FloatingChat />
    </div>
  );
};

export default DifusorDetalhe;
