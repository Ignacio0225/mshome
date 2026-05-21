import { api, type PostCategory } from "../../api/client";

// Board feature에서 쓰는 API만 모아둔 얇은 래퍼입니다.
export const boardApi = {
  listPosts(params: { page?: number; size?: number; q?: string; category?: PostCategory }) {
    return api.listPosts(params);
  },
  getPost(postId: number) {
    return api.getPost(postId);
  },
  createQnaPost(payload: { title: string; content: string; is_secret: boolean }) {
    return api.createPost({ ...payload, category: "qna" });
  },
  updatePost(postId: number, payload: { title?: string; content?: string; is_secret?: boolean }) {
    return api.updatePost(postId, payload);
  },
  deletePost(postId: number) {
    return api.deletePost(postId);
  },
  createComment(postId: number, content: string) {
    return api.createComment(postId, content);
  },
  updateComment(postId: number, commentId: number, content: string) {
    return api.updateComment(postId, commentId, content);
  },
  deleteComment(postId: number, commentId: number) {
    return api.deleteComment(postId, commentId);
  },
  listDirectChatRooms() {
    return api.listDirectChatRooms();
  },
  createDirectChatRoom(payload: { title: string; message: string }) {
    return api.createDirectChatRoom(payload);
  },
  getDirectChatRoom(roomId: number) {
    return api.getDirectChatRoom(roomId);
  },
  createDirectChatMessage(roomId: number, content: string) {
    return api.createDirectChatMessage(roomId, content);
  },
  me() {
    return api.me();
  },
};
