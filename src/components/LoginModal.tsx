import React, { useEffect, useState } from 'react';
import { authApi, type AuthUser } from '../lib/authApi';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type Mode = 'login' | 'register';

const generateCaptcha = () => {
  const a = Math.floor(Math.random() * 9) + 1;
  const b = Math.floor(Math.random() * 9) + 1;
  return { a, b, answer: a + b };
};

export const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
  const [mode, setMode] = useState<Mode>('login');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [captcha, setCaptcha] = useState(generateCaptcha());
  const [captchaInput, setCaptchaInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [okMsg, setOkMsg] = useState<string | null>(null);
  const [lockoutRemaining, setLockoutRemaining] = useState(0);
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(null);
  const [checkingSession, setCheckingSession] = useState(true);

  useEffect(() => {
    if (lockoutRemaining <= 0) return;
    const interval = setInterval(() => setLockoutRemaining((s) => Math.max(0, s - 1)), 1000);
    return () => clearInterval(interval);
  }, [lockoutRemaining]);

  useEffect(() => {
    if (!isOpen) return;
    setUsername('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setCaptcha(generateCaptcha());
    setCaptchaInput('');
    setErrorMsg(null);
    setOkMsg(null);
    setCheckingSession(true);

    authApi.me().then((res) => {
      setCurrentUser(res.ok ? res.data ?? null : null);
      setCheckingSession(false);
    });
  }, [isOpen]);

  if (!isOpen) return null;

  const resetCaptcha = () => {
    setCaptcha(generateCaptcha());
    setCaptchaInput('');
  };

  const handleLogout = async () => {
    setLoading(true);
    await authApi.logout();
    setCurrentUser(null);
    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setOkMsg(null);

    if (lockoutRemaining > 0 || loading) return;

    if (Number(captchaInput) !== captcha.answer) {
      setErrorMsg('Verificação anti-bot incorreta. Novo desafio gerado.');
      resetCaptcha();
      return;
    }

    if (mode === 'register' && password !== confirmPassword) {
      setErrorMsg('As senhas não coincidem.');
      resetCaptcha();
      return;
    }

    setLoading(true);
    const result =
      mode === 'login'
        ? await authApi.login({ username, password })
        : await authApi.register({ username, email, password });
    setLoading(false);
    resetCaptcha();

    if (!result.ok) {
      setErrorMsg(result.error ?? 'Erro inesperado.');
      if (result.status === 429 && result.retryAfterSeconds) {
        setLockoutRemaining(result.retryAfterSeconds);
      }
      return;
    }

    setCurrentUser(result.data ?? null);
    setOkMsg(mode === 'login' ? 'Login realizado com sucesso.' : 'Conta criada com sucesso.');
    setPassword('');
    setConfirmPassword('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-2xl rounded-xl bg-[#0d0e18] border border-[#ffb4ab]/40 shadow-[0_20px_50px_rgba(0,0,0,0.9),0_0_30px_rgba(255,180,171,0.12)] flex flex-col max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 bg-[#14151f] border-b border-[#33344a]/40 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#ffb4ab] text-[22px]">
              lock_person
            </span>
            <div>
              <span className="font-title-code text-sm font-bold text-[#f8f6f2]">
                Cadastro &amp; Login
              </span>
              <span className="text-[10px] text-[#ffb4ab] block font-mono">
                CONTA REAL — DADOS SALVOS COM HASH E SESSÃO SEGURA
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded text-[#8b8ca3] hover:text-white hover:bg-[#20212e] transition-colors"
            aria-label="Fechar"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        <div className="p-6 overflow-y-auto space-y-4 terminal-scroll text-xs">
          {(
            checkingSession ? (
              <div className="py-10 text-center font-mono text-[#8b8ca3]">
                Verificando sessão...
              </div>
            ) : currentUser ? (
              <div className="space-y-4">
                <div className="p-4 rounded-lg bg-[#14151f] border border-[#ffa94d]/30 space-y-2">
                  <div className="flex items-center gap-2 text-[#ffa94d] font-mono text-xs">
                    <span className="material-symbols-outlined text-[16px]">verified_user</span>
                    <span>SESSÃO ATIVA</span>
                  </div>
                  <div className="font-mono text-[11px] text-[#c6c7d6] space-y-1">
                    <div>ID: {currentUser.id}</div>
                    <div>Usuário: {currentUser.username}</div>
                    <div>E-mail: {currentUser.email}</div>
                    {currentUser.created_at && <div>Criado em: {currentUser.created_at}</div>}
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  disabled={loading}
                  className="w-full px-4 py-2.5 rounded bg-[#20212e] border border-[#ffb4ab]/40 hover:bg-[#ffb4ab] hover:text-[#3f0300] text-[#ffb4ab] font-mono text-xs font-bold transition-all disabled:opacity-50"
                >
                  {loading ? 'SAINDO...' : 'ENCERRAR SESSÃO (LOGOUT)'}
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center gap-1 font-mono text-xs">
                  <button
                    onClick={() => {
                      setMode('login');
                      setErrorMsg(null);
                      setOkMsg(null);
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
                      setOkMsg(null);
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
                    <label className="font-label-code-sm text-[11px] text-[#8b8ca3]">
                      USUÁRIO
                    </label>
                    <input
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      disabled={lockoutRemaining > 0 || loading}
                      className="bg-[#0d0e18] border border-[#33344a]/50 rounded px-3 py-2 font-mono text-xs text-[#e8e8f0] focus:outline-none focus:border-[#ffb4ab]/60 disabled:opacity-50"
                      placeholder="3-20 caracteres (letras, números, _)"
                      autoComplete="username"
                    />
                  </div>

                  {mode === 'register' && (
                    <div className="flex flex-col gap-1">
                      <label className="font-label-code-sm text-[11px] text-[#8b8ca3]">
                        E-MAIL
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={lockoutRemaining > 0 || loading}
                        className="bg-[#0d0e18] border border-[#33344a]/50 rounded px-3 py-2 font-mono text-xs text-[#e8e8f0] focus:outline-none focus:border-[#ffb4ab]/60 disabled:opacity-50"
                        placeholder="voce@exemplo.com"
                        autoComplete="email"
                      />
                    </div>
                  )}

                  <div className="flex flex-col gap-1">
                    <label className="font-label-code-sm text-[11px] text-[#8b8ca3]">
                      SENHA
                    </label>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      disabled={lockoutRemaining > 0 || loading}
                      className="bg-[#0d0e18] border border-[#33344a]/50 rounded px-3 py-2 font-mono text-xs text-[#e8e8f0] focus:outline-none focus:border-[#ffb4ab]/60 disabled:opacity-50"
                      placeholder="mínimo 8 caracteres"
                      autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
                    />
                  </div>

                  {mode === 'register' && (
                    <div className="flex flex-col gap-1">
                      <label className="font-label-code-sm text-[11px] text-[#8b8ca3]">
                        CONFIRMAR SENHA
                      </label>
                      <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        disabled={lockoutRemaining > 0 || loading}
                        className="bg-[#0d0e18] border border-[#33344a]/50 rounded px-3 py-2 font-mono text-xs text-[#e8e8f0] focus:outline-none focus:border-[#ffb4ab]/60 disabled:opacity-50"
                        placeholder="repita a senha"
                        autoComplete="new-password"
                      />
                    </div>
                  )}

                  <div className="flex flex-col gap-1">
                    <label className="font-label-code-sm text-[11px] text-[#8b8ca3]">
                      VERIFICAÇÃO ANTI-BOT — Quanto é {captcha.a} + {captcha.b}?
                    </label>
                    <input
                      type="text"
                      inputMode="numeric"
                      value={captchaInput}
                      onChange={(e) => setCaptchaInput(e.target.value)}
                      disabled={lockoutRemaining > 0 || loading}
                      className="bg-[#0d0e18] border border-[#33344a]/50 rounded px-3 py-2 font-mono text-xs text-[#e8e8f0] focus:outline-none focus:border-[#4fd1ae]/60 disabled:opacity-50 w-32"
                      placeholder="?"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={lockoutRemaining > 0 || loading}
                    className="w-full px-4 py-2.5 rounded bg-[#ffb4ab] hover:bg-[#ffd0ca] text-[#3f0300] font-mono text-xs font-bold transition-all disabled:opacity-40 disabled:cursor-not-allowed"
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
                {okMsg && (
                  <div className="p-3 rounded bg-[#14151f] border border-[#ffa94d]/30 text-[#ffa94d] font-mono text-[11px] leading-relaxed">
                    {okMsg}
                  </div>
                )}

                <p className="text-[10px] text-[#8b8ca3] font-mono leading-relaxed">
                  O CAPTCHA acima é apenas uma barreira de fricção para humanos.
                  A defesa real contra brute-force roda no servidor.
                </p>
              </div>
            )
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-[#14151f] border-t border-[#33344a]/30 flex items-center justify-end font-mono text-[11px] text-[#8b8ca3]">
          <button onClick={onClose} className="text-[#ffb4ab] hover:underline">
            [FECHAR JANELA]
          </button>
        </div>
      </div>
    </div>
  );
};
