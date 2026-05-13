import React, { useState, useEffect, useRef } from 'react';
import { Hotel, Dumbbell, Shirt, House, Computer, PartyPopper, Sparkles, UtensilsCrossed, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import FloatingChat from '../components/FloatingChat';

const segments = [
  {
    title: 'Hotéis',
    icon: Hotel,
    image: 'https://images.pexels.com/photos/6466490/pexels-photo-6466490.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=900&w=900',
    desc: 'Um aroma exclusivo aumenta a satisfação dos hóspedes em 40% e desperta memórias afectivas que os fazem regressar. O seu hotel merece uma identidade olfativa que nenhum outro tem.',
    stat: '+40%', statLabel: 'satisfação dos hóspedes',
  },
  {
    title: 'Ginásios',
    icon: Dumbbell,
    image: 'https://images.pexels.com/photos/29149073/pexels-photo-29149073.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=900&w=900',
    desc: 'Fragrâncias energizantes reduzem a percepção de esforço, melhoram o foco e prolongam o tempo de treino. Membros mais motivados são membros que renovam.',
    stat: '+15%', statLabel: 'tempo de treino',
  },
  {
    title: 'Retalho',
    icon: Shirt,
    image: 'https://images.pexels.com/photos/5531541/pexels-photo-5531541.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=900&w=900',
    desc: 'Lojas aromatizadas registam em média +20% no tempo de permanência e +15% nas vendas por impulso. O aroma certo é a estratégia de vendas mais discreta — e mais eficaz.',
    stat: '+20%', statLabel: 'tempo na loja',
  },
  {
    title: 'Residências Sénior',
    icon: House,
    image: 'https://images.pexels.com/photos/7545214/pexels-photo-7545214.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=900&w=900',
    desc: 'Fragrâncias terapêuticas reduzem a ansiedade e evocam memórias positivas em residentes. Um ambiente perfumado é sinónimo de cuidado, dignidade e bem-estar.',
    stat: '-30%', statLabel: 'níveis de ansiedade',
  },
  {
    title: 'Escritórios',
    icon: Computer,
    image: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=900&q=80',
    desc: 'Espaços de trabalho aromatizados registam até 15% mais produtividade e redução significativa do stress. O aroma certo transforma a energia de toda a equipa.',
    stat: '+15%', statLabel: 'produtividade',
  },
  {
    title: 'Eventos',
    icon: PartyPopper,
    image: 'https://images.pexels.com/photos/16985130/pexels-photo-16985130.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=900&w=900',
    desc: 'Um evento tem música, tem visual — mas o aroma é o que fica. Fragrâncias personalizadas criam experiências imersivas que os convidados recordam anos depois.',
    stat: '85%', statLabel: 'recordação da experiência',
  },
  {
    title: 'Spas',
    icon: Sparkles,
    image: 'https://images.unsplash.com/photo-1610289982320-3891f7c9fd6d?auto=format&fit=crop&w=900&q=80',
    desc: 'No spa, o olfato é o primeiro sentido a relaxar. As fragrâncias certas amplificam cada tratamento e transformam uma visita numa experiência verdadeiramente terapêutica.',
    stat: '+35%', statLabel: 'valor percebido',
  },
  {
    title: 'Restaurantes',
    icon: UtensilsCrossed,
    image: 'https://images.pexels.com/photos/35420084/pexels-photo-35420084.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=900&w=900',
    desc: 'O aroma complementa o sabor e prepara o paladar antes do primeiro garfo. Restaurantes com identidade olfativa são recordados, recomendados e revisitados.',
    stat: '+25%', statLabel: 'taxa de recomendação',
  },
];

const Segmentos = () => {
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.1 });
    obs.observe(node);
    return () => obs.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <Header />

      {/* ── HERO ── */}
      <section className="bg-[#050505] pt-44 pb-20 px-6 border-b border-[#C0C0C0]/10">
        <div className="max-w-[1400px] mx-auto text-center">
          <p className="text-[#D8AF73] text-[13px] tracking-[0.3em] font-bold uppercase mb-5">
            Marketing Olfativo
          </p>
          <h1 className="font-display text-[#C0C0C0] text-[46px] md:text-[72px] font-black uppercase leading-[0.92] tracking-tight mb-7">
            O aroma certo<br />para cada negócio
          </h1>
          <p className="text-[#888888] text-[17px] leading-[1.8] max-w-3xl mx-auto">
            O olfato é o sentido que mais directamente activa a memória e as emoções. Um espaço com identidade olfativa diferencia-se, cria laços e converte visitantes em clientes fiéis.
          </p>
        </div>
      </section>

      {/* ── GRID DE SEGMENTOS ── */}
      <section ref={sectionRef} className="bg-[#0a0a0a] py-20 px-6">
        <div className="max-w-[1400px] mx-auto grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {segments.map(({ title, icon: Icon, image, desc, stat, statLabel }, idx) => (
            <div
              key={title}
              className="group relative overflow-hidden bg-[#141414] border border-[#C0C0C0]/10 hover:border-[#D8AF73]/35 transition-all duration-500"
              style={{
                opacity:    visible ? 1 : 0,
                transform:  visible ? 'translateY(0)' : 'translateY(24px)',
                transition: `opacity 0.6s ease ${idx * 80}ms, transform 0.6s ease ${idx * 80}ms, border-color 0.3s`,
              }}
            >
              {/* Imagem */}
              <div className="relative h-52 overflow-hidden">
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                  style={{ backgroundImage: `url(${image})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-black/40 to-transparent" />

                {/* Icon no topo */}
                <div className="absolute top-4 left-4 w-10 h-10 bg-[#0a0a0a]/70 backdrop-blur flex items-center justify-center"
                     style={{ color: '#D8AF73' }}>
                  <Icon size={20} />
                </div>

                {/* Stat */}
                <div className="absolute bottom-4 right-4 text-right">
                  <p className="font-black text-[28px] leading-none" style={{ color: '#D8AF73' }}>{stat}</p>
                  <p className="text-[#C0C0C0]/70 text-[10px] tracking-wider uppercase leading-tight">{statLabel}</p>
                </div>
              </div>

              {/* Texto */}
              <div className="p-6">
                <h3 className="font-display text-[#C0C0C0] text-[18px] font-black uppercase tracking-tight mb-3">
                  {title}
                </h3>
                <p className="text-[#888888] text-[13px] leading-[1.75]">
                  {desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── PORQUE FUNCIONA ── */}
      <section className="bg-[#141414] py-20 px-6 border-t border-[#C0C0C0]/10">
        <div className="max-w-[1400px] mx-auto grid lg:grid-cols-2 gap-14 items-center">
          <div>
            <p className="text-[#D8AF73] text-[12px] tracking-[0.3em] font-bold uppercase mb-4">A Ciência por Trás</p>
            <h2 className="font-display text-[#C0C0C0] text-[36px] md:text-[46px] font-black uppercase leading-[1] tracking-tight mb-6">
              Porque é que o aroma<br /><span style={{ color: '#D8AF73' }}>transforma negócios</span>
            </h2>
            <p className="text-[#888888] text-[15px] leading-[1.8] mb-5">
              O nervo olfativo é o único sentido com ligação directa ao sistema límbico — o centro das emoções e da memória do cérebro. Enquanto outros estímulos são processados racionalmente, os aromas activam respostas emocionais em milissegundos.
            </p>
            <p className="text-[#888888] text-[15px] leading-[1.8] mb-8">
              Isto significa que a fragrância do seu espaço influencia como os clientes se sentem, quanto tempo ficam, o que compram e — mais importante — se voltam.
            </p>
            <Link
              to="/aromaterapia"
              className="inline-flex items-center gap-3 px-8 py-4 text-[12px] tracking-[0.25em] font-bold uppercase transition-all hover:gap-5 group text-[#0a0a0a] hover:opacity-90"
              style={{ background: 'linear-gradient(90deg, #B49838, #D8AF73)' }}
            >
              O que é a Aromaterapia <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { n: '75%',   d: 'das emoções diárias são influenciadas pelo que cheiramos' },
              { n: '40%',   d: 'de melhoria no humor em espaços com aromas agradáveis' },
              { n: '2×',    d: 'mais probabilidade de revisitar um espaço com memória olfativa' },
              { n: '5 seg', d: 'é o tempo que o olfato leva a activar uma resposta emocional' },
            ].map(({ n, d }) => (
              <div key={n} className="bg-[#0a0a0a] border border-[#C0C0C0]/10 p-6 hover:border-[#D8AF73]/30 transition-colors">
                <p className="font-black text-[32px] leading-none mb-2" style={{ color: '#D8AF73' }}>{n}</p>
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
            Qual é o aroma<br /><span style={{ color: '#D8AF73' }}>do seu negócio?</span>
          </h2>
          <p className="text-[#888888] text-[16px] leading-relaxed mb-10 max-w-xl mx-auto">
            Fale connosco e descubra como uma identidade olfativa exclusiva pode transformar a experiência dos seus clientes.
          </p>
          <Link
            to="/contactos"
            className="inline-flex items-center gap-3 px-10 py-4 text-[12px] tracking-[0.25em] font-bold uppercase transition-all hover:gap-5 group text-[#0a0a0a] hover:opacity-90"
            style={{ background: 'linear-gradient(90deg, #B49838, #D8AF73)' }}
          >
            Fale Connosco <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </section>

      <Footer />
      <FloatingChat />
    </div>
  );
};

export default Segmentos;
