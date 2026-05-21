import styles from "../Admin.module.css";
import type { AdminSection } from "../types";

type AdminTabsProps = {
  activeSection: AdminSection;
  isSuperAdmin: boolean;
  onChange: (section: AdminSection) => void;
};

// 관리자 페이지의 섹션 전환 탭입니다. 공지 업로드는 슈퍼관리자에게만 노출됩니다.
export default function AdminTabs({ activeSection, isSuperAdmin, onChange }: AdminTabsProps) {
  return (
    <nav className={styles.tabs} aria-label="관리자 메뉴">
      <button className={activeSection === "members" ? styles.activeTab : ""} onClick={() => onChange("members")}>
        회원정보
      </button>
      <button className={activeSection === "roles" ? styles.activeTab : ""} onClick={() => onChange("roles")}>
        권한관리
      </button>
      <button className={activeSection === "direct" ? styles.activeTab : ""} onClick={() => onChange("direct")}>
        1:1 문의
      </button>
      {isSuperAdmin && (
        <button className={activeSection === "notices" ? styles.activeTab : ""} onClick={() => onChange("notices")}>
          공지사항 업로드
        </button>
      )}
    </nav>
  );
}
