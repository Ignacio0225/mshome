// src/components/Headers.tsx
import styles from './Header.module.css';
import {Link, useNavigate} from "react-router-dom";

export default function Header() {
    const nav = useNavigate();

    const getCurrentPage = () => {
        const path = location.pathname.toLowerCase();
        if (path.includes('/intro')) return 'intro';
        if (path.includes('/contact')) return 'contact';
        if (path.includes('/photos')) return 'photos';
        if (path.includes('/about')) return 'about';
        if (path.includes('/vision')) return 'vision';
        return '';
    };
    const currentPage = getCurrentPage();

return (

        <header className={styles.header}>
            <div className={styles.logoArea}>
                <Link to="/" aria-label="명성해운 홈으로 이동">
                    <img src="/MsLogo.png" alt="명성해운 로고" className={styles.logo}/>
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
                    </nav>
            </div>
            </div>
        </header>
    )
}
