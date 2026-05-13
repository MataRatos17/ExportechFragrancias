import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, ChevronUp, Shield, Eye, Lock, Database, Mail, Globe, FileText } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const LAST_UPDATE = '15 de Janeiro de 2025';
const COMPANY     = 'Aroma Infinity, Lda.';
const NIF         = '513 XXX XXX';
const EMAIL_DPO   = 'privacidade@aromainfinity.pt';
const EMAIL_GERAL = 'geral@aromainfinity.pt';

const Section = ({ id, icon: Icon, title, children }) => {
  const [open, setOpen] = useState(true);
  return (
    <div id={id} className="border border-[#C0C0C0]/10 overflow-hidden">
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between px-8 py-6 text-left group hover:bg-[#141414] transition-colors"
      >
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 flex items-center justify-center flex-shrink-0"
               style={{ background: 'rgba(180,152,56,0.12)', color: '#D8AF73' }}>
            <Icon size={18} />
          </div>
          <h2 className="font-display text-[#C0C0C0] text-[18px] font-black uppercase tracking-tight">{title}</h2>
        </div>
        {open
          ? <ChevronUp size={18} className="text-[#888888] group-hover:text-[#D8AF73] transition-colors flex-shrink-0" />
          : <ChevronDown size={18} className="text-[#888888] group-hover:text-[#D8AF73] transition-colors flex-shrink-0" />}
      </button>
      {open && (
        <div className="px-8 pb-8 pt-2 space-y-4 text-[#888888] text-[15px] leading-[1.8]">
          {children}
        </div>
      )}
    </div>
  );
};

const Li = ({ children }) => (
  <li className="flex items-start gap-3">
    <span className="mt-2 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: '#D8AF73' }} />
    <span>{children}</span>
  </li>
);

const Right = ({ title, children }) => (
  <div className="bg-[#0a0a0a] border border-[#C0C0C0]/10 p-5 hover:border-[#D8AF73]/30 transition-colors">
    <p className="text-[#C0C0C0] font-bold text-[13px] uppercase tracking-wider mb-2">{title}</p>
    <p className="text-[#888888] text-[13px] leading-relaxed">{children}</p>
  </div>
);

const PoliticaPrivacidade = () => (
  <div className="min-h-screen bg-[#0a0a0a]">
    <Header />

    {/* ── HERO ── */}
    <section className="bg-[#050505] pt-44 pb-16 px-6 border-b border-[#C0C0C0]/10">
      <div className="max-w-[900px] mx-auto">
        <p className="text-[13px] tracking-[0.3em] font-bold uppercase mb-5" style={{ color: '#D8AF73' }}>
          Documentos Legais
        </p>
        <h1 className="font-display text-[#C0C0C0] text-[46px] md:text-[66px] font-black uppercase leading-[0.92] tracking-tight mb-6">
          Política de<br />Privacidade
        </h1>
        <p className="text-[#888888] text-[16px] leading-[1.8] max-w-2xl mb-8">
          A {COMPANY} respeita a sua privacidade e está comprometida com a proteção dos seus dados pessoais.
          Esta política descreve como recolhemos, utilizamos e protegemos as suas informações.
        </p>
        <div className="flex flex-wrap gap-4 items-center text-[13px] text-[#888888]">
          <span className="flex items-center gap-2">
            <FileText size={14} style={{ color: '#D8AF73' }} />
            Última atualização: <strong className="text-[#C0C0C0]">{LAST_UPDATE}</strong>
          </span>
          <span className="flex items-center gap-2">
            <Globe size={14} style={{ color: '#D8AF73' }} />
            Conforme RGPD — Regulamento (UE) 2016/679
          </span>
        </div>
      </div>
    </section>

    {/* ── ÍNDICE RÁPIDO ── */}
    <section className="bg-[#141414] py-10 px-6 border-b border-[#C0C0C0]/10">
      <div className="max-w-[900px] mx-auto">
        <p className="text-[11px] tracking-[0.25em] font-bold uppercase mb-5" style={{ color: '#D8AF73' }}>
          Índice
        </p>
        <div className="flex flex-wrap gap-3">
          {[
            ['#responsavel',   'Responsável'],
            ['#dados',         'Dados Recolhidos'],
            ['#finalidades',   'Finalidades'],
            ['#base-legal',    'Base Legal'],
            ['#retencao',      'Retenção'],
            ['#partilha',      'Partilha'],
            ['#direitos',      'Os seus Direitos'],
            ['#cookies',       'Cookies'],
            ['#seguranca',     'Segurança'],
            ['#alteracoes',    'Alterações'],
            ['#contacto',      'Contacto'],
          ].map(([href, label]) => (
            <a key={href} href={href}
              className="px-4 py-2 text-[11px] tracking-[0.15em] font-bold uppercase border border-[#C0C0C0]/10 text-[#888888] hover:border-[#D8AF73]/50 hover:text-[#C0C0C0] transition-colors">
              {label}
            </a>
          ))}
        </div>
      </div>
    </section>

    {/* ── CONTEÚDO ── */}
    <section className="bg-[#0a0a0a] py-16 px-6">
      <div className="max-w-[900px] mx-auto space-y-4">

        {/* 1. Responsável */}
        <Section id="responsavel" icon={Shield} title="1. Responsável pelo Tratamento">
          <p>O responsável pelo tratamento dos seus dados pessoais é:</p>
          <div className="bg-[#141414] border border-[#C0C0C0]/10 p-6 rounded-sm">
            <p className="text-[#C0C0C0] font-bold mb-3">{COMPANY}</p>
            <div className="space-y-1.5 text-[14px]">
              <p>NIF: {NIF}</p>
              <p>Sede: Rua Brito Capelo 910 Loja, 4450-069 Matosinhos, Portugal</p>
              <p>Email: <a href={`mailto:${EMAIL_GERAL}`} className="hover:text-[#C0C0C0] transition-colors" style={{ color: '#D8AF73' }}>{EMAIL_GERAL}</a></p>
              <p>Telefone: +351 913 335 318</p>
            </div>
          </div>
          <p>
            Para questões relacionadas com a proteção de dados, pode contactar o nosso Encarregado de Proteção de Dados (DPO) através de{' '}
            <a href={`mailto:${EMAIL_DPO}`} className="hover:text-[#C0C0C0] transition-colors font-semibold" style={{ color: '#D8AF73' }}>{EMAIL_DPO}</a>.
          </p>
        </Section>

        {/* 2. Dados Recolhidos */}
        <Section id="dados" icon={Database} title="2. Dados Pessoais Recolhidos">
          <p>Recolhemos os seguintes dados pessoais, consoante a interação com os nossos serviços:</p>
          <div className="space-y-4">
            <div>
              <p className="text-[#C0C0C0] font-semibold mb-2">2.1 Dados que nos fornece diretamente</p>
              <ul className="space-y-2">
                <Li>Nome completo e dados de identificação</Li>
                <Li>Endereço de e-mail e número de telefone</Li>
                <Li>Morada de faturação e entrega</Li>
                <Li>Dados da empresa (nome, NIF, cargo) quando aplicável</Li>
                <Li>Mensagens e comunicações enviadas através dos nossos formulários</Li>
                <Li>Credenciais de acesso à conta (email e palavra-passe cifrada)</Li>
              </ul>
            </div>
            <div>
              <p className="text-[#C0C0C0] font-semibold mb-2">2.2 Dados recolhidos automaticamente</p>
              <ul className="space-y-2">
                <Li>Endereço IP e dados de geolocalização aproximada</Li>
                <Li>Tipo e versão de browser e sistema operativo</Li>
                <Li>Páginas visitadas, tempo de permanência e origem do acesso</Li>
                <Li>Identificadores de cookies e tecnologias similares</Li>
              </ul>
            </div>
            <div>
              <p className="text-[#C0C0C0] font-semibold mb-2">2.3 Dados de transações</p>
              <ul className="space-y-2">
                <Li>Histórico de encomendas e produtos adquiridos</Li>
                <Li>Dados de pagamento (processados por entidades certificadas PCI-DSS — não armazenamos dados de cartão)</Li>
                <Li>Comunicações de suporte pós-venda</Li>
              </ul>
            </div>
          </div>
          <p className="text-[13px] bg-[#141414] border border-[#D8AF73]/20 p-4">
            <strong className="text-[#C0C0C0]">Nota:</strong> Não recolhemos dados de categorias especiais (ex.: dados de saúde, origem étnica, opiniões políticas) e não tratamos dados de menores de 16 anos sem consentimento do tutor legal.
          </p>
        </Section>

        {/* 3. Finalidades */}
        <Section id="finalidades" icon={Eye} title="3. Finalidades do Tratamento">
          <p>Os seus dados pessoais são utilizados para as seguintes finalidades:</p>
          <ul className="space-y-2">
            <Li><strong className="text-[#C0C0C0]">Gestão de conta:</strong> Criação, manutenção e segurança da sua conta de utilizador.</Li>
            <Li><strong className="text-[#C0C0C0]">Processamento de encomendas:</strong> Gestão de compras, faturação, entrega e pós-venda.</Li>
            <Li><strong className="text-[#C0C0C0]">Comunicação:</strong> Resposta a pedidos de informação, reclamações e suporte ao cliente.</Li>
            <Li><strong className="text-[#C0C0C0]">Newsletter:</strong> Envio de comunicações comerciais, mediante consentimento expresso e revogável.</Li>
            <Li><strong className="text-[#C0C0C0]">Melhoria do serviço:</strong> Análise estatística anónima do comportamento de navegação para otimização do website.</Li>
            <Li><strong className="text-[#C0C0C0]">Obrigações legais:</strong> Cumprimento de obrigações fiscais, contabilísticas e regulatórias.</Li>
            <Li><strong className="text-[#C0C0C0]">Segurança:</strong> Prevenção de fraude, acesso não autorizado e outros riscos de segurança.</Li>
          </ul>
        </Section>

        {/* 4. Base Legal */}
        <Section id="base-legal" icon={FileText} title="4. Base Legal do Tratamento">
          <p>O tratamento dos seus dados assenta nas seguintes bases legais previstas no RGPD:</p>
          <div className="grid sm:grid-cols-2 gap-3">
            {[
              { base: 'Execução de contrato', art: 'Art. 6.º, n.º 1, al. b)', desc: 'Processamento de encomendas e gestão da relação contratual.' },
              { base: 'Consentimento',         art: 'Art. 6.º, n.º 1, al. a)', desc: 'Newsletter e cookies não essenciais. Revogável a qualquer momento.' },
              { base: 'Obrigação legal',        art: 'Art. 6.º, n.º 1, al. c)', desc: 'Cumprimento de obrigações fiscais e contabilísticas.' },
              { base: 'Interesse legítimo',     art: 'Art. 6.º, n.º 1, al. f)', desc: 'Segurança do website, prevenção de fraude e melhoria do serviço.' },
            ].map(({ base, art, desc }) => (
              <div key={base} className="bg-[#141414] border border-[#C0C0C0]/10 p-5">
                <p className="font-bold text-[#C0C0C0] text-[13px] mb-1">{base}</p>
                <p className="text-[12px] mb-2" style={{ color: '#D8AF73' }}>{art}</p>
                <p className="text-[13px]">{desc}</p>
              </div>
            ))}
          </div>
        </Section>

        {/* 5. Retenção */}
        <Section id="retencao" icon={Lock} title="5. Período de Retenção">
          <p>Conservamos os seus dados apenas pelo tempo necessário para as finalidades descritas:</p>
          <ul className="space-y-2">
            <Li><strong className="text-[#C0C0C0]">Dados de conta:</strong> Durante a vigência da conta e por um período adicional de 3 anos após o encerramento.</Li>
            <Li><strong className="text-[#C0C0C0]">Dados de faturação e encomendas:</strong> 10 anos, em conformidade com a legislação fiscal e contabilística portuguesa.</Li>
            <Li><strong className="text-[#C0C0C0]">Comunicações de suporte:</strong> 3 anos a partir da última interação.</Li>
            <Li><strong className="text-[#C0C0C0]">Newsletter (consentimento):</strong> Até revogação do consentimento ou cessação da atividade de envio.</Li>
            <Li><strong className="text-[#C0C0C0]">Cookies analíticos:</strong> Máximo 13 meses, conforme orientações da CNIL/CNPD.</Li>
            <Li><strong className="text-[#C0C0C0]">Logs de segurança:</strong> 12 meses.</Li>
          </ul>
          <p>Após os períodos indicados, os dados são eliminados de forma segura ou anonimizados irreversivelmente.</p>
        </Section>

        {/* 6. Partilha */}
        <Section id="partilha" icon={Globe} title="6. Partilha de Dados com Terceiros">
          <p>Não vendemos nem cedemos os seus dados pessoais a terceiros para fins comerciais. Podemos partilhar dados nas seguintes circunstâncias:</p>
          <ul className="space-y-2">
            <Li><strong className="text-[#C0C0C0]">Prestadores de serviços:</strong> Empresas de logística e transporte, plataformas de pagamento certificadas (ex.: Stripe, Multibanco), serviços de alojamento e infraestrutura cloud, ferramentas de analytics (ex.: Google Analytics, configurado com anonimização de IP).</Li>
            <Li><strong className="text-[#C0C0C0]">Autoridades públicas:</strong> Quando exigido por lei, decisão judicial ou obrigação regulatória.</Li>
            <Li><strong className="text-[#C0C0C0]">Cedência empresarial:</strong> Em caso de fusão, aquisição ou reestruturação, com notificação prévia aos titulares dos dados.</Li>
          </ul>
          <p>Todos os subcontratantes são selecionados com garantias de conformidade com o RGPD e obrigados contratualmente a proteger os seus dados.</p>
          <p className="text-[13px] bg-[#141414] border border-[#D8AF73]/20 p-4">
            <strong className="text-[#C0C0C0]">Transferências internacionais:</strong> Caso ocorram transferências para fora do Espaço Económico Europeu, garantimos mecanismos adequados como Cláusulas Contratuais Tipo aprovadas pela Comissão Europeia.
          </p>
        </Section>

        {/* 7. Direitos */}
        <Section id="direitos" icon={Shield} title="7. Os seus Direitos">
          <p>Ao abrigo do RGPD, assiste-lhe o direito de:</p>
          <div className="grid sm:grid-cols-2 gap-3">
            <Right title="Acesso">Solicitar uma cópia dos seus dados pessoais que tratamos.</Right>
            <Right title="Retificação">Corrigir dados inexatos ou incompletos.</Right>
            <Right title="Apagamento">Solicitar a eliminação dos seus dados ("direito ao esquecimento"), dentro dos limites legais.</Right>
            <Right title="Limitação">Restringir o tratamento dos seus dados em determinadas circunstâncias.</Right>
            <Right title="Portabilidade">Receber os seus dados em formato estruturado e de leitura automática.</Right>
            <Right title="Oposição">Opor-se ao tratamento baseado em interesse legítimo ou para fins de marketing.</Right>
            <Right title="Retirar Consentimento">Revogar o consentimento a qualquer momento, sem prejuízo da licitude do tratamento anterior.</Right>
            <Right title="Reclamação">Apresentar reclamação à autoridade de controlo (CNPD — cnpd.pt).</Right>
          </div>
          <p>
            Para exercer qualquer um destes direitos, contacte-nos através de{' '}
            <a href={`mailto:${EMAIL_DPO}`} className="font-semibold hover:text-[#C0C0C0] transition-colors" style={{ color: '#D8AF73' }}>{EMAIL_DPO}</a>.
            Responderemos no prazo de 30 dias.
          </p>
        </Section>

        {/* 8. Cookies */}
        <Section id="cookies" icon={Database} title="8. Política de Cookies">
          <p>Utilizamos cookies e tecnologias similares para melhorar a sua experiência. Os cookies podem ser:</p>
          <div className="space-y-3">
            {[
              {
                tipo: 'Essenciais', always: true,
                desc: 'Necessários para o funcionamento do website (ex.: sessão de utilizador, carrinho de compras, preferências de cookies). Não podem ser desativados.',
                exemplos: 'session_id, csrf_token, cookie_consent',
              },
              {
                tipo: 'Analíticos', always: false,
                desc: 'Ajudam-nos a compreender como os visitantes interagem com o website (ex.: páginas mais visitadas, tempo de sessão). Utilizamos o Google Analytics com anonimização de IP ativada.',
                exemplos: '_ga, _gid, _gat',
              },
              {
                tipo: 'Marketing', always: false,
                desc: 'Utilizados para personalizar anúncios e medir a eficácia de campanhas. Apenas ativados com o seu consentimento explícito.',
                exemplos: '_fbp, _gcl_au',
              },
            ].map(({ tipo, always, desc, exemplos }) => (
              <div key={tipo} className="bg-[#141414] border border-[#C0C0C0]/10 p-6">
                <div className="flex items-center gap-3 mb-3">
                  <p className="text-[#C0C0C0] font-bold">{tipo}</p>
                  {always && (
                    <span className="text-[10px] tracking-[0.15em] font-bold uppercase px-2 py-0.5"
                          style={{ background: 'rgba(180,152,56,0.2)', color: '#D8AF73' }}>
                      Sempre Ativo
                    </span>
                  )}
                </div>
                <p className="text-[14px] mb-2">{desc}</p>
                <p className="text-[12px] text-[#888888] font-mono">Cookies: {exemplos}</p>
              </div>
            ))}
          </div>
          <p>Pode gerir as suas preferências de cookies a qualquer momento através do banner de cookies ou nas definições do seu browser.</p>
        </Section>

        {/* 9. Segurança */}
        <Section id="seguranca" icon={Lock} title="9. Segurança dos Dados">
          <p>Implementamos medidas técnicas e organizativas adequadas para proteger os seus dados contra acesso não autorizado, alteração, divulgação ou destruição:</p>
          <ul className="space-y-2">
            <Li>Transmissão cifrada via HTTPS/TLS em todas as comunicações.</Li>
            <Li>Palavras-passe armazenadas com hash seguro (bcrypt).</Li>
            <Li>Acesso interno restrito por princípio do mínimo privilégio.</Li>
            <Li>Monitorização contínua de segurança e registos de auditoria.</Li>
            <Li>Backups regulares em infraestrutura geograficamente distribuída.</Li>
            <Li>Formação periódica dos colaboradores em proteção de dados.</Li>
          </ul>
          <p>
            Em caso de violação de dados que possa afetar os seus direitos, notificaremos a CNPD no prazo de 72 horas e informaremos os titulares afetados sem demora injustificada, conforme exigido pelo RGPD.
          </p>
        </Section>

        {/* 10. Alterações */}
        <Section id="alteracoes" icon={FileText} title="10. Alterações a esta Política">
          <p>
            Podemos atualizar esta Política de Privacidade periodicamente para refletir alterações nos nossos serviços, na legislação aplicável ou nas nossas práticas de privacidade.
          </p>
          <p>
            A versão mais recente estará sempre disponível nesta página. Em caso de alterações significativas, notificamo-lo através de:
          </p>
          <ul className="space-y-2">
            <Li>Notificação por email para os utilizadores registados.</Li>
            <Li>Aviso destacado no website.</Li>
          </ul>
          <p>
            A data da última atualização está indicada no topo deste documento. A continuação da utilização dos nossos serviços após as alterações implica a aceitação da versão atualizada.
          </p>
        </Section>

        {/* 11. Contacto */}
        <Section id="contacto" icon={Mail} title="11. Contacto e Reclamações">
          <p>Para qualquer questão relacionada com a proteção dos seus dados pessoais:</p>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="bg-[#141414] border border-[#C0C0C0]/10 p-6">
              <p className="text-[#C0C0C0] font-bold mb-3">Encarregado de Proteção de Dados</p>
              <a href={`mailto:${EMAIL_DPO}`} className="block font-semibold hover:text-[#C0C0C0] transition-colors mb-1" style={{ color: '#D8AF73' }}>{EMAIL_DPO}</a>
              <p className="text-[13px]">Resposta em até 30 dias úteis.</p>
            </div>
            <div className="bg-[#141414] border border-[#C0C0C0]/10 p-6">
              <p className="text-[#C0C0C0] font-bold mb-3">Autoridade de Supervisão</p>
              <p className="text-[14px] mb-1">Comissão Nacional de Proteção de Dados (CNPD)</p>
              <a href="https://www.cnpd.pt" target="_blank" rel="noreferrer" className="hover:text-[#C0C0C0] transition-colors text-[13px]" style={{ color: '#D8AF73' }}>www.cnpd.pt</a>
            </div>
          </div>
        </Section>

      </div>
    </section>

    {/* ── CTA ── */}
    <section className="bg-[#050505] py-16 px-6 border-t border-[#C0C0C0]/10">
      <div className="max-w-[900px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
        <div>
          <p className="text-[#C0C0C0] font-bold text-[16px] mb-1">Tem dúvidas sobre a sua privacidade?</p>
          <p className="text-[#888888] text-[14px]">A nossa equipa está disponível para o ajudar.</p>
        </div>
        <div className="flex gap-3 flex-shrink-0">
          <Link to="/contactos"
            className="inline-flex items-center gap-2 px-7 py-3 text-[12px] tracking-[0.22em] font-bold uppercase transition-opacity hover:opacity-90 text-[#0a0a0a]"
            style={{ background: 'linear-gradient(90deg, #B49838, #D8AF73)' }}>
            Contactar
          </Link>
          <a href={`mailto:${EMAIL_DPO}`}
            className="inline-flex items-center gap-2 border border-[#C0C0C0]/20 hover:border-[#D8AF73]/50 text-[#C0C0C0] hover:text-[#D8AF73] px-7 py-3 text-[12px] tracking-[0.22em] font-bold uppercase transition-colors">
            Enviar Email
          </a>
        </div>
      </div>
    </section>

    <Footer />
  </div>
);

export default PoliticaPrivacidade;
