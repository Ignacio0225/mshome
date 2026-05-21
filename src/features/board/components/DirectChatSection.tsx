import type { FormEvent } from "react";
import type { DirectChatRoom, DirectChatRoomListItem, User } from "../../../api/client";
import { formatDate } from "../../../utils/format";
import AuthRequiredPanel from "./AuthRequiredPanel";
import styles from "../Board.module.css";

type DirectChatSectionProps = {
  user: User | null;
  rooms: DirectChatRoomListItem[];
  selectedRoom: DirectChatRoom | null;
  chatTitle: string;
  chatFirstMessage: string;
  chatMessage: string;
  onChatTitleChange: (value: string) => void;
  onChatFirstMessageChange: (value: string) => void;
  onChatMessageChange: (value: string) => void;
  onCreateRoom: (event: FormEvent<HTMLFormElement>) => void;
  onSelectRoom: (roomId: number) => void;
  onSendMessage: (event: FormEvent<HTMLFormElement>) => void;
};

// 1:1 문의 영역입니다. 사용자는 자기 방만, 관리자는 모든 방을 백엔드 권한에 따라 받습니다.
export default function DirectChatSection({
  user,
  rooms,
  selectedRoom,
  chatTitle,
  chatFirstMessage,
  chatMessage,
  onChatTitleChange,
  onChatFirstMessageChange,
  onChatMessageChange,
  onCreateRoom,
  onSelectRoom,
  onSendMessage,
}: DirectChatSectionProps) {
  return (
    <div className={styles.chatLayout}>
      {!user && <AuthRequiredPanel mode="direct" />}

      {user && (
        <>
          <aside className={styles.chatRooms} aria-label="1:1 문의방 목록">
            <form className={styles.chatCreate} onSubmit={onCreateRoom}>
              <h2>새 1:1 문의</h2>
              <input value={chatTitle} onChange={(event) => onChatTitleChange(event.target.value)} placeholder="문의 제목" required />
              <textarea
                value={chatFirstMessage}
                onChange={(event) => onChatFirstMessageChange(event.target.value)}
                placeholder="문의 내용을 입력하세요"
                rows={4}
                required
              />
              <button>문의방 만들기</button>
            </form>

            <div className={styles.chatRoomList}>
              {rooms.length === 0 && <p>아직 생성된 문의방이 없습니다.</p>}
              {rooms.map((room) => (
                <button
                  key={room.id}
                  className={selectedRoom?.id === room.id ? styles.activeRoom : ""}
                  onClick={() => onSelectRoom(room.id)}
                >
                  <strong>{room.title}</strong>
                  <span>
                    {room.questioner.real_name} · 메시지 {room.message_count} · {formatDate(room.updated_at)}
                  </span>
                </button>
              ))}
            </div>
          </aside>

          <section className={styles.chatPanel}>
            {selectedRoom ? (
              <>
                <header className={styles.chatHeader}>
                  <h2>{selectedRoom.title}</h2>
                  <p>질문자 {selectedRoom.questioner.real_name}</p>
                </header>
                <div className={styles.chatMessages}>
                  {selectedRoom.messages.map((chat) => {
                    const isMine = chat.author.id === user.id;
                    return (
                      <div key={chat.id} className={`${styles.chatBubble} ${isMine ? styles.mine : styles.theirs}`}>
                        <span>{chat.author.real_name}</span>
                        <p>{chat.content}</p>
                        <time>{formatDate(chat.created_at)}</time>
                      </div>
                    );
                  })}
                </div>
                <form className={styles.chatInput} onSubmit={onSendMessage}>
                  <input value={chatMessage} onChange={(event) => onChatMessageChange(event.target.value)} placeholder="메시지를 입력하세요" required />
                  <button>전송</button>
                </form>
              </>
            ) : (
              <div className={styles.emptyChat}>문의방을 선택하거나 새 문의방을 만들어 주세요.</div>
            )}
          </section>
        </>
      )}
    </div>
  );
}
