import React, { useState, useEffect } from 'react';
import { InteractiveTerminal } from './InteractiveTerminal';
import { SecurityShield } from './SecurityShield';
import { PROFILE_INFO } from '../data/portfolioData';

interface HeroProps {
  onNavigate: (sectionId: string) => void;
  onOpenProject: (projectId: string) => void;
  onOpenPgp: () => void;
  onOpenCv: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onNavigate,
  onOpenProject,
  onOpenPgp,
  onOpenCv,
}) => {
  const phrases = [
    "Cybersecurity | Redes & Protocolos | Ethical Hacking",
    "Threat Intelligence | Análise de Tráfego Wireshark",
    "Defesa em Profundidade | Hardening Linux & pfSense",
  ];

  const [phraseIndex, setPhraseIndex] = useState(0);
  const [text, setText] = useState(phrases[0]);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentPhrase = phrases[phraseIndex];
    let timer: NodeJS.Timeout;

    if (isDeleting) {
      timer = setTimeout(() => {
        setText(currentPhrase.substring(0, text.length - 1));
        if (text.length <= 1) {
          setIsDeleting(false);
          setPhraseIndex((prev) => (prev + 1) % phrases.length);
        }
      }, 30);
    } else {
      timer = setTimeout(() => {
        setText(currentPhrase.substring(0, text.length + 1));
        if (text.length === currentPhrase.length) {
          setTimeout(() => setIsDeleting(true), 2500);
        }
      }, 50);
    }

    return () => clearTimeout(timer);
  }, [text, isDeleting, phraseIndex]);

  return (
    <section
      id="hero"
      className="relative min-h-[calc(100vh-5rem)] flex items-center justify-center py-10 px-4 sm:px-6 lg:px-12"
    >
      {/* Glow gradients */}
      <div className="absolute -top-24 left-1/4 w-96 h-96 bg-[#ffa94d]/10 rounded-full blur-[140px] pointer-events-none"></div>
      <div className="absolute top-1/2 right-12 w-80 h-80 bg-[#4fd1ae]/10 rounded-full blur-[160px] pointer-events-none"></div>

      {/* Animated security shield watermark */}
      <SecurityShield className="hidden lg:block absolute top-1/2 right-0 -translate-y-1/2 w-[420px] opacity-[0.14] z-0" />

      <div className="max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
        {/* Hero Left Column: Identity & Directives */}
        <div className="lg:col-span-7 flex flex-col items-start gap-4">
          {/* Status Tagline */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#14151f] border border-[#33344a]/60 shadow-[0_0_12px_rgba(255,169,77,0.08)]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ffa94d] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#ffa94d]"></span>
            </span>
            <span className="font-label-code-sm text-[11px] text-[#ffa94d] uppercase tracking-wider">
              [ SEC_LEVEL: ACTIVE_RESEARCHER // PROTOCOL: ZERO_TRUST ]
            </span>
          </div>

          {/* Main Title with Space Grotesk */}
          <div className="flex flex-col">
            <span className="font-label-code-sm text-xs text-[#8b8ca3] uppercase tracking-widest">
              &gt; {PROFILE_INFO.roleLabel}
            </span>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl text-[#f8f6f2] tracking-tight leading-[1.05] drop-shadow-[0_0_35px_rgba(255,169,77,0.18)] font-bold mt-1">
              KAIQUE{' '}
              <span className="inline-block bg-gradient-to-r from-[#ffa94d] via-[#ffcf8a] to-[#4fd1ae] bg-clip-text text-transparent">
                ZOMER
              </span>
            </h1>
          </div>

          {/* Typing Simulation Subtitle */}
          <div className="flex items-center gap-2 font-title-code text-sm sm:text-base text-[#a7f3e0] min-h-[28px]">
            <span className="text-[#33344a] font-bold">&gt;&gt;</span>
            <span className="text-[#c7f9ec] font-medium tracking-wide">
              {text}
            </span>
            <span className="inline-block w-2.5 h-4 bg-[#ffa94d] animate-pulse"></span>
          </div>

          {/* Description */}
          <p className="font-body-lg text-sm sm:text-base text-[#c6c7d6] max-w-2xl leading-relaxed">
            {PROFILE_INFO.bioParagraph1}
          </p>

          {/* Metrics Strip */}
          <div className="grid grid-cols-3 gap-4 w-full max-w-xl py-3 border-y border-[#33344a]/30 my-1">
            <div className="flex flex-col">
              <span className="font-label-code-sm text-[11px] text-[#8b8ca3] uppercase">
                TryHackMe
              </span>
              <span className="font-title-code text-lg sm:text-xl text-[#ffa94d] font-bold">
                TOP 5%
              </span>
              <span className="font-body-sm text-xs text-[#c6c7d6]">
                Global Ranking
              </span>
            </div>
            <div className="flex flex-col">
              <span className="font-label-code-sm text-[11px] text-[#8b8ca3] uppercase">
                Laboratórios
              </span>
              <span className="font-title-code text-lg sm:text-xl text-[#c7f9ec] font-bold">
                120+
              </span>
              <span className="font-body-sm text-xs text-[#c6c7d6]">
                CTFs & Boxes
              </span>
            </div>
            <div className="flex flex-col">
              <span className="font-label-code-sm text-[11px] text-[#8b8ca3] uppercase">
                Arquitetura
              </span>
              <span className="font-title-code text-lg sm:text-xl text-[#f8f6f2] font-bold">
                L2-L7
              </span>
              <span className="font-body-sm text-xs text-[#c6c7d6]">
                Hardening Ativo
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-1">
            <button
              onClick={() => onNavigate('projetos')}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded bg-[#ffa94d] text-[#3a1a00] font-title-code text-xs sm:text-sm font-bold tracking-wider uppercase transition-all duration-200 hover:shadow-[0_0_24px_rgba(255,169,77,0.45)] hover:scale-[1.02]"
            >
              <span className="material-symbols-outlined text-[18px]">terminal</span>
              Explorar Projetos & Labs
            </button>
            <button
              onClick={() => onNavigate('contato')}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded bg-[#6fe3c8]/10 border border-[#4fd1ae]/40 text-[#c7f9ec] font-title-code text-xs sm:text-sm font-medium tracking-wide uppercase transition-all duration-200 hover:bg-[#6fe3c8]/20 hover:border-[#4fd1ae] hover:shadow-[0_0_20px_rgba(79,209,174,0.25)]"
            >
              <span className="material-symbols-outlined text-[18px]">lock_open</span>
              &gt; Iniciar Contato Seguro
            </button>
          </div>
        </div>

        {/* Hero Right Column: High-Fidelity Interactive Shell Terminal */}
        <div className="lg:col-span-5 w-full">
          <InteractiveTerminal
            onOpenProject={onOpenProject}
            onOpenPgp={onOpenPgp}
            onOpenCv={onOpenCv}
          />
        </div>
      </div>
    </section>
  );
};
