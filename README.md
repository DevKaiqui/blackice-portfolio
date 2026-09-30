<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://ai.google.dev/static/site-assets/images/share-ais-513315318.png" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/dccbaabf-db5b-4486-962c-378fce1f4f53

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

## LAB_04 — Cadastro & Login Real (backend)

O laboratório "Cadastro & Login Real" (seção Labs & Projetos) é ligado a um
backend de verdade em `/server` (Node.js + Express + SQLite + hash de senha
bcrypt + sessão em cookie). Para usá-lo, rode em outro terminal:

```bash
cd server
npm install
cp .env.example .env
npm run dev
```

Detalhes e arquitetura em [server/README.md](server/README.md).
