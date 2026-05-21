import type { User } from "../api/client";

// 게시글/댓글 수정 권한은 백엔드 정책과 같은 기준으로 프론트 버튼 노출에만 사용합니다.
export function canEditOwnedContent(user: User | null, authorId: number) {
  return Boolean(user && (user.role === "admin" || user.role === "super_admin" || user.id === authorId));
}

export function canUseAdmin(user: User | null) {
  return user?.role === "admin" || user?.role === "super_admin";
}

export function isSuperAdmin(user: User | null) {
  return user?.role === "super_admin";
}
