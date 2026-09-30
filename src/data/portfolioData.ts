import { SkillCategory, ProjectLab, CredentialItem } from '../types';

// SVG embutido (sem dependência de rede) — evita ícone de imagem quebrada
// caso um link externo expire ou fique inacessível para outros visitantes.
export const LOGO_URL =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" rx="16" fill="#0d0e18"/><path d="M50 18 L78 30 V50 C78 68 50 82 50 82 C50 82 22 68 22 50 V30 Z" fill="none" stroke="#ffa94d" stroke-width="8"/><path d="M40 48 L48 56 L62 42" fill="none" stroke="#4fd1ae" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/></svg>`
  );

export const PGP_FINGERPRINT = "9A4F 32B1 C89D 77E2 4001 EF55 BC90 A118 D4E0 F839";
export const PGP_KEY_ID = "0xD4E0F839";

export const PGP_PUBLIC_KEY_BLOCK = `-----BEGIN PGP PUBLIC KEY BLOCK-----
Version: OpenPGP.js v5.11.0
Comment: https://kaiquezomer.sec - Security Operative Verified Key

mQGNBF+9t8EBDAC/3b7zXkG8vQzM9XkZk5qQv1b3h8T8W1s0pA+vLk1...
[VERIFIED KZ_SEC_IDENTITY // 4096R/D4E0F839]
Subkey Fingerprint: 9A4F 32B1 C89D 77E2 4001 EF55 BC90 A118 D4E0 F839
Uid: Kaique Zomer (Cyber Security Analyst) <contato@kaiquezomer.sec>
Created: 2025-01-15T09:00:00Z
Expires: 2027-01-15T09:00:00Z
Cipher: AES-256-GCM | Hash: SHA-512 | Curve: Ed25519/RSA-4096
=KZ94
-----END PGP PUBLIC KEY BLOCK-----`;

