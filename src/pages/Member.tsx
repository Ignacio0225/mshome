import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api, getStoredUser, type User } from "../api/client";
import styles from "./Member.module.css";

function roleLabel(role: User["role"]) {
  if (role === "super_admin") return "슈퍼 관리자";
  if (role === "admin") return "관리자";
  return "일반 사용자";
}

export default function Member() {
  const [user, setUser] = useState<User | null>(() => getStoredUser());
  const [error, setError] = useState("");

  useEffect(() => {
    api
      .me()
      .then(setUser)
      .catch(() => setError("로그인이 필요합니다."));
  }, []);

  return (
    <section className={styles.page}>
      <header className={styles.hero}>
        <p>MEMBER</p>
        <h1>회원정보</h1>
      </header>

      {error && (
        <div className={styles.panel}>
          <p className={styles.error}>{error}</p>
          <Link className={styles.button} to="/auth?mode=login">
            로그인
          </Link>
        </div>
      )}

      {user && (
        <div className={styles.panel}>
          <dl className={styles.infoList}>
            <div>
              <dt>실명</dt>
              <dd>{user.real_name}</dd>
            </div>
            <div>
              <dt>이메일</dt>
              <dd>{user.email}</dd>
            </div>
            <div>
              <dt>전화번호</dt>
              <dd>{user.phone || "-"}</dd>
            </div>
            <div>
              <dt>업체명</dt>
              <dd>{user.company_name || "-"}</dd>
            </div>
            <div>
              <dt>권한</dt>
              <dd>{roleLabel(user.role)}</dd>
            </div>
            <div>
              <dt>이메일 인증</dt>
              <dd>{user.is_email_verified ? "완료" : "미완료"}</dd>
            </div>
            <div>
              <dt>실명 확인</dt>
              <dd>{user.is_real_name_verified ? "완료" : "미완료"}</dd>
            </div>
          </dl>
        </div>
      )}
    </section>
  );
}
