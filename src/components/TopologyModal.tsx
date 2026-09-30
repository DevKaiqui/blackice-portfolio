import React, { useState } from 'react';

interface TopologyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TopologyModal: React.FC<TopologyModalProps> = ({ isOpen, onClose }) => {
  const [selectedNode, setSelectedNode] = useState<'pfsense' | 'vlan10' | 'vlan20' | 'suricata' | 'wireguard'>('pfsense');

  if (!isOpen) return null;

  const nodeDetails = {
    pfsense: {
      title: 'WAN Gateway & pfSense Firewall 2.7.2-RELEASE',
      badge: 'CORE_FIREWALL',
      description: 'Firewall de borda com inspeção stateful, roteamento inter-VLANs restritivo, políticas de anti-spoofing e bloqueio geográfico de IPs.',
      rules: [
        'Default Drop All em interfaces WAN e tráfego entre VLANs',
        'NAT 1:1 apenas para portas públicas 80/443 apontando para DMZ',
        'Regras anti-lockout e autenticação via certificados locais',
        'Rate-limiting ativo contra ataques de SYN flood e brute-force'
      ]
    },
    suricata: {
      title: 'Suricata IDS / IPS Inline Engine',
      badge: 'THREAT_PREVENTION',
      description: 'Mecanismo de inspeção profunda de pacotes (DPI) operando inline através de interfaces bridging, bloqueando ameaças antes que alcancem os hosts.',
      rules: [
        'Regras Emerging Threats (ET Open) atualizadas automaticamente a cada 6h',
        'Bloqueio automático de tráfego associado a C2 conhecidos (Cobalt Strike, Sliver)',
        'Inspeção TLS fingerprint (JA3/JA4) para detecção de malware sem descriptografia',
        'Alerta em tempo real via syslog integrado ao stack ELK'
      ]
    },
    vlan10: {
      title: 'VLAN 10 [DMZ Isolada] (Subnet: 192.168.10.0/24)',
      badge: 'ISOLATED_DMZ',
      description: 'Zona desmilitarizada contendo serviços web expostos. Isolada completamente de outras sub-redes internas.',
      rules: [
        'Bloqueio total de tráfego originado da DMZ em direção às VLANs 20 e 30',
        'Serviços Nginx reverse proxy com modsecurity WAF habilitado',
        'Acesso DNS restrito a servidor recursivo com DNSSEC validado'
      ]
    },
    vlan20: {
      title: 'VLAN 20 [Lab de Vulnerabilidades] (Subnet: 192.168.20.0/24)',
      badge: 'VULN_LAB',
      description: 'Ambiente controlado contendo máquinas vulneráveis (Metasploitable, VulnHub boxes) para testes práticos de pentest.',
      rules: [
        'Isolamento estrito: nenhum pacote pode transitar para redes de produção',
        'Acesso permitido apenas a partir da estação de ataque (Kali Linux)',
        'Snapshots diários restauráveis no Proxmox VE para reset de máquinas'
      ]
    },
    wireguard: {
      title: 'Túnel Criptografado WireGuard (VPN Out-of-band)',
      badge: 'SECURE_ACCESS',
      description: 'Canal criptografado seguro com chaves públicas Noise Protocol e Curve25519 para administração remota.',
      rules: [
        'Subnet dedicada 10.100.0.0/24 com autenticação por chave assimétrica',
        'Acesso restrito apenas ao IP da interface de gerenciamento do Proxmox',
        'Sem encaminhamento padrão de tráfego (split tunneling rigoroso)'
      ]
    }
  };

