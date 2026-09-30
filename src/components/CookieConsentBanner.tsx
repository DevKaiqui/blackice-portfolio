import React, { useEffect, useState } from 'react';

const CONSENT_KEY = 'kz_sec_cookie_consent';

interface StoredConsent {
  value: 'acknowledged';
  timestamp: string;
}

export const getCookieConsent = (): StoredConsent | null => {
  try {
    const raw = localStorage.getItem(CONSENT_KEY);
    return raw ? (JSON.parse(raw) as StoredConsent) : null;
  } catch {
    return null;
  }
};

export const CookieConsentBanner: React.FC = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(getCookieConsent() === null);
  }, []);

  const acknowledge = () => {
    try {
      localStorage.setItem(
        CONSENT_KEY,
        JSON.stringify({ value: 'acknowledged', timestamp: new Date().toISOString() })
      );
    } catch {
      // localStorage indisponível (modo privado) - apenas fecha o banner nesta sessão
    }
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-[60] p-4 sm:p-6 animate-fadeIn">
      <div className="max-w-4xl mx-auto rounded-xl bg-[#0d0e18]/95 backdrop-blur-md border border-[#ffa94d]/40 shadow-[0_10px_40px_rgba(0,0,0,0.85),0_0_25px_rgba(255,169,77,0.12)] p-5 flex flex-col sm:flex-row sm:items-center gap-4">
        <div className="flex items-start gap-3 flex-1">
          <span className="material-symbols-outlined text-[#ffa94d] text-[22px] shrink-0 mt-0.5">
            cookie
          </span>
          <div className="flex flex-col gap-1">
            <span className="font-title-code text-sm font-bold text-[#f8f6f2]">
              PRIVACIDADE &amp; COOKIES
            </span>
            <p className="font-body-sm text-xs text-[#c6c7d6] leading-relaxed">
              Este site usa apenas um cookie essencial (guardar sua sessão de
              login, quando você entra na conta) e o `localStorage` do
              navegador para lembrar que você já viu este aviso. Não há
              rastreamento de analytics nem venda/compartilhamento de dados
              com terceiros.
            </p>
          </div>
        </div>

        <button
          onClick={acknowledge}
          className="shrink-0 px-3.5 py-2 rounded bg-[#ffa94d] text-[#3a1a00] font-label-code-sm text-xs font-bold uppercase tracking-wider hover:shadow-[0_0_20px_rgba(255,169,77,0.4)] transition-all"
        >
          Entendi
        </button>
      </div>
    </div>
  );
};
