const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:4000';

export interface AuthUser {
  id: number;
  username: string;
  email: string;
  created_at?: string;
}

export interface ApiResult<T> {
  ok: boolean;
  status: number;
  data?: T;
  error?: string;
  retryAfterSeconds?: number;
}

async function request<T>(path: string, options: RequestInit = {}): Promise<ApiResult<T>> {
  try {
    const res = await fetch(`${API_URL}${path}`, {
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      ...options,
    });

    const resetHeader = res.headers.get('RateLimit-Reset');
    const retryAfterSeconds = resetHeader ? Number(resetHeader) : undefined;

    if (res.status === 204) {
      return { ok: true, status: res.status };
    }

    const body = await res.json().catch(() => ({}));

    if (!res.ok) {
      return {
        ok: false,
        status: res.status,
        error: body.error ?? 'Erro inesperado no servidor.',
        retryAfterSeconds,
      };
    }

    return { ok: true, status: res.status, data: body as T };
  } catch {
    return {
      ok: false,
      status: 0,
      error:
        'Não foi possível conectar ao backend (servidor offline?). Rode "npm run dev" dentro da pasta /server.',
    };
  }
}

export const authApi = {
  register: (payload: { username: string; email: string; password: string }) =>
    request<AuthUser>('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),
  login: (payload: { username: string; password: string }) =>
    request<AuthUser>('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),
  logout: () => request<void>('/api/auth/logout', { method: 'POST' }),
  me: () => request<AuthUser>('/api/auth/me'),
};
