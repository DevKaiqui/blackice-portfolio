import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import session from 'express-session';
import { config } from './config.js';
import { SqliteSessionStore } from './sqliteSessionStore.js';
import authRoutes from './routes/auth.js';
import './db.js';

const app = express();

// Necessário em produção: PaaS (Render, Railway, Vercel etc.) terminam TLS
// num proxy e encaminham a requisição por HTTP internamente. Sem isso,
// req.secure fica sempre false e os cookies "Secure" nunca seriam enviados.
app.set('trust proxy', 1);

// Força HTTPS em produção, mesmo que o proxy não redirecione sozinho.
if (config.isProduction) {
  app.use((req, res, next) => {
    if (req.secure || req.headers['x-forwarded-proto'] === 'https') {
      return next();
    }
    res.redirect(301, `https://${req.headers.host}${req.originalUrl}`);
  });
}

app.use(
  helmet({
    // API é servida em origem/porta diferente do frontend por design
    // (CORS abaixo já restringe quem pode chamá-la); o padrão 'same-origin'
    // do Helmet bloquearia o próprio frontend de ler as respostas.
    crossOriginResourcePolicy: { policy: 'cross-origin' },
    hsts: config.isProduction
      ? { maxAge: 63072000, includeSubDomains: true, preload: true }
      : false,
  })
);
app.use(
  cors({
    origin: config.corsOrigin,
    credentials: true,
  })
);
app.use(express.json({ limit: '10kb' }));

app.use(
  session({
    name: 'kz.sid',
    secret: config.sessionSecret,
    store: new SqliteSessionStore(),
    resave: false,
    saveUninitialized: false,
    rolling: true,
    cookie: {
      httpOnly: true,
      secure: config.isProduction,
      // Em produção o frontend normalmente fica em outro domínio (ex:
      // site.vercel.app chamando api.onrender.com) — isso é cross-site, e
      // cookies "Lax" não são enviados nesse caso. "None" exige "Secure",
      // por isso só é seguro habilitar quando já estamos em HTTPS real.
      sameSite: config.isProduction ? 'none' : 'lax',
      maxAge: 1000 * 60 * 60 * 24, // 24h
    },
  })
);

app.use('/api/auth', authRoutes);

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ error: 'Erro interno do servidor.' });
});

app.listen(config.port, () => {
  console.log(`[kz-sec-auth-server] rodando em http://localhost:${config.port}`);
});
