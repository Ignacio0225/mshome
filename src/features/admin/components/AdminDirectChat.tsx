import type { FormEvent } from "react";
import type { DirectChatRoom, DirectChatRoomListItem, User } from "../../../api/client";
import { formatDate } from "../../../utils/format";
import styles from "../Admin.module.css";

type AdminDirectChatProps = {
  currentUser: User | null;
  rooms: DirectChatRoomListItem[];
  selectedRoom: DirectChatRoom | null;
  message: string;
  onMessageChange: (value: string) => void;
  onSelectRoom: (roomId: number) => void;
  onSendMessage: (event: FormEvent<HTMLFormElement>) => void;
};

// 관리자용 1:1 문의 관리 화면입니다. 실제 방 접근 권한은 백엔드 /direct-chats가 다시 검사합니다.
export default function AdminDirectChat({
  currentUser,
  rooms,
  selectedRoom,
  message,
  onMessageChange,
  onSelectRoom,
  onSendMessage,
}: AdminDirectChatProps) {
  return (
    <div className={styles.chatLayout}>
      <aside className={styles.roomList}>
        {rooms.length === 0 && <p>등록된 1:1 문의가 없습니다.</p>}
        {rooms.map((room) => (
          <button key={room.id} className={selectedRoom?.id === room.id ? styles.activeRoom : ""} onClick={() => onSelectRoom(room.id)}>
            <strong>{room.title}</strong>
            <span>
              {room.questioner.real_name} · 메시지 {room.message_count} · {formatDate(room.updated_at)}
            </span>
          </button>
        ))}
      </aside>

      <section className={styles.chatPanel}>
        {selectedRoom ? (
          <>
            <header className={styles.chatHeader}>
              <h2>{selectedRoom.title}</h2>
              <p>질문자 {selectedRoom.questioner.real_name}</p>
            </header>
            <div className={styles.messages}>
              {selectedRoom.messages.map((chat) => {
                const isMine = chat.author.id === currentUser?.id;
                return (
                  <div key={chat.id} className={`${styles.bubble} ${isMine ? styles.mine : styles.theirs}`}>
                    <span>{chat.author.real_name}</span>
                    <p>{chat.content}</p>
                    <time>{formatDate(chat.created_at)}</time>
                  </div>
                );
              })}
            </div>
            <form className={styles.replyForm} onSubmit={onSendMessage}>
              <input value={message} onChange={(event) => onMessageChange(event.target.value)} placeholder="답변을 입력하세요" required />
              <button>전송</button>
            </form>
          </>
        ) : (
          <div className={styles.notice}>1:1 문의방을 선택해 주세요.</div>
        )}
      </section>
    </div>
  );
}
