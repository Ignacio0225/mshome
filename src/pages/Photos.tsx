// src/components/Photos.tsx

// React 훅 불러오기: 상태관리(useState), 생명주기/부작용 처리(useEffect), 콜백 메모이제이션(useCallback)
import {useEffect, useState, useCallback} from 'react';

// CSS 모듈 불러오기: 파일 단위로 클래스명이 해시되어 충돌 없이 사용 가능
import styles from './Photos.module.css';
import Pagination from "../components/Pagination.tsx";

// -------------------------------------------------------------
// [에셋 자동 수집] Vite 전용 API인 import.meta.glob 사용
// - '../assets/**/*.{png,jpg,jpeg,webp,gif}': assets 폴더 하위 모든 이미지 매칭
// - eager: true  → 빌드 시점에 즉시(동기) 가져옴(런타임 동적 import 아님)
// - import: 'default' → 각 파일의 default export(URL 문자열)만 추출
// - as Record<string, string> → TS에게 { 파일경로: URL } 형태라고 알려줌
// -------------------------------------------------------------
const modules = import.meta.glob('../assets/**/*.{png,jpg,jpeg,webp,gif}', {
    eager: true,
    import: 'default',
}) as Record<string, string>;

// 한 장의 사진 항목이 갖는 타입 정의(목록 렌더링 및 라이트박스에서 사용)
type Photo = {
    id: string; // 고유 식별자(여기서는 파일 경로 사용)
    src: string; // 실제 이미지 URL(번들된 자산 경로)
    alt: string; // 접근성/캡션용 대체 텍스트
};

// modules 객체를 [경로, URL] 튜플들의 배열로 변환 후, 화면에 쓰기 좋은 Photo 배열로 매핑
const photos: Photo[] = Object.entries(modules).map(([path, url]) => {
    // 파일명 추출(경로의 마지막 세그먼트)
    const filename = path.split('/').pop() || 'image';
    // 확장자 제거 + 하이픈/언더스코어를 공백으로 치환하여 alt 텍스트로 사용
    const alt = filename.replace(/\.[^.]+$/, '').replace(/[-_]/g, ' ');
    // id는 경로 그대로, src는 URL, alt는 위에서 만든 텍스트
    return {id: path, src: url, alt};
});

// 기본 내보내기 컴포넌트: 썸네일 그리드 + 라이트박스(모달) UI
export default function Photos() {

    // 모달 열림/닫힘 상태
    const [open, setOpen] = useState(false);
    // 현재 라이트박스에서 보고 있는 사진의 인덱스
    const [index, setIndex] = useState(0);

    // 썸네일 클릭 시 모달 열고 해당 인덱스로 설정
    const openModal = (i: number) => {
        setIndex(i);
        setOpen(true);
    };

    // 모달 닫기 콜백(컴포넌트 재렌더 사이에서도 동일 참조 보장을 위해 useCallback 사용)
    const closeModal = useCallback(() => {
        setOpen(false);
    }, []);

    // 이전 이미지로 이동(순환: 첫 장에서 이전 → 마지막 장)
    const prev = useCallback(() => {
        setIndex((i) => (i - 1 + photos.length) % photos.length);
    }, []);

    // 다음 이미지로 이동(순환: 마지막 장에서 다음 → 첫 장)
    const next = useCallback(() => {
        setIndex((i) => (i + 1) % photos.length);
    }, []);


    //정적인 데이터 페이지네이션 방법 (기존에 있던 백엔드 연동 페이지네이션 tsx를 만들고 나서 사용)
    // 페이지네이션 (클라이언트 슬라이스)
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

    // 모달이 열렸을 때만: 키보드 이벤트(ESC/←/→) 바인딩 + 바디 스크롤 잠금
    useEffect(() => {
        // 모달이 닫혀 있으면 아무 것도 하지 않음
        if (!open) return;

        // 키다운 핸들러: ESC로 닫기, 좌우 화살표로 탐색
        const onKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') closeModal();
            if (e.key === 'ArrowLeft') prev();
            if (e.key === 'ArrowRight') next();
        };

        // 현재 body 스크롤 상태 백업 후, 모달 열리는 동안 스크롤 잠금
        const original = document.body.style.overflow;
        document.body.style.overflow = 'hidden';

        // 전역 키 이벤트 리스너 등록
        window.addEventListener('keydown', onKey);

        // 클린업: 모달 닫힐 때 리스너 제거 및 스크롤 복구
        return () => {
            window.removeEventListener('keydown', onKey);
            document.body.style.overflow = original;
        };
        // 의존성: 모달 열림 상태, 콜백 함수들(참조가 바뀌면 효과 재실행)
    }, [open, closeModal, prev, next]);

    // 수집된 이미지가 하나도 없을 때의 빈 화면 처리
    if (photos.length === 0) {
        return <p className={styles.empty}>이미지가 없습니다.</p>;
    }

    // 실제 렌더링 부분: 썸네일 그리드 + 조건부 모달
    return (
        <>
            {/* ✅ 페이지네이션된 그리드만 렌더 */}
            <ul className={styles.grid}>
                {pageData.items.map((p, i) => {
                    const absIndex = start + i;            // ✔ 절대 인덱스(모달용)
                    return (
                        <li key={p.id} className={styles.item}>
                            <button
                                type="button"
                                className={styles.thumbBtn}
                                onClick={() => openModal(absIndex)}     // ✔ 전체 배열 기준으로 모달
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
                onPageChange={(p) => {
                    setCurrentPage(p); /* window.scrollTo({top:0,behavior:'smooth'}); */
                }}
                data={pageData}
            />


            {/* 라이트박스 모달: open 상태일 때만 렌더링(포털 없이 오버레이 레이어로 구현) */}
            {open && (
                // 전체 화면을 덮는 반투명 오버레이
                <div
                    className={styles.overlay}
                    role="dialog"            // 접근성: 대화상자 역할
                    aria-modal="true"        // 접근성: 모달임을 명시
                    aria-label="이미지 미리보기" // 접근성: 모달 이름
                    onClick={closeModal}     // 오버레이 빈 곳 클릭 시 닫기
                >
                    {/* 모달 본문 컨테이너: 내부 클릭은 이벤트 전파를 막아 닫히지 않게 함 */}
                    <div
                        className={styles.dialog}
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* 크게 보여줄 현재 선택 이미지 */}
                        <img
                            src={photos[index].src}
                            alt={photos[index].alt}
                            className={styles.largeImg}
                        />

                        {/* 닫기 버튼(우상단) */}
                        <button
                            type="button"
                            className={styles.closeBtn}
                            onClick={closeModal}
                            aria-label="닫기"
                        >
                            ×
                        </button>

                        {/* 이전/다음 내비게이션(사진이 2장 이상일 때만 노출) */}
                        {photos.length > 1 && (
                            <>
                                <button
                                    type="button"
                                    className={`${styles.navBtn} ${styles.prev}`} // 좌측 화살표 스타일
                                    onClick={prev}
                                    aria-label="이전 이미지"
                                >
                                    ‹
                                </button>
                                <button
                                    type="button"
                                    className={`${styles.navBtn} ${styles.next}`} // 우측 화살표 스타일
                                    onClick={next}
                                    aria-label="다음 이미지"
                                >
                                    ›
                                </button>
                            </>
                        )}

                        {/* 캡션 + 현재/전체 카운터 표기 */}
                        <div className={styles.caption}>
                            {photos[index].alt}
                            <span className={styles.counter}>
                {index + 1} / {photos.length}
                </span>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
