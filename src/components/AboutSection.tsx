import React, { useState } from 'react';
import { PROFILE_INFO } from '../data/portfolioData';

interface AboutSectionProps {
  onOpenSkills?: () => void;
  onOpenProjects?: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({
  onOpenSkills,
  onOpenProjects,
}) => {
  const [selectedPillar, setSelectedPillar] = useState<string | null>(null);

  const pillars = [
    {
      id: 'ctfs',
      icon: 'flag',
      title: 'Laboratórios & CTFs',
      description:
        'Mais de 100+ desafios resolvidos no TryHackMe & Hack The Box, com foco em privilege escalation (Linux/Windows) e exploração controlada de serviços web.',
      footerLabel: 'PROGRESSÃO',
      footerValue: '> 100 BOXES',
      color: 'neon',
      details: [
        'Resolução metódica de máquinas Linux com exploração de falhas SUID, PATH hijacking e sudoers.',
        'Exploração controlada de serviços web baseada no OWASP Top 10.',
        'Privilege Escalation em ambientes Windows via SeImpersonatePrivilege e unquoted service paths.',
        'Análise de memória e dumps voláteis em cenários de blue team.'
      ]
    },
    {
      id: 'arsenal',
      icon: 'handyman',
      title: 'Arsenal Operacional',
      description:
        'Domínio prático em Kali Linux, Wireshark, Burp Suite, Nmap, Metasploit e Python scriptado para automação de inteligência ofensiva e defensiva.',
      footerLabel: 'TOOLCHAIN',
      footerValue: 'SEC_KALI_OPS',
      color: 'cyan',
      details: [
        'Análise aprofundada de arquivos PCAP com Wireshark e TShark.',
        'Configuração de proxies e automação de fuzzing com Burp Suite Pro & extensions.',
        'Criação de scripts customizados em Python 3 para automação de scans e extração de evidências.',
        'Operação em ambientes Linux headless com foco em discrição operacional.'
      ]
    },
    {
      id: 'redes',
      icon: 'lan',
      title: 'Redes & Hardening',
      description:
        'Especialização nas camadas TCP/IP, segmentação rígida de VLANs, firewalls pfSense, análise de telemetria SIEM e mitigação ativa de vetores DDoS.',
      footerLabel: 'DEFENSE CORE',
      footerValue: 'L2/L3 SEGREGATION',
      color: 'neon',
      details: [
        'Estruturação de VLANs isoladas com regras de firewall stateful no pfSense.',
        'Implementação de túneis seguros WireGuard e IPsec para acesso out-of-band.',
        'Configuração de regras IDS/IPS Suricata inline contra exploits ativos.',
        'Análise de cabeçalhos e conformidade com CIS Benchmarks para servidores Linux.'
      ]
    },
  ];

  return (
    <section
      id="sobre"
      className="relative py-16 px-4 sm:px-6 lg:px-12 border-t border-[#33344a]/20 bg-[#0d0e18]/40"
    >
      <div className="max-w-7xl mx-auto flex flex-col gap-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-3">
          <div className="flex flex-col gap-1">
            <span className="font-label-code-sm text-xs text-[#ffa94d] tracking-widest uppercase">
              // 01. INTEL_DOSSIER - SOBRE MIM
            </span>
            <h2 className="font-headline-lg text-2xl sm:text-3xl lg:text-4xl text-[#f8f6f2] tracking-tight font-bold">
              Fundamentos Sólidos & Mentalidade Ofensiva
            </h2>
          </div>
          <div className="font-label-code-sm text-xs text-[#8b8ca3]">
            SYS_DOC: {PROFILE_INFO.sysDoc}
          </div>
        </div>

        {/* Grid Layout: Bio Text + Pillars Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Narrative Bio Column */}
          <div className="lg:col-span-5 flex flex-col gap-4 p-6 rounded-xl bg-[#181a26]/60 backdrop-blur-md border border-[#33344a]/30">
            <div className="flex items-center gap-2 font-label-code-sm text-xs text-[#4fd1ae]">
              <span className="material-symbols-outlined text-[16px]">fingerprint</span>
              <span>BIOGRAPHY // TRAJECTORY</span>
            </div>

            <p className="font-body-md text-sm text-[#c6c7d6] leading-relaxed">
              {PROFILE_INFO.bioParagraph1}
            </p>

            <p className="font-body-md text-sm text-[#c6c7d6] leading-relaxed">
              {PROFILE_INFO.bioParagraph2}
            </p>

            <div className="p-3 rounded bg-[#14151f] border border-[#33344a]/40 flex items-center gap-3 font-label-code-sm text-xs text-[#f8f6f2]">
              <span className="material-symbols-outlined text-[#ffa94d] text-[20px] shrink-0">
                verified_user
              </span>
              <span>{PROFILE_INFO.ethicsMotto}</span>
            </div>
          </div>

          {/* 3 Glassmorphism Tactical Cards */}
          <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-3 gap-4">
            {pillars.map((pillar) => {
              const isNeon = pillar.color === 'neon';
              const isSelected = selectedPillar === pillar.id;

              return (
                <div
                  key={pillar.id}
                  onClick={() => setSelectedPillar(isSelected ? null : pillar.id)}
                  className={`group flex flex-col justify-between p-5 rounded-xl bg-[#181a26]/40 backdrop-blur-md border cursor-pointer transition-all duration-300 ${
                    isSelected
                      ? isNeon
                        ? 'border-[#ffa94d] shadow-[0_0_30px_rgba(255,169,77,0.2)] bg-[#14151f]'
                        : 'border-[#4fd1ae] shadow-[0_0_30px_rgba(79,209,174,0.2)] bg-[#14151f]'
                      : isNeon
                      ? 'border-[#33344a]/30 hover:border-[#ffa94d]/50 hover:shadow-[0_0_25px_rgba(255,169,77,0.12)]'
                      : 'border-[#33344a]/30 hover:border-[#4fd1ae]/50 hover:shadow-[0_0_25px_rgba(79,209,174,0.12)]'
                  }`}
                >
                  <div className="flex flex-col gap-3">
                    <div
                      className={`w-11 h-11 rounded flex items-center justify-center transition-transform group-hover:scale-110 ${
                        isNeon
                          ? 'bg-[#ffa94d]/10 border border-[#ffa94d]/30 text-[#ffa94d]'
                          : 'bg-[#6fe3c8]/10 border border-[#4fd1ae]/30 text-[#4fd1ae]'
                      }`}
                    >
                      <span className="material-symbols-outlined text-[22px]">
                        {pillar.icon}
                      </span>
                    </div>

                    <h3 className="font-headline-sm text-base text-[#f8f6f2] font-bold">
                      {pillar.title}
                    </h3>

                    <p className="font-body-sm text-xs text-[#c6c7d6] leading-normal">
                      {pillar.description}
                    </p>

                    {isSelected && (
                      <div className="mt-2 pt-2 border-t border-[#33344a]/40 space-y-1.5 text-[11px] font-mono text-[#c6c7d6]">
                        {pillar.details.map((d, i) => (
                          <div key={i} className="flex items-start gap-1">
                            <span className={isNeon ? 'text-[#ffa94d]' : 'text-[#4fd1ae]'}>&gt;</span>
                            <span>{d}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="mt-4 pt-2 border-t border-[#33344a]/20 flex items-center justify-between font-label-code-sm text-[11px] text-[#8b8ca3]">
                    <span>{pillar.footerLabel}</span>
                    <span
                      className={`font-semibold ${
                        isNeon ? 'text-[#ffa94d]' : 'text-[#4fd1ae]'
                      }`}
                    >
                      {pillar.footerValue}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
