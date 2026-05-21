import { Link } from "react-router-dom";
import type { PageData, PostListItem, User } from "../../../api/client";
import Pagination from "../../../components/common/Pagination";
import SearchBar from "../../../components/common/SearchBar";
import { formatDate } from "../../../utils/format";
import styles from "../Board.module.css";

type PostTableProps = {
  board: "notice" | "qna";
  isLoading: boolean;
  pageData: PageData<PostListItem>;
  keyword: string;
  user: User | null;
  onOpenPost: (postId: number) => void;
  onPageChange: (page: number) => void;
  onSearch: (keyword: string) => void;
  onWrite: () => void;
};

// 공지사항과 QnA가 함께 쓰는 목록 테이블입니다. 데이터는 Board 페이지가 API에서 받아 전달합니다.
export default function PostTable({
  board,
  isLoading,
  pageData,
  keyword,
  user,
  onOpenPost,
  onPageChange,
  onSearch,
  onWrite,
}: PostTableProps) {
  return (
    <div className={styles.boardShell}>
      <table className={styles.boardTable}>
        <thead>
          <tr>
            <th className={styles.noCol}>No</th>
            <th>제목</th>
            <th className={styles.authorCol}>글쓴이</th>
            <th className={styles.dateCol}>작성시간</th>
          </tr>
        </thead>
        <tbody>
          {isLoading && (
            <tr>
              <td colSpan={4} className={styles.emptyCell}>
                게시글을 불러오는 중입니다.
              </td>
            </tr>
          )}
          {!isLoading && pageData.items.length === 0 && (
            <tr>
              <td colSpan={4} className={styles.emptyCell}>
                {board === "notice" ? "등록된 공지사항이 없습니다." : "게시글이 없습니다."}
              </td>
            </tr>
          )}
          {pageData.items.map((post, index) => {
            const rowNo = pageData.total - (pageData.page - 1) * pageData.size - index;
            return (
              <tr key={post.id}>
                <td className={styles.noCol}>{rowNo}</td>
                <td>
                  <button className={styles.titleButton} onClick={() => onOpenPost(post.id)}>
                    {post.is_secret && <strong className={styles.secretBadge}>비밀</strong>}
                    <span>{post.title}</span>
                    {post.comment_count > 0 && <em>{post.comment_count}</em>}
                  </button>
                </td>
                <td className={styles.authorCol}>{post.author.real_name}</td>
                <td className={styles.dateCol}>{formatDate(post.created_at)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <Pagination currentPage={pageData.page} totalPages={pageData.total_pages} onPageChange={onPageChange} />

      <div className={styles.boardTools}>
        <SearchBar value={keyword} onSearch={onSearch} placeholder="제목, 내용, 작성자 검색" />
        {board === "qna" && user ? (
          <button className={styles.writeButton} onClick={onWrite}>
            글쓰기
          </button>
        ) : board === "qna" ? (
          <Link className={styles.writeButton} to="/auth?mode=login">
            글쓰기
          </Link>
        ) : null}
      </div>
    </div>
  );
}
