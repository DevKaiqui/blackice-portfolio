import 'dotenv/config';

const required = (name, fallback) => {
  const value = process.env[name] ?? fallback;
  if (value === undefined) {
    throw new Error(`Variável de ambiente obrigatória ausente: ${name}`);
  }
  return value;
};

export const config = {
  port: Number(process.env.PORT ?? 4000),
  corsOrigin: required('CORS_ORIGIN', 'http://localhost:3001'),
  sessionSecret: required('SESSION_SECRET'),
  isProduction: process.env.NODE_ENV === 'production',
};
