// src/components/Photos.tsx
import {useEffect, useState, useCallback} from 'react';
import styles from './Photos.module.css';
import Pagination from "../components/Pagination.tsx";
import {photosMeta} from '../data/photosMeta';  // ✅ 메타 불러오기

// 에셋 자동 수집
const modules = import.meta.glob('../assets/**/*.{png,jpg,jpeg,webp,gif}', {
    eager: true,
    import: 'default',
}) as Record<string, string>;

// 타입
type Photo = {
    id: string;
    src: string;
    alt: string;     // 제목(표시용)
    desc?: string;   // 설명(선택)
};

// 파일 → Photo 변환 + 메타 병합
const photos: Photo[] = Object.entries(modules).map(([path, url]) => {
    const filename = path.split('/').pop() || 'image';
    const base = filename.replace(/\.[^.]+$/, '');    // 확장자 제거
    const human = base.replace(/[-_]/g, ' ');         // 사람 읽기 좋게
    const meta = photosMeta[base] ?? {};
    return {
        id: path,
        src: url,
        alt: meta.title ?? human,   // 메타 title 우선, 없으면 humanized 파일명
        desc: meta.desc,            // 설명은 있으면 표시
    };
});

export default function Photos() {
    const [open, setOpen] = useState(false);
    const [index, setIndex] = useState(0);

    const openModal = (i: number) => {
        setIndex(i);
        setOpen(true);
    };
    const closeModal = useCallback(() => setOpen(false), []);

    const prev = useCallback(() => {
        setIndex(i => (i - 1 + photos.length) % photos.length);
    }, []);
    const next = useCallback(() => {
        setIndex(i => (i + 1) % photos.length);
    }, []);

    // 페이지네이션 (클라이언트)
    const [currentPage, setCurrentPage] = useState(1);
    const size = 12;
    const totalPages = Math.ceil(photos.length / size);
    const start = (currentPage - 1) * size;
    const pageData = {
        items: photos.slice(start, start + size),
        total: photos.length,
        page: currentPage,
        size,
        total_pages: totalPages,
    };

    // 모달 열렸을 때: 키보드/스크롤 잠금
    useEffect(() => {
        if (!open) return;
        const onKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') closeModal();
            if (e.key === 'ArrowLeft') prev();
            if (e.key === 'ArrowRight') next();
        };
        const original = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        window.addEventListener('keydown', onKey);
        return () => {
            window.removeEventListener('keydown', onKey);
            document.body.style.overflow = original;
        };
    }, [open, closeModal, prev, next]);

    if (photos.length === 0) return <p className={styles.empty}>이미지가 없습니다.</p>;

    return (
        <>
            {/* 그리드(페이지네이션 적용) */}
            <ul className={styles.grid}>
                {pageData.items.map((p, i) => {
                    const absIndex = start + i;
                    return (
                        <li key={p.id} className={styles.item}>
                            <button
                                type="button"
                                className={styles.thumbBtn}
                                onClick={() => openModal(absIndex)}
                                aria-label={`${p.alt} 확대 보기`}
                            >
                                <img src={p.src} alt={p.alt} className={styles.img}/>
                            </button>
                        </li>
                    );
                })}
            </ul>

            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
                data={pageData}
            />

            {/* 라이트박스 */}
            {open && (
                <div
                    className={styles.overlay}
                    role="dialog"
                    aria-modal="true"
                    aria-label="이미지 미리보기"
                    onClick={closeModal}
                >
                    <div className={styles.dialog} onClick={(e) => e.stopPropagation()}>
                        <img
                            src={photos[index].src}
                            alt={photos[index].alt}
                            className={styles.largeImg}
                        />

                        <button
                            type="button"
                            className={styles.closeBtn}
                            onClick={closeModal}
                            aria-label="닫기"
                        >
                            ×
                        </button>

                        {photos.length > 1 && (
                            <>
                                <button
                                    type="button"
                                    className={`${styles.navBtn} ${styles.prev}`}
                                    onClick={prev}
                                    aria-label="이전 이미지"
                                >
                                    ‹
                                </button>
                                <button
                                    type="button"
                                    className={`${styles.navBtn} ${styles.next}`}
                                    onClick={next}
                                    aria-label="다음 이미지"
                                >
                                    ›
                                </button>
                            </>
                        )}

                        {/* ✅ 제목/설명/카운터 메타 영역 */}
                        <div className={styles.meta}>
                            <div className={styles.captionRow}>
                                <strong className={styles.title}>{photos[index].alt}</strong>
                                <span className={styles.counter}>
                  {index + 1} / {photos.length}
                </span>
                            </div>
                            {photos[index].desc && (
                                <p className={styles.desc}>{photos[index].desc}</p>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
