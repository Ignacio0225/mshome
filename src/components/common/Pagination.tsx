import styles from "./Pagination.module.css";

type Props = {
  currentPage: number;
  totalPages: number;
  onPageChange: (pageNum: number) => void;
  maxButtons?: number;
};

export default function Pagination({ currentPage, totalPages, onPageChange, maxButtons = 10 }: Props) {
  const safeTotalPages = Math.max(1, totalPages);
  const half = Math.floor(maxButtons / 2);
  let start = Math.max(1, currentPage - half);
  let end = start + maxButtons - 1;

  if (end > safeTotalPages) {
    end = safeTotalPages;
    start = Math.max(1, end - maxButtons + 1);
  }

  const pages = Array.from({ length: end - start + 1 }, (_, index) => start + index);

  return (
    <nav className={styles.pagination} aria-label="페이지 이동">
      <button onClick={() => onPageChange(1)} disabled={currentPage <= 1} aria-label="첫 페이지">
        «
      </button>
      <button onClick={() => onPageChange(Math.max(1, currentPage - 1))} disabled={currentPage <= 1}>
        이전
      </button>
      {pages.map((pageNum) => (
        <button
          className={pageNum === currentPage ? styles.active : ""}
          key={pageNum}
          onClick={() => onPageChange(pageNum)}
          disabled={pageNum === currentPage}
        >
          {pageNum}
        </button>
      ))}
      <button
        onClick={() => onPageChange(Math.min(safeTotalPages, currentPage + 1))}
        disabled={currentPage >= safeTotalPages}
      >
        다음
      </button>
      <button onClick={() => onPageChange(safeTotalPages)} disabled={currentPage >= safeTotalPages} aria-label="마지막 페이지">
        »
      </button>
    </nav>
  );
}
