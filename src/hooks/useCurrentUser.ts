import { useEffect, useState } from "react";
import { api, getStoredUser, getToken, type User } from "../api/client";

// localStorage, 로그인 이벤트, /auth/me API를 묶어 현재 로그인 사용자를 동기화합니다.
export function useCurrentUser() {
  const [user, setUser] = useState<User | null>(() => getStoredUser());

  useEffect(() => {
    const syncUser = () => setUser(getStoredUser());
    window.addEventListener("mshome-auth-change", syncUser);
    window.addEventListener("storage", syncUser);

    if (getToken()) {
      api.me().then(setUser).catch(() => {
        if (!getToken()) setUser(null);
      });
    } else {
      setUser(null);
    }

    return () => {
      window.removeEventListener("mshome-auth-change", syncUser);
      window.removeEventListener("storage", syncUser);
    };
  }, []);

  return { user, setUser };
}
