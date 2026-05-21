import styles from "../Board.module.css";
import type { BoardSection } from "../types";

type BoardTabsProps = {
  activeBoard: BoardSection;
  onChange: (section: BoardSection) => void;
};

// 게시판 상단 탭입니다. 각 탭은 Board 페이지의 데이터 로딩 기준과 연결됩니다.
export default function BoardTabs({ activeBoard, onChange }: BoardTabsProps) {
  return (
    <nav className={styles.boardTabs} aria-label="게시판 메뉴">
      <button className={activeBoard === "notice" ? styles.activeTab : ""} onClick={() => onChange("notice")}>
        NOTICE
      </button>
      <button className={activeBoard === "qna" ? styles.activeTab : ""} onClick={() => onChange("qna")}>
        QnA
      </button>
      <button className={activeBoard === "direct" ? styles.activeTab : ""} onClick={() => onChange("direct")}>
        1:1 문의
      </button>
    </nav>
  );
}
