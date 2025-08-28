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
            {/*<h1 className={styles.title}>Sales</h1>*/}

            {/*<div className={styles.contacts}>*/}
            {/*    {salesContacts.map((c) => (*/}
            {/*        <div key={c.phone} className={styles.card}>*/}
            {/*            <h2>{c.name}</h2>*/}
            {/*            <p>{c.role}</p>*/}
            {/*            <p>☎ {c.phone}</p>*/}
            {/*        </div>*/}
            {/*    ))}*/}
            {/*</div>*/}
            {/*<h1 className={styles.title}>Operator</h1>*/}

            {/*<div className={styles.contacts}>*/}
            {/*    {operatorContacts.map((c) => (*/}
            {/*        <div key={c.phone} className={styles.card}>*/}
            {/*            <h2>{c.name}</h2>*/}
            {/*            <p>{c.role}</p>*/}
            {/*            <h3 className={styles.assignedPort}>{c.assignedPort}</h3>*/}
            {/*            {c.phone && <p>☎ {c.phone}</p>}*/}
            {/*            {c.fax && <p>📠 {c.fax}</p>}*/}
            {/*            {c.email && <h3>📧 {c.email}</h3> }*/}
            {/*        </div>*/}
            {/*    ))}*/}
            {/*</div>*/}

            <div className={styles.address}>
                <h2>☎ 032-891-7003</h2>
                <h2>📠 032-891-8003</h2>
                <a className={styles.email} href="mailto:mssp@msshipping.kr">📧 mssp@msshipping.kr</a>

                <h2>Address</h2>
                <p>인천광역시 연수구 능허대로 136 KT송도빌딩 별관 1층 명성해운</p>
                <p>1F, 136, Neungheodae-ro, Yeonsu-gu, Incheon, Republic of Korea (KT Songdo Annexed B/D) 〶 21960</p>
                {/* 지도 연동 */}
                <iframe
                    title="map"
                    src="https://maps.google.com/maps?q=인천광역시 연수구 능허대로 136&output=embed"
                    width="100%"
                    height="300"
                    style={{border: 0}}
                />
            </div>
        </div>
    );
}
