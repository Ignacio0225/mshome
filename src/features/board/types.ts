import type {
  Comment,
  DirectChatRoom,
  DirectChatRoomListItem,
  PageData,
  Post,
  PostCategory,
  PostListItem,
  User,
} from "../../api/client";

export type BoardSection = "notice" | "qna" | "direct";
export type BoardMode = "list" | "detail" | "write";

export type { Comment, DirectChatRoom, DirectChatRoomListItem, PageData, Post, PostCategory, PostListItem, User };
