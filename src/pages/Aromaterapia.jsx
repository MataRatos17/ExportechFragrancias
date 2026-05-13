import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight, Leaf, Brain, Heart, Wind, Sun, Moon, Shield, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import FloatingChat from '../components/FloatingChat';

const beneficios = [
  { Icon: Brain, title: 'Memória & Concentração', desc: 'Aromas como alecrim e hortelã-pimenta estimulam a actividade cognitiva, melhoram a memória de curto prazo e aumentam o foco e a atenção.' },
  { Icon: Heart, title: 'Equilíbrio Emocional', desc: 'Lavanda, bergamota e ylang-ylang regulam o cortisol e activam neurotransmissores que promovem a sensação de calma e bem-estar.' },
  { Icon: Zap, title: 'Energia & Vitalidade', desc: 'Cítricos como limão, laranja e toranja estimulam o sistema nervoso simpático, aumentando os níveis de energia e combatendo a fadiga.' },
  { Icon: Moon, title: 'Descanso & Sono', desc: 'Camomila, lavanda e sândalo actuam no sistema parassimpático, preparando o corpo e a mente para um descanso profundo e reparador.' },
  { Icon: Shield, title: 'Imunidade & Protecção', desc: 'Eucalipto, árvore-do-chá e rravintsara têm propriedades antimicrobianas e imunoestimulantes reconhecidas pela investigação científica.' },
  { Icon: Wind, title: 'Respiração & Vitalidade', desc: 'Óleos como eucalipto, pinho e cedro desobstruem as vias respiratórias, facilitam a respiração e oxigenam os espaços de forma natural.' },
];

const oleos = [
  { nome: 'Lavanda', familia: 'Floral', efeito: 'Calmante · Anti-stress', img: 'https://images.pexels.com/photos/4041392/pexels-photo-4041392.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=400&w=400' },
  { nome: 'Eucalipto', familia: 'Fresco', efeito: 'Respiratório · Energizante', img: 'https://images.unsplash.com/photo-1547887538-047d3a9c21c0?auto=format&fit=crop&w=400&q=80' },
  { nome: 'Bergamota', familia: 'Cítrico', efeito: 'Equilibrante · Anti-ansiedade', img: 'https://images.pexels.com/photos/1346155/pexels-photo-1346155.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=400&w=400' },
  { nome: 'Sândalo', familia: 'Amadeirado', efeito: 'Meditativo · Sensual', img: 'https://images.unsplash.com/photo-1647934174425-61136513aed7?auto=format&fit=crop&w=400&q=80' },
  { nome: 'Ylang-Ylang', familia: 'Floral', efeito: 'Afrodisíaco · Relaxante', img: 'https://images.pexels.com/photos/931177/pexels-photo-931177.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=400&w=400' },
  { nome: 'Hortelã-Pimenta', familia: 'Fresco', efeito: 'Estimulante · Digestivo', img: 'https://images.pexels.com/photos/1374064/pexels-photo-1374064.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=400&w=400' },
];

const CountUp = ({ end, suffix = '', visible, slow = false, accelerate = false }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!visible) {
      setCount(0);
      return;
    }

    let startTimestamp = null;
    // Duração: 4s para os números lentos, 2.5s para os 3500 anos
    const duration = slow ? 4000 : 2500;

    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);

      // Curva de aceleração para os 3500 anos (Ease In)
      const easeProgress = accelerate ? progress * progress : progress;

      setCount(Math.floor(easeProgress * end));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };

    window.requestAnimationFrame(step);
  }, [end, visible, slow, accelerate]);

  return <span>{count.toLocaleString()}{suffix}</span>;
};

const FAQItem = ({ q, a }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-[#C0C0C0]/10 hover:border-[#D8AF73]/25 transition-colors">
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-start justify-between px-6 py-5 text-left gap-4 group"
      >
        <p className="text-[#C0C0C0] font-semibold text-[14px] group-hover:text-[#D8AF73] transition-colors">{q}</p>
        <span className="text-[#D8AF73] text-[20px] leading-none flex-shrink-0 mt-0.5">{open ? '−' : '+'}</span>
      </button>
      {open && (
        <div className="px-6 pb-6">
          <p className="text-[#888888] text-[14px] leading-[1.8]">{a}</p>
        </div>
      )}
    </div>
  );
};

