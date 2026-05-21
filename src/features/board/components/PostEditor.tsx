import type { FormEvent } from "react";
import styles from "../Board.module.css";

type PostEditorProps = {
  isEditing: boolean;
  title: string;
  content: string;
  isSecret: boolean;
  onTitleChange: (value: string) => void;
  onContentChange: (value: string) => void;
  onSecretChange: (value: boolean) => void;
  onCancel: () => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
};

// QnA 작성/수정 폼입니다. 실제 저장 API 호출은 Board 페이지의 onSubmit이 담당합니다.
export default function PostEditor({
  isEditing,
  title,
  content,
  isSecret,
  onTitleChange,
  onContentChange,
  onSecretChange,
  onCancel,
  onSubmit,
}: PostEditorProps) {
  return (
    <form className={styles.editor} onSubmit={onSubmit}>
      <h2>{isEditing ? "게시글 수정" : "글쓰기"}</h2>
      <input value={title} onChange={(event) => onTitleChange(event.target.value)} placeholder="제목" required />
      <label className={styles.secretOption}>
        <input type="checkbox" checked={isSecret} onChange={(event) => onSecretChange(event.target.checked)} />
        비밀글
      </label>
      <textarea value={content} onChange={(event) => onContentChange(event.target.value)} placeholder="내용" rows={8} required />
      <div className={styles.actions}>
        <button type="button" className={styles.secondaryButton} onClick={onCancel}>
          취소
        </button>
        <button className={styles.primaryButton}>{isEditing ? "수정" : "등록"}</button>
      </div>
    </form>
  );
}
