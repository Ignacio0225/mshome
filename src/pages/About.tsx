// src/pages/About.tsx
import styles from "./About.module.css";
import type {ReactNode} from "react";

type Milestone = {
    year: string;
    title: string;
    desc?: ReactNode;
};

const history: Milestone[] = [
    {year: "2005", title: "법인 설립", desc: <> KIFFA(한국 국제 물류 협회) 등록 및 영업 <br/> 해상운송화물주선업 등록 (건설교통부) 인가 <br/> 요르단 암만지사 설립 </> },
    {year: "2006", title: "해외 파트너 계약 1", desc: <>요르단 파트너 계약 <br/> 리비아 파트너 계약 <br/> 수단 파트너 계약 <br/> 이집트 파트너 계약 </>},
    {year: "2007", title: "해외 파트너 계약 2", desc: <>터키 파트너 계약 <br/> 두바이 파트너 계약 </>},
    {year: "2014", title: "본사 확장 이전"},
    {year: "2014", title: "SWISS SHIPPING LINE 한국 대리점 계약"},
    {year: "2014", title: "해외 파트너 계약 3", desc:"미얀마 파트너 계약"},
    {year: "2017", title: "무역 수출 사업팀 신설", desc: "중고차 수출 시작"},
    {year: "2017", title: "해외 파트너 계약 4", desc: "우크라이나 파트너 계약"},
    {year: "2017", title: "국내 파트너 계약", desc:<>오토위니 플렛폼 독점 계약 <br/> 롯데렌탈 중고차 독점 계약 <br/> 일본 SBT 한국지사 파트너 계약 <br/> 글로비스 오토비즈 수출 계약</>},
];

export default function About() {
    return (
        <section className={styles.wrap} aria-labelledby="about-heading">
            <header className={styles.header}>
                <h1 className={styles['main-header']} id="about-heading">회사 연혁</h1>
                <p className={styles.subtitle}>
                    고객과 함께 성장해 온 명성해운의 발자취입니다.
                </p>
            </header>

            {/* 타임라인 */}
            <ol className={styles.timeline}>
                {history.map((m,i) => (
                    <li key={`${m.year}-${i}`} className={styles.item}>
                        <div className={styles.badge}>{m.year}</div>
                        <div className={styles.content}>
                            <h3 className={styles.title}>{m.title}</h3>
                            {m.desc && <p className={styles.desc}>{m.desc}</p>}
                        </div>
                    </li>
                ))}
            </ol>
        </section>
    );
}