const Aromaterapia = () => {
  const [historyVisible, setHistoryVisible] = useState(false);
  const [beneficiosVisible, setBeneficiosVisible] = useState(false);
  const [statsVisible, setStatsVisible] = useState(false);

  const historyRef = useRef(null);
  const beneficiosRef = useRef(null);
  const statsRef = useRef(null);

  useEffect(() => {
    const options = { threshold: 0.15 };

    // Callback que activa e desactiva para permitir a repetição infinita no scroll
    const handleIntersect = (setter) => (entries) => {
      entries.forEach(entry => {
        setter(entry.isIntersecting);
      });
    };

    const hObs = new IntersectionObserver(handleIntersect(setHistoryVisible), options);
    const bObs = new IntersectionObserver(handleIntersect(setBeneficiosVisible), options);
    const sObs = new IntersectionObserver(handleIntersect(setStatsVisible), options);

    if (historyRef.current) hObs.observe(historyRef.current);
    if (beneficiosRef.current) bObs.observe(beneficiosRef.current);
    if (statsRef.current) sObs.observe(statsRef.current);

    return () => {
      hObs.disconnect();
      bObs.disconnect();
      sObs.disconnect();
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <Header />

      {/* ── HERO ── */}
      <section className="relative bg-[#050505] pt-44 pb-0 overflow-hidden border-b border-[#C0C0C0]/10">
        <div className="max-w-[1400px] mx-auto px-6 grid lg:grid-cols-2 gap-0 items-end">
          <div className="pb-20">
            <p className="text-[#D8AF73] text-[13px] tracking-[0.3em] font-bold uppercase mb-5">Sobre</p>
            <h1 className="font-display text-[#C0C0C0] text-[48px] md:text-[72px] font-black uppercase leading-[0.92] tracking-tight mb-7">
              O que é a<br /><span style={{ color: '#D8AF73' }}>Aromaterapia</span>
            </h1>
            <p className="text-[#888888] text-[17px] leading-[1.8] max-w-xl mb-10">
              A aromaterapia é a ciência e arte de utilizar óleos essenciais naturais para promover o equilíbrio físico, emocional e mental. Uma prática milenar validada pela investigação moderna.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link to="/fragrancias"
                className="inline-flex items-center gap-3 px-8 py-4 text-[12px] tracking-[0.25em] font-bold uppercase transition-all hover:gap-5 group text-[#0a0a0a] hover:opacity-90"
                style={{ background: 'linear-gradient(90deg, #B49838, #D8AF73)' }}>
                Ver Fragrâncias <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
              </Link>
              <Link to="/contactos"
                className="inline-flex items-center gap-3 border border-[#C0C0C0]/25 hover:border-[#D8AF73]/50 text-[#C0C0C0] hover:text-[#D8AF73] px-8 py-4 text-[12px] tracking-[0.25em] font-bold uppercase transition-all">
                Fale Connosco
              </Link>
            </div>
          </div>
          <div className="hidden lg:block h-[520px] relative">
            <img
              src="https://images.pexels.com/photos/6694130/pexels-photo-6694130.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=900&w=900"
              alt="Aromaterapia"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-l from-transparent to-[#050505]/40" />
          </div>
        </div>
      </section>

      {/* ── O QUE É (HISTÓRIA COM CONTAGEM ACELERADA) ── */}
      <section className="bg-[#0a0a0a] py-24 px-6" ref={historyRef}>
        <div className="max-w-[1400px] mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1608571424634-58ae03e6edcf?auto=format&fit=crop&w=900&q=80"
              alt="Óleos essenciais"
              className="w-full aspect-[4/3] object-cover"
            />
            <div className="absolute -bottom-5 -right-5 bg-[#141414] border border-[#D8AF73]/25 p-6 max-w-[220px]">
              <p className="text-[#D8AF73] font-black text-[36px] leading-none mb-1">
                <CountUp end={3500} visible={historyVisible} accelerate={true} />
              </p>
              <p className="text-[#888888] text-[12px] tracking-wider uppercase">Anos de história</p>
            </div>
          </div>
          <div>
            <p className="text-[#D8AF73] text-[12px] tracking-[0.3em] font-bold uppercase mb-4">A Origem</p>
            <h2 className="font-display text-[#C0C0C0] text-[34px] md:text-[44px] font-black uppercase leading-[1] tracking-tight mb-6">
              Uma ciência milenar,<br />uma abordagem moderna
            </h2>
            <div className="space-y-4 text-[#888888] text-[15px] leading-[1.8]">
              <p>
                Os egípcios usavam óleos aromáticos em rituais, medicina e embalsamamento há mais de 3.500 anos. Na Grécia Antiga, Hipócrates prescrevia banhos perfumados como tratamento. Na China, os textos médicos de há 4.000 anos descrevem propriedades terapêuticas de plantas aromáticas.
              </p>
              <p>
                O termo <em className="text-[#C0C0C0]">aromaterapia</em> foi cunhado em 1937 pelo químico francês René-Maurice Gattefossé, após descobrir as propriedades cicatrizantes do óleo de lavanda. Desde então, a investigação científica validou aquilo que as civilizações antigas intuíam: os aromas têm um impacto real, mensurável e profundo no nosso estado físico e emocional.
              </p>
              <p>
                Hoje, a aromaterapia é utilizada em contextos clínicos, hoteleiros, de bem-estar e negócio — como ferramenta de marketing olfativo que diferencia espaços, fideliza clientes e melhora a qualidade de vida.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── COMO FUNCIONA ── */}
      <section className="bg-[#141414] py-24 px-6 border-t border-[#C0C0C0]/10">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center mb-16">
            <p className="text-[#D8AF73] text-[12px] tracking-[0.3em] font-bold uppercase mb-4">O Mecanismo</p>
            <h2 className="font-display text-[#C0C0C0] text-[36px] md:text-[50px] font-black uppercase leading-[1] tracking-tight">
              Como o aroma actua<br /><span style={{ color: '#D8AF73' }}>no cérebro e no corpo</span>
            </h2>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 mb-14">
            {[
              {
                step: '01', title: 'Inalação',
                desc: 'As moléculas aromáticas são inaladas e captadas pelos receptores olfativos localizados na parte superior da cavidade nasal — área com mais de 400 tipos de receptores sensoriais.'
              },
              {
                step: '02', title: 'Activação Límbica',
                desc: 'O sinal viaja pelo nervo olfativo directamente para o sistema límbico — o centro emocional do cérebro — activando respostas de memória, humor e comportamento em milissegundos.'
              },
              {
                step: '03', title: 'Resposta Fisiológica',
                desc: 'Dependendo do aroma, o hipotálamo liberta neurotransmissores como serotonina, dopamina e endorfinas, produzindo efeitos mensuráveis no humor, stress, pressão arterial e imunidade.'
              },
            ].map(({ step, title, desc }) => (
              <div key={step} className="bg-[#0a0a0a] border border-[#C0C0C0]/10 p-9 relative overflow-hidden hover:border-[#D8AF73]/30 transition-colors">
                <p className="font-black text-[80px] leading-none absolute -top-4 -right-2 opacity-[0.04]" style={{ color: '#D8AF73' }}>{step}</p>
                <p className="font-black text-[13px] tracking-[0.2em] uppercase mb-3" style={{ color: '#D8AF73' }}>{step}. {title}</p>
                <p className="text-[#888888] text-[14px] leading-[1.8]">{desc}</p>
              </div>
            ))}
          </div>

          {/* Vias de absorção */}
          <div className="bg-[#0a0a0a] border border-[#C0C0C0]/10 p-10">
            <div className="grid md:grid-cols-2 gap-10 items-center">
              <div>
                <p className="text-[#D8AF73] text-[12px] tracking-[0.25em] font-bold uppercase mb-3">Absorção Cutânea</p>
                <h3 className="font-display text-[#C0C0C0] text-[24px] font-black uppercase tracking-tight mb-4">
                  A pele como portal
                </h3>
                <p className="text-[#888888] text-[14px] leading-[1.8]">
                  Para além da inalação, os óleos essenciais penetram na corrente sanguínea através da pele, especialmente quando aplicados com diluição adequada em massagem. Esta via permite uma acção sistémica mais prolongada e profunda, com efeitos mensuráveis em até 20 minutos após a aplicação.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { via: 'Inalação', tempo: '30 seg', detalhe: 'Acção no sistema nervoso central' },
                  { via: 'Difusão', tempo: '2–5 min', detalhe: 'Saturação gradual do espaço' },
                  { via: 'Aplicação', tempo: '20 min', detalhe: 'Absorção cutânea sistémica' },
                  { via: 'Banho', tempo: '15 min', detalhe: 'Combinação cutânea e inalatória' },
                ].map(({ via, tempo, detalhe }) => (
                  <div key={via} className="bg-[#141414] border border-[#C0C0C0]/10 p-5 hover:border-[#D8AF73]/25 transition-colors">
                    <p className="text-[#C0C0C0] font-bold text-[13px] mb-1">{via}</p>
                    <p className="font-black text-[20px] leading-none mb-2" style={{ color: '#D8AF73' }}>{tempo}</p>
                    <p className="text-[#888888] text-[11px] leading-relaxed">{detalhe}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── BENEFÍCIOS (ANIMAÇÃO UM POR UM DE BAIXO PARA CIMA) ── */}
      <section className="bg-[#0a0a0a] py-24 px-6" ref={beneficiosRef}>
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center mb-14">
            <p className="text-[#D8AF73] text-[12px] tracking-[0.3em] font-bold uppercase mb-4">Benefícios</p>
            <h2 className="font-display text-[#C0C0C0] text-[36px] md:text-[50px] font-black uppercase leading-[1] tracking-tight">
              O que a aromaterapia<br /><span style={{ color: '#D8AF73' }}>pode fazer por si</span>
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {beneficios.map(({ Icon, title, desc }, index) => (
              <div
                key={title}
                className={`group bg-[#141414] border border-[#C0C0C0]/10 p-8 hover:border-[#D8AF73]/30 transition-all duration-700 transform
                  ${beneficiosVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
                style={{ transitionDelay: beneficiosVisible ? `${index * 150}ms` : '0ms' }}
              >
                <div className="w-12 h-12 flex items-center justify-center mb-5 bg-[#D8AF73]/10 text-[#D8AF73] group-hover:bg-[#D8AF73] group-hover:text-[#0a0a0a] transition-colors">
                  <Icon size={22} />
                </div>
                <h3 className="font-display text-[#C0C0C0] text-[16px] font-black uppercase tracking-tight mb-3">{title}</h3>
                <p className="text-[#888888] text-[13px] leading-[1.8]">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ESTATÍSTICAS (ANIMAÇÃO DE CIMA PARA BAIXO + CONTAGEM LENTA) ── */}
      <section ref={statsRef} className="bg-[#141414] py-20 px-6 border-t border-[#C0C0C0]/10">
        <div className="max-w-[1400px] mx-auto">
          <p className="text-center text-[#D8AF73] text-[12px] tracking-[0.3em] font-bold uppercase mb-10">Em Números</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {[
              { end: 85, suffix: '%', label: 'dos utilizadores reportam redução do stress' },
              { end: 40, suffix: '%', label: 'de melhoria no humor após 30 min de difusão' },
              { end: 75, suffix: '%', label: 'das emoções influenciadas pelo olfato' },
              { end: 3500, suffix: '', label: 'anos de uso documentado de aromaterapia' },
            ].map(({ end, suffix, label }, index) => (
              <div
                key={label}
                className={`bg-[#0a0a0a] border border-[#C0C0C0]/10 p-8 text-center hover:border-[#D8AF73]/25 transition-all duration-1000 transform
                  ${statsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-12'}`}
                style={{ transitionDelay: statsVisible ? `${index * 150}ms` : '0ms' }}
              >
                <p className="font-black text-[48px] leading-none mb-2" style={{ color: '#D8AF73' }}>
                  <CountUp end={end} suffix={suffix} visible={statsVisible} slow={true} />
                </p>
                <p className="text-[#888888] text-[12px] leading-relaxed">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ÓLEOS ESSENCIAIS ── */}
      <section className="bg-[#0a0a0a] py-24 px-6">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center mb-14">
            <p className="text-[#D8AF73] text-[12px] tracking-[0.3em] font-bold uppercase mb-4">Matéria-Prima</p>
            <h2 className="font-display text-[#C0C0C0] text-[36px] md:text-[50px] font-black uppercase leading-[1] tracking-tight">
              Óleos essenciais<br /><span style={{ color: '#D8AF73' }}>em destaque</span>
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {oleos.map(({ nome, familia, efeito, img }) => (
              <div key={nome} className="group flex gap-4 bg-[#141414] border border-[#C0C0C0]/10 p-5 hover:border-[#D8AF73]/30 transition-colors">
                <div className="w-20 h-20 flex-shrink-0 overflow-hidden">
                  <img src={img} alt={nome} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                </div>
                <div>
                  <p className="text-[10px] tracking-[0.2em] font-bold uppercase mb-1" style={{ color: '#D8AF73' }}>{familia}</p>
                  <h3 className="text-[#C0C0C0] font-black text-[16px] uppercase tracking-tight mb-1">{nome}</h3>
                  <p className="text-[#888888] text-[12px] italic">{efeito}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="bg-[#141414] py-24 px-6 border-t border-[#C0C0C0]/10">
        <div className="max-w-[900px] mx-auto">
          <div className="text-center mb-14">
            <p className="text-[#D8AF73] text-[12px] tracking-[0.3em] font-bold uppercase mb-4">Perguntas Frequentes</p>
            <h2 className="font-display text-[#C0C0C0] text-[34px] md:text-[44px] font-black uppercase leading-[1] tracking-tight">
              Tudo o que precisa de saber
            </h2>
          </div>
          <div className="space-y-2">
            <FAQItem
              q="A aromaterapia é segura para toda a gente?"
              a="De um modo geral, sim — quando utilizada correctamente. Crianças, grávidas e pessoas com determinadas condições de saúde devem consultar um profissional antes de usar óleos essenciais directamente. Para difusão ambiental em espaços abertos e ventilados, o risco é mínimo para a maioria das pessoas."
            />
            <FAQItem
              q="Qual é a diferença entre aromaterapia e perfumaria?"
              a="A perfumaria tem fins estéticos e emocionais, usando fragrâncias sintéticas e naturais. A aromaterapia foca-se em óleos essenciais 100% naturais com propriedades terapêuticas comprovadas. Na Infinity Air, combinamos ambas as disciplinas: fragrâncias que cheiram extraordinariamente bem e que, simultaneamente, produzem efeitos positivos mensuráveis."
            />
            <FAQItem
              q="Quanto tempo demora a sentir os efeitos?"
              a="Para efeitos imediatos no humor e stress, os primeiros resultados são perceptíveis em menos de 60 segundos após a inalação. Para efeitos mais profundos — como melhoria do sono ou redução da ansiedade crónica — recomenda-se um uso regular durante 2 a 4 semanas."
            />
            <FAQItem
              q="Os difusores InfinityAir preservam as propriedades terapêuticas?"
              a="Sim. Os nossos difusores utilizam tecnologia de nebulização a frio, que dispersa as moléculas aromáticas sem calor. O calor destrói os compostos activos dos óleos essenciais — a nebulização a frio preserva 100% das propriedades terapêuticas e da qualidade olfativa."
            />
            <FAQItem
              q="É possível usar aromaterapia num espaço de negócio?"
              a="Absolutamente. O marketing olfativo é uma das aplicações mais eficazes da aromaterapia em contexto empresarial. Hotels, spas, lojas, escritórios e restaurantes em todo o mundo utilizam fragrâncias cuidadosamente seleccionadas para melhorar a experiência do cliente, aumentar o tempo de permanência e reforçar a identidade da marca."
            />
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-[#050505] py-20 px-6 border-t border-[#C0C0C0]/10">
        <div className="max-w-[900px] mx-auto text-center">
          <Leaf size={36} className="mx-auto mb-6" style={{ color: '#D8AF73' }} />
          <h2 className="font-display text-[#C0C0C0] text-[34px] md:text-[46px] font-black uppercase leading-[1] tracking-tight mb-5">
            Pronto para transformar<br /><span style={{ color: '#D8AF73' }}>o seu espaço?</span>
          </h2>
          <p className="text-[#888888] text-[16px] leading-relaxed mb-10 max-w-xl mx-auto">
            Descubra as nossas fragrâncias exclusivas e os difusores profissionais que levam a aromaterapia ao próximo nível.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/fragrancias"
              className="inline-flex items-center gap-3 px-9 py-4 text-[12px] tracking-[0.25em] font-bold uppercase text-[#0a0a0a] hover:opacity-90 transition-opacity"
              style={{ background: 'linear-gradient(90deg, #B49838, #D8AF73)' }}>
              Ver Fragrâncias <ArrowRight size={15} />
            </Link>
            <Link to="/segmentos"
              className="inline-flex items-center gap-3 border border-[#C0C0C0]/25 hover:border-[#D8AF73]/50 text-[#C0C0C0] hover:text-[#D8AF73] px-9 py-4 text-[12px] tracking-[0.25em] font-bold uppercase transition-all">
              Ver Segmentos
            </Link>
          </div>
        </div>
      </section>

      <Footer />
      <FloatingChat />
    </div>
  );
};

export default Aromaterapia;