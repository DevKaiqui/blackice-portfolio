export type NavSection = 'sobre' | 'skills' | 'laboratorios-projetos' | 'contato';

export interface SkillCategory {
  id: string;
  number: string;
  title: string;
  level: string;
  icon: string;
  description: string;
  masteryPercentage: number;
  chips: {
    label: string;
    variant: 'neon' | 'cyan' | 'neutral' | 'muted';
    detail?: string;
  }[];
}

export interface ProjectLab {
  id: string;
  labNumber: string;
  category: string;
  title: string;
  description: string;
  statusBadge: string;
  statusType: 'neon' | 'cyan' | 'amber';
  tags: string[];
  actionLabel: string;
  actionType: 'honeypot' | 'scanner' | 'topology';
  blueprintCode?: string;
  features: string[];
}

export interface CredentialItem {
  id: string;
  issuer: string;
  statusText: string;
  statusType: 'progress' | 'prep' | 'achieved' | 'completed';
  title: string;
  description: string;
  focusFooter: string;
  badgeUrl?: string;
  details?: string[];
}

export interface TerminalLog {
  id: string;
  type: 'command' | 'output' | 'system' | 'error';
  content: string | React.ReactNode;
  timestamp?: string;
}
