import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext({ isDark: true, toggle: () => {} });

/* ── Light mode CSS — injected as a real <style> tag to bypass PostCSS ────
   Uses [class*="..."] attribute substring selectors: no escape needed.
   Gold (#B49838, #D8AF73) and silver buttons (bg-[#C0C0C0]) are untouched.
   .photo-dark-bg marks sections with full-bleed dark images (hero, cards).
─────────────────────────────────────────────────────────────────────────── */
const LIGHT_CSS = `
  /* ── Body ─────────────────────────────────────────────────── */
  html.light-mode body {
    background-color: #F5F1EA !important;
    color: #1A1A1A !important;
  }

  /* ── Backgrounds ───────────────────────────────────────────── */
  html.light-mode [class*="bg-[#0a0a0a]"] { background-color: #F5F1EA !important; }
  html.light-mode [class*="bg-[#050505]"] { background-color: #EAE6DE !important; }
  html.light-mode [class*="bg-[#141414]"] { background-color: #FFFFFF !important; }

  /* Hover backgrounds */
  html.light-mode [class*="hover:bg-[#141414]"]:hover { background-color: #F0EDE6 !important; }
  html.light-mode [class*="hover:bg-[#B49838]"]:hover { background-color: #B49838 !important; }

  /* ── Text ──────────────────────────────────────────────────── */
  html.light-mode [class*="text-[#C0C0C0]"] { color: #1A1A1A !important; }
  html.light-mode [class*="text-[#888888]"] { color: #5E5E5E !important; }

  /* Hover text → gold in light mode */
  html.light-mode [class*="hover:text-[#C0C0C0]"]:hover { color: #B49838 !important; }
  html.light-mode [class*="hover:text-[#D8AF73]"]:hover { color: #B49838 !important; }

  /* ── Borders ───────────────────────────────────────────────── */
  html.light-mode [class*="border-[#C0C0C0]"] { border-color: rgba(0,0,0,0.10) !important; }

  html.light-mode [class*="hover:border-[#C0C0C0]"]:hover { border-color: rgba(0,0,0,0.20) !important; }
  html.light-mode [class*="hover:border-[#D8AF73]"]:hover { border-color: rgba(180,152,56,0.45) !important; }

  /* ── Shadows ───────────────────────────────────────────────── */
  html.light-mode [class*="shadow-[0_8px_32px"] { box-shadow: 0 8px 32px rgba(0,0,0,0.08) !important; }
  html.light-mode [class*="shadow-[0_4px_20px"] { box-shadow: 0 4px 20px rgba(0,0,0,0.06) !important; }
  html.light-mode [class*="shadow-[0_4px_24px"] { box-shadow: 0 4px 24px rgba(0,0,0,0.06) !important; }
  html.light-mode [class*="shadow-2xl"]          { box-shadow: 0 20px 48px rgba(0,0,0,0.08) !important; }
  html.light-mode [class*="shadow-lg"]           { box-shadow: 0 8px 24px rgba(0,0,0,0.07) !important; }

  /* Cards get a soft shadow in light mode */
  html.light-mode [class*="bg-[#141414]"] {
    box-shadow: 0 1px 3px rgba(0,0,0,0.05), 0 4px 14px rgba(0,0,0,0.04);
  }
  html.light-mode [class*="bg-[#141414]"][class*="border"] {
    box-shadow: 0 1px 3px rgba(0,0,0,0.05), 0 4px 14px rgba(0,0,0,0.04);
  }

  /* ── Forms ─────────────────────────────────────────────────── */
  html.light-mode input,
  html.light-mode select,
  html.light-mode textarea {
    background-color: #FFFFFF !important;
    color: #1A1A1A !important;
    border-color: rgba(0,0,0,0.12) !important;
  }
  html.light-mode input:focus,
  html.light-mode select:focus,
  html.light-mode textarea:focus { border-color: #D8AF73 !important; }
  html.light-mode input::placeholder,
  html.light-mode textarea::placeholder { color: rgba(0,0,0,0.28) !important; }
  html.light-mode option {
    background-color: #FFFFFF !important;
    color: #1A1A1A !important;
  }

  /* ── Scrollbar ─────────────────────────────────────────────── */
  html.light-mode ::-webkit-scrollbar-track { background: #EAE6DE !important; }

  /* ── Selection ─────────────────────────────────────────────── */
  html.light-mode ::selection { background: #B49838; color: #FFFFFF; }

  /* ── Backdrop floating buttons on product cards ─────────────── */
  html.light-mode [class*="backdrop-blur"] {
    background-color: rgba(255,255,255,0.90) !important;
    color: #1A1A1A !important;
  }

  /* ── IFrame map ─────────────────────────────────────────────── */
  html.light-mode iframe { filter: none !important; }

  /* ══════════════════════════════════════════════════════════════
     PHOTO DARK SECTIONS — full-bleed images keep dark text/bg
     These sections always have dark overlays over photos.
     We revert the bg/text overrides so text stays readable.
     ══════════════════════════════════════════════════════════════ */
  html.light-mode .photo-dark-bg [class*="bg-[#0a0a0a]"] { background-color: #0a0a0a !important; }
  html.light-mode .photo-dark-bg [class*="bg-[#050505]"] { background-color: #050505 !important; }
  html.light-mode .photo-dark-bg [class*="bg-[#141414]"] { background-color: #141414 !important; }
  html.light-mode .photo-dark-bg [class*="text-[#C0C0C0]"] { color: #C0C0C0 !important; }
  html.light-mode .photo-dark-bg [class*="text-[#888888]"] { color: #888888 !important; }

  /* ── Ring (Perfil tabs) ─────────────────────────────────────── */
  html.light-mode [class*="ring-[#0a0a0a]"] { --tw-ring-color: #F5F1EA !important; }

  /* ── Grayscale filter on team photos — keep in light ───────── */
  html.light-mode .grayscale { filter: grayscale(1); }
  html.light-mode .group:hover .grayscale { filter: grayscale(0); }
`;

export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(() => {
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

    try { localStorage.setItem('infinity-theme', isDark ? 'dark' : 'light'); }
    catch {}
  }, [isDark]);

  /* Apply saved theme on first render without flash */
  useEffect(() => {
    if (!isDark) {
      const root = document.documentElement;
      root.classList.add('light-mode');
      let el = document.getElementById('lm-style');
      if (!el) {
        el = document.createElement('style');
        el.id = 'lm-style';
        document.head.appendChild(el);
      }
      el.textContent = LIGHT_CSS;
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggle = () => setIsDark(p => !p);

  return (
    <ThemeContext.Provider value={{ isDark, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
