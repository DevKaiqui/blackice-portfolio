import React, { useState } from 'react';
import { LOGO_URL } from '../data/portfolioData';

interface ImageGalleryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ImageGalleryModal: React.FC<ImageGalleryModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  if (!isOpen) return null;

  const images = [
    {
      id: 'logo-official',
      title: 'KZ.SEC Logo Oficial (SVG Embutido)',
      description: 'Logomarca vetorial embutida como data URI — sem dependência de link externo, nunca quebra.',
      url: LOGO_URL,
      htmlSnippet: `<img src="${LOGO_URL}" alt="KZ Cyber Security Logo" class="h-8 w-auto object-contain" />`,
    },
    {
      id: 'shield-icon-svg',
      title: 'KZ Shield Insignia (Vector SVG)',
      description: 'Símbolo tático do escudo com verificação em gradiente neon verde e ciano.',
      url: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" rx="20" fill="%230c0e12"/><path d="M50 18 L78 30 V50 C78 68 50 82 50 82 C50 82 22 68 22 50 V30 Z" fill="none" stroke="%23ffa94d" stroke-width="7"/><path d="M40 48 L48 56 L62 42" fill="none" stroke="%2300daf3" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/></svg>',
      htmlSnippet: `<svg viewBox="0 0 100 100" class="h-8 w-8"><rect width="100" height="100" rx="20" fill="#0d0e18"/><path d="M50 18 L78 30 V50 C78 68 50 82 50 82 C50 82 22 68 22 50 V30 Z" fill="none" stroke="#ffa94d" stroke-width="7"/><path d="M40 48 L48 56 L62 42" fill="none" stroke="#4fd1ae" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
    }
  ];

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-3xl rounded-xl bg-[#0d0e18] border border-[#ffa94d]/50 shadow-[0_20px_50px_rgba(0,0,0,0.9),0_0_30px_rgba(255,169,77,0.15)] flex flex-col max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 bg-[#14151f] border-b border-[#33344a]/40 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#ffa94d] text-[20px]">
              photo_library
            </span>
            <span className="font-title-code text-sm font-bold text-[#f8f6f2]">
              LINKS DIRETOS PARA AS IMAGENS DO HTML
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded text-[#8b8ca3] hover:text-white hover:bg-[#20212e] transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6 terminal-scroll text-xs">
          <p className="text-[#c6c7d6]">
            Abaixo estão os links diretos para as imagens utilizadas no layout HTML, permitindo visualização em tamanho real, cópia da URL ou download:
          </p>

          <div className="space-y-4">
            {images.map((item) => (
              <div
                key={item.id}
                className="p-4 rounded-lg bg-[#14151f] border border-[#33344a]/40 flex flex-col sm:flex-row items-center gap-5"
              >
                {/* Image Preview Box */}
                <div className="w-24 h-24 shrink-0 rounded bg-[#0d0e18] border border-[#33344a]/50 p-2 flex items-center justify-center">
                  <img
                    src={item.url}
                    alt={item.title}
                    className="max-h-full max-w-full object-contain"
                    referrerPolicy="no-referrer"
                  />
                </div>

                {/* Details & Actions */}
                <div className="flex-1 space-y-2 w-full">
                  <div>
                    <h3 className="font-mono text-sm font-bold text-[#f8f6f2]">
                      {item.title}
                    </h3>
                    <p className="text-[11px] text-[#8b8ca3]">
                      {item.description}
                    </p>
                  </div>

                  {/* URL Box */}
                  <div className="p-2 rounded bg-[#0d0e18] font-mono text-[10px] text-[#4fd1ae] break-all select-all flex items-center justify-between gap-2">
                    <span className="truncate">{item.url}</span>
                    <button
                      onClick={() => handleCopy(item.url, `${item.id}-url`)}
                      className="shrink-0 text-[#8b8ca3] hover:text-[#ffa94d]"
                      title="Copiar URL Direta"
                    >
                      <span className="material-symbols-outlined text-[14px]">
                        {copiedId === `${item.id}-url` ? 'check' : 'content_copy'}
                      </span>
                    </button>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap gap-2 pt-1">
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-2.5 py-1 rounded bg-[#20212e] hover:bg-[#ffa94d] hover:text-[#3a1a00] text-[#ffa94d] font-mono text-[11px] transition-colors flex items-center gap-1"
                    >
                      <span className="material-symbols-outlined text-[13px]">
                        open_in_new
                      </span>
                      <span>Abrir Imagem Direta</span>
                    </a>

                    <button
                      onClick={() => handleCopy(item.htmlSnippet, `${item.id}-html`)}
                      className="px-2.5 py-1 rounded bg-[#20212e] text-[#8b8ca3] hover:text-white font-mono text-[11px] transition-colors flex items-center gap-1"
                    >
                      <span className="material-symbols-outlined text-[13px]">
                        code
                      </span>
                      <span>
                        {copiedId === `${item.id}-html`
                          ? 'Snippet Copiado!'
                          : 'Copiar Tag HTML'}
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-[#14151f] border-t border-[#33344a]/30 flex items-center justify-between font-mono text-[11px] text-[#8b8ca3]">
          <span>ASSETS: DIRECT_IMAGE_RESOURCES</span>
          <button onClick={onClose} className="text-[#ffa94d] hover:underline">
            [FECHAR JANELA]
          </button>
        </div>
      </div>
    </div>
  );
};
