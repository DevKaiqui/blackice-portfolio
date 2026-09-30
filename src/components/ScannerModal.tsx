import React, { useState } from 'react';

interface ScannerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ScannerModal: React.FC<ScannerModalProps> = ({ isOpen, onClose }) => {
  const [targetUrl, setTargetUrl] = useState('https://api.staging.lab');
  const [scanning, setScanning] = useState(false);
  const [scanCompleted, setScanCompleted] = useState(true);

  if (!isOpen) return null;

  const handleStartScan = (e: React.FormEvent) => {
    e.preventDefault();
    setScanning(true);
    setScanCompleted(false);

    setTimeout(() => {
      setScanning(false);
      setScanCompleted(true);
    }, 1800);
  };

  const sampleTargets = [
    'https://api.staging.lab',
    'https://legacy-portal.corp',
    'https://ecommerce.test',
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-4xl rounded-xl bg-[#0d0e18] border border-[#4fd1ae]/50 shadow-[0_20px_50px_rgba(0,0,0,0.9),0_0_30px_rgba(79,209,174,0.15)] flex flex-col max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 bg-[#14151f] border-b border-[#33344a]/40 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#4fd1ae] text-[22px]">
              policy
            </span>
            <div>
              <span className="font-title-code text-sm font-bold text-[#f8f6f2]">
                LAB_02 // Web Vulnerability Scanner &amp; OWASP Auditor
              </span>
              <span className="text-[10px] text-[#4fd1ae] block font-mono">
                SIMULADOR DE AUDITORIA DE SEGURANÇA WEB
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded text-[#8b8ca3] hover:text-white hover:bg-[#20212e] transition-colors"
            aria-label="Fechar"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Target input form */}
        <div className="px-6 py-4 bg-[#0a0b12] border-b border-[#33344a]/30">
          <form onSubmit={handleStartScan} className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1 flex items-center bg-[#0d0e18] border border-[#33344a]/50 rounded px-3 py-2 font-mono text-xs text-[#4fd1ae]">
              <span className="text-[#8b8ca3] mr-2">ALVO:</span>
              <input
                type="text"
                value={targetUrl}
                onChange={(e) => setTargetUrl(e.target.value)}
                className="flex-1 bg-transparent text-[#e8e8f0] focus:outline-none"
                placeholder="https://exemplo.com"
              />
            </div>
            <button
              type="submit"
              disabled={scanning}
              className="px-5 py-2 rounded bg-[#4fd1ae] hover:bg-[#a7f3e0] text-[#062420] font-mono text-xs font-bold transition-all shadow-[0_0_15px_rgba(79,209,174,0.3)] disabled:opacity-50 flex items-center justify-center gap-1.5"
            >
              {scanning ? (
                <>
                  <span className="animate-spin material-symbols-outlined text-[16px]">
                    refresh
                  </span>
                  <span>EXECUTANDO AUDITORIA...</span>
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined text-[16px]">play_arrow</span>
                  <span>INICIAR SCAN OWASP</span>
                </>
              )}
            </button>
          </form>

          {/* Preset Chips */}
          <div className="flex items-center gap-2 mt-2 font-mono text-[11px] text-[#8b8ca3]">
            <span>Alvos de teste:</span>
            {sampleTargets.map((t) => (
              <button
                key={t}
                onClick={() => setTargetUrl(t)}
                className="px-1.5 py-0.5 rounded bg-[#14151f] hover:text-[#4fd1ae] transition-colors"
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-4 terminal-scroll text-xs">
          {scanning ? (
            <div className="py-12 flex flex-col items-center justify-center gap-3">
              <span className="material-symbols-outlined text-4xl text-[#4fd1ae] animate-pulse">
                search_check
              </span>
              <p className="font-mono text-xs text-[#4fd1ae]">
                Analisando cabeçalhos HTTP, diretórios ocultos e CORS em {targetUrl}...
              </p>
              <div className="w-64 h-1.5 bg-[#14151f] rounded-full overflow-hidden">
                <div className="h-full bg-[#4fd1ae] animate-pulse w-3/4"></div>
              </div>
            </div>
          ) : scanCompleted ? (
            <div className="space-y-4">
              {/* Scorecard */}
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 font-mono text-xs">
                <div className="p-3 rounded bg-[#14151f] border border-[#ffb4ab]/40">
                  <span className="text-[#8b8ca3] block text-[10px]">CRITICAL FINDINGS</span>
                  <span className="text-[#ffb4ab] text-xl font-bold">1</span>
                  <span className="text-[10px] text-[#8b8ca3]">Directory Listing</span>
                </div>
                <div className="p-3 rounded bg-[#14151f] border border-[#ffbd2e]/40">
                  <span className="text-[#8b8ca3] block text-[10px]">MEDIUM VULNS</span>
                  <span className="text-[#ffbd2e] text-xl font-bold">2</span>
                  <span className="text-[10px] text-[#8b8ca3]">CORS &amp; Cookie Flags</span>
                </div>
                <div className="p-3 rounded bg-[#14151f] border border-[#33344a]/40">
                  <span className="text-[#8b8ca3] block text-[10px]">LOW / INFO</span>
                  <span className="text-[#8b8ca3] text-xl font-bold">1</span>
                  <span className="text-[10px] text-[#8b8ca3]">CSP Missing</span>
                </div>
                <div className="p-3 rounded bg-[#14151f] border border-[#ffa94d]/40">
                  <span className="text-[#8b8ca3] block text-[10px]">SECURITY RATING</span>
                  <span className="text-[#ffa94d] text-xl font-bold">B- (Defesa Ativa)</span>
                  <span className="text-[10px] text-[#8b8ca3]">Ajustes necessários</span>
                </div>
              </div>

              {/* Vulnerabilities Table */}
              <div className="space-y-2">
                <span className="font-mono text-xs text-[#4fd1ae] font-semibold">
                  DETALHES DAS VULNERABILIDADES ENCONTRADAS
                </span>

                <div className="rounded-lg border border-[#33344a]/40 bg-[#0d0e18] divide-y divide-[#33344a]/20 font-mono text-xs">
                  {/* Vuln 1 */}
                  <div className="p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="px-1.5 py-0.5 rounded bg-[#ffb4ab]/10 text-[#ffb4ab] border border-[#ffb4ab]/30 text-[10px] font-bold">
                          HIGH // CVSS 7.5
                        </span>
                        <span className="text-[#f8f6f2] font-semibold">
                          Directory Listing Habilitado (/backups)
                        </span>
                      </div>
                      <p className="text-[#c6c7d6] text-[11px] mt-1">
                        O diretório /backups permite navegação pública, expondo arquivos compactados .sql e .tar.gz.
                      </p>
                    </div>
                    <span className="text-[#4fd1ae] text-[11px] whitespace-nowrap">
                      Solução: Options -Indexes no Nginx/Apache
                    </span>
                  </div>

                  {/* Vuln 2 */}
                  <div className="p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="px-1.5 py-0.5 rounded bg-[#ffbd2e]/10 text-[#ffbd2e] border border-[#ffbd2e]/30 text-[10px] font-bold">
                          MEDIUM // CVSS 5.3
                        </span>
                        <span className="text-[#f8f6f2] font-semibold">
                          CORS Origin Permissivo (Access-Control-Allow-Origin: *)
                        </span>
                      </div>
                      <p className="text-[#c6c7d6] text-[11px] mt-1">
                        Permite que origens arbitrárias de terceiros realizem requisições autenticadas com credenciais.
                      </p>
                    </div>
                    <span className="text-[#4fd1ae] text-[11px] whitespace-nowrap">
                      Solução: Whitelist rigorosa de domínios
                    </span>
                  </div>

                  {/* Vuln 3 */}
                  <div className="p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="px-1.5 py-0.5 rounded bg-[#ffbd2e]/10 text-[#ffbd2e] border border-[#ffbd2e]/30 text-[10px] font-bold">
                          MEDIUM // CVSS 4.3
                        </span>
                        <span className="text-[#f8f6f2] font-semibold">
                          Cookies de Sessão sem flags 'HttpOnly' e 'Secure'
                        </span>
                      </div>
                      <p className="text-[#c6c7d6] text-[11px] mt-1">
                        Possibilita o roubo de sessão caso ocorra exploração secundária de Cross-Site Scripting (XSS).
                      </p>
                    </div>
                    <span className="text-[#4fd1ae] text-[11px] whitespace-nowrap">
                      Solução: Set-Cookie: ...; Secure; HttpOnly; SameSite=Strict
                    </span>
                  </div>

                  {/* Vuln 4 */}
                  <div className="p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="px-1.5 py-0.5 rounded bg-[#8b8ca3]/20 text-[#8b8ca3] text-[10px] font-bold">
                          LOW // CVSS 3.1
                        </span>
                        <span className="text-[#f8f6f2] font-semibold">
                          Ausência de cabeçalho Content-Security-Policy (CSP)
                        </span>
                      </div>
                      <p className="text-[#c6c7d6] text-[11px] mt-1">
                        Falta de diretivas explícitas de restrição de scripts inline e carregamento de fontes externas.
                      </p>
                    </div>
                    <span className="text-[#4fd1ae] text-[11px] whitespace-nowrap">
                      Solução: Adicionar header CSP padrão
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ) : null}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-[#14151f] border-t border-[#33344a]/30 flex items-center justify-between font-mono text-[11px] text-[#8b8ca3]">
          <span>OWASP TOP 10 COMPLIANCE CHECKER</span>
          <button onClick={onClose} className="text-[#4fd1ae] hover:underline">
            [CONCLUIR AUDITORIA]
          </button>
        </div>
      </div>
    </div>
  );
};