export const PROFILE_INFO = {
  name: "Kaique Zomer",
  tagline: "Cybersecurity | Redes & Protocolos | Ethical Hacking",
  secLevel: "ACTIVE_RESEARCHER // PROTOCOL: ZERO_TRUST",
  roleLabel: "SECURITY_OPERATIVE // RESEARCHER",
  bioHeadline: "Fundamentos Sólidos & Mentalidade Ofensiva",
  sysDoc: "PROFILE_REVISION_v2.4",
  bioParagraph1: "Minha trajetória na tecnologia começou nas entranhas das redes de computadores. Compreender como cada pacote é roteado, inspecionado e fragmentado através da pilha TCP/IP me deu a base mandatória para enxergar o que a maioria ignora: anomalias e vetores silenciosos de ataque.",
  bioParagraph2: "A transição para Segurança da Informação foi o passo natural. Acredito firmemente que para construir fortificações impenetráveis, você precisa saber desmontar o sistema com rigor de atacante (ética e metodologicamente).",
  ethicsMotto: "Comprometimento inegociável com ética, resiliência operacional e aprendizado contínuo.",
  metrics: [
    { label: "TryHackMe", value: "TOP 5%", subtext: "Global Ranking", color: "neon" },
    { label: "Laboratórios", value: "120+", subtext: "CTFs & Boxes", color: "cyan" },
    { label: "Arquitetura", value: "L2-L7", subtext: "Hardening Ativo", color: "white" },
  ],
  channels: {
    linkedin: undefined as string | undefined,
    github: "https://github.com/DevKaiqui",
    email: "c05700766@gmail.com",
    tryhackme: "https://tryhackme.com/p/kaiquezomer",
    hackthebox: "https://app.hackthebox.com/profile/kaiquezomer",
  }
};

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    id: "redes",
    number: "01",
    title: "Redes & Infraestrutura",
    level: "[LEVEL: ADVANCED]",
    icon: "router",
    description: "Fundamentos estruturais de comunicação entre hosts, análise profunda de cabeçalhos e construção de túneis seguros e topologias corporativas.",
    masteryPercentage: 96,
    chips: [
      { label: "TCP/IP Core", variant: "cyan", detail: "Three-way handshake, TCP flags (SYN, ACK, RST, FIN), MTU/MSS e congestion control." },
      { label: "DNS / DNSSEC", variant: "neutral", detail: "Resolução recursiva, zonas autoritativas, assinaturas RRSIG e proteção contra DNS poisoning." },
      { label: "HTTP/1.1 & HTTP/2", variant: "neutral", detail: "Pipelines, multiplexing, frame parsing e inspeção de cabeçalhos semanticos." },
      { label: "Wireshark (Deep PCAP)", variant: "neon", detail: "Filtros de display avançados, reconstrução de streams TCP/TLS e identificação de anomalias de tráfego." },
      { label: "Segmentação VLAN (802.1Q)", variant: "neutral", detail: "Trunking, isolamento broadcast domains e mitigação de VLAN hopping." },
      { label: "Roteamento OSPF / BGP", variant: "neutral", detail: "Dijkstra SPF, anúncios LSA, políticas autônomas BGP e roteamento estático defensivo." },
      { label: "WireGuard & IPsec", variant: "cyan", detail: "Túneis criptografados site-to-site e client-to-site com chaves Curve25519." },
      { label: "Modelagem OSI 7-Layers", variant: "muted", detail: "Mapeamento minucioso de vetores de exploração e defesa do cabo físico à aplicação." }
    ]
  },
  {
    id: "red-team",
    number: "02",
    title: "Segurança Ofensiva (Red Team)",
    level: "[LEVEL: PROFICIENT]",
    icon: "security",
    description: "Mapeamento tático de superfície exposta, enumeração contundente de serviços e auditorias de aplicações orientadas pelo framework OWASP.",
    masteryPercentage: 88,
    chips: [
      { label: "Reconhecimento Ativo & Passivo", variant: "neon", detail: "OSINT tático, certificate transparency logs, shodan dorks e DNS brute force." },
      { label: "Enumeração de Superfície", variant: "neutral", detail: "Varreduras de portas stealth SYN, fingerprinting de banners e identificação de serviços obsoletos." },
      { label: "OWASP Top 10 Exploits", variant: "neon", detail: "SQLi, XSS (Stored/Reflected), Broken Access Control, SSRF, e Command Injection metodológicos." },
      { label: "Burp Suite Pro", variant: "neutral", detail: "Repeater, Intruder, Match & Replace, extensões BApp e interceptação de WebSockets." },
      { label: "Nmap Scripting Engine (NSE)", variant: "neutral", detail: "Execução e customização de scripts Lua para detecção de vulnerabilidades críticas." },
      { label: "Metasploit Framework", variant: "cyan", detail: "Desenvolvimento e teste de payloads, listeners multi/handler e módulos de post-exploitation." },
      { label: "Privilege Escalation", variant: "muted", detail: "Auditoria de permissões sudoers, SUID binaries, cron jobs desprotegidos e tokens de impersonação." }
    ]
  },
  {
    id: "blue-team",
    number: "03",
    title: "Segurança Defensiva (Blue Team)",
    level: "[LEVEL: ADVANCED]",
    icon: "policy",
    description: "Construção de barreiras ativas, análise comportamental de logs em tempo quase real e proteção criptográfica de dados em trânsito e repouso.",
    masteryPercentage: 92,
    chips: [
      { label: "Hardening Linux (CIS Benchmarks)", variant: "cyan", detail: "Configurações restritivas de kernel via sysctl, PAM, SSH seguro e auditoria auditd." },
      { label: "pfSense Firewalls", variant: "neutral", detail: "Políticas stateful, aliases dinâmicos, NAT 1:1, interfaces DMZ e bloqueio geoIP." },
      { label: "Suricata IDS / IPS", variant: "neutral", detail: "Inspeção profunda de pacotes inline, carregamento de regras Emerging Threats e detecção de C2." },
      { label: "Análise de Logs (Syslog / ELK)", variant: "cyan", detail: "Centralização de eventos, correlação de alertas auth.log, nginx access e queries estruturadas." },
      { label: "Criptografia Aplicada & TLS", variant: "neutral", detail: "Ciphersuites modernas (ECDHE-ECDSA-AES256-GCM-SHA384), HSTS, mTLS e certificados X.509." },
      { label: "Gestão de Acesso & IAM", variant: "muted", detail: "Princípio do menor privilégio (PoLP), autenticação MFA/FIDO2 e segregação de tarefas." }
    ]
  },
  {
    id: "automacao",
    number: "04",
    title: "Automação & Scripting",
    level: "[LEVEL: PROFICIENT]",
    icon: "code",
    description: "Desenvolvimento de scripts rápidos para parsing de logs, automação de varreduras recorrentes e containers efêmeros para testes laboratoriais.",
    masteryPercentage: 85,
    chips: [
      { label: "Python para Pentesting", variant: "neon", detail: "Sockets raw, bibliotecas Scapy, Requests, BeautifulSoup e scripts de automação de exploits." },
      { label: "Bash Scripting Avançado", variant: "neutral", detail: "Pipelining com awk, sed, grep, automação de tarefas cron e scripts de auditoria em lote." },
      { label: "Docker Containers & Labs", variant: "neutral", detail: "Criação de labs isolados via docker-compose com networks bridge customizadas." },
      { label: "Regras YARA Básicas", variant: "cyan", detail: "Assinaturas de strings binárias e padrões hexadecimais para detecção de artefatos." },
      { label: "Git & DevSecOps Pipelines", variant: "muted", detail: "SAST estático, verificação de segredos expostos com Gitleaks e esteiras automatizadas." }
    ]
  }
];

