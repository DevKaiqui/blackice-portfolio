import React from 'react';
import { LOGO_URL, PROFILE_INFO } from '../data/portfolioData';

interface FooterProps {
  onOpenPgp: () => void;
  onOpenImageGallery: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenPgp,
  onOpenImageGallery,
}) => {
  return (
    <footer className="relative z-10 w-full bg-[#0d0e18] border-t border-[#33344a]/30 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 flex flex-col gap-6">
        {/* System Bar */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 p-4 rounded bg-[#14151f] border border-[#33344a]/30 font-label-code-sm text-xs text-[#c6c7d6]">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[#ffa94d]">&gt;</span>
            <span className="text-[#8b8ca3]">SYSTEM_ID:</span>
            <span className="text-[#e8e8f0] font-semibold">KZ-CYBER-OPS</span>
            <span className="text-[#8b8ca3]">// ENCRYPTION:</span>
            <span className="text-[#a7f3e0]">AES-256-GCM</span>
            <span className="text-[#8b8ca3]">// STATUS:</span>
            <span className="text-[#ffa94d]">SECURE</span>
          </div>
          <span className="text-[#8b8ca3] uppercase tracking-wider text-[11px]">
            ALL RIGHTS RESERVED // KAIQUE ZOMER
          </span>
        </div>

        {/* Lower Row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <img
              alt="KZ Cyber Security Logo"
              className="h-6 w-auto object-contain opacity-85"
              src={LOGO_URL}
              referrerPolicy="no-referrer"
              onError={(e) => {
                // hide broken img or fallback
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
            <span className="font-label-code-sm text-xs text-[#8b8ca3]">
              © 2025 Cyber Threat Intel &amp; Defensive Engineering.
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-4 font-label-code-sm text-xs">
            <a
              href={PROFILE_INFO.channels.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#c6c7d6] hover:text-[#ffa94d] transition-colors"
            >
              [GitHub]
            </a>
            {PROFILE_INFO.channels.linkedin && (
              <a
                href={PROFILE_INFO.channels.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#c6c7d6] hover:text-[#ffa94d] transition-colors"
              >
                [LinkedIn]
              </a>
            )}
            <a
              href={PROFILE_INFO.channels.tryhackme}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#c6c7d6] hover:text-[#ffa94d] transition-colors"
            >
              [TryHackMe]
            </a>
            <a
              href={PROFILE_INFO.channels.hackthebox}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#c6c7d6] hover:text-[#ffa94d] transition-colors"
            >
              [Hack The Box]
            </a>
            <button
              onClick={onOpenImageGallery}
              className="text-[#8b8ca3] hover:text-[#4fd1ae] transition-colors"
              title="Links Diretos para Imagens"
            >
              [Imagens HTML]
            </button>
            <button
              onClick={onOpenPgp}
              className="text-[#4fd1ae] hover:text-[#a7f3e0] transition-colors"
            >
              &gt; DOWNLOAD PGP
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
