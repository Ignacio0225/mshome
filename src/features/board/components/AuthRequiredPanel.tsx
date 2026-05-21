import { Link } from "react-router-dom";
import styles from "../Board.module.css";

type AuthRequiredPanelProps = {
  mode: "posts" | "direct";
};

// 로그인하지 않은 사용자가 게시판에 들어왔을 때 회원가입/로그인으로 유도하는 공통 패널입니다.
export default function AuthRequiredPanel({ mode }: AuthRequiredPanelProps) {
  return (
    <div className={styles.noticePanel}>
      {mode === "direct" ? (
        <>
          <strong>로그인 후 1:1 문의를 사용할 수 있습니다.</strong>
          <Link to="/auth?mode=login">로그인하기</Link>
        </>
      ) : (
        <>
          <strong>게시판은 회원 전용입니다.</strong>
          <p>공지사항과 QnA 게시글은 로그인 후 확인할 수 있습니다.</p>
          <Link to="/auth?mode=login">로그인 또는 회원가입</Link>
        </>
      )}
    </div>
  );
}
