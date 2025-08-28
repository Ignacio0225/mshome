// src/components/Headers.tsx
import styles from './Header.module.css';
import {Link, useNavigate} from "react-router-dom";


// 1. Header 라는 이름의 함수형 컴포넌트를 생성
export default function Header() {
    const nav = useNavigate();

    const getCurrentPage = () => {
        const path = location.pathname;
        if (path.includes('/intro')) return 'intro';
        if (path.includes('/contact')) return 'contact';
        if (path.includes('/photos')) return 'photos';
        if (path.includes('/about')) return 'about';
        if (path.includes('/vision')) return 'vision';
        return '';
    };
    const currentPage = getCurrentPage();

return (

        // 3. <header> 태그는 시멘틱 웹에서 '페이지의 헤더'임을 나타냄
        <header className={styles.header}>
            <div className={styles.logoArea}>
                <Link to="/">
                    <img src="/MsLogo.png" alt="명성해운 로고" className={styles.logo}/>
                </Link>
            </div>

            <div className={styles.menuArea}>
                    <div className={styles.loggedIn}>
                        <div className={styles.navButtons}>
                            <button

                                onClick={() => nav('/intro')}
                                // currentPage 는 /페이지이름 에 따라 active css 적용을 위함
                                className={`${styles.navBtn} ${currentPage === 'intro' ? styles.active : ''}`}
                            >
                                회사 소개
                            </button>
                            <button

                                onClick={() => nav('/about')}
                                // currentPage 는 /페이지이름 에 따라 active css 적용을 위함
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
                                // currentPage 는 /페이지이름 에 따라 active css 적용을 위함
                                className={`${styles.navBtn} ${currentPage === 'contact' ? styles.active : ''}`}
                            >
                                Contact Us
                            </button>

                            <button
                            onClick={() => nav('/photos')}
                            className={`${styles.navBtn} ${currentPage === 'photos' ? styles.active : ''}`}>
                                현장 사진
                            </button>
                    </div>
            </div>
            </div>
        </header>
    )




}