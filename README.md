# KZ.SEC — Cyber Threat Intel & Defensive Engineering

Portfólio pessoal de cibersegurança de Kaique Zomer: laboratórios interativos
(honeypot, scanner de vulnerabilidades, topologia de rede), credenciais,
contato com PGP e um sistema real de cadastro/login.

🔗 **Site publicado:** https://blackice-portfolio.c05700766.workers.dev

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

- **Frontend**: Cloudflare Workers, publicado manualmente a partir do
  `dist/` gerado por `npm run build`. **Importante:** `VITE_API_URL` precisa
  estar definido (no `.env` ou na variável de ambiente do build) *antes* do
  build, porque o Vite embute esse valor no JS final — trocar a variável
  depois exige rebuildar e republicar o Worker.
- **Backend**: Render, usando o Blueprint em [`render.yaml`](render.yaml) —
  ver [server/README.md](server/README.md#deploy-no-render-passo-a-passo)
  para o passo a passo e as variáveis de ambiente necessárias.
