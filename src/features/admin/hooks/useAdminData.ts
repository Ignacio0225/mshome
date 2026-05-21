import { useState } from "react";
import { getStoredUser } from "../../../api/client";
import { adminApi } from "../api";
import type { DirectChatRoom, DirectChatRoomListItem, PostListItem, User } from "../types";

// 관리자 페이지 초기 데이터 묶음: 내 정보, 회원, 문의방, 최근 공지.
export function useAdminData() {
  const [currentUser, setCurrentUser] = useState<User | null>(() => getStoredUser());
  const [users, setUsers] = useState<User[]>([]);
  const [rooms, setRooms] = useState<DirectChatRoomListItem[]>([]);
  const [notices, setNotices] = useState<PostListItem[]>([]);
  const [selectedRoom, setSelectedRoom] = useState<DirectChatRoom | null>(null);

  async function loadAdminData(nextRoomId?: number) {
    const [me, userList, roomList, noticePage] = await Promise.all([
      adminApi.me(),
      adminApi.listUsers(),
      adminApi.listDirectChatRooms(),
      adminApi.listNotices(),
    ]);
    setCurrentUser(me);
    setUsers(userList);
    setRooms(roomList);
    setNotices(noticePage.items);

    const targetRoomId = nextRoomId ?? selectedRoom?.id ?? roomList[0]?.id;
    setSelectedRoom(targetRoomId ? await adminApi.getDirectChatRoom(targetRoomId) : null);
  }

  return { currentUser, users, setUsers, rooms, notices, selectedRoom, setSelectedRoom, loadAdminData };
}
