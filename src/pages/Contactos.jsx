import React, { useState } from 'react';
import { MapPin, Mail, Clock, ArrowRight, Send } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import FloatingChat from '../components/FloatingChat';
import { useToast } from '../hooks/use-toast';

const initialState = { name: '', email: '', phone: '', company: '', segment: '', message: '' };

const contactInfo = [
  {
    Icon: MapPin,
    title: 'Lisboa',
    lines: ['Rua Fernando Farinha nº 2A/2B', 'Braço de Prata, 1950-448 Lisboa'],
  },
  {
    Icon: Mail,
    title: 'Email',
    lines: ['geral@aromainfinity.pt', 'comercial@aromainfinity.pt'],
    isEmail: true,
  },
  {
    Icon: Clock,
    title: 'Horário',
    lines: ['Seg – Sex: 09:00 – 18:00', 'Sáb: 10:00 – 13:00'],
  },
];

const Field = ({ label, name, type = 'text', value, onChange, required = false }) => (
  <div>
    <label className="block text-[11px] tracking-[0.22em] font-bold uppercase text-[#C0C0C0] mb-2">
      {label}{required && ' *'}
    </label>
    <input
      type={type} name={name} value={value} onChange={onChange}
      className="w-full bg-[#0a0a0a] border border-[#C0C0C0]/15 px-4 py-3 text-[14px] text-[#C0C0C0] focus:outline-none focus:border-[#D8AF73] transition-colors"
    />
  </div>
);

