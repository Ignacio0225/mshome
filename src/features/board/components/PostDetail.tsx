import type { FormEvent } from "react";
import type { Comment, Post, User } from "../../../api/client";
import { formatDate } from "../../../utils/format";
import { canEditOwnedContent } from "../../../utils/permissions";
import styles from "../Board.module.css";

type PostDetailProps = {
  post: Post;
  user: User | null;
  commentContent: string;
  editingCommentId: number | null;
  editingCommentContent: string;
  onCommentContentChange: (value: string) => void;
  onSubmitComment: (event: FormEvent<HTMLFormElement>) => void;
  onEditPost: (post: Post) => void;
  onDeletePost: (postId: number) => void;
  onStartEditComment: (comment: Comment) => void;
  onEditingCommentContentChange: (value: string) => void;
  onUpdateComment: (comment: Comment) => void;
  onDeleteComment: (commentId: number) => void;
  onCancelEditComment: () => void;
  onBackToList: () => void;
};

// 게시글 상세와 댓글 영역입니다. 수정/삭제 가능 여부는 사용자 권한 기준으로 버튼만 노출합니다.
export default function PostDetail({
  post,
  user,
  commentContent,
  editingCommentId,
  editingCommentContent,
  onCommentContentChange,
  onSubmitComment,
  onEditPost,
  onDeletePost,
  onStartEditComment,
  onEditingCommentContentChange,
  onUpdateComment,
  onDeleteComment,
  onCancelEditComment,
  onBackToList,
}: PostDetailProps) {
  return (
    <article className={styles.detail}>
      <div className={styles.detailHeader}>
        <div>
          <h2>
            {post.category === "notice" && <span className={styles.noticeBadge}>NOTICE</span>}
            {post.is_secret && <span className={styles.secretBadge}>비밀</span>}
            {post.title}
          </h2>
          <p>
            {post.author.real_name} · {formatDate(post.created_at)}
          </p>
        </div>
        {canEditOwnedContent(user, post.author.id) && (
          <div className={styles.inlineActions}>
            <button onClick={() => onEditPost(post)}>수정</button>
            <button onClick={() => onDeletePost(post.id)}>삭제</button>
          </div>
        )}
      </div>
      <p className={styles.postBody}>{post.content}</p>

      <section className={styles.comments}>
        <h3>댓글 {post.comments.length}</h3>
        <form className={styles.commentForm} onSubmit={onSubmitComment}>
          <input
            value={commentContent}
            onChange={(event) => onCommentContentChange(event.target.value)}
            placeholder="댓글을 입력하세요"
            required
            disabled={!user}
          />
          <button disabled={!user}>등록</button>
        </form>

        <div className={styles.commentList}>
          {post.comments.map((comment) => (
            <div key={comment.id} className={styles.commentItem}>
              <div className={styles.commentMeta}>
                <strong>{comment.author.real_name}</strong>
                <span>{formatDate(comment.created_at)}</span>
              </div>
              {editingCommentId === comment.id ? (
                <div className={styles.commentEdit}>
                  <input value={editingCommentContent} onChange={(event) => onEditingCommentContentChange(event.target.value)} />
                  <button onClick={() => onUpdateComment(comment)}>저장</button>
                  <button onClick={onCancelEditComment}>취소</button>
                </div>
              ) : (
                <p>{comment.content}</p>
              )}
              {canEditOwnedContent(user, comment.author.id) && editingCommentId !== comment.id && (
                <div className={styles.inlineActions}>
                  <button onClick={() => onStartEditComment(comment)}>수정</button>
                  <button onClick={() => onDeleteComment(comment.id)}>삭제</button>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
      <div className={styles.detailFooter}>
        <button className={styles.secondaryButton} onClick={onBackToList}>
          목록
        </button>
      </div>
    </article>
  );
}
