import { api, type UserRole } from "../../api/client";

// Admin feature에서 쓰는 API만 모아둔 얇은 래퍼입니다.
export const adminApi = {
  me() {
    return api.me();
  },
  listUsers() {
    return api.listUsers();
  },
  updateUserRole(userId: number, role: UserRole) {
    return api.updateUserRole(userId, role);
  },
  updateUserActive(userId: number, isActive: boolean) {
    return api.updateUserActive(userId, isActive);
  },
  listDirectChatRooms() {
    return api.listDirectChatRooms();
  },
  getDirectChatRoom(roomId: number) {
    return api.getDirectChatRoom(roomId);
  },
  createDirectChatMessage(roomId: number, content: string) {
    return api.createDirectChatMessage(roomId, content);
  },
  listNotices() {
    return api.listNoticePosts({ page: 1, size: 5 });
  },
  createNotice(payload: { title: string; content: string }) {
    return api.createNotice(payload);
  },
};
