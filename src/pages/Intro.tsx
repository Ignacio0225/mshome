import styles from "./Intro.module.css";

export default function Intro() {
    return (
        <div className={styles.container}>
            {/* 메인 헤더 */}
            <section className={styles.header}>
                <h1>회사 소개</h1>
                <p>명성해운(MSshipping)은 글로벌 해운 물류를 선도하는 기업입니다.</p>
            </section>

            {/* 회사 비전 */}
            <section className={styles.section}>
                <h2>Vision & Mission</h2>
                <p>
                    저희는 고객의 신뢰를 최우선으로 여기며,  
                    세계 각국을 연결하는 해상 물류 서비스를 제공합니다.
                </p>
            </section>

            {/* 사업 영역 */}
            <section className={styles.section}>
                <h2>Our Business</h2>
                <ul className={styles.list}>
                    <li>국제 해상 운송 (컨테이너 & RORO)</li>
                    <li>중동 및 아프리카 특화 물류 네트워크</li>
                    <li>수출입 통관 및 복합 운송 서비스</li>
                </ul>
            </section>

            {/* 회사 이미지 */}
            <section className={styles.imageSection}>
                <img 
                    src="/public/company.jpg"
                    alt="회사 전경" 
                    className={styles.image} 
                />
            </section>
        </div>
    );
}
