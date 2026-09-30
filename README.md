# KZ.SEC — Cyber Threat Intel & Defensive Engineering

Portfólio pessoal de cibersegurança de Kaique Zomer: laboratórios interativos
(honeypot, scanner de vulnerabilidades, topologia de rede), credenciais,
contato com PGP e um sistema real de cadastro/login.

🔗 **Site publicado:** https://blackice-portfolio.vercel.app

## Tecnologias

- **Frontend**: React + TypeScript + Vite + Tailwind CSS
- **Backend** (`/server`): Node.js + Express + SQLite (`node:sqlite`) + bcrypt + sessão em cookie

## Rodando localmente

### Frontend

```bash
npm install
npm run dev
```

Abre em `http://localhost:3000` (ou próxima porta livre).

### Backend (cadastro/login real)

Em outro terminal:

```bash
cd server
npm install
cp .env.example .env
npm run dev
```

Sobe em `http://localhost:4000`. Detalhes da arquitetura em
[server/README.md](server/README.md).

## Deploy

- **Frontend**: Vercel (build automático a partir da raiz do projeto)
- **Backend**: qualquer host Node (Render, Railway, Fly.io) — ver
  [server/README.md](server/README.md#deploy-https-em-produção) para as
  variáveis de ambiente necessárias.
