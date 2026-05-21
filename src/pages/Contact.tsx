// src/pages/Contact.tsx
import styles from "./Contact.module.css";

// const salesContacts = [
//     {name: "지창훈", role: "이사", phone: "+82 10-9142-9633"},
//     {name: "유선혁", role: "차장", phone: "+82 10-4112-2397"},
//     {name: '고건호', role: '대리', phone: "+82 10-4158-7975"},
//     {name: '김용희', role: '사원', phone: "+82 10-2443-2039"},
// ];
//
// const operatorContacts = [
//     {name: "남미정", role: "부장", assignedPort: '회계'},
//     {name: "김미림", role: "차장", assignedPort: '사우디,아프리카,유럽,러시아'},
//     {name: '정가영', role: '대리', assignedPort: '두바이,아카바,중앙아시아'},
//     {name: '이지현', role: '대리', assignedPort: '두바이,터키'},
//     {name: '사무실', phone: "032-891-7003", fax: '032-891-8003', email: 'mssp@msshipping.kr'},
// ];

export default function Contact() {
    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <p className={styles.eyebrow}>CONTACT US</p>
                <h1>문의 및 오시는 길</h1>
                <p>운송 문의, 스케줄 확인, 파트너십 상담은 대표 연락처로 문의해 주세요.</p>
            </header>
            <div className={styles.address}>
                <div className={styles.contactGrid}>
                    <a href="tel:+82328917003" className={styles.contactItem}>
                        <span>전화</span>
                        <strong>032-891-7003</strong>
                    </a>
                    <div className={styles.contactItem}>
                        <span>팩스</span>
                        <strong>032-891-8003</strong>
                    </div>
                    <a className={styles.contactItem} href="mailto:mssp@msshipping.kr">
                        <span>이메일</span>
                        <strong>mssp@msshipping.kr</strong>
                    </a>
                </div>

                <h2>Address</h2>
                <p>인천광역시 연수구 능허대로 136 KT송도빌딩 별관 1층 (주)명성해운</p>
                <p>1F, 136, Neungheodae-ro, Yeonsu-gu, Incheon, Republic of Korea (KT Songdo Annexed B/D) 〶 21960</p>
                <div className={styles.mapPanel}>
                    <iframe
                            title="회사 위치"
                            className={styles.map}
                            src="https://maps.google.com/maps?q=인천광역시 연수구 능허대로 136&output=embed"
                            loading="lazy"
                        />
                    <a
                        href="https://maps.google.com/?q=인천광역시 연수구 능허대로 136"
                        target="_blank"
                        rel="noreferrer"
                    >
                        Google 지도에서 보기
                    </a>
                </div>
            </div>
        </div>
    );
}
