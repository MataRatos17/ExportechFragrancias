import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Mail, ArrowRight } from 'lucide-react';
import { useToast } from '../hooks/use-toast';
import emailjs from '@emailjs/browser';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [isSending, setIsSending] = useState(false);
  const { toast } = useToast();

  const subscribe = (e) => {
    e.preventDefault();
    if (!email) return;
    setIsSending(true);
    emailjs.send('service_kvcywcr', 'template_ftwxndl', { user_email: email, message: 'Subscrito na newsletter!' }, '7jAGRDldCRgvnhNuz')
      .then(() => {
        toast({ title: 'Subscrito com sucesso', description: `Confirmação enviada para ${email}` });
        setEmail('');
      })
      .catch(() => toast({ title: 'Erro no registo', description: 'Tente novamente mais tarde.', variant: 'destructive' }))
      .finally(() => setIsSending(false));
  };

  return (
    <footer className="bg-[#050505] text-[#C0C0C0] pt-20 pb-8 px-6 border-t border-[#C0C0C0]/10">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 pb-14">

          {/* Brand */}
          <div>
            <div className="flex items-center mb-6">
              <span className="text-[28px] font-black italic tracking-tight text-[#C0C0C0] leading-none">infinity</span>
              <span className="ml-1 text-[11px] font-extrabold tracking-[0.18em] bg-[#C0C0C0] text-[#0a0a0a] px-1.5 py-1 leading-none">AIR</span>
            </div>
            <p className="text-[#C0C0C0]/60 text-[14px] leading-relaxed max-w-[260px]">
              Fortalecemos o seu negócio com experiências sensoriais inesquecíveis.
            </p>
          </div>

          {/* Contacts — só Lisboa + email */}
          <div>
            <h4 className="text-[12px] tracking-[0.25em] font-bold uppercase mb-6 text-[#C0C0C0]">Contactos</h4>
            <div className="space-y-5 text-[14px] text-[#C0C0C0]/70">
              <div className="flex items-start gap-3">
                <MapPin size={15} className="mt-0.5 flex-shrink-0" style={{ color: '#D8AF73' }} />
                <div>
                  <p className="font-semibold text-[#C0C0C0] mb-0.5">Lisboa</p>
                  <p className="leading-relaxed">Rua Fernando Farinha nº 2A/2B<br />Braço de Prata, 1950-448 Lisboa</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail size={15} className="mt-0.5 flex-shrink-0" style={{ color: '#D8AF73' }} />
                <div>
                  <p className="font-semibold text-[#C0C0C0] mb-0.5">Email</p>
                  <a href="mailto:geral@aromainfinity.pt"
                     className="block hover:text-[#D8AF73] transition-colors">geral@aromainfinity.pt</a>
                  <a href="mailto:comercial@aromainfinity.pt"
                     className="block hover:text-[#D8AF73] transition-colors">comercial@aromainfinity.pt</a>
                </div>
              </div>
            </div>
          </div>

          {/* Info */}
          <div>
            <h4 className="text-[12px] tracking-[0.25em] font-bold uppercase mb-6 text-[#C0C0C0]">Informações</h4>
            <ul className="space-y-3 text-[14px]">
              {[
                { label: 'Sobre Nós',              href: '/sobre' },
                { label: 'O que é a Aromaterapia', href: '/aromaterapia' },
                { label: 'Segmentos',              href: '/segmentos' },
                { label: 'Fragrâncias',            href: '/fragrancias' },
                { label: 'Difusores',              href: '/difusores' },
                { label: 'Contactos',              href: '/contactos' },
                { label: 'Política de Privacidade',href: '/politica-de-privacidade' },
              ].map(l => (
                <li key={l.label}>
                  <Link to={l.href} className="text-[#C0C0C0]/70 hover:text-[#D8AF73] transition-colors">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-[12px] tracking-[0.25em] font-bold uppercase mb-6 text-[#C0C0C0]">Newsletter</h4>
            <p className="text-[#C0C0C0]/60 text-[14px] leading-relaxed mb-5">
              Mantenha-se a par das novidades e lançamentos da InfinityAir.
            </p>
            <form onSubmit={subscribe} className="flex flex-col gap-3">
              <input
                type="email" required value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="O seu email"
                className="bg-transparent border border-[#C0C0C0]/20 px-4 py-3 text-[14px] text-[#C0C0C0] placeholder-[#C0C0C0]/30 focus:outline-none focus:border-[#D8AF73] transition-colors"
              />
              <button type="submit" disabled={isSending}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 text-[11px] tracking-[0.25em] font-bold uppercase transition-opacity group disabled:opacity-50 text-[#0a0a0a] hover:opacity-90"
                style={{ background: 'linear-gradient(90deg, #B49838, #D8AF73)' }}>
                {isSending ? 'A processar...' : 'Subscrever'}
                {!isSending && <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />}
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-[#C0C0C0]/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-3 text-[12px] text-[#C0C0C0]/40">
          <p>© {new Date().getFullYear()} Aroma Infinity. Todos os direitos reservados.</p>
          <p>Marketing Olfativo Profissional · Lisboa · Portugal</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
