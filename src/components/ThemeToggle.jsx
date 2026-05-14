import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const ThemeToggle = () => {
  const { isDark, toggle } = useTheme();

  return (
    <button
      onClick={toggle}
      aria-label={isDark ? 'Activar modo claro' : 'Activar modo escuro'}
      title={isDark ? 'Modo Claro' : 'Modo Escuro'}
      className="relative flex-shrink-0 flex items-center rounded-full transition-all duration-500"
      style={{
        width: '52px',
        height: '28px',
        background:   isDark ? '#141414' : '#EAE6DE',
        border:       isDark ? '1px solid rgba(192,192,192,0.18)' : '1px solid rgba(180,152,56,0.35)',
        boxShadow:    isDark
          ? 'inset 0 1px 3px rgba(0,0,0,0.5)'
          : 'inset 0 1px 3px rgba(0,0,0,0.08), 0 1px 4px rgba(180,152,56,0.15)',
      }}
    >
      {/* Track icons */}
      <Moon
        size={11}
        strokeWidth={2.2}
        className="absolute left-[7px] transition-opacity duration-300"
        style={{ color: isDark ? '#fe00f1' : '#B49838', opacity: isDark ? 0 : 0.4 }}
      />
      <Sun
        size={11}
        strokeWidth={2.2}
        className="absolute right-[7px] transition-opacity duration-300"
        style={{ color: isDark ? '#888888' : '#D8AF73', opacity: isDark ? 0.4 : 0 }}
      />

      {/* Sliding pill */}
      <span
        className="absolute flex items-center justify-center rounded-full transition-all duration-400"
        style={{
          width:      '22px',
          height:     '22px',
          transform:  isDark ? 'translateX(3px)' : 'translateX(27px)',
          background: 'linear-gradient(135deg, #B49838 0%, #D8AF73 100%)',
          boxShadow:  '0 1px 4px rgba(0,0,0,0.35)',
          transition: 'transform 0.35s cubic-bezier(0.4,0,0.2,1)',
        }}
      >
        {isDark
          ? <Moon size={12} strokeWidth={2.5} color="#0a0a0a" />
          : <Sun  size={12} strokeWidth={2.5} color="#0a0a0a" />
        }
      </span>
    </button>
  );
};

export default ThemeToggle;
