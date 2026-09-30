import React, { useEffect, useState } from 'react';

const CONSENT_KEY = 'kz_sec_cookie_consent';

type ConsentValue = 'accepted_all' | 'essential_only';

interface StoredConsent {
  value: ConsentValue;
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
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    setVisible(getCookieConsent() === null);
  }, []);

  const persistConsent = (value: ConsentValue) => {
    try {
      localStorage.setItem(
        CONSENT_KEY,
        JSON.stringify({ value, timestamp: new Date().toISOString() })
      );
    } catch {
      // localStorage indisponível (modo privado) - apenas fecha o banner nesta sessão
    }
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-[60] p-4 sm:p-6 animate-fadeIn">
      <div className="max-w-4xl mx-auto rounded-xl bg-[#0d0e18]/95 backdrop-blur-md border border-[#ffa94d]/40 shadow-[0_10px_40px_rgba(0,0,0,0.85),0_0_25px_rgba(255,169,77,0.12)] p-5 flex flex-col gap-4">
        <div className="flex items-start gap-3">
          <span className="material-symbols-outlined text-[#ffa94d] text-[22px] shrink-0 mt-0.5">
            cookie
          </span>
          <div className="flex flex-col gap-2">
            <span className="font-title-code text-sm font-bold text-[#f8f6f2]">
              PRIVACIDADE &amp; COOKIES
            </span>
            <p className="font-body-sm text-xs text-[#c6c7d6] leading-relaxed">
              Este site usa cookies essenciais (necessários para o funcionamento
              da página) e, opcionalmente, cookies de analytics para entender o
              uso do portfólio. Nenhum dado é vendido ou compartilhado com
              terceiros para fins publicitários. Você pode alterar sua escolha
              a qualquer momento limpando os dados do site no navegador.
            </p>

            {showDetails && (
              <div className="mt-1 rounded-lg border border-[#33344a]/40 bg-[#0a0b12] p-3 font-mono text-[11px] text-[#8b8ca3] space-y-1.5">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-[#e8e8f0]">
                    <span className="text-[#ffa94d]">[ESSENCIAL]</span> Preferências de sessão (ex: consentimento salvo)
                  </span>
                  <span className="text-[10px] text-[#ffa94d]">SEMPRE ATIVO</span>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <span className="text-[#e8e8f0]">
                    <span className="text-[#4fd1ae]">[ANALYTICS]</span> Métricas de navegação anônimas
                  </span>
                  <span className="text-[10px] text-[#8b8ca3]">OPCIONAL</span>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 pt-1 border-t border-[#33344a]/20">
          <button
            onClick={() => setShowDetails((v) => !v)}
            className="font-label-code-sm text-xs text-[#8b8ca3] hover:text-[#4fd1ae] transition-colors"
          >
            {showDetails ? '[OCULTAR DETALHES]' : '[VER DETALHES]'}
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={() => persistConsent('essential_only')}
              className="px-3.5 py-2 rounded bg-[#20212e] border border-[#33344a]/50 text-[#e8e8f0] font-label-code-sm text-xs uppercase tracking-wider hover:border-[#4fd1ae]/60 transition-colors"
            >
              Somente Essenciais
            </button>
            <button
              onClick={() => persistConsent('accepted_all')}
              className="px-3.5 py-2 rounded bg-[#ffa94d] text-[#3a1a00] font-label-code-sm text-xs font-bold uppercase tracking-wider hover:shadow-[0_0_20px_rgba(255,169,77,0.4)] transition-all"
            >
              Aceitar Todos
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
