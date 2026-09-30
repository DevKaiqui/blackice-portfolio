# KZ.SEC — Backend de Autenticação (LAB_04)

Backend real de cadastro e login usado pelo LAB_04 do portfólio. Node.js +
Express, banco SQLite (`node:sqlite`, embutido no Node — sem dependências
nativas para compilar), senhas com hash `bcryptjs` e sessão via cookie
`HttpOnly`.

## Rodando localmente

```bash
cd server
npm install
cp .env.example .env   # ajuste SESSION_SECRET para um valor aleatório único
npm run dev
```

O servidor sobe em `http://localhost:4000`. Com o frontend rodando em
`http://localhost:3001` (`npm run dev` na raiz do projeto), o LAB_04 já
conversa com essa API automaticamente (ver `VITE_API_URL` em `.env.local`
na raiz).

## Estrutura

```
server/
  src/
    config.js              # variáveis de ambiente
    db.js                  # schema SQLite (users, login_attempts, sessions)
    sqliteSessionStore.js  # session store do express-session sobre SQLite
    routes/auth.js         # /register /login /logout /me
    index.js               # monta o app (helmet, cors, session, rotas)
  data/app.db               # banco local (git-ignored)
```

## Endpoints

| Método | Rota                | Descrição                                    |
| ------ | ------------------- | --------------------------------------------- |
| POST   | `/api/auth/register` | Cria usuário (hash bcrypt, 12 rounds)         |
| POST   | `/api/auth/login`    | Autentica e inicia sessão                     |
| POST   | `/api/auth/logout`   | Encerra a sessão                              |
| GET    | `/api/auth/me`       | Retorna o usuário da sessão atual             |

## Camadas de segurança aplicadas

- **Hash de senha**: `bcryptjs`, nunca texto plano em nenhum lugar (nem logs).
- **Sessão**: cookie `HttpOnly` sempre; em desenvolvimento usa
  `SameSite=Lax` (suficiente quando front e back estão em `localhost`); em
  produção (`NODE_ENV=production`) passa a usar `Secure` + `SameSite=None`,
  necessário porque o frontend publicado normalmente fica em outro domínio
  (cross-site) do backend. Dado de sessão persistido em SQLite (sobrevive a
  restart do processo).
- **Rate limiting**: 5 tentativas de login / IP a cada 5 min; 10 cadastros /
  IP a cada 15 min (`express-rate-limit`).
- **Timing-safe login**: `bcrypt.compare` roda mesmo quando o usuário não
  existe, evitando enumeração de contas por tempo de resposta.
- **Headers**: `helmet()` aplica CSP, HSTS, X-Frame-Options,
  X-Content-Type-Options etc. em todas as respostas da API.
- **CORS**: restrito à origem configurada em `CORS_ORIGIN`, com credentials.

## Deploy (HTTPS em produção)

Este servidor é independente do frontend estático. Para publicar o
portfólio com o login funcional de verdade:

1. Hospede esta pasta separadamente em um provedor com HTTPS automático
   (Render, Railway, Fly.io etc. — todos emitem certificado grátis).
2. Defina as variáveis de ambiente lá: `SESSION_SECRET` (um valor aleatório
   novo, nunca o do `.env` local), `CORS_ORIGIN` = URL pública do frontend
   (com `https://`) e `NODE_ENV=production`.
3. No frontend, defina `VITE_API_URL` = URL pública desta API (com
   `https://`) **antes** de rodar `npm run build` — o valor é embutido no
   HTML e no JS nesse momento, não pode ser trocado depois sem rebuildar.
4. Publique o frontend em qualquer host com HTTPS automático (Vercel,
   Netlify, GitHub Pages com domínio próprio, etc.).

Com `NODE_ENV=production`, o servidor passa a: redirecionar HTTP→HTTPS
automaticamente, enviar `Strict-Transport-Security` e usar cookies
`Secure; SameSite=None` (exigido para funcionar entre domínios diferentes).
Se o frontend e a API cairem em domínios diferentes, o CSP do frontend
(`index.html`, `public/_headers`, `vercel.json`) já permite `connect-src`
para qualquer origem HTTPS — não é necessário editar nada manualmente.