export const PROJECT_LABS: ProjectLab[] = [
  {
    id: "honeypot",
    labNumber: "LAB_01",
    category: "THREAT_INTEL",
    title: "Network Threat Hunter & Honeypot",
    description: "Ambiente honeypot de média interação implantado em VPS com captura indiscriminada de tentativas de brute-force, extração automática de payloads maliciosos e geração de relatórios de IPs atacantes.",
    statusBadge: "STATUS: ACTIVE_INTEL",
    statusType: "neon",
    tags: ["Python", "Wireshark", "Docker", "Threat Intel"],
    actionLabel: "> REQUISITAR BLUEPRINT / CODE",
    actionType: "honeypot",
    features: [
      "Falsa porta SSH 2222 simulando OpenSSH vulnerável",
      "Emulação HTTP com honeypot de painéis de administração",
      "Parsing automático de PCAP com extração de hashes e comandos executados",
      "Integração com feeds públicos de reputação de IP (AbuseIPDB, VirusTotal)"
    ]
  },
  {
    id: "scanner",
    labNumber: "LAB_02",
    category: "OFFENSIVE_TOOLING",
    title: "Web Vulnerability Scanner & OWASP Auditor",
    description: "Ferramenta CLI modular construída para mapeamento automatizado de cabeçalhos inseguros, testes de injeção básica, detecção de diretórios ocultos e verificação de endpoints de API expostos.",
    statusBadge: "AUDITOR_v1.8",
    statusType: "cyan",
    tags: ["Bash", "Python", "OWASP Top 10", "Burp API"],
    actionLabel: "> VER DEMO & REPOSITÓRIO",
    actionType: "scanner",
    features: [
      "Auditoria automática de cabeçalhos (CSP, HSTS, X-Frame-Options)",
      "Verificação de flags de Cookies (HttpOnly, Secure, SameSite)",
      "Dicionário inteligente para enumeração de diretórios sensíveis (/admin, /backup)",
      "Detecção de configurações incorretas de CORS (Origin * Wildcard)"
    ]
  },
  {
    id: "topology",
    labNumber: "LAB_03",
    category: "HARDENED_INFRA",
    title: "Home Lab pfSense & IDS/IPS Suricata",
    description: "Infraestrutura corporativa virtualizada em cluster Proxmox com tripla segmentação L2/L3, regras restritivas de firewall, inspeção inline com Suricata e VPN WireGuard para gestão remota out-of-band.",
    statusBadge: "PROXMOX VE 8.1",
    statusType: "neon",
    tags: ["pfSense", "Suricata", "Proxmox", "Firewall L4/L7"],
    actionLabel: "> DOCUMENTAÇÃO DE TOPOLOGIA",
    actionType: "topology",
    features: [
      "VLAN 10 isolada (DMZ pública com serviços expostos)",
      "VLAN 20 isolada (Ambiente de testes com máquinas vulneráveis)",
      "VLAN 30 (Gerência protegida sem acesso cruzado à DMZ)",
      "Inspeção inline IDS/IPS Suricata bloqueando assinaturas conhecidas"
    ]
  }
];

export const CREDENTIALS_LIST: CredentialItem[] = [
  {
    id: "ejptv2",
    issuer: "INE SECURITY",
    statusText: "[EM ANDAMENTO]",
    statusType: "progress",
    title: "eJPTv2",
    description: "Junior Penetration Tester - Metodologia prática de avaliação de vulnerabilidades e exploração controlada.",
    focusFooter: "FOCO: METODOLOGIA OFENSIVA",
    details: ["Host & Network Auditing", "Assessment Methodologies", "Web App Pentesting", "Exploitation & Pivoting"]
  },
  {
    id: "secplus",
    issuer: "COMPTIA",
    statusText: "[PREPARAÇÃO]",
    statusType: "prep",
    title: "Security+ (SY0-701)",
    description: "Conceitos fundamentais de ameaças globais, governança, criptografia e arquitetura de segurança corporativa.",
    focusFooter: "FOCO: DEFESA & GOVERNANÇA",
    details: ["General Security Concepts", "Threats, Vulnerabilities & Mitigations", "Security Architecture", "Security Operations"]
  },
  {
    id: "thm-top5",
    issuer: "TRYHACKME",
    statusText: "[CONQUISTADO]",
    statusType: "achieved",
    title: "Top 5% Global",
    description: "Resolução consistente de máquinas com foco em Web App Pentesting, Network Security e Privilege Escalation.",
    focusFooter: "METRIC: 100+ ROOMS & CTFS",
    details: ["Top 5% de mais de 3 milhões de usuários", "Sequência contínua de aprendizagem prática", "Badges em Linux PrivEsc, Web Fundamentals e Red Team"]
  },
  {
    id: "ccna",
    issuer: "CISCO / NETWORKING",
    statusText: "[COMPLETO]",
    statusType: "completed",
    title: "CCNA Foundation",
    description: "Roteamento avançado, switching enterprise, segurança de portas e projeto de infraestruturas resilientes.",
    focusFooter: "DOMÍNIO: TCP/IP & SWITCHING",
    details: ["IP Connectivity & Subnetting", "VLANs & Trunks 802.1Q", "ACLs & Port Security", "Network Services (DHCP, DNS, NAT)"]
  }
];
