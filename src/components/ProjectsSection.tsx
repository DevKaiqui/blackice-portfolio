import React from 'react';
import { PROJECT_LABS } from '../data/portfolioData';

interface ProjectsSectionProps {
  onOpenLab: (labId: string) => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ onOpenLab }) => {
  return (
    <section
      id="projetos"
      className="relative py-16 px-4 sm:px-6 lg:px-12 border-t border-[#33344a]/20 bg-[#0d0e18]/30"
    >
      <div className="max-w-7xl mx-auto flex flex-col gap-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-3">
          <div className="flex flex-col gap-1">
            <span className="font-label-code-sm text-xs text-[#ffa94d] tracking-widest uppercase">
              // 03. LABS_E_PROJETOS
            </span>
            <h2 className="font-headline-lg text-2xl sm:text-3xl lg:text-4xl text-[#f8f6f2] tracking-tight font-bold">
              Laboratórios Interativos de Segurança
            </h2>
            <p className="font-body-sm text-xs text-[#8b8ca3] max-w-2xl mt-1">
              Demonstrações interativas de conceitos e arquiteturas que estudo e
              pratico. Código-fonte ainda não publicado publicamente — disponível
              mediante solicitação.
            </p>
          </div>
          <span className="font-label-code-sm text-xs text-[#8b8ca3]">
            LABS_DEMONSTRATIVOS // INTERATIVOS
          </span>
        </div>

        {/* 3 Project Cards Showcases */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Project 1: Threat Hunter Honeypot */}
          <div className="group flex flex-col rounded-xl bg-[#181a26]/60 backdrop-blur-md border border-[#33344a]/30 overflow-hidden transition-all duration-300 hover:border-[#ffa94d]/60 hover:shadow-[0_12px_36px_rgba(0,0,0,0.8),0_0_24px_rgba(255,169,77,0.15)]">
            {/* Simulated Visual / Diagram Frame */}
            <div className="relative h-48 w-full bg-[#14151f] border-b border-[#33344a]/30 flex items-center justify-center p-4 overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(#181a26_1px,transparent_1px)] [background-size:16px_16px] opacity-60"></div>

              {/* Mini Network SVG Topology */}
              <svg
                className="w-full h-full max-h-36 text-[#33344a] group-hover:text-[#ffa94d] transition-colors duration-300"
                fill="none"
                viewBox="0 0 320 140"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  className="fill-[#20212e] stroke-current"
                  height="50"
                  rx="4"
                  strokeWidth="1.5"
                  width="60"
                  x="20"
                  y="45"
                />
                <text
                  className="fill-[#e8e8f0] font-mono text-[9px]"
                  textAnchor="middle"
                  x="50"
                  y="74"
                >
                  ATTACKER
                </text>
                <path
                  d="M80 70 H130"
                  stroke="currentColor"
                  strokeDasharray="3 3"
                  strokeWidth="1.5"
                />
                <polygon fill="currentColor" points="125,66 133,70 125,74" />
                <rect
                  className="fill-[#181a26] stroke-[#ffa94d]"
                  height="70"
                  rx="6"
                  strokeWidth="1.5"
                  width="70"
                  x="130"
                  y="35"
                />
                <text
                  className="fill-[#ffa94d] font-mono text-[10px] font-bold"
                  textAnchor="middle"
                  x="165"
                  y="65"
                >
                  HONEYPOT
                </text>
                <text
                  className="fill-[#8b8ca3] font-mono text-[8px]"
                  textAnchor="middle"
                  x="165"
                  y="80"
                >
                  SSH:2222 / HTTP:80
                </text>
                <path d="M200 70 H250" stroke="currentColor" strokeWidth="1.5" />
                <polygon fill="currentColor" points="245,66 253,70 245,74" />
                <rect
                  className="fill-[#20212e] stroke-[#4fd1ae]"
                  height="50"
                  rx="4"
                  strokeWidth="1.5"
                  width="60"
                  x="250"
                  y="45"
                />
                <text
                  className="fill-[#4fd1ae] font-mono text-[9px] font-bold"
                  textAnchor="middle"
                  x="280"
                  y="68"
                >
                  ELK / PCAP
                </text>
                <text
                  className="fill-[#8b8ca3] font-mono text-[8px]"
                  textAnchor="middle"
                  x="280"
                  y="82"
                >
                  PARSER
                </text>
              </svg>

              <div className="absolute top-2 right-2 px-2 py-0.5 rounded bg-[#0d0e18]/90 font-label-code-sm text-[10px] text-[#ffa94d] border border-[#ffa94d]/30">
                [STATUS: ACTIVE_INTEL]
              </div>
            </div>

            {/* Card Content */}
            <div className="p-6 flex flex-col justify-between flex-1 gap-4">
              <div className="flex flex-col gap-2">
                <span className="font-label-code-sm text-xs text-[#4fd1ae]">
                  LAB_01 // THREAT_INTEL
                </span>
                <h3 className="font-headline-sm text-base text-[#f8f6f2] font-bold">
                  Network Threat Hunter &amp; Honeypot
                </h3>
                <p className="font-body-sm text-xs text-[#c6c7d6] leading-relaxed">
                  Ambiente honeypot de média interação implantado em VPS com captura
                  indiscriminada de tentativas de brute-force, extração automática de
                  payloads maliciosos e geração de relatórios de IPs atacantes.
                </p>
              </div>

              <div className="flex flex-col gap-3 pt-2 border-t border-[#33344a]/20">
                {/* Badges */}
                <div className="flex flex-wrap gap-1.5 font-label-code-sm text-[11px]">
                  <span className="px-2 py-0.5 rounded bg-[#20212e] text-[#ffa94d] border border-[#ffa94d]/20">
                    Python
                  </span>
                  <span className="px-2 py-0.5 rounded bg-[#20212e] text-[#e8e8f0] border border-[#33344a]/30">
                    Wireshark
                  </span>
                  <span className="px-2 py-0.5 rounded bg-[#20212e] text-[#e8e8f0] border border-[#33344a]/30">
                    Docker
                  </span>
                  <span className="px-2 py-0.5 rounded bg-[#20212e] text-[#4fd1ae] border border-[#4fd1ae]/20">
                    Threat Intel
                  </span>
                </div>

                {/* Action Link */}
                <button
                  onClick={() => onOpenLab('honeypot')}
                  className="inline-flex items-center gap-1 font-label-code-sm text-xs text-[#ffa94d] hover:text-[#f8f6f2] transition-colors text-left"
                >
                  <span>&gt; ABRIR LAB INTERATIVO (DEMO)</span>
                  <span className="material-symbols-outlined text-[16px]">
                    arrow_forward
                  </span>
                </button>
              </div>
            </div>
          </div>

          {/* Project 2: Web Vulnerability Scanner */}
          <div className="group flex flex-col rounded-xl bg-[#181a26]/60 backdrop-blur-md border border-[#33344a]/30 overflow-hidden transition-all duration-300 hover:border-[#4fd1ae]/60 hover:shadow-[0_12px_36px_rgba(0,0,0,0.8),0_0_24px_rgba(79,209,174,0.15)]">
            {/* Simulated Frame: Terminal Audit Output */}
            <div className="relative h-48 w-full bg-[#14151f] border-b border-[#33344a]/30 p-4 flex flex-col justify-center overflow-hidden font-label-code-sm text-xs text-[#8b8ca3]">
              <div className="flex items-center gap-1.5 text-[10px] text-[#8b8ca3] mb-1">
                <span className="w-2 h-2 rounded-full bg-[#4fd1ae]"></span>
                <span>AUDIT_TARGET: https://api.staging.lab</span>
              </div>
              <div className="bg-[#0d0e18]/80 p-2.5 rounded border border-[#33344a]/40 font-mono text-[11px] leading-tight text-[#e8e8f0] space-y-0.5">
                <div>[!] MISSING: Content-Security-Policy</div>
                <div>[!] INSECURE_COOKIE: No 'HttpOnly' flag</div>
                <div className="text-[#ffa94d]">[+] VULN_FOUND: Directory Listing (/backups)</div>
                <div className="text-[#4fd1ae]">[&gt;] EXPLOIT_VECTOR: CORS Origin * Wildcard</div>
              </div>
              <div className="absolute top-2 right-2 px-2 py-0.5 rounded bg-[#0d0e18]/90 font-label-code-sm text-[10px] text-[#4fd1ae] border border-[#4fd1ae]/30">
                [AUDITOR_v1.8]
              </div>
            </div>

            {/* Card Content */}
            <div className="p-6 flex flex-col justify-between flex-1 gap-4">
              <div className="flex flex-col gap-2">
                <span className="font-label-code-sm text-xs text-[#4fd1ae]">
                  LAB_02 // OFFENSIVE_TOOLING
                </span>
                <h3 className="font-headline-sm text-base text-[#f8f6f2] font-bold">
                  Web Vulnerability Scanner &amp; OWASP Auditor
                </h3>
                <p className="font-body-sm text-xs text-[#c6c7d6] leading-relaxed">
                  Ferramenta CLI modular construída para mapeamento automatizado de
                  cabeçalhos inseguros, testes de injeção básica, detecção de
                  diretórios ocultos e verificação de endpoints de API expostos.
                </p>
              </div>

              <div className="flex flex-col gap-3 pt-2 border-t border-[#33344a]/20">
                {/* Badges */}
                <div className="flex flex-wrap gap-1.5 font-label-code-sm text-[11px]">
                  <span className="px-2 py-0.5 rounded bg-[#20212e] text-[#ffa94d] border border-[#ffa94d]/20">
                    Bash
                  </span>
                  <span className="px-2 py-0.5 rounded bg-[#20212e] text-[#e8e8f0] border border-[#33344a]/30">
                    Python
                  </span>
                  <span className="px-2 py-0.5 rounded bg-[#20212e] text-[#4fd1ae] border border-[#4fd1ae]/20">
                    OWASP Top 10
                  </span>
                  <span className="px-2 py-0.5 rounded bg-[#20212e] text-[#e8e8f0] border border-[#33344a]/30">
                    Burp API
                  </span>
                </div>

                {/* Action Link */}
                <button
                  onClick={() => onOpenLab('scanner')}
                  className="inline-flex items-center gap-1 font-label-code-sm text-xs text-[#4fd1ae] hover:text-[#f8f6f2] transition-colors text-left"
                >
                  <span>&gt; ABRIR LAB INTERATIVO (DEMO)</span>
                  <span className="material-symbols-outlined text-[16px]">
                    arrow_forward
                  </span>
                </button>
              </div>
            </div>
          </div>

          {/* Project 3: Home Lab pfSense & IDS Suricata */}
          <div className="group flex flex-col rounded-xl bg-[#181a26]/60 backdrop-blur-md border border-[#33344a]/30 overflow-hidden transition-all duration-300 hover:border-[#ffa94d]/60 hover:shadow-[0_12px_36px_rgba(0,0,0,0.8),0_0_24px_rgba(255,169,77,0.15)]">
            {/* Simulated Frame: Proxmox Virtual Topology */}
            <div className="relative h-48 w-full bg-[#14151f] border-b border-[#33344a]/30 flex items-center justify-center p-4 overflow-hidden">
              <div className="w-full flex flex-col gap-2 font-mono text-[10px]">
                <div className="flex items-center justify-between p-1.5 rounded bg-[#20212e] border border-[#33344a]/40">
                  <span className="text-[#8b8ca3]">WAN GATEWAY</span>
                  <span className="text-[#4fd1ae]">pfSense 2.7.2-RELEASE</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="p-1.5 rounded bg-[#181a26] border border-[#ffa94d]/30 text-center">
                    <span className="text-[#ffa94d] block font-semibold">
                      VLAN 10 [DMZ]
                    </span>
                    <span className="text-[#8b8ca3] text-[9px]">Web Isolated</span>
                  </div>
                  <div className="p-1.5 rounded bg-[#181a26] border border-[#4fd1ae]/30 text-center">
                    <span className="text-[#4fd1ae] block font-semibold">
                      VLAN 20 [LAB]
                    </span>
                    <span className="text-[#8b8ca3] text-[9px]">
                      Vulnerable Targets
                    </span>
                  </div>
                </div>
                <div className="text-center font-label-code-sm text-[10px] text-[#ffa94d]">
                  [SURICATA IDS/IPS: ACTIVE INLINE INSPECTION]
                </div>
              </div>

              <div className="absolute top-2 right-2 px-2 py-0.5 rounded bg-[#0d0e18]/90 font-label-code-sm text-[10px] text-[#ffa94d] border border-[#ffa94d]/30">
                [PROXMOX VE 8.1]
              </div>
            </div>

            {/* Card Content */}
            <div className="p-6 flex flex-col justify-between flex-1 gap-4">
              <div className="flex flex-col gap-2">
                <span className="font-label-code-sm text-xs text-[#4fd1ae]">
                  LAB_03 // HARDENED_INFRA
                </span>
                <h3 className="font-headline-sm text-base text-[#f8f6f2] font-bold">
                  Home Lab pfSense &amp; IDS/IPS Suricata
                </h3>
                <p className="font-body-sm text-xs text-[#c6c7d6] leading-relaxed">
                  Infraestrutura corporativa virtualizada em cluster Proxmox com tripla
                  segmentação L2/L3, regras restritivas de firewall, inspeção inline com
                  Suricata e VPN WireGuard para gestão remota out-of-band.
                </p>
              </div>

              <div className="flex flex-col gap-3 pt-2 border-t border-[#33344a]/20">
                {/* Badges */}
                <div className="flex flex-wrap gap-1.5 font-label-code-sm text-[11px]">
                  <span className="px-2 py-0.5 rounded bg-[#20212e] text-[#ffa94d] border border-[#ffa94d]/20">
                    pfSense
                  </span>
                  <span className="px-2 py-0.5 rounded bg-[#20212e] text-[#4fd1ae] border border-[#4fd1ae]/20">
                    Suricata
                  </span>
                  <span className="px-2 py-0.5 rounded bg-[#20212e] text-[#e8e8f0] border border-[#33344a]/30">
                    Proxmox
                  </span>
                  <span className="px-2 py-0.5 rounded bg-[#20212e] text-[#e8e8f0] border border-[#33344a]/30">
                    Firewall L4/L7
                  </span>
                </div>

                {/* Action Link */}
                <button
                  onClick={() => onOpenLab('topology')}
                  className="inline-flex items-center gap-1 font-label-code-sm text-xs text-[#ffa94d] hover:text-[#f8f6f2] transition-colors text-left"
                >
                  <span>&gt; VER SIMULAÇÃO DE TOPOLOGIA</span>
                  <span className="material-symbols-outlined text-[16px]">
                    arrow_forward
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
