import { useState } from "react";
import type { DirectChatRoom, DirectChatRoomListItem } from "../types";
import { boardApi } from "../api";

// 사용자용 1:1 문의 목록/상세/메시지 전송 상태를 담당합니다.
export function useDirectChat() {
  const [chatRooms, setChatRooms] = useState<DirectChatRoomListItem[]>([]);
  const [selectedChatRoom, setSelectedChatRoom] = useState<DirectChatRoom | null>(null);

  async function loadChatRooms(nextRoomId?: number) {
    const rooms = await boardApi.listDirectChatRooms();
    setChatRooms(rooms);
    const targetId = nextRoomId ?? selectedChatRoom?.id ?? rooms[0]?.id;
    setSelectedChatRoom(targetId ? await boardApi.getDirectChatRoom(targetId) : null);
    return rooms;
  }

  return { chatRooms, selectedChatRoom, setSelectedChatRoom, loadChatRooms };
}
