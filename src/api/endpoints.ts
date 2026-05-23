import { request } from "./http";
import type {
  AuthResponse,
  Comment,
  DirectChatMessage,
  DirectChatRoom,
  DirectChatRoomListItem,
  PageData,
  Post,
  PostCategory,
  PostListItem,
  SignupEmailConfirmResponse,
  SignupResponse,
  User,
  UserRole,
} from "./types";

export const api = {
  // Auth: 이메일 인증, 회원가입, 로그인, 내 정보 조회
  requestSignupVerification(email: string) {
    return request<{ message: string }>("/auth/request-signup-verification", { method: "POST", body: { email } });
  },
  confirmSignupVerification(email: string, code: string) {
    return request<SignupEmailConfirmResponse>("/auth/confirm-signup-verification", { method: "POST", body: { email, code } });
  },
  signup(payload: {
    email: string;
    password: string;
    real_name: string;
    phone: string;
    company_name?: string | null;
    email_verification_token: string;
  }) {
    return request<SignupResponse>("/auth/signup", { method: "POST", body: payload });
  },
  verifyEmail(token: string) {
    return request<{ message: string }>("/auth/verify-email", { method: "POST", body: { token } });
  },
  login(email: string, password: string) {
    const form = new URLSearchParams();
    form.set("username", email);
    form.set("password", password);
    return request<AuthResponse>("/auth/login", { method: "POST", body: form });
  },
  me() {
    return request<User>("/auth/me", { auth: true });
  },

  // Users: 관리자 페이지의 회원정보/권한관리에서 사용
  listUsers() {
    return request<User[]>("/users", { auth: true });
  },
  updateUserRole(userId: number, role: UserRole) {
    return request<User>(`/users/${userId}/role`, { method: "PATCH", body: { role }, auth: true });
  },
  updateUserActive(userId: number, isActive: boolean) {
    return request<{ message: string }>(`/users/${userId}/active?is_active=${isActive}`, { method: "PATCH", auth: true });
  },

  // Posts: NOTICE/QnA 목록, 상세, 작성, 수정, 삭제
  listPosts(params: { page?: number; size?: number; q?: string; category?: PostCategory } = {}) {
    const search = new URLSearchParams();
    if (params.page) search.set("page", String(params.page));
    if (params.size) search.set("size", String(params.size));
    if (params.q) search.set("q", params.q);
    if (params.category) search.set("category", params.category);
    const query = search.toString();
    return request<PageData<PostListItem>>(`/posts${query ? `?${query}` : ""}`, { auth: true });
  },
  getPost(postId: number) {
    return request<Post>(`/posts/${postId}`, { auth: true });
  },
  createPost(payload: { title: string; content: string; category?: PostCategory; is_secret: boolean }) {
    return request<Post>("/posts", { method: "POST", body: payload, auth: true });
  },
  updatePost(postId: number, payload: { title?: string; content?: string; is_secret?: boolean }) {
    return request<Post>(`/posts/${postId}`, { method: "PATCH", body: payload, auth: true });
  },
  deletePost(postId: number) {
    return request<{ message: string }>(`/posts/${postId}`, { method: "DELETE", auth: true });
  },

  // Comments: 게시글 상세의 댓글 기능
  createComment(postId: number, content: string) {
    return request<Comment>(`/posts/${postId}/comments`, { method: "POST", body: { content }, auth: true });
  },
  updateComment(postId: number, commentId: number, content: string) {
    return request<Comment>(`/posts/${postId}/comments/${commentId}`, { method: "PATCH", body: { content }, auth: true });
  },
  deleteComment(postId: number, commentId: number) {
    return request<{ message: string }>(`/posts/${postId}/comments/${commentId}`, { method: "DELETE", auth: true });
  },

  // Direct chats: 사용자/관리자 1:1 문의 기능
  listDirectChatRooms() {
    return request<DirectChatRoomListItem[]>("/direct-chats", { auth: true });
  },
  createDirectChatRoom(payload: { title: string; message: string }) {
    return request<DirectChatRoom>("/direct-chats", { method: "POST", body: payload, auth: true });
  },
  getDirectChatRoom(roomId: number) {
    return request<DirectChatRoom>(`/direct-chats/${roomId}`, { auth: true });
  },
  createDirectChatMessage(roomId: number, content: string) {
    return request<DirectChatMessage>(`/direct-chats/${roomId}/messages`, { method: "POST", body: { content }, auth: true });
  },
};
