import type { AuthResponse, AuthSessionPhase, User } from "./types";

const TOKEN_KEY = "mshome_access_token";
const USER_KEY = "mshome_user";
const LOGIN_AT_KEY = "mshome_login_at";
const SESSION_MS = 30 * 60 * 1000;
const SESSION_GRACE_MS = 3 * 60 * 1000;

function emitAuthChange() {
  window.dispatchEvent(new Event("mshome-auth-change"));
}

// 로그인 시간은 JWT와 별개로 프론트 UX 제어용입니다. 30분 후 3분 연장 모달이 뜹니다.
function getLoginAt() {
  const raw = localStorage.getItem(LOGIN_AT_KEY);
  const value = raw ? Number(raw) : 0;
  return Number.isFinite(value) ? value : 0;
}

export function getAuthSessionState(): { phase: AuthSessionPhase; elapsedMs: number; graceRemainingMs: number } {
  if (!localStorage.getItem(TOKEN_KEY)) {
    return { phase: "signed_out", elapsedMs: 0, graceRemainingMs: 0 };
  }

  const loginAt = getLoginAt();
  const elapsedMs = Date.now() - loginAt;
  if (!loginAt || elapsedMs >= SESSION_MS + SESSION_GRACE_MS) {
    return { phase: "expired", elapsedMs, graceRemainingMs: 0 };
  }
  if (elapsedMs >= SESSION_MS) {
    return { phase: "grace", elapsedMs, graceRemainingMs: SESSION_MS + SESSION_GRACE_MS - elapsedMs };
  }
  return { phase: "active", elapsedMs, graceRemainingMs: SESSION_MS - elapsedMs };
}

export function extendAuthSession() {
  localStorage.setItem(LOGIN_AT_KEY, String(Date.now()));
  emitAuthChange();
}

export function getToken() {
  if (getAuthSessionState().phase === "expired") {
    clearAuth();
    return null;
  }
  return localStorage.getItem(TOKEN_KEY);
}

export function getStoredUser(): User | null {
  if (getAuthSessionState().phase === "expired") {
    clearAuth();
    return null;
  }

  const raw = localStorage.getItem(USER_KEY);
  if (!raw) return null;

  try {
    return JSON.parse(raw) as User;
  } catch {
    localStorage.removeItem(USER_KEY);
    return null;
  }
}

export function saveAuth(auth: AuthResponse) {
  localStorage.setItem(TOKEN_KEY, auth.access_token);
  localStorage.setItem(USER_KEY, JSON.stringify(auth.user));
  localStorage.setItem(LOGIN_AT_KEY, String(Date.now()));
  emitAuthChange();
}

export function clearAuth() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
  localStorage.removeItem(LOGIN_AT_KEY);
  emitAuthChange();
}
