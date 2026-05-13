import React, { useState, useEffect } from 'react';
import { X, Cookie } from 'lucide-react';

const CookieConsent = () => {
  const [visible, setVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    const accepted = localStorage.getItem('cookies-accepted');
    if (!accepted) {
      const timer = setTimeout(() => setVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const accept = () => {
    localStorage.setItem('cookies-accepted', 'all');
    setVisible(false);
  };

  const decline = () => {
    localStorage.setItem('cookies-accepted', 'essential');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 animate-fade-in-up">
      <div className="bg-[#0a0a0a] border-t border-[#C0C0C0]/15 shadow-2xl px-6 py-5">
        <div className="max-w-[1400px] mx-auto flex flex-col sm:flex-row items-start sm:items-center gap-5">
          <div className="flex items-start gap-4 flex-1">
            <div className="w-10 h-10 flex-shrink-0 bg-[#C0C0C0]/10 text-[#C0C0C0] flex items-center justify-center rounded-full mt-0.5">
              <Cookie size={18} />
            </div>
            <div>
              <p className="text-[#C0C0C0] text-[14px] font-semibold mb-1">Utilizamos cookies</p>
              <p className="text-[#888888] text-[13px] leading-relaxed max-w-2xl">
                Usamos cookies para melhorar a sua experiência, analisar o tráfego e personalizar conteúdo.{' '}
                <button
                  onClick={() => setShowDetails(!showDetails)}
                  className="text-[#C0C0C0] hover:text-[#C0C0C0] underline transition-colors"
                >
                  {showDetails ? 'Menos detalhes' : 'Saber mais'}
                </button>
              </p>
              {showDetails && (
                <div className="mt-3 grid sm:grid-cols-3 gap-3 text-[12px]">
                  {[
                    { name: 'Essenciais', desc: 'Necessários para o funcionamento do site.', always: true },
                    { name: 'Analíticos', desc: 'Ajudam-nos a compreender como usa o site.', always: false },
                    { name: 'Marketing', desc: 'Usados para mostrar anúncios relevantes.', always: false },
                  ].map((c) => (
                    <div key={c.name} className="bg-[#141414] border border-[#C0C0C0]/10 p-3 rounded">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[#C0C0C0] font-bold">{c.name}</span>
                        {c.always && <span className="text-[10px] text-[#888888] bg-[#141414] px-2 py-0.5 rounded">Sempre ativo</span>}
                      </div>
                      <p className="text-[#888888]">{c.desc}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center gap-3 flex-shrink-0">
            <button
              onClick={decline}
              className="text-[13px] tracking-wider text-[#888888] hover:text-[#C0C0C0] font-semibold transition-colors px-4 py-2 border border-[#C0C0C0]/15 hover:border-[#C0C0C0]/40"
            >
              Só essenciais
            </button>
            <button
              onClick={accept}
              className="bg-[#C0C0C0] hover:bg-[#B49838] text-[#0a0a0a] px-6 py-2 text-[13px] tracking-[0.15em] font-bold uppercase transition-colors"
            >
              Aceitar todos
            </button>
            <button
              onClick={decline}
              className="text-[#888888] hover:text-[#C0C0C0] transition-colors"
              aria-label="Fechar"
            >
              <X size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
