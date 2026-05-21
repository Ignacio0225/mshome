export type UserRole = "super_admin" | "admin" | "user";
export type PostCategory = "qna" | "notice";

export type User = {
  id: number;
  email: string;
  real_name: string;
  phone: string;
  company_name: string | null;
  role: UserRole;
  is_active: boolean;
  is_email_verified: boolean;
  is_real_name_verified: boolean;
  created_at: string;
};

export type AuthResponse = {
  access_token: string;
  token_type: string;
  user: User;
};

export type SignupResponse = {
  user: User;
  message: string;
  dev_verification_token?: string | null;
};

export type SignupEmailConfirmResponse = {
  message: string;
  email_verification_token: string;
};

export type Author = {
  id: number;
  email: string;
  real_name: string;
  role: UserRole;
};

export type Comment = {
  id: number;
  content: string;
  post_id: number;
  author: Author;
  created_at: string;
  updated_at: string;
};

export type DirectChatMessage = {
  id: number;
  content: string;
  author: Author;
  created_at: string;
};

export type DirectChatRoomListItem = {
  id: number;
  title: string;
  questioner: Author;
  is_closed: boolean;
  created_at: string;
  updated_at: string;
  message_count: number;
};

export type DirectChatRoom = {
  id: number;
  title: string;
  questioner: Author;
  is_closed: boolean;
  created_at: string;
  updated_at: string;
  messages: DirectChatMessage[];
};

export type PostListItem = {
  id: number;
  title: string;
  category: PostCategory;
  is_secret: boolean;
  author: Author;
  created_at: string;
  updated_at: string;
  comment_count: number;
};

export type PageData<T> = {
  items: T[];
  total: number;
  page: number;
  size: number;
  total_pages: number;
};

export type Post = {
  id: number;
  title: string;
  content: string;
  category: PostCategory;
  is_secret: boolean;
  author: Author;
  created_at: string;
  updated_at: string;
  comments: Comment[];
};

export type AuthSessionPhase = "active" | "grace" | "expired" | "signed_out";
