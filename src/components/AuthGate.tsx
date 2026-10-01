import React, { useEffect, useState } from 'react';
import { authApi, type AuthUser } from '../lib/authApi';

type Mode = 'login' | 'register';

const generateCaptcha = () => {
  const a = Math.floor(Math.random() * 9) + 1;
  const b = Math.floor(Math.random() * 9) + 1;
  return { a, b, answer: a + b };
};

interface AuthGateProps {
  children: React.ReactNode;
}

export const AuthGate: React.FC<AuthGateProps> = ({ children }) => {
  const [checkingSession, setCheckingSession] = useState(true);
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(null);

  const [mode, setMode] = useState<Mode>('login');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [captcha, setCaptcha] = useState(generateCaptcha());
  const [captchaInput, setCaptchaInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [lockoutRemaining, setLockoutRemaining] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    authApi.me().then((res) => {
      setCurrentUser(res.ok ? res.data ?? null : null);
      setCheckingSession(false);
    });
  }, []);

  useEffect(() => {
    if (lockoutRemaining <= 0) return;
    const interval = setInterval(() => setLockoutRemaining((s) => Math.max(0, s - 1)), 1000);
    return () => clearInterval(interval);
  }, [lockoutRemaining]);

  const resetCaptcha = () => {
    setCaptcha(generateCaptcha());
    setCaptchaInput('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    if (lockoutRemaining > 0 || loading) return;

    if (Number(captchaInput) !== captcha.answer) {
      setErrorMsg('Verificação anti-bot incorreta. Novo desafio gerado.');
      resetCaptcha();
      return;
    }
    if (mode === 'register' && password !== confirmPassword) {
      setErrorMsg('As senhas não coincidem.');
      return;
    }

    setLoading(true);
    const result =
      mode === 'login'
        ? await authApi.login({ username, password })
        : await authApi.register({ username, email, password });
    setLoading(false);

    if (!result.ok) {
      setErrorMsg(result.error ?? 'Erro inesperado.');
      if (result.status === 429 && result.retryAfterSeconds) {
        setLockoutRemaining(result.retryAfterSeconds);
      }
      return;
    }

    setCurrentUser(result.data ?? null);
  };

  if (checkingSession) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0a0b12] text-[#8b8ca3] font-mono text-sm">
        Verificando sessão...
      </div>
    );
  }

  if (currentUser) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0b12] px-4 py-10">
      <div className="w-full max-w-md rounded-xl bg-[#0d0e18] border border-[#ffa94d]/40 shadow-[0_20px_50px_rgba(0,0,0,0.9),0_0_30px_rgba(255,169,77,0.12)] overflow-hidden">
        <div className="px-6 py-5 bg-[#14151f] border-b border-[#33344a]/40 flex items-center gap-2">
          <span className="material-symbols-outlined text-[#ffa94d] text-[22px]">lock</span>
          <div>
            <span className="font-title-code text-sm font-bold text-[#f8f6f2] block">
              KZ.SEC // ACESSO RESTRITO
            </span>
            <span className="text-[10px] text-[#8b8ca3] font-mono">
              Este portfólio requer login para visualização
            </span>
          </div>
        </div>

        <div className="p-6 space-y-4">
          <div className="flex items-center gap-1 font-mono text-xs">
            <button
              onClick={() => {
                setMode('login');
                setErrorMsg(null);
              }}
              className={`px-3 py-1.5 rounded-l ${
                mode === 'login'
                  ? 'bg-[#4fd1ae] text-[#062420] font-bold'
                  : 'bg-[#14151f] text-[#8b8ca3]'
              }`}
            >
              ENTRAR
            </button>
            <button
              onClick={() => {
                setMode('register');
                setErrorMsg(null);
              }}
              className={`px-3 py-1.5 rounded-r ${
                mode === 'register'
                  ? 'bg-[#4fd1ae] text-[#062420] font-bold'
                  : 'bg-[#14151f] text-[#8b8ca3]'
              }`}
            >
              CRIAR CONTA
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="flex flex-col gap-1">
              <label className="font-mono text-[11px] text-[#8b8ca3]">USUÁRIO</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                disabled={lockoutRemaining > 0 || loading}
                className="bg-[#0a0b12] border border-[#33344a]/50 rounded px-3 py-2 font-mono text-xs text-[#e8e8f0] focus:outline-none focus:border-[#ffa94d]/60 disabled:opacity-50"
                placeholder="3-20 caracteres (letras, números, _)"
                autoComplete="username"
              />
            </div>

            {mode === 'register' && (
              <div className="flex flex-col gap-1">
                <label className="font-mono text-[11px] text-[#8b8ca3]">E-MAIL</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={lockoutRemaining > 0 || loading}
                  className="bg-[#0a0b12] border border-[#33344a]/50 rounded px-3 py-2 font-mono text-xs text-[#e8e8f0] focus:outline-none focus:border-[#ffa94d]/60 disabled:opacity-50"
                  placeholder="voce@exemplo.com"
                  autoComplete="email"
                />
              </div>
            )}

            <div className="flex flex-col gap-1">
              <label className="font-mono text-[11px] text-[#8b8ca3]">SENHA</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={lockoutRemaining > 0 || loading}
                  className="w-full bg-[#0a0b12] border border-[#33344a]/50 rounded px-3 py-2 pr-9 font-mono text-xs text-[#e8e8f0] focus:outline-none focus:border-[#ffa94d]/60 disabled:opacity-50"
                  placeholder="mínimo 8 caracteres"
                  autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-[#8b8ca3] hover:text-[#e8e8f0] focus:outline-none focus:text-[#ffa94d]"
                >
                  <span className="material-symbols-outlined text-[18px] leading-none">
                    {showPassword ? 'visibility_off' : 'visibility'}
                  </span>
                </button>
              </div>
            </div>

            {mode === 'register' && (
              <div className="flex flex-col gap-1">
                <label className="font-mono text-[11px] text-[#8b8ca3]">CONFIRMAR SENHA</label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    disabled={lockoutRemaining > 0 || loading}
                    className="w-full bg-[#0a0b12] border border-[#33344a]/50 rounded px-3 py-2 pr-9 font-mono text-xs text-[#e8e8f0] focus:outline-none focus:border-[#ffa94d]/60 disabled:opacity-50"
                    placeholder="repita a senha"
                    autoComplete="new-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword((v) => !v)}
                    aria-label={showConfirmPassword ? 'Ocultar senha' : 'Mostrar senha'}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-[#8b8ca3] hover:text-[#e8e8f0] focus:outline-none focus:text-[#ffa94d]"
                  >
                    <span className="material-symbols-outlined text-[18px] leading-none">
                      {showConfirmPassword ? 'visibility_off' : 'visibility'}
                    </span>
                  </button>
                </div>
              </div>
            )}

            <div className="flex flex-col gap-1">
              <label className="font-mono text-[11px] text-[#8b8ca3]">
                VERIFICAÇÃO ANTI-BOT — Quanto é {captcha.a} + {captcha.b}?
              </label>
              <input
                type="text"
                inputMode="numeric"
                value={captchaInput}
                onChange={(e) => setCaptchaInput(e.target.value)}
                disabled={lockoutRemaining > 0 || loading}
                className="bg-[#0a0b12] border border-[#33344a]/50 rounded px-3 py-2 font-mono text-xs text-[#e8e8f0] focus:outline-none focus:border-[#4fd1ae]/60 disabled:opacity-50 w-32"
                placeholder="?"
              />
            </div>

            <button
              type="submit"
              disabled={lockoutRemaining > 0 || loading}
              className="w-full px-4 py-2.5 rounded bg-[#ffa94d] hover:bg-[#ffcf8a] text-[#3a1a00] font-mono text-xs font-bold transition-all disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {lockoutRemaining > 0
                ? `BLOQUEADO PELO SERVIDOR — AGUARDE ${lockoutRemaining}s`
                : loading
                ? 'PROCESSANDO...'
                : mode === 'login'
                ? 'ENTRAR'
                : 'CRIAR CONTA'}
            </button>
          </form>

          {errorMsg && (
            <div className="p-3 rounded bg-[#14151f] border border-[#ffb4ab]/30 text-[#ffd0ca] font-mono text-[11px] leading-relaxed">
              {errorMsg}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
