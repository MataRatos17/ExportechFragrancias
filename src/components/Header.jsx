import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Search, User, Heart, ShoppingCart, ChevronDown, Plus, Menu, X } from 'lucide-react';
import { navItems } from '../data/mock';
import ThemeToggle from './ThemeToggle';

const Header = () => {
  const [scrolled, setScrolled]         = useState(false);
  const [mobileOpen, setMobileOpen]     = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);

  const onScroll = useCallback(() => setScrolled(window.scrollY > 30), []);

  useEffect(() => {
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, [onScroll]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* ── Campaign banner ── */}
      <div className="bg-[#050505] text-[#C0C0C0] text-[12px] tracking-wider border-b border-[#C0C0C0]/20">
        <div className="max-w-[1400px] mx-auto px-6 h-9 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-[#C0C0C0]">CAMPANHA:</span>
            <span>Experimente grátis durante uma semana</span>
            <button className="ml-2 inline-flex items-center gap-1 text-[#D8AF73] hover:text-[#C0C0C0] transition-colors">
              <Plus size={14} />
              <span className="font-semibold">INFORMAÇÕES</span>
            </button>
          </div>
          <Link to="/perfil" className="flex items-center gap-2 text-[#C0C0C0] hover:text-[#D8AF73] transition-colors">
            <User size={14} />
            <span className="font-semibold tracking-wider">ENTRAR</span>
          </Link>
        </div>
      </div>

      {/* ── Main nav ── */}
      <div className={`bg-[#0a0a0a] border-b border-[#C0C0C0]/10 transition-all duration-300 ${scrolled ? 'shadow-[0_4px_24px_rgba(0,0,0,0.35)]' : ''}`}>
        <div className="max-w-[1400px] mx-auto px-6 h-[88px] flex items-center justify-between gap-6">

          {/* Logo */}
          <Link to="/" className="flex items-center flex-shrink-0" aria-label="Infinity Air Home">
            <span className="text-[28px] font-black italic tracking-tight text-[#C0C0C0] leading-none">
              infinity
            </span>
            <span className="ml-1 text-[11px] font-extrabold tracking-[0.18em] bg-[#C0C0C0] text-[#0a0a0a] px-1.5 py-1 leading-none">
              AIR
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => item.dropdown && setOpenDropdown(item.label)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <Link
                  to={item.href}
                  className="flex items-center gap-1 text-[12px] tracking-[0.18em] font-bold text-[#C0C0C0] hover:text-[#D8AF73] transition-colors py-2"
                >
                  {item.label}
                  {item.dropdown && <ChevronDown size={12} />}
                </Link>
                {item.dropdown && openDropdown === item.label && (
                  <div className="absolute top-full left-0 bg-[#0a0a0a] shadow-[0_8px_32px_rgba(0,0,0,0.4)] border border-[#C0C0C0]/15 min-w-[210px] py-2 mt-1">
                    {item.dropdown.map((sub) => (
                      <Link
                        key={sub.label}
                        to={sub.href}
                        className="block px-4 py-2.5 text-[12px] tracking-wider text-[#C0C0C0] hover:bg-[#141414] hover:text-[#D8AF73] transition-colors"
                      >
                        {sub.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <button className="text-[#C0C0C0] hover:text-[#D8AF73] transition-colors" aria-label="Pesquisar">
              <Search size={18} />
            </button>
            <Link to="/perfil" className="hidden sm:block text-[#C0C0C0] hover:text-[#D8AF73] transition-colors" aria-label="Conta">
              <User size={18} />
            </Link>
            <button className="hidden sm:flex relative text-[#C0C0C0] hover:text-[#D8AF73] transition-colors" aria-label="Favoritos">
              <Heart size={18} />
              <span className="absolute -top-2 -right-2 bg-[#D8AF73] text-[#0a0a0a] text-[10px] rounded-full w-4 h-4 flex items-center justify-center font-bold">0</span>
            </button>
            <button className="relative text-[#C0C0C0] hover:text-[#D8AF73] transition-colors" aria-label="Carrinho">
              <ShoppingCart size={18} />
              <span className="absolute -top-2 -right-2 bg-[#D8AF73] text-[#0a0a0a] text-[10px] rounded-full w-4 h-4 flex items-center justify-center font-bold">0</span>
            </button>

            {/* ── Theme Toggle ── */}
            <ThemeToggle />

            <button onClick={() => setMobileOpen(!mobileOpen)} className="lg:hidden text-[#C0C0C0] hover:text-[#D8AF73]">
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="lg:hidden border-t border-[#C0C0C0]/10 bg-[#0a0a0a] px-6 py-4 space-y-1">
            {navItems.map((item) => (
              <div key={item.label}>
                <Link
                  to={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="block text-[13px] tracking-wider font-bold text-[#C0C0C0] hover:text-[#D8AF73] py-2"
                >
                  {item.label}
                </Link>
                {item.dropdown && (
                  <div className="ml-4 space-y-1">
                    {item.dropdown.map((sub) => (
                      <Link
                        key={sub.label}
                        to={sub.href}
                        onClick={() => setMobileOpen(false)}
                        className="block text-[12px] tracking-wider text-[#888888] hover:text-[#D8AF73] py-1.5"
                      >
                        {sub.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <Link
              to="/perfil"
              onClick={() => setMobileOpen(false)}
              className="block text-[13px] tracking-wider font-bold text-[#C0C0C0] hover:text-[#D8AF73] pt-2 border-t border-[#C0C0C0]/10 mt-2"
            >
              PERFIL
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
