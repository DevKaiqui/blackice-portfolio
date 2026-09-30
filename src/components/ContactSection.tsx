import React, { useState } from 'react';
import {
  PGP_FINGERPRINT,
  PGP_KEY_ID,
  PGP_PUBLIC_KEY_BLOCK,
  PROFILE_INFO,
} from '../data/portfolioData';

interface ContactSectionProps {
  onOpenPgp: () => void;
  onOpenCv: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  onOpenPgp,
  onOpenCv,
}) => {
  const [copiedFingerprint, setCopiedFingerprint] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyFingerprint = () => {
    navigator.clipboard.writeText(PGP_FINGERPRINT);
    setCopiedFingerprint(true);
    setTimeout(() => setCopiedFingerprint(false), 2000);
  };

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    navigator.clipboard.writeText(PROFILE_INFO.channels.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleDownloadAsc = () => {
    const element = document.createElement('a');
    const file = new Blob([PGP_PUBLIC_KEY_BLOCK], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = 'kaique-zomer-pubkey-53F1017C.asc';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <section
      id="contato"
      className="relative py-16 px-4 sm:px-6 lg:px-12 border-t border-[#33344a]/20 bg-[#0d0e18]/70"
    >
      <div className="max-w-7xl mx-auto flex flex-col gap-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-3">
          <div className="flex flex-col gap-1">
            <span className="font-label-code-sm text-xs text-[#ffa94d] tracking-widest uppercase">
              // 05. CANAL_SEGURO_DE_COMUNICAÇÃO
            </span>
            <h2 className="font-headline-lg text-2xl sm:text-3xl lg:text-4xl text-[#f8f6f2] tracking-tight font-bold">
              Iniciar Conversação Criptografada
            </h2>
          </div>
          <div className="font-label-code-sm text-xs text-[#8b8ca3]">
            HANDSHAKE: OPEN_SESSION
          </div>
        </div>

        {/* Terminal Contact Box */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* PGP Key / Encryption Card */}
          <div className="lg:col-span-6 p-6 rounded-xl bg-[#181a26]/70 backdrop-blur-md border border-[#33344a]/40 flex flex-col justify-between gap-4">
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-[#ffa94d] font-title-code text-sm sm:text-base font-bold">
                  <span className="material-symbols-outlined text-[20px]">key</span>
                  <span>PGP PUBLIC KEY FINGERPRINT</span>
                </div>
                <span className="font-label-code-sm text-xs text-[#8b8ca3]">
                  RSA 4096-bit
                </span>
              </div>

              <p className="font-body-sm text-xs text-[#c6c7d6]">
                Para envio de reportes sensíveis de segurança, propostas
                estratégicas ou briefings confidenciais, utilize esta chave
                pública OpenPGP (RSA 4096-bit, real e importável):
              </p>

              {/* Fingerprint Display Box with One-Click Copy */}
              <div className="p-3 rounded bg-[#0d0e18] border border-[#33344a]/50 font-label-code-sm text-xs text-[#a7f3e0] break-all select-all flex items-center justify-between gap-3">
                <span id="pgp-fingerprint" className="font-mono">
                  {PGP_FINGERPRINT}
                </span>
                <button
                  onClick={handleCopyFingerprint}
                  className="shrink-0 p-1.5 rounded bg-[#20212e] hover:bg-[#ffa94d] hover:text-[#3a1a00] text-[#e8e8f0] transition-colors"
                  title="Copiar Chave PGP"
                >
                  <span className="material-symbols-outlined text-[16px]">
                    {copiedFingerprint ? 'check' : 'content_copy'}
                  </span>
                </button>
              </div>

              {/* PGP Block Snippet */}
              <div
                onClick={onOpenPgp}
                className="p-3 rounded bg-[#0d0e18]/80 border border-[#33344a]/30 font-label-code-sm text-[11px] text-[#8b8ca3] leading-tight select-none cursor-pointer hover:border-[#ffa94d]/50 transition-colors"
                title="Clique para visualizar o bloco completo"
              >
                <div>-----BEGIN PGP PUBLIC KEY BLOCK-----</div>
                <div>{PGP_PUBLIC_KEY_BLOCK.split('\n')[2]?.slice(0, 48)}...</div>
                <div>-----END PGP PUBLIC KEY BLOCK-----</div>
                <div className="text-[#4fd1ae] mt-1">[clique para ver o bloco completo]</div>
              </div>
            </div>

            {/* Download Button */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-[#33344a]/20">
              <button
                onClick={handleDownloadAsc}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#20212e] border border-[#33344a]/50 text-[#c7f9ec] font-label-code-sm text-xs uppercase tracking-wider hover:border-[#4fd1ae] hover:shadow-[0_0_15px_rgba(79,209,174,0.2)] transition-all"
              >
                <span className="material-symbols-outlined text-[16px]">
                  download
                </span>
                Baixar Chave (.asc)
              </button>

              <button
                onClick={onOpenPgp}
                className="text-xs text-[#ffa94d] hover:underline font-mono"
              >
                KEY_ID: {PGP_KEY_ID} [VER DETALHES]
              </button>
            </div>
          </div>

          {/* Direct Channels & CV Download */}
          <div className="lg:col-span-6 p-6 rounded-xl bg-[#181a26]/70 backdrop-blur-md border border-[#33344a]/40 flex flex-col justify-between gap-4">
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2 text-[#f8f6f2] font-title-code text-sm sm:text-base font-bold">
                <span className="material-symbols-outlined text-[#ffa94d] text-[20px]">
                  contact_mail
                </span>
                <span>CANAIS DIRETOS &amp; DOCUMENTAÇÃO</span>
              </div>

              <p className="font-body-sm text-xs text-[#c6c7d6]">
                Disponível para oportunidades em segurança defensiva (Blue Team),
                auditorias de redes, resposta a incidentes e pesquisa técnica de
                vulnerabilidades.
              </p>

              {/* Links List */}
              <div className="flex flex-col gap-2 pt-1">
                {/* LinkedIn */}
                {PROFILE_INFO.channels.linkedin && (
                  <a
                    href={PROFILE_INFO.channels.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3 rounded bg-[#20212e]/60 border border-[#33344a]/30 hover:border-[#ffa94d]/40 transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <span className="font-label-code-sm text-xs text-[#ffa94d]">
                        [LINKEDIN]
                      </span>
                      <span className="font-body-sm text-xs text-[#e8e8f0] font-medium">
                        linkedin.com/in/kaique-zomer
                      </span>
                    </div>
                    <span className="material-symbols-outlined text-[18px] text-[#8b8ca3] group-hover:text-[#ffa94d] group-hover:translate-x-1 transition-all">
                      arrow_outward
                    </span>
                  </a>
                )}

                {/* GitHub */}
                <a
                  href={PROFILE_INFO.channels.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 rounded bg-[#20212e]/60 border border-[#33344a]/30 hover:border-[#4fd1ae]/40 transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <span className="font-label-code-sm text-xs text-[#4fd1ae]">
                      [GITHUB]
                    </span>
                    <span className="font-body-sm text-xs text-[#e8e8f0] font-medium">
                      github.com/DevKaiqui
                    </span>
                  </div>
                  <span className="material-symbols-outlined text-[18px] text-[#8b8ca3] group-hover:text-[#4fd1ae] group-hover:translate-x-1 transition-all">
                    arrow_outward
                  </span>
                </a>

                {/* Email */}
                <div className="flex items-center justify-between p-3 rounded bg-[#20212e]/60 border border-[#33344a]/30 hover:border-[#ffa94d]/40 transition-colors group">
                  <a
                    href={`mailto:${PROFILE_INFO.channels.email}`}
                    className="flex items-center gap-3"
                  >
                    <span className="font-label-code-sm text-xs text-[#ffa94d]">
                      [SEC_MAIL]
                    </span>
                    <span className="font-body-sm text-xs text-[#e8e8f0] font-medium">
                      {PROFILE_INFO.channels.email}
                    </span>
                  </a>
                  <button
                    onClick={handleCopyEmail}
                    className="p-1 rounded hover:bg-[#2a2b3a] text-[#8b8ca3] hover:text-[#ffa94d] transition-colors"
                    title="Copiar email"
                  >
                    <span className="material-symbols-outlined text-[16px]">
                      {copiedEmail ? 'check' : 'content_copy'}
                    </span>
                  </button>
                </div>
              </div>
            </div>

            {/* Download Official Technical CV */}
            <div className="pt-2 border-t border-[#33344a]/20 flex flex-col sm:flex-row items-center justify-between gap-3">
              <button
                onClick={onOpenCv}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded bg-[#ffa94d] text-[#3a1a00] font-title-code text-xs sm:text-sm font-bold tracking-wider uppercase transition-all duration-200 hover:shadow-[0_0_24px_rgba(255,169,77,0.45)]"
              >
                <span className="material-symbols-outlined text-[18px]">
                  description
                </span>
                Download CV Técnico (PDF)
              </button>
              <span className="font-label-code-sm text-xs text-[#8b8ca3]">
                UPDATED: Q1_2025
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