  const current = nodeDetails[selectedNode];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-4xl rounded-xl bg-[#0d0e18] border border-[#ffa94d]/50 shadow-[0_20px_50px_rgba(0,0,0,0.9),0_0_30px_rgba(255,169,77,0.15)] flex flex-col max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 bg-[#14151f] border-b border-[#33344a]/40 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#ffa94d] text-[22px]">
              hub
            </span>
            <div>
              <span className="font-title-code text-sm font-bold text-[#f8f6f2]">
                LAB_03 // Home Lab pfSense &amp; IDS/IPS Suricata (Proxmox VE 8.1)
              </span>
              <span className="text-[10px] text-[#ffa94d] block font-mono">
                TOPOLOGIA DE REDE HARDENED &amp; SEGMENTAÇÃO L2/L3
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

        {/* Interactive Diagram Area */}
        <div className="p-6 bg-[#0a0b12] border-b border-[#33344a]/30">
          <span className="font-mono text-xs text-[#8b8ca3] block mb-3">
            SELECIONE UM NÓ DA TOPOLOGIA PARA INSPEÇÃO DE POLÍTICAS:
          </span>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
            <button
              onClick={() => setSelectedNode('pfsense')}
              className={`p-2.5 rounded font-mono text-xs text-left transition-all border ${
                selectedNode === 'pfsense'
                  ? 'bg-[#ffa94d]/15 border-[#ffa94d] text-[#ffa94d] shadow-[0_0_15px_rgba(255,169,77,0.2)]'
                  : 'bg-[#14151f] border-[#33344a]/40 text-[#8b8ca3] hover:text-[#f8f6f2]'
              }`}
            >
              <span className="block font-bold">pfSense 2.7</span>
              <span className="text-[10px] text-[#8b8ca3]">WAN/L4 Firewall</span>
            </button>

            <button
              onClick={() => setSelectedNode('suricata')}
              className={`p-2.5 rounded font-mono text-xs text-left transition-all border ${
                selectedNode === 'suricata'
                  ? 'bg-[#ffa94d]/15 border-[#ffa94d] text-[#ffa94d] shadow-[0_0_15px_rgba(255,169,77,0.2)]'
                  : 'bg-[#14151f] border-[#33344a]/40 text-[#8b8ca3] hover:text-[#f8f6f2]'
              }`}
            >
              <span className="block font-bold">Suricata IDS</span>
              <span className="text-[10px] text-[#8b8ca3]">Inline Inspection</span>
            </button>

            <button
              onClick={() => setSelectedNode('vlan10')}
              className={`p-2.5 rounded font-mono text-xs text-left transition-all border ${
                selectedNode === 'vlan10'
                  ? 'bg-[#4fd1ae]/15 border-[#4fd1ae] text-[#4fd1ae] shadow-[0_0_15px_rgba(79,209,174,0.2)]'
                  : 'bg-[#14151f] border-[#33344a]/40 text-[#8b8ca3] hover:text-[#f8f6f2]'
              }`}
            >
              <span className="block font-bold">VLAN 10 [DMZ]</span>
              <span className="text-[10px] text-[#8b8ca3]">Web Isolated</span>
            </button>

            <button
              onClick={() => setSelectedNode('vlan20')}
              className={`p-2.5 rounded font-mono text-xs text-left transition-all border ${
                selectedNode === 'vlan20'
                  ? 'bg-[#4fd1ae]/15 border-[#4fd1ae] text-[#4fd1ae] shadow-[0_0_15px_rgba(79,209,174,0.2)]'
                  : 'bg-[#14151f] border-[#33344a]/40 text-[#8b8ca3] hover:text-[#f8f6f2]'
              }`}
            >
              <span className="block font-bold">VLAN 20 [LAB]</span>
              <span className="text-[10px] text-[#8b8ca3]">Vuln Targets</span>
            </button>

            <button
              onClick={() => setSelectedNode('wireguard')}
              className={`p-2.5 rounded font-mono text-xs text-left transition-all border col-span-2 sm:col-span-1 ${
                selectedNode === 'wireguard'
                  ? 'bg-[#ffa94d]/15 border-[#ffa94d] text-[#ffa94d] shadow-[0_0_15px_rgba(255,169,77,0.2)]'
                  : 'bg-[#14151f] border-[#33344a]/40 text-[#8b8ca3] hover:text-[#f8f6f2]'
              }`}
            >
              <span className="block font-bold">WireGuard VPN</span>
              <span className="text-[10px] text-[#8b8ca3]">Admin OOB</span>
            </button>
          </div>
        </div>

        {/* Selected Node Details */}
        <div className="p-6 overflow-y-auto space-y-4 terminal-scroll text-xs">
          <div className="p-4 rounded-lg bg-[#14151f] border border-[#33344a]/40 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-mono text-sm font-bold text-[#f8f6f2]">
                {current.title}
              </span>
              <span className="px-2 py-0.5 rounded bg-[#ffa94d]/10 text-[#ffa94d] font-mono text-[10px] border border-[#ffa94d]/30">
                {current.badge}
              </span>
            </div>

            <p className="text-[#c6c7d6] leading-relaxed">
              {current.description}
            </p>

            <div className="space-y-1.5 pt-2 border-t border-[#33344a]/30">
              <span className="font-mono text-xs text-[#4fd1ae] font-semibold block">
                POLÍTICAS &amp; REGRAS CONFIGURADAS:
              </span>
              {current.rules.map((r, i) => (
                <div key={i} className="flex items-start gap-2 font-mono text-xs text-[#e8e8f0]">
                  <span className="text-[#ffa94d] font-bold">✓</span>
                  <span>{r}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-[#14151f] border-t border-[#33344a]/30 flex items-center justify-between font-mono text-[11px] text-[#8b8ca3]">
          <span>PROXMOX CLUSTER: VE 8.1-4 // LINUX KERNEL 6.5</span>
          <button onClick={onClose} className="text-[#ffa94d] hover:underline">
            [FECHAR TOPOLOGIA]
          </button>
        </div>
      </div>
    </div>
  );
};
