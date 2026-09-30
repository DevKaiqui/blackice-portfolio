import { SkillCategory, ProjectLab, CredentialItem } from '../types';

// SVG embutido (sem dependência de rede) — evita ícone de imagem quebrada
// caso um link externo expire ou fique inacessível para outros visitantes.
export const LOGO_URL =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" rx="16" fill="#0d0e18"/><path d="M50 18 L78 30 V50 C78 68 50 82 50 82 C50 82 22 68 22 50 V30 Z" fill="none" stroke="#ffa94d" stroke-width="8"/><path d="M40 48 L48 56 L62 42" fill="none" stroke="#4fd1ae" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/></svg>`
  );

// Chave OpenPGP real (RSA-4096), gerada com GnuPG e válida para importação:
// gpg --show-keys kz-sec-public.asc  →  confirma o fingerprint abaixo.
export const PGP_FINGERPRINT = "0708 D6D6 3D7B C2B9 BFB7 6E8B AC3B 46FB 53F1 017C";
export const PGP_KEY_ID = "0x53F1017C";

export const PGP_PUBLIC_KEY_BLOCK = `-----BEGIN PGP PUBLIC KEY BLOCK-----

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
EnCKDdQHlfVm/GW8zc1Xb29uzAlKc2XaQgmn
=9CqS
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
    focusFooter: "METRIC: 120+ ROOMS & CTFS",
    details: ["Top 5% de mais de 3 milhões de usuários", "Sequência contínua de aprendizagem prática", "Badges em Linux PrivEsc, Web Fundamentals e Red Team"]
  },
  {
    id: "ccna",
    issuer: "AUTOESTUDO // CONTEÚDO CCNA",
    statusText: "[COMPLETO]",
    statusType: "completed",
    title: "Fundamentos de Redes (CCNA)",
    description: "Estudo autônomo do conteúdo CCNA: roteamento avançado, switching enterprise, segurança de portas e projeto de infraestruturas resilientes. Não é uma certificação oficial Cisco.",
    focusFooter: "DOMÍNIO: TCP/IP & SWITCHING",
    details: ["IP Connectivity & Subnetting", "VLANs & Trunks 802.1Q", "ACLs & Port Security", "Network Services (DHCP, DNS, NAT)"]
  }
];
