import { Router } from 'express';
import bcrypt from 'bcryptjs';
import rateLimit from 'express-rate-limit';
import { db } from '../db.js';

const router = Router();

const USERNAME_RE = /^[a-zA-Z0-9_]{3,20}$/;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const HASH_ROUNDS = 12;

const insertUserStmt = db.prepare(
  'INSERT INTO users (username, email, password_hash) VALUES (?, ?, ?)'
);
const findByUsernameStmt = db.prepare('SELECT * FROM users WHERE username = ?');
const findByEmailStmt = db.prepare('SELECT * FROM users WHERE email = ?');
const findByIdStmt = db.prepare('SELECT id, username, email, created_at FROM users WHERE id = ?');
const logAttemptStmt = db.prepare(
  'INSERT INTO login_attempts (username, ip, success) VALUES (?, ?, ?)'
);

// Limite server-side real: 5 tentativas de login por IP a cada 5 minutos.
const loginLimiter = rateLimit({
  windowMs: 5 * 60 * 1000,
  limit: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Muitas tentativas de login. Tente novamente em alguns minutos.' },
});

const registerLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Muitas tentativas de cadastro. Tente novamente mais tarde.' },
});

router.post('/register', registerLimiter, async (req, res) => {
  const { username, email, password } = req.body ?? {};

  if (typeof username !== 'string' || !USERNAME_RE.test(username)) {
    return res.status(400).json({
      error: 'Usuário deve ter 3-20 caracteres (letras, números ou "_").',
    });
  }
  if (typeof email !== 'string' || !EMAIL_RE.test(email)) {
    return res.status(400).json({ error: 'E-mail inválido.' });
  }
  if (typeof password !== 'string' || password.length < 8) {
    return res.status(400).json({ error: 'Senha deve ter no mínimo 8 caracteres.' });
  }

  if (findByUsernameStmt.get(username)) {
    return res.status(409).json({ error: 'Este nome de usuário já está em uso.' });
  }
  if (findByEmailStmt.get(email)) {
    return res.status(409).json({ error: 'Este e-mail já está cadastrado.' });
  }

  const passwordHash = await bcrypt.hash(password, HASH_ROUNDS);
  const info = insertUserStmt.run(username, email, passwordHash);

  req.session.regenerate((err) => {
    if (err) return res.status(500).json({ error: 'Falha ao iniciar sessão.' });
    req.session.userId = Number(info.lastInsertRowid);
    res.status(201).json({ id: req.session.userId, username, email });
  });
});

router.post('/login', loginLimiter, async (req, res) => {
  const { username, password } = req.body ?? {};
  const ip = req.ip;

  if (typeof username !== 'string' || typeof password !== 'string') {
    return res.status(400).json({ error: 'Usuário e senha são obrigatórios.' });
  }

  const user = findByUsernameStmt.get(username);
  // Sempre roda o compare (mesmo sem usuário) contra um hash fixo para não
  // vazar por tempo de resposta se o usuário existe ou não.
  const hashToCompare = user?.password_hash ?? '$2a$12$invalidsaltinvalidsaltinvalidsaltinvalidsaltinvalid.';
  const passwordMatches = await bcrypt.compare(password, hashToCompare);
  const success = Boolean(user) && passwordMatches;

  logAttemptStmt.run(username, ip, success ? 1 : 0);

  if (!success) {
    return res.status(401).json({ error: 'Usuário ou senha incorretos.' });
  }

  req.session.regenerate((err) => {
    if (err) return res.status(500).json({ error: 'Falha ao iniciar sessão.' });
    req.session.userId = user.id;
    res.json({ id: user.id, username: user.username, email: user.email });
  });
});

router.post('/logout', (req, res) => {
  req.session.destroy(() => {
    res.clearCookie('kz.sid');
    res.status(204).end();
  });
});

router.get('/me', (req, res) => {
  if (!req.session.userId) {
    return res.status(401).json({ error: 'Não autenticado.' });
  }
  const user = findByIdStmt.get(req.session.userId);
  if (!user) {
    return res.status(401).json({ error: 'Não autenticado.' });
  }
  res.json(user);
});

export default router;
