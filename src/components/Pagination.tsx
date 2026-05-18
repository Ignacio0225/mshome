import styles from './Pagination.module.css'

export type PageData<T> = {
    items: T[];
    total: number;
    page: number;
    size: number;
    total_pages: number;
}


type Props<T> = {
    currentPage: number;
    totalPages: number;
    onPageChange: (pageNum: number) => void;
    maxButtons?: number;
    data: PageData<T>
}

export default function Pagination<T>({
currentPage,
totalPages,
onPageChange,
maxButtons = 10,
}: Props<T>) {

    const getPageRange = () => {
        const half = Math.floor(maxButtons / 2);
        let start = Math.max(1, currentPage - half);
        let end = start + maxButtons - 1;

        if (end > totalPages) {
            end = totalPages;
            start = Math.max(1, end - maxButtons + 1);
        }

        const range = [];
        for (let i = start; i <= end; i++) {
            range.push(i);
        }
        return range;
    };

    return (
        <div className={styles.pagination}>
            <button
                className={styles.paginationBtn}
                onClick={() => onPageChange(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}  // 1페이지일 경우 비활성화
            >
                이전
            </button>
            {getPageRange().map((pageNum) => (
                <button
                    className={`${styles.paginationBtn} ${pageNum === currentPage ? styles.active : ''}`}
                    key={pageNum}
                    onClick={() => onPageChange(pageNum)}
                    disabled={pageNum === currentPage}
                >
                    {pageNum}
                </button>
            ))}
            <button
                className={styles.paginationBtn}
                onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage >= totalPages}
            >
                다음
            </button>
        </div>
    );
}
