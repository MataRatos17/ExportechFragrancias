import React, { useState, useEffect } from 'react';
import { MessageCircle, X } from 'lucide-react';

const FloatingChat = () => {
  const [open, setOpen] = useState(false);
  const [showHint, setShowHint] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowHint(true), 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3">
      {open && (
        <div className="bg-[#0a0a0a] rounded-lg shadow-2xl w-80 overflow-hidden border border-[#C0C0C0]/15 animate-fade-in-up">
          <div className="bg-[#050505] text-[#C0C0C0] px-5 py-4 flex items-center justify-between border-b border-[#C0C0C0]/10">
            <div>
              <p className="text-[12px] tracking-[0.2em] font-bold text-[#C0C0C0]">CONTACTE-NOS</p>
              <p className="text-[14px] text-[#C0C0C0]">Como podemos ajudar?</p>
            </div>
            <button onClick={() => setOpen(false)} className="text-[#C0C0C0] hover:text-[#C0C0C0] transition-colors">
              <X size={18} />
            </button>
          </div>
          <div className="p-5 space-y-3">
            <a
              href="https://web.whatsapp.com/send?phone=351914604417"
              target="_blank"
              rel="noreferrer"
              className="block w-full bg-[#D8AF73] hover:bg-[#B49838] text-[#0a0a0a] px-5 py-3 text-[13px] font-bold rounded text-center transition-colors"
            >
              Fale connosco no WhatsApp
            </a>
            <a
              href="contactos"
              className="block w-full bg-[#C0C0C0] hover:bg-[#B49838] text-[#0a0a0a] px-5 py-3 text-[13px] font-bold rounded text-center transition-colors"
            >
              Deixe-nos o seu contacto
            </a>
          </div>
        </div>
      )}

      <div className="flex items-center gap-3">
        {showHint && !open && (
          <span className="bg-[#0a0a0a] border border-[#C0C0C0]/15 text-[#C0C0C0] text-[12px] font-semibold px-4 py-2 rounded-full shadow-md animate-fade-in">
            Necessita de ajuda?
          </span>
        )}
        <button
          onClick={() => setOpen(!open)}
          className="w-14 h-14 bg-[#C0C0C0] hover:bg-[#B49838] text-[#0a0a0a] rounded-full shadow-lg flex items-center justify-center transition-all hover:scale-110 relative"
          aria-label="Open chat"
        >
          <MessageCircle size={22} />
          {!open && (
            <span className="absolute -top-1 -right-1 bg-[#B49838] text-[#C0C0C0] text-[10px] rounded-full w-5 h-5 flex items-center justify-center font-bold">1</span>
          )}
        </button>
      </div>
    </div>
  );
};

export default FloatingChat;
