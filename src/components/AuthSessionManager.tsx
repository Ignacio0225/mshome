import { useEffect, useState } from "react";
import { clearAuth, extendAuthSession, getAuthSessionState, getToken } from "../api/client";
import styles from "./AuthSessionManager.module.css";

function formatRemaining(ms: number) {
  const totalSeconds = Math.max(0, Math.ceil(ms / 1000));
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${String(seconds).padStart(2, "0")}`;
}

export default function AuthSessionManager() {
  const [graceRemainingMs, setGraceRemainingMs] = useState(0);

  useEffect(() => {
    const tick = () => {
      if (!getToken()) {
        setGraceRemainingMs(0);
        return;
      }

      const state = getAuthSessionState();
      if (state.phase === "expired") {
        clearAuth();
        setGraceRemainingMs(0);
        return;
      }
      setGraceRemainingMs(state.phase === "grace" ? state.graceRemainingMs : 0);
    };

    tick();
    const timer = window.setInterval(tick, 1000);
    window.addEventListener("mshome-auth-change", tick);
    window.addEventListener("storage", tick);
    return () => {
      window.clearInterval(timer);
      window.removeEventListener("mshome-auth-change", tick);
      window.removeEventListener("storage", tick);
    };
  }, []);

  if (!graceRemainingMs) return null;

  return (
    <div className={styles.overlay} role="dialog" aria-modal="true" aria-label="로그인 세션 연장">
      <section className={styles.modal}>
        <h2>로그인 시간이 만료되었습니다.</h2>
        <p>{formatRemaining(graceRemainingMs)} 안에 연장하지 않으면 자동으로 로그아웃됩니다.</p>
        <div className={styles.actions}>
          <button
            className={styles.secondary}
            onClick={() => {
              clearAuth();
              setGraceRemainingMs(0);
            }}
          >
            로그아웃
          </button>
          <button
            className={styles.primary}
            onClick={() => {
              extendAuthSession();
              setGraceRemainingMs(0);
            }}
          >
            30분 연장
          </button>
        </div>
      </section>
    </div>
  );
}
