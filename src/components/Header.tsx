// src/components/Headers.tsx
import styles from './Header.module.css';
import {Link, useNavigate} from "react-router-dom";
import {clearAuth} from "../api/client";
import {useCurrentUser} from "../hooks/useCurrentUser";

const logoSrc = `${import.meta.env.BASE_URL}MsLogo.png`;

export default function Header() {
    const nav = useNavigate();
    const {user} = useCurrentUser();

    const getCurrentPage = () => {
        const path = `${location.pathname}${location.hash}`.toLowerCase();
        if (path.includes('/intro')) return 'intro';
        if (path.includes('/contact')) return 'contact';
        if (path.includes('/photos')) return 'photos';
        if (path.includes('/about')) return 'about';
        if (path.includes('/vision')) return 'vision';
        if (path.includes('/board')) return 'board';
        if (path.includes('/admin')) return 'admin';
        if (path.includes('/member')) return 'member';
        if (path.includes('/auth')) return 'auth';
        return '';
    };
    const currentPage = getCurrentPage();
    const userName = user?.real_name ?? "";
    const canUseAdmin = user?.role === "admin" || user?.role === "super_admin";

return (

        <header className={styles.header}>
            <div className={styles.logoArea}>
                <Link to="/" aria-label="(주)명성해운 홈으로 이동">
                    <img src={logoSrc} alt="(주)명성해운 로고" className={styles.logo}/>
                </Link>
            </div>

            <div className={styles.menuArea}>
                    <div className={styles.loggedIn}>
                        <nav className={styles.navButtons} aria-label="주요 메뉴">
                            <button

                                onClick={() => nav('/intro')}
                                className={`${styles.navBtn} ${currentPage === 'intro' ? styles.active : ''}`}
                            >
                                회사 소개
                            </button>
                            <button

                                onClick={() => nav('/about')}
                                className={`${styles.navBtn} ${currentPage === 'about' ? styles.active : ''}`}
                            >
                                사업분야
                            </button>

                            <button
                            onClick={() => nav('/vision')}
                            className={`${styles.navBtn} ${currentPage === 'vision' ? styles.active : ''}`}>
                                비전
                            </button>


                            <button

                                onClick={() => nav('/contact')}
                                className={`${styles.navBtn} ${currentPage === 'contact' ? styles.active : ''}`}
                            >
                                Contact Us
                            </button>

                            <button
                            onClick={() => nav('/photos')}
                            className={`${styles.navBtn} ${currentPage === 'photos' ? styles.active : ''}`}>
                                현장 사진
                            </button>

                            <button
                            onClick={() => nav('/board')}
                            className={`${styles.navBtn} ${currentPage === 'board' ? styles.active : ''}`}>
                                게시판
                            </button>

                            {userName ? (
                                <>
                                    {canUseAdmin && (
                                        <button
                                            onClick={() => nav('/admin')}
                                            className={`${styles.login} ${currentPage === 'admin' ? styles.activeAuth : ''}`}
                                        >
                                            관리자
                                        </button>
                                    )}
                                    <button
                                        onClick={() => nav('/member')}
                                        className={`${styles.login} ${currentPage === 'member' ? styles.activeAuth : ''}`}
                                        title={`${userName} 회원정보`}
                                    >
                                        회원정보
                                    </button>
                                    <button
                                        onClick={() => {
                                            clearAuth();
                                            nav('/auth');
                                        }}
                                        className={styles.logout}
                                        title={`${userName} 로그아웃`}
                                    >
                                        로그아웃
                                    </button>
                                </>
                            ) : (
                                <button
                                    onClick={() => nav('/auth?mode=login')}
                                    className={`${styles.login} ${currentPage === 'auth' ? styles.activeAuth : ''}`}
                                >
                                    로그인
                                </button>
                            )}
                    </nav>
            </div>
            </div>
        </header>
    )
}
