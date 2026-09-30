import React, { useState } from 'react';
import { LOGO_URL } from '../data/portfolioData';

interface NavbarProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  onOpenPgp: () => void;
  onOpenImageGallery: () => void;
  onOpenLogin: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeSection,
  onNavigate,
  onOpenPgp,
  onOpenImageGallery,
  onOpenLogin,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [logoError, setLogoError] = useState(false);

  const navItems = [
    { id: 'sobre', label: '01 // Sobre' },
    { id: 'skills', label: '02 // Skills' },
    { id: 'projetos', label: '03 // Laboratórios & Projetos' },
    { id: 'credenciais', label: '04 // Credenciais' },
    { id: 'contato', label: '05 // Contato' },
  ];

  const handleNavClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex flex-col items-center gap-2 px-3 sm:px-6 pt-3">
      <div className="w-full max-w-7xl rounded-full bg-[#0a0b12]/80 backdrop-blur-xl border border-[#33344a]/40 shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
        <div className="h-16 px-3 sm:px-4 lg:px-6 flex items-center justify-between gap-4">
        {/* Brand Lockup */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate('hero')}
            className="flex items-center gap-3 text-left group focus:outline-none"
            title="Ir para o topo"
          >
            {/* Logo Image with resilient fallback */}
            <div className="relative h-9 w-9 shrink-0 rounded bg-[#0d0e18] border border-[#ffa94d]/40 p-1 flex items-center justify-center overflow-hidden group-hover:border-[#ffa94d] transition-colors">
              {!logoError ? (
                <img
                  src={LOGO_URL}
                  alt="KZ Cyber Security Logo"
                  className="h-full w-full object-contain"
                  onError={() => setLogoError(true)}
                  referrerPolicy="no-referrer"
                />
              ) : (
                <svg viewBox="0 0 100 100" className="h-full w-full">
                  <rect width="100" height="100" rx="16" fill="#0d0e18" />
                  <path
                    d="M50 18 L78 30 V50 C78 68 50 82 50 82 C50 82 22 68 22 50 V30 Z"
                    fill="none"
                    stroke="#ffa94d"
                    strokeWidth="8"
                  />
                  <path
                    d="M40 48 L48 56 L62 42"
                    fill="none"
                    stroke="#4fd1ae"
                    strokeWidth="8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </div>

            <div className="flex flex-col">
              <span className="font-title-code text-[18px] font-bold tracking-tight text-[#f8f6f2] group-hover:text-[#ffa94d] transition-colors">
                KZ.SEC
              </span>
              <span className="font-label-code-sm text-[10px] text-[#8b8ca3] tracking-widest uppercase">
                SEC_OPS // LABS
              </span>
            </div>
          </button>

          {/* Direct Link to Assets button as requested */}
          <button
            onClick={onOpenImageGallery}
            className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded bg-[#14151f] border border-[#33344a]/60 hover:border-[#ffa94d]/60 text-[10px] font-mono text-[#8b8ca3] hover:text-[#ffa94d] transition-colors"
            title="Ver imagens e links diretos do HTML"
          >
            <span className="material-symbols-outlined text-[14px]">image</span>
            <span>IMG_LINKS</span>
          </button>

          {/* Status pill */}
          <div className="hidden xl:flex items-center gap-2 px-2.5 py-1 rounded bg-[#14151f] border border-[#33344a]/50 ml-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ffa94d] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#ffa94d]"></span>
            </span>
            <span className="font-label-code-sm text-[11px] text-[#ffcf8a]">
              [STATUS: DEFENSE_READY // PING: 18ms]
            </span>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-6">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`font-label-code-lg text-[13px] py-1 transition-all ${
                  isActive
                    ? 'text-[#ffa94d] border-b-2 border-[#ffa94d] font-semibold'
                    : 'text-[#c6c7d6] hover:text-[#f8f6f2]'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Actions Right */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenLogin}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#20212e] border border-[#ffb4ab]/40 text-[#ffb4ab] font-label-code-sm text-[11px] uppercase tracking-wider hover:bg-[#ffb4ab] hover:text-[#3f0300] hover:shadow-[0_0_20px_rgba(255,180,171,0.35)] transition-all"
          >
            <span className="material-symbols-outlined text-[14px]">lock_person</span>
            <span>&gt; LOGIN</span>
          </button>

          <button
            onClick={onOpenPgp}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#20212e] border border-[#ffa94d]/40 text-[#ffa94d] font-label-code-sm text-[11px] uppercase tracking-wider hover:bg-[#ffa94d] hover:text-[#3a1a00] hover:shadow-[0_0_20px_rgba(255,169,77,0.35)] transition-all"
          >
            <span className="material-symbols-outlined text-[14px]">key</span>
            <span>&gt; PGP KEY</span>
          </button>

          <button
            onClick={() => onNavigate('contato')}
            className="w-8 h-8 rounded-full bg-[#f8f6f2] hover:bg-[#ffa94d] flex items-center justify-center transition-colors"
            title="Kaique Zomer - Contato"
          >
            <span className="material-symbols-outlined text-[#3a1a00] text-[18px]">
              person
            </span>
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-1.5 rounded text-[#c6c7d6] hover:text-[#ffa94d] focus:outline-none"
            aria-label="Abrir menu"
          >
            <span className="material-symbols-outlined text-[24px]">
              {mobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="w-full max-w-7xl lg:hidden rounded-2xl bg-[#0a0b12]/95 backdrop-blur-xl border border-[#33344a]/40 shadow-[0_8px_32px_rgba(0,0,0,0.5)] px-4 py-4 flex flex-col gap-3">
          <div className="flex items-center gap-2 pb-2 border-b border-[#33344a]/30">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ffa94d] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#ffa94d]"></span>
            </span>
            <span className="font-label-code-sm text-[11px] text-[#ffcf8a]">
              STATUS: DEFENSE_READY // PING: 18ms
            </span>
          </div>

          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`text-left font-label-code-lg text-[13px] py-2 px-3 rounded transition-colors ${
                activeSection === item.id
                  ? 'bg-[#14151f] text-[#ffa94d] font-semibold border-l-2 border-[#ffa94d]'
                  : 'text-[#c6c7d6] hover:bg-[#14151f] hover:text-[#f8f6f2]'
              }`}
            >
              {item.label}
            </button>
          ))}

          <div className="pt-2 flex items-center gap-2">
            <button
              onClick={() => {
                onOpenImageGallery();
                setMobileMenuOpen(false);
              }}
              className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded bg-[#14151f] border border-[#33344a] text-xs font-mono text-[#c6c7d6]"
            >
              <span className="material-symbols-outlined text-[16px]">image</span>
              Links Imagens HTML
            </button>
            <button
              onClick={() => {
                onOpenPgp();
                setMobileMenuOpen(false);
              }}
              className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded bg-[#ffa94d] text-[#3a1a00] text-xs font-mono font-bold"
            >
              <span className="material-symbols-outlined text-[16px]">key</span>
              PGP KEY
            </button>
          </div>

          <button
            onClick={() => {
              onOpenLogin();
              setMobileMenuOpen(false);
            }}
            className="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded bg-[#20212e] border border-[#ffb4ab]/40 text-[#ffb4ab] text-xs font-mono font-bold"
          >
            <span className="material-symbols-outlined text-[16px]">lock_person</span>
            LOGIN
          </button>
        </div>
      )}
    </header>
  );
};
