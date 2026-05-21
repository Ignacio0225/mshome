import type { FormEvent } from "react";
import type { PostListItem } from "../../../api/client";
import { formatDate } from "../../../utils/format";
import styles from "../Admin.module.css";

type NoticeEditorProps = {
  notices: PostListItem[];
  title: string;
  content: string;
  onTitleChange: (value: string) => void;
  onContentChange: (value: string) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
};

// 슈퍼관리자가 NOTICE 게시판에 공지사항을 올리는 폼입니다.
export default function NoticeEditor({ notices, title, content, onTitleChange, onContentChange, onSubmit }: NoticeEditorProps) {
  return (
    <div className={styles.noticeEditorLayout}>
      <form className={styles.noticeEditor} onSubmit={onSubmit}>
        <h2>공지사항 업로드</h2>
        <input value={title} onChange={(event) => onTitleChange(event.target.value)} placeholder="공지 제목" required />
        <textarea value={content} onChange={(event) => onContentChange(event.target.value)} placeholder="공지 내용을 입력하세요" rows={8} required />
        <button>공지사항 등록</button>
      </form>

      <aside className={styles.noticeList}>
        <h2>최근 공지</h2>
        {notices.length === 0 && <p>등록된 공지사항이 없습니다.</p>}
        {notices.map((notice) => (
          <article key={notice.id}>
            <strong>{notice.title}</strong>
            <span>
              {formatDate(notice.created_at)} · {notice.author.real_name}
            </span>
          </article>
        ))}
      </aside>
    </div>
  );
}
