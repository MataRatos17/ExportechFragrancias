import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext({ isDark: true, toggle: () => {} });

const LIGHT_CSS = `
  /* ── Fundos ────────────────────────────────────────────────── */
  html.light-mode body { background-color: #F5F1EA !important; color: #1A1A1A !important; }

  html.light-mode [class*="bg-[#0a0a0a]"] { background-color: #F5F1EA !important; }
  html.light-mode [class*="bg-[#050505]"] { background-color: #EAE6DE !important; }
  html.light-mode [class*="bg-[#141414]"] { background-color: #FFFFFF !important; }

  html.light-mode main,
  html.light-mode section { background-color: #F5F1EA !important; }

  /* Cards com sombra suave */
  html.light-mode [class*="bg-[#141414]"] {
    box-shadow: 0 1px 3px rgba(0,0,0,0.05), 0 4px 14px rgba(0,0,0,0.04);
  }

  /* ── Texto ─────────────────────────────────────────────────── */
  html.light-mode [class*="text-[#C0C0C0]"] { color: #1A1A1A !important; }
  html.light-mode [class*="text-[#888888]"] { color: #5E5E5E !important; }
  html.light-mode h1, html.light-mode h2,
  html.light-mode h3, html.light-mode h4 { color: #1A1A1A !important; }

  /* Gold stays */
  html.light-mode [class*="text-[#D8AF73]"] { color: #B49838 !important; }

  /* Hover text */
  html.light-mode [class*="hover:text-[#C0C0C0]"]:hover { color: #B49838 !important; }
  html.light-mode [class*="hover:text-[#D8AF73]"]:hover { color: #B49838 !important; }

  /* ── ÍCONES — A CORREÇÃO PRINCIPAL ────────────────────────── */
  /* Por defeito em light mode, todos os SVG ficam escuros */
  html.light-mode svg {
    color: #2A2A2A !important;
    stroke: currentColor !important;
    filter: none !important;
  }

  /* Excepção: ícones dentro de botões/caixas com fundo dourado ficam pretos */
  html.light-mode [style*="#B49838"] svg,
  html.light-mode [style*="#D8AF73"] svg,
  html.light-mode [style*="linear-gradient"] svg,
  html.light-mode [class*="bg-[#C0C0C0]"] svg,
  html.light-mode [class*="bg-[#B49838]"] svg,
  html.light-mode [class*="bg-[#D8AF73]"] svg {
    color: #0a0a0a !important;
    stroke: currentColor !important;
    filter: none !important;
  }

  /* Excepção: ícones em secções com foto de fundo ficam claros */
  html.light-mode .photo-dark-bg svg { color: #C0C0C0 !important; stroke: currentColor !important; }

  /* Badge de carrinho/wishlist (círculo dourado) */
  html.light-mode .rounded-full[class*="bg-[#D8AF73]"] svg { color: #0a0a0a !important; }

  /* ThemeToggle pill — ícone fica sempre preto (sobre fundo gold) */
  html.light-mode button[aria-label*="mode"] svg { color: #0a0a0a !important; }

  /* ── Bordas ────────────────────────────────────────────────── */
  html.light-mode [class*="border-[#C0C0C0]"] { border-color: rgba(0,0,0,0.10) !important; }
  html.light-mode [class*="hover:border-[#C0C0C0]"]:hover { border-color: rgba(0,0,0,0.20) !important; }
  html.light-mode [class*="hover:border-[#D8AF73]"]:hover { border-color: rgba(180,152,56,0.5) !important; }

  /* ── Formulários ───────────────────────────────────────────── */
  html.light-mode input,
  html.light-mode select,
  html.light-mode textarea {
    background-color: #FFFFFF !important;
    color: #1A1A1A !important;
    border-color: rgba(0,0,0,0.12) !important;
  }
  html.light-mode input::placeholder,
  html.light-mode textarea::placeholder { color: rgba(0,0,0,0.28) !important; }
  html.light-mode option { background-color: #FFFFFF !important; color: #1A1A1A !important; }

  /* ── Header ────────────────────────────────────────────────── */
  html.light-mode header { background-color: rgba(245,241,234,0.96) !important; backdrop-filter: blur(12px); }

  /* ── Sombras ───────────────────────────────────────────────── */
  html.light-mode [class*="shadow-"] { box-shadow: 0 4px 16px rgba(0,0,0,0.06) !important; }

  /* ── Scrollbar ─────────────────────────────────────────────── */
  html.light-mode ::-webkit-scrollbar-track { background: #EAE6DE !important; }

  /* ── Selection ─────────────────────────────────────────────── */
  html.light-mode ::selection { background: #B49838; color: #FFFFFF; }

  /* ── Backdrop (botões sobre imagens) ───────────────────────── */
  html.light-mode [class*="backdrop-blur"] {
    background-color: rgba(255,255,255,0.88) !important;
  }

  /* ── Secções com foto — manter texto e ícones claros ──────── */
  html.light-mode .photo-dark-bg [class*="text-[#C0C0C0]"] { color: #F0EDE8 !important; }
  html.light-mode .photo-dark-bg [class*="text-[#888888]"] { color: #C0C0C0 !important; }
  html.light-mode .photo-dark-bg [class*="bg-[#0a0a0a]"] { background-color: #0a0a0a !important; }
  html.light-mode .photo-dark-bg [class*="bg-[#141414]"] { background-color: #141414 !important; }
  html.light-mode .photo-dark-bg h1,
  html.light-mode .photo-dark-bg h2,
  html.light-mode .photo-dark-bg h3 { color: #F0EDE8 !important; }

  /* ── Animações — manter sempre a correr ────────────────────── */
  html.light-mode [class*="animate-"] { animation-play-state: running !important; }
  html.light-mode .btn-pulse.act { animation-play-state: running !important; }

  /* iframe map */
  html.light-mode iframe { filter: none !important; }
`;

export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(() => {
    if (typeof window === 'undefined') return true;
    try {
      const s = localStorage.getItem('infinity-theme');
      return s ? s === 'dark' : true;
    } catch { return true; }
  });

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.remove('light-mode');
      const el = document.getElementById('lm-style');
      if (el) el.remove();
    } else {
      root.classList.add('light-mode');
      let el = document.getElementById('lm-style');
      if (!el) {
        el = document.createElement('style');
        el.id = 'lm-style';
        document.head.appendChild(el);
      }
      el.textContent = LIGHT_CSS;
    }
    try { localStorage.setItem('infinity-theme', isDark ? 'dark' : 'light'); } catch (e) {}
  }, [isDark]);

  const toggle = () => setIsDark(prev => !prev);

  return (
    <ThemeContext.Provider value={{ isDark, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
