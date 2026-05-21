import { getToken } from "./session";

const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL ?? "http://127.0.0.1:8000").replace(/\/$/, "");

type RequestOptions = {
  method?: string;
  body?: unknown;
  auth?: boolean;
};

function getErrorMessage(payload: unknown, fallback: string) {
  if (!payload || typeof payload !== "object") return fallback;
  if (!("detail" in payload)) return fallback;

  const detail = (payload as { detail?: unknown }).detail;
  if (typeof detail === "string") return detail;
  if (Array.isArray(detail)) {
    return detail
      .map((item) => {
        if (!item || typeof item !== "object") return String(item);
        const message = "msg" in item ? String((item as { msg?: unknown }).msg) : "";
        const location = "loc" in item && Array.isArray((item as { loc?: unknown }).loc)
          ? (item as { loc: unknown[] }).loc.join(".")
          : "";
        return [location, message].filter(Boolean).join(": ");
      })
      .filter(Boolean)
      .join(" / ") || fallback;
  }
  if (detail && typeof detail === "object") return JSON.stringify(detail);
  return fallback;
}

export async function request<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const headers = new Headers();

  if (!(options.body instanceof FormData) && !(options.body instanceof URLSearchParams)) {
    headers.set("Content-Type", "application/json");
  }

  if (options.auth) {
    const token = getToken();
    if (token) headers.set("Authorization", `Bearer ${token}`);
  }

  let response: Response;
  try {
    response = await fetch(`${API_BASE_URL}${path}`, {
      method: options.method ?? "GET",
      headers,
      body:
        options.body instanceof FormData || options.body instanceof URLSearchParams
          ? options.body
          : options.body === undefined
            ? undefined
            : JSON.stringify(options.body),
    });
  } catch {
    throw new Error("서버에 연결할 수 없습니다. 백엔드가 실행 중인지 확인해 주세요.");
  }

  if (response.status === 401 || response.status === 403) {
    const errorPayload = await response.json().catch(() => ({}));
    throw new Error(getErrorMessage(errorPayload, "로그인이 필요하거나 권한이 없습니다."));
  }

  if (!response.ok) {
    const errorPayload = await response.json().catch(() => ({}));
    throw new Error(getErrorMessage(errorPayload, "요청 처리 중 오류가 발생했습니다."));
  }

  if (response.status === 204) return undefined as T;
  return response.json() as Promise<T>;
}
