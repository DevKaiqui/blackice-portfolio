import React from 'react';
import { PROFILE_INFO } from '../data/portfolioData';

interface CvModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CvModal: React.FC<CvModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-3xl rounded-xl bg-[#0d0e18] border border-[#ffa94d]/50 shadow-[0_20px_50px_rgba(0,0,0,0.9),0_0_30px_rgba(255,169,77,0.15)] flex flex-col max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 bg-[#14151f] border-b border-[#33344a]/40 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#ffa94d] text-[20px]">
              description
            </span>
            <span className="font-title-code text-sm font-bold text-[#f8f6f2]">
              CURRÍCULO TÉCNICO // KAIQUE ZOMER
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3 py-1 rounded bg-[#ffa94d] text-[#3a1a00] font-mono text-xs font-bold hover:shadow-[0_0_15px_rgba(255,169,77,0.3)] transition-all flex items-center gap-1"
            >
              <span className="material-symbols-outlined text-[14px]">print</span>
              <span>Imprimir / PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1 rounded text-[#8b8ca3] hover:text-white hover:bg-[#20212e] transition-colors"
            >
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>
          </div>
        </div>

        {/* CV Document Body */}
        <div className="p-8 overflow-y-auto space-y-6 terminal-scroll font-sans text-xs text-[#c6c7d6] bg-[#0a0b12]">
          {/* Header Info */}
          <div className="border-b border-[#33344a]/40 pb-5">
            <h1 className="text-2xl font-bold text-[#f8f6f2] tracking-tight">
              Kaique Zomer
            </h1>
            <p className="text-sm font-mono text-[#ffa94d] mt-0.5">
              Cybersecurity Analyst | Network Threat Intelligence | Ethical Hacker
            </p>
            <div className="flex flex-wrap gap-4 text-xs font-mono text-[#8b8ca3] mt-2">
              <span>Email: {PROFILE_INFO.channels.email}</span>
              <span>GitHub: github.com/DevKaiqui</span>
            </div>
          </div>

          {/* Resumo Profissional */}
          <div className="space-y-1.5">
            <h2 className="text-xs font-mono text-[#4fd1ae] uppercase font-bold tracking-wider">
              01 // RESUMO PROFISSIONAL
            </h2>
            <p className="leading-relaxed text-[#e8e8f0]">
              Profissional focado em Segurança Defensiva e Ofensiva (Red & Blue Team), com sólida formação estrutural em Redes de Computadores (pilha TCP/IP) e auditoria de tráfego. Experiência prática na resolução de mais de 100+ desafios em plataformas como TryHackMe (Top 5% Global) e Hack The Box, atuando em análise profunda com Wireshark, hardening de servidores Linux, firewalls pfSense, sistemas IDS/IPS Suricata e automação em Python e Bash.
            </p>
          </div>

          {/* Competências Chave */}
          <div className="space-y-2">
            <h2 className="text-xs font-mono text-[#4fd1ae] uppercase font-bold tracking-wider">
              02 // COMPETÊNCIAS & ARSENAL TÉCNICO
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono text-xs">
              <div className="p-3 rounded bg-[#0d0e18] border border-[#33344a]/40">
                <span className="text-[#ffa94d] font-bold block mb-1">
                  Redes &amp; Infraestrutura
                </span>
                <p className="text-[#c6c7d6] text-[11px]">
                  TCP/IP Core, Análise PCAP (Wireshark), Segmentação VLANs 802.1Q, Túneis WireGuard/IPsec, Roteamento OSPF, DNSSEC, TLS 1.3.
                </p>
              </div>
              <div className="p-3 rounded bg-[#0d0e18] border border-[#33344a]/40">
                <span className="text-[#ffa94d] font-bold block mb-1">
                  Segurança Ofensiva (Red Team)
                </span>
                <p className="text-[#c6c7d6] text-[11px]">
                  OWASP Top 10 (SQLi, XSS, SSRF), Burp Suite Pro, Nmap &amp; NSE Scripting, Metasploit, Privilege Escalation (Linux/Windows).
                </p>
              </div>
              <div className="p-3 rounded bg-[#0d0e18] border border-[#33344a]/40">
                <span className="text-[#4fd1ae] font-bold block mb-1">
                  Segurança Defensiva (Blue Team)
                </span>
                <p className="text-[#c6c7d6] text-[11px]">
                  Hardening Linux (CIS Benchmarks), pfSense Firewalls, Suricata IDS/IPS, Centralização e correlação de logs (ELK/Syslog).
                </p>
              </div>
              <div className="p-3 rounded bg-[#0d0e18] border border-[#33344a]/40">
                <span className="text-[#4fd1ae] font-bold block mb-1">
                  Automação &amp; Virtualização
                </span>
                <p className="text-[#c6c7d6] text-[11px]">
                  Python para Pentest, Bash Scripting, Docker Containers, Proxmox VE 8.1, Regras YARA e Git.
                </p>
              </div>
            </div>
          </div>

          {/* Certificações */}
          <div className="space-y-2">
            <h2 className="text-xs font-mono text-[#4fd1ae] uppercase font-bold tracking-wider">
              03 // CERTIFICAÇÕES & CREDENCIAIS
            </h2>
            <ul className="space-y-1.5 font-mono text-xs">
              <li className="flex items-start gap-2">
                <span className="text-[#ffa94d] font-bold">✓</span>
                <span>
                  <strong>TryHackMe Top 5% Global</strong> — Mais de 100+ labs concluídos com foco em Linux PrivEsc e Web Security.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#ffa94d] font-bold">✓</span>
                <span>
                  <strong>CCNA Foundation (Cisco / Networking)</strong> — Roteamento avançado, switching enterprise, ACLs e VLANs.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#4fd1ae] font-bold">⏳</span>
                <span>
                  <strong>eJPTv2 (INE Security)</strong> — Em andamento (Metodologia prática de pentest e avaliação de vulnerabilidades).
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#4fd1ae] font-bold">⏳</span>
                <span>
                  <strong>Security+ SY0-701 (CompTIA)</strong> — Em preparação (Governança, criptografia e operações defensivas).
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-[#14151f] border-t border-[#33344a]/30 flex items-center justify-between font-mono text-[11px] text-[#8b8ca3]">
          <span>VERIFICADO: KZ_SEC_IDENTITY</span>
          <button onClick={onClose} className="text-[#ffa94d] hover:underline">
            [FECHAR PREVIEW]
          </button>
        </div>
      </div>
    </div>
  );
};
