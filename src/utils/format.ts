import type { UserRole } from "../api/client";

// 화면 전반에서 같은 날짜 표기를 쓰도록 한 곳에 모았습니다.
export function formatDate(value: string) {
  return new Intl.DateTimeFormat("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date(value));
}

// 백엔드의 role 값과 사용자에게 보여줄 한글 라벨을 연결합니다.
export function roleLabel(role: UserRole) {
  if (role === "super_admin") return "슈퍼 관리자";
  if (role === "admin") return "관리자";
  return "일반 사용자";
}
