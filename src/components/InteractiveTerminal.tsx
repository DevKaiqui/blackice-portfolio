import React, { useState, useRef, useEffect } from 'react';

interface InteractiveTerminalProps {
  onOpenProject?: (projectId: string) => void;
  onOpenPgp?: () => void;
  onOpenCv?: () => void;
}

interface CommandHistory {
  cmd: string;
  output: React.ReactNode;
}

export const InteractiveTerminal: React.FC<InteractiveTerminalProps> = ({
  onOpenProject,
  onOpenPgp,
  onOpenCv,
}) => {
  const [inputVal, setInputVal] = useState('');
  const [history, setHistory] = useState<CommandHistory[]>([]);
  const [isMaximized, setIsMaximized] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const executeCommand = (cmdStr: string) => {
    const trimmed = cmdStr.trim();
    if (!trimmed) return;

    let output: React.ReactNode = null;
    const lower = trimmed.toLowerCase();

    if (lower === 'clear') {
      setHistory([]);
      setInputVal('');
      return;
    } else if (lower === 'help') {
      output = (
        <div className="text-[#c6c7d6] space-y-1">
          <p className="text-[#ffa94d] font-semibold">Comandos disponíveis na sessão:</p>
          <div className="grid grid-cols-2 gap-x-4 gap-y-0.5 text-xs">
            <div><span className="text-[#4fd1ae]">whoami</span> - Identidade e papel</div>
            <div><span className="text-[#4fd1ae]">nmap</span> - Varredura de alvos</div>
            <div><span className="text-[#4fd1ae]">skills</span> - Matriz tática</div>
            <div><span className="text-[#4fd1ae]">projects</span> - Labs desenvolvidos</div>
            <div><span className="text-[#4fd1ae]">security-status</span> - Telemetria de defesa</div>
            <div><span className="text-[#4fd1ae]">cat /etc/specialties.conf</span> - Especialidades</div>
            <div><span className="text-[#4fd1ae]">pgp</span> - Chave pública PGP</div>
            <div><span className="text-[#4fd1ae]">cv</span> - Currículo técnico</div>
            <div><span className="text-[#4fd1ae]">ping 8.8.8.8</span> - Teste de conectividade</div>
            <div><span className="text-[#4fd1ae]">clear</span> - Limpar terminal</div>
          </div>
        </div>
      );
    } else if (lower === 'whoami') {
      output = (
        <p className="text-[#c6c7d6]">
          kaique_zomer <span className="text-[#4fd1ae]">[Security Analyst & Network Researcher]</span>
        </p>
      );
    } else if (lower.startsWith('nmap')) {
      output = (
        <div className="pl-2 border-l border-[#33344a]/40 text-[#c6c7d6] font-mono text-xs space-y-0.5">
          <div className="text-[#8b8ca3] font-semibold">PORT    STATE SERVICE       VERSION</div>
          <div>22/tcp  <span className="text-[#ffa94d] font-medium">open</span>  ssh           OpenSSH 9.2p1</div>
          <div>80/tcp  <span className="text-[#ffa94d] font-medium">open</span>  http          Nginx 1.24 <span className="text-[#a7f3e0]">(WAF Active)</span></div>
          <div>443/tcp <span className="text-[#ffa94d] font-medium">open</span>  ssl/https     TLS 1.3 | Strict Policy</div>
          <div>8080/tcp <span className="text-[#ffa94d] font-medium">open</span> honeypot      Suricata Active Inline</div>
          <div className="text-[#8b8ca3] mt-1">[!] 1 host up (0.018s latency). All 4 defense vectors operational.</div>
        </div>
      );
    } else if (lower.includes('specialties.conf')) {
      output = (
        <div className="pl-2 text-[#c6c7d6] flex flex-col gap-0.5 text-xs">
          <div><span className="text-[#ffa94d]">[*]</span> Defesa em Profundidade & Segmentação L2/L3</div>
          <div><span className="text-[#ffa94d]">[*]</span> Análise de Tráfego Profunda (Wireshark / PCAP)</div>
          <div><span className="text-[#ffa94d]">[*]</span> Hardening Linux & Firewalls pfSense / Suricata</div>
          <div><span className="text-[#ffa94d]">[*]</span> Ethical Hacking & Auditorias OWASP Top 10</div>
          <div><span className="text-[#4fd1ae]">[*]</span> Automação com Python e Bash para DefSecOps</div>
        </div>
      );
    } else if (lower.includes('security-status') || lower.includes('verify-integrity')) {
      output = (
        <div className="text-xs space-y-1">
          <div className="text-[#ffa94d] font-bold">[✓] SYSTEM INTEGRITY: 100% OPERATIONAL</div>
          <div className="text-[#c6c7d6]">Firewall pfSense: STRICT_RULES_ENFORCED</div>
          <div className="text-[#c6c7d6]">Suricata IDS/IPS: SIGNATURES_UPDATED (0 zero-day anomalies)</div>
          <div className="text-[#4fd1ae]">Zero-Trust Perimeter: AUTHENTICATED [AES-256-GCM]</div>
        </div>
      );
    } else if (lower === 'skills') {
      output = (
        <div className="text-xs text-[#c6c7d6] space-y-1">
          <p className="text-[#ffa94d]">01 // Redes & Infra (96%): TCP/IP, Wireshark, VLANs, WireGuard</p>
          <p className="text-[#ffa94d]">02 // Segurança Ofensiva (88%): OWASP Top 10, Burp Suite, Recon</p>
          <p className="text-[#4fd1ae]">03 // Segurança Defensiva (92%): Hardening Linux, pfSense, ELK Logs</p>
          <p className="text-[#4fd1ae]">04 // Automação (85%): Python, Bash, Docker, YARA</p>
        </div>
      );
    } else if (lower === 'projects' || lower === 'labs') {
      output = (
        <div className="text-xs space-y-1 text-[#c6c7d6]">
          <div><span className="text-[#ffa94d] font-bold">LAB_01:</span> Network Threat Hunter & Honeypot [Python, Wireshark]</div>
          <div><span className="text-[#4fd1ae] font-bold">LAB_02:</span> Web Vulnerability Scanner & OWASP Auditor [Bash, Python]</div>
          <div><span className="text-[#ffa94d] font-bold">LAB_03:</span> Home Lab pfSense & IDS/IPS Suricata [Proxmox, VLANs]</div>
          {onOpenProject && (
            <div className="mt-1 flex gap-2">
              <button
                onClick={() => onOpenProject('honeypot')}
                className="text-[#ffa94d] underline hover:text-white"
              >
                [Abrir LAB 01]
              </button>
              <button
                onClick={() => onOpenProject('scanner')}
                className="text-[#4fd1ae] underline hover:text-white"
              >
                [Abrir LAB 02]
              </button>
            </div>
          )}
        </div>
      );
    } else if (lower === 'pgp') {
      output = (
        <div className="text-xs space-y-1 text-[#c6c7d6]">
          <p className="text-[#ffa94d]">PGP Key Fingerprint: 9A4F 32B1 C89D 77E2 4001 EF55 BC90 A118 D4E0 F839</p>
          <p className="text-[#4fd1ae]">Key ID: 0xD4E0F839 (RSA 4096-bit)</p>
          {onOpenPgp && (
            <button
              onClick={onOpenPgp}
              className="mt-1 px-2 py-0.5 bg-[#ffa94d]/10 text-[#ffa94d] border border-[#ffa94d]/40 rounded hover:bg-[#ffa94d] hover:text-[#3a1a00]"
            >
              &gt; Visualizar Bloco PGP Completo
            </button>
          )}
        </div>
      );
    } else if (lower === 'cv') {
      output = (
        <div className="text-xs space-y-1 text-[#c6c7d6]">
          <p className="text-[#ffa94d]">Currículo Técnico de Kaique Zomer disponível.</p>
          {onOpenCv && (
            <button
              onClick={onOpenCv}
              className="mt-1 px-2 py-0.5 bg-[#4fd1ae]/10 text-[#4fd1ae] border border-[#4fd1ae]/40 rounded hover:bg-[#4fd1ae] hover:text-[#062420]"
            >
              &gt; Abrir Visualizador de CV (PDF)
            </button>
          )}
        </div>
      );
    } else if (lower.startsWith('ping')) {
      output = (
        <div className="text-xs font-mono text-[#c6c7d6] space-y-0.5">
          <div>PING target (192.168.10.1): 56 data bytes</div>
          <div>64 bytes from 192.168.10.1: icmp_seq=0 ttl=64 time=0.812 ms</div>
          <div>64 bytes from 192.168.10.1: icmp_seq=1 ttl=64 time=0.744 ms</div>
          <div className="text-[#ffa94d]">--- target ping statistics --- 0% packet loss, rtt min/avg = 0.744/0.778 ms</div>
        </div>
      );
    } else {
      output = (
        <p className="text-[#ffb4ab] text-xs">
          zsh: command not found: {trimmed}. Digite <span className="text-[#ffa94d] underline cursor-pointer" onClick={() => executeCommand('help')}>help</span> para lista de comandos.
        </p>
      );
    }

    setHistory((prev) => [...prev, { cmd: trimmed, output }]);
    setInputVal('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      executeCommand(inputVal);
    }
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  return (
    <div
      className={`w-full rounded-xl bg-[#0d0e18]/95 backdrop-blur-xl border border-[#33344a]/60 shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_30px_rgba(255,169,77,0.08)] overflow-hidden transition-all duration-300 hover:border-[#ffa94d]/50 ${
        isMaximized ? 'fixed inset-4 z-50 flex flex-col h-[calc(100vh-2rem)]' : ''
      }`}
    >
      {/* Window Title Bar */}
      <div className="px-4 py-2 bg-[#14151f] border-b border-[#33344a]/40 flex items-center justify-between select-none">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setHistory([])}
            className="w-3 h-3 rounded-full bg-[#ff5f56] inline-block shadow-sm hover:opacity-80 transition-opacity"
            title="Limpar tela"
          />
          <button
            onClick={() => setIsMaximized(false)}
            className="w-3 h-3 rounded-full bg-[#ffbd2e] inline-block shadow-sm hover:opacity-80 transition-opacity"
            title="Minimizar"
          />
          <button
            onClick={() => setIsMaximized(!isMaximized)}
            className="w-3 h-3 rounded-full bg-[#27c93f] inline-block shadow-sm hover:opacity-80 transition-opacity"
            title="Maximizar"
          />
        </div>

        <span className="font-label-code-sm text-xs text-[#8b8ca3] tracking-wider">
          kaique@kz-sec:~$ zsh
        </span>

        <div className="flex items-center gap-1 font-label-code-sm text-xs text-[#8b8ca3]">
          <span className="material-symbols-outlined text-[14px] text-[#ffa94d]">
            shield
          </span>
          <span>SSH-2</span>
        </div>
      </div>

      {/* Quick clickable chips */}
      <div className="px-4 py-1.5 bg-[#0a0b12] border-b border-[#33344a]/20 flex items-center gap-2 overflow-x-auto text-[11px] font-mono text-[#8b8ca3] scrollbar-none">
        <span className="text-[#8b8ca3] shrink-0">EXEC:</span>
        <button
          onClick={() => executeCommand('whoami')}
          className="px-1.5 py-0.5 rounded bg-[#14151f] hover:bg-[#ffa94d]/20 hover:text-[#ffa94d] shrink-0 transition-colors"
        >
          whoami
        </button>
        <button
          onClick={() => executeCommand('nmap -sV -sC -Pn target.local')}
          className="px-1.5 py-0.5 rounded bg-[#14151f] hover:bg-[#ffa94d]/20 hover:text-[#ffa94d] shrink-0 transition-colors"
        >
          nmap
        </button>
        <button
          onClick={() => executeCommand('cat /etc/specialties.conf')}
          className="px-1.5 py-0.5 rounded bg-[#14151f] hover:bg-[#ffa94d]/20 hover:text-[#ffa94d] shrink-0 transition-colors"
        >
          specialties.conf
        </button>
        <button
          onClick={() => executeCommand('security-status --verify-integrity')}
          className="px-1.5 py-0.5 rounded bg-[#14151f] hover:bg-[#ffa94d]/20 hover:text-[#ffa94d] shrink-0 transition-colors"
        >
          verify-integrity
        </button>
        <button
          onClick={() => executeCommand('help')}
          className="px-1.5 py-0.5 rounded bg-[#14151f] hover:bg-[#4fd1ae]/20 hover:text-[#4fd1ae] shrink-0 transition-colors"
        >
          help
        </button>
      </div>

      {/* Terminal Output Buffer */}
      <div
        className={`p-4 font-label-code-sm text-xs flex flex-col gap-3 text-[#e8e8f0] select-text overflow-y-auto leading-relaxed terminal-scroll ${
          isMaximized ? 'flex-1' : 'max-h-[380px]'
        }`}
        onClick={() => inputRef.current?.focus()}
      >
        {/* Default baseline content matching the mockup */}
        <div>
          <span className="text-[#33344a]">root@kz-sec:~#</span>{' '}
          <span className="text-[#ffa94d] font-semibold">whoami</span>
          <p className="text-[#c6c7d6] mt-0.5">
            kaique_zomer <span className="text-[#4fd1ae]">[Security Analyst & Network Researcher]</span>
          </p>
        </div>

        <div>
          <span className="text-[#33344a]">root@kz-sec:~#</span>{' '}
          <span className="text-[#ffa94d] font-semibold">nmap -sV -sC -Pn target.local</span>
          <div className="mt-1 pl-2 border-l border-[#33344a]/40 text-[#c6c7d6] font-mono text-[11px]">
            <div className="text-[#8b8ca3] font-semibold">PORT    STATE SERVICE       VERSION</div>
            <div>22/tcp  <span className="text-[#ffa94d] font-medium">open</span>  ssh           OpenSSH 9.2p1</div>
            <div>80/tcp  <span className="text-[#ffa94d] font-medium">open</span>  http          Nginx 1.24 <span className="text-[#a7f3e0]">(WAF Active)</span></div>
            <div>443/tcp <span className="text-[#ffa94d] font-medium">open</span>  ssl/https     TLS 1.3 | Strict Policy</div>
          </div>
        </div>

        <div>
          <span className="text-[#33344a]">root@kz-sec:~#</span>{' '}
          <span className="text-[#ffa94d] font-semibold">cat /etc/specialties.conf</span>
          <div className="mt-1 pl-2 text-[#c6c7d6] flex flex-col gap-0.5 text-[11px]">
            <div><span className="text-[#ffa94d]">[*]</span> Defesa em Profundidade & Segmentação L2/L3</div>
            <div><span className="text-[#ffa94d]">[*]</span> Análise de Tráfego Profunda (Wireshark / PCAP)</div>
            <div><span className="text-[#ffa94d]">[*]</span> Hardening Linux & Firewalls pfSense / Suricata</div>
            <div><span className="text-[#ffa94d]">[*]</span> Ethical Hacking & Auditorias OWASP Top 10</div>
          </div>
        </div>

        {/* Dynamic history */}
        {history.map((item, index) => (
          <div key={index} className="space-y-1">
            <div className="flex items-center gap-1.5 text-[#33344a]">
              <span>kaique@kz-sec:~$</span>
              <span className="text-[#ffa94d] font-medium">{item.cmd}</span>
            </div>
            <div className="pl-1">{item.output}</div>
          </div>
        ))}

        {/* Active Command Prompt */}
        <div className="flex items-center gap-2 pt-1">
          <span className="text-[#8b8ca3] shrink-0">kaique@kz-sec:~$</span>
          <input
            ref={inputRef}
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="digite um comando (ex: help, skills, nmap)"
            className="flex-1 bg-transparent text-[#ffa94d] focus:outline-none font-mono text-xs placeholder-[#33344a]"
          />
          <span className="inline-block w-2 h-4 bg-[#ffa94d] animate-pulse"></span>
        </div>

        <div ref={bottomRef} />
      </div>

      {/* Terminal Footnote Bar */}
      <div className="px-4 py-2 bg-[#181a26] border-t border-[#33344a]/30 flex items-center justify-between text-[#8b8ca3] font-label-code-sm text-[11px]">
        <span className="flex items-center gap-1.5">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#ffa94d]"></span>
          SESSION_KEY: 0x8F94...B19
        </span>
        <span>UTF-8 // ZSH 5.9</span>
      </div>
    </div>
  );
};