const Contactos = () => {
  const [form, setForm] = useState(initialState);
  const [submitting, setSubmitting] = useState(false);
  const { toast } = useToast();

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast({ title: 'Campos obrigatórios', description: 'Preencha nome, email e mensagem.', variant: 'destructive' });
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch('https://formspree.io/f/mykoprpe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, _subject: `Novo contacto de: ${form.name}` }),
      });
      if (res.ok) {
        toast({ title: 'Mensagem enviada!', description: `Obrigado, ${form.name}. Entraremos em contacto em breve.` });
        setForm(initialState);
      } else throw new Error();
    } catch {
      toast({ title: 'Erro', description: 'Ocorreu um problema. Tente novamente.', variant: 'destructive' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <Header />

      {/* ── HERO ── */}
      <section className="bg-[#050505] pt-44 pb-20 px-6 border-b border-[#C0C0C0]/10">
        <div className="max-w-[1100px] mx-auto text-center">
          <p className="text-[#D8AF73] text-[13px] tracking-[0.3em] font-bold uppercase mb-5">Estamos aqui para si</p>
          <h1 className="font-display text-[#C0C0C0] text-[46px] md:text-[72px] font-black uppercase leading-[0.92] tracking-tight mb-7">
            Fale Connosco
          </h1>
          <p className="text-[#888888] text-[17px] leading-[1.8] max-w-2xl mx-auto">
            Tem um projecto em mente? Conte-nos e desenhamos a solução olfativa perfeita para si.
          </p>
        </div>
      </section>

      {/* ── FORM + INFO ── */}
      <section className="bg-[#0a0a0a] py-24 px-6">
        <div className="max-w-[1300px] mx-auto grid lg:grid-cols-5 gap-12">

          {/* Form */}
          <form onSubmit={handleSubmit} className="lg:col-span-3 bg-[#141414] border border-[#C0C0C0]/10 p-10 md:p-12">
            <h2 className="font-display text-[#C0C0C0] text-[28px] md:text-[34px] font-black uppercase tracking-tight mb-2">
              Envie-nos uma mensagem
            </h2>
            <p className="text-[#888888] text-[14px] mb-8">Os campos marcados com <span style={{ color: '#D8AF73' }}>*</span> são obrigatórios.</p>

            <div className="grid sm:grid-cols-2 gap-5">
              <Field label="Nome" name="name" value={form.name} onChange={handleChange} required />
              <Field label="Email" name="email" type="email" value={form.email} onChange={handleChange} required />
              <Field label="Empresa" name="company" value={form.company} onChange={handleChange} />
              <div>
                <label className="block text-[11px] tracking-[0.22em] font-bold uppercase text-[#C0C0C0] mb-2">Segmento</label>
                <select name="segment" value={form.segment} onChange={handleChange}
                  className="w-full bg-[#0a0a0a] border border-[#C0C0C0]/15 px-4 py-3 text-[14px] text-[#C0C0C0] focus:outline-none focus:border-[#D8AF73] transition-colors">
                  <option value="">Selecione</option>
                  {['Hotéis','Restaurantes','Retalho','Spas','Escritórios','Ginásios','Residências Sénior','Eventos','Particular'].map(o => <option key={o}>{o}</option>)}
                </select>
              </div>
            </div>

            <div className="mt-5">
              <label className="block text-[11px] tracking-[0.22em] font-bold uppercase text-[#C0C0C0] mb-2">Mensagem *</label>
              <textarea name="message" value={form.message} onChange={handleChange} rows={5}
                placeholder="Conte-nos sobre o seu projecto..."
                className="w-full bg-[#0a0a0a] border border-[#C0C0C0]/15 px-4 py-3 text-[14px] text-[#C0C0C0] placeholder-[#C0C0C0]/25 focus:outline-none focus:border-[#D8AF73] transition-colors resize-none"
              />
            </div>

            <button type="submit" disabled={submitting}
              className="mt-8 inline-flex items-center gap-3 px-9 py-4 text-[12px] tracking-[0.25em] font-bold uppercase transition-opacity hover:opacity-90 group disabled:opacity-60 text-[#0a0a0a]"
              style={{ background: 'linear-gradient(90deg, #B49838, #D8AF73)' }}>
              {submitting ? 'A enviar...' : 'Enviar Mensagem'}
              {!submitting && <Send size={16} className="transition-transform group-hover:translate-x-1" />}
            </button>
          </form>

          {/* Info */}
          <div className="lg:col-span-2 space-y-4">
            {contactInfo.map(({ Icon, title, lines, isEmail }) => (
              <div key={title} className="flex gap-4 p-6 border border-[#C0C0C0]/10 hover:border-[#D8AF73]/30 transition-colors group">
                <div className="w-11 h-11 flex-shrink-0 flex items-center justify-center transition-colors"
                     style={{ background: 'rgba(216,175,115,0.1)', color: '#D8AF73' }}>
                  <Icon size={18} />
                </div>
                <div>
                  <p className="text-[11px] tracking-[0.22em] font-bold uppercase mb-1" style={{ color: '#D8AF73' }}>{title}</p>
                  {lines.map(l => isEmail
                    ? <a key={l} href={`mailto:${l}`} className="block text-[#C0C0C0] text-[14px] leading-relaxed hover:text-[#D8AF73] transition-colors">{l}</a>
                    : <p key={l} className="text-[#C0C0C0] text-[14px] leading-relaxed">{l}</p>
                  )}
                </div>
              </div>
            ))}

            {/* Mapa embed */}
            <div className="overflow-hidden border border-[#C0C0C0]/10 h-[220px]">
              <iframe
                title="Localização Lisboa"
                src="https://maps.google.com/maps?q=Exportech+Portugal+-+Your+Security+Partner+Lisboa&t=&z=16&ie=UTF8&iwloc=&output=embed"
                width="100%" height="100%"
                style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg)' }}
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-[#050505] py-16 px-6 border-t border-[#C0C0C0]/10">
        <div className="max-w-[900px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <p className="text-[#C0C0C0] font-bold text-[16px] mb-1">Prefere um contacto directo por email?</p>
            <p className="text-[#888888] text-[14px]">Respondemos em menos de 24 horas úteis.</p>
          </div>
          <a href="mailto:geral@aromainfinity.pt"
            className="flex-shrink-0 inline-flex items-center gap-3 px-8 py-4 text-[12px] tracking-[0.22em] font-bold uppercase text-[#0a0a0a] hover:opacity-90 transition-opacity"
            style={{ background: 'linear-gradient(90deg, #B49838, #D8AF73)' }}>
            Enviar Email <ArrowRight size={15} />
          </a>
        </div>
      </section>

      <Footer />
      <FloatingChat />
    </div>
  );
};

export default Contactos;
