import React, { useState } from 'react';
import { PGP_FINGERPRINT, PGP_KEY_ID, PGP_PUBLIC_KEY_BLOCK } from '../data/portfolioData';

interface PgpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PgpModal: React.FC<PgpModalProps> = ({ isOpen, onClose }) => {
  const [copiedKey, setCopiedKey] = useState(false);
  const [copiedFingerprint, setCopiedFingerprint] = useState(false);

  if (!isOpen) return null;

  const handleCopyKey = () => {
    navigator.clipboard.writeText(PGP_PUBLIC_KEY_BLOCK);
    setCopiedKey(true);
    setTimeout(() => setCopiedKey(false), 2000);
  };

  const handleCopyFingerprint = () => {
    navigator.clipboard.writeText(PGP_FINGERPRINT);
    setCopiedFingerprint(true);
    setTimeout(() => setCopiedFingerprint(false), 2000);
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-3xl rounded-xl bg-[#0d0e18] border border-[#ffa94d]/50 shadow-[0_20px_50px_rgba(0,0,0,0.9),0_0_30px_rgba(255,169,77,0.15)] flex flex-col max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 bg-[#14151f] border-b border-[#33344a]/40 flex items-center justify-between">
          <div className="flex items-center gap-2 text-[#ffa94d] font-title-code text-sm font-bold">
            <span className="material-symbols-outlined text-[20px]">key</span>
            <span>PGP_CRYPTOSYSTEM // RSA 4096-BIT</span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded text-[#8b8ca3] hover:text-white hover:bg-[#20212e] transition-colors"
            aria-label="Fechar"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6 terminal-scroll font-body-sm text-xs text-[#c6c7d6]">
          {/* Fingerprint block */}
          <div className="p-4 rounded-lg bg-[#0a0b12] border border-[#33344a]/40 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-[#8b8ca3]">
                KEY FINGERPRINT (RSA-4096)
              </span>
              <span className="text-[11px] font-mono text-[#4fd1ae]">
                KEY_ID: {PGP_KEY_ID}
              </span>
            </div>
            <div className="p-2.5 rounded bg-[#0d0e18] font-mono text-xs text-[#a7f3e0] flex items-center justify-between gap-2 break-all select-all">
              <span>{PGP_FINGERPRINT}</span>
              <button
                onClick={handleCopyFingerprint}
                className="shrink-0 p-1.5 rounded bg-[#20212e] hover:bg-[#ffa94d] hover:text-[#3a1a00] text-white transition-colors"
                title="Copiar Fingerprint"
              >
                <span className="material-symbols-outlined text-[16px]">
                  {copiedFingerprint ? 'check' : 'content_copy'}
                </span>
              </button>
            </div>
          </div>

          {/* ASCII Armored Block */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs text-[#ffa94d] font-semibold">
                PUBLIC KEY BLOCK (.asc)
              </span>
              <div className="flex gap-2">
                <button
                  onClick={handleCopyKey}
                  className="px-2.5 py-1 rounded bg-[#14151f] hover:bg-[#ffa94d] hover:text-[#3a1a00] text-[#ffa94d] border border-[#ffa94d]/40 font-mono text-xs transition-colors flex items-center gap-1"
                >
                  <span className="material-symbols-outlined text-[14px]">
                    {copiedKey ? 'check' : 'content_copy'}
                  </span>
                  <span>{copiedKey ? 'Copiado!' : 'Copiar Bloco'}</span>
                </button>
                <button
                  onClick={handleDownloadAsc}
                  className="px-2.5 py-1 rounded bg-[#ffa94d] text-[#3a1a00] font-mono text-xs font-bold hover:shadow-[0_0_15px_rgba(255,169,77,0.3)] transition-all flex items-center gap-1"
                >
                  <span className="material-symbols-outlined text-[14px]">download</span>
                  <span>Download .asc</span>
                </button>
              </div>
            </div>

            <pre className="p-4 rounded-lg bg-[#0d0e18] border border-[#33344a]/50 font-mono text-[11px] text-[#8b8ca3] leading-relaxed overflow-x-auto select-all">
              {PGP_PUBLIC_KEY_BLOCK}
            </pre>
          </div>

          {/* How to use it */}
          <div className="p-4 rounded-lg bg-[#0a0b12] border border-[#4fd1ae]/30 space-y-2">
            <div className="flex items-center gap-2 text-[#4fd1ae] font-mono text-xs font-semibold">
              <span className="material-symbols-outlined text-[16px]">lock</span>
              <span>COMO ENVIAR UMA MENSAGEM CRIPTOGRAFADA</span>
            </div>
            <p className="text-[11px] text-[#c6c7d6] leading-relaxed">
              Importe a chave acima no GnuPG ou em um cliente compatível
              (ex: <code className="text-[#a7f3e0]">gpg --import</code>) e
              criptografe sua mensagem para o fingerprint mostrado. Este site
              é estático e não faz criptografia no navegador — a chave é real
              e importável, mas a cifragem deve ser feita no seu próprio
              cliente PGP.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-[#14151f] border-t border-[#33344a]/30 flex items-center justify-between text-[#8b8ca3] font-mono text-[11px]">
          <span>CIPHER: AES-256-GCM // HASH: SHA-512</span>
          <button
            onClick={onClose}
            className="text-[#ffa94d] hover:underline"
          >
            [CONCLUIR]
          </button>
        </div>
      </div>
    </div>
  );
};
