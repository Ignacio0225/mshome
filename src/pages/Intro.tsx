// src/pages/Intro.tsx
import {useEffect, useState, type ReactNode} from "react";
import styles from "./Intro.module.css";

type Milestone = {
    year: string;
    title: string;
    desc?: ReactNode;
};

const history: Milestone[] = [
    {
        year: "2005",
        title: "법인 설립",
        desc: (
            <>
                KIFFA(한국 국제 물류 협회) 등록 및 영업 <br/>
                해상운송화물주선업 등록 (건설교통부) 인가 <br/>
                요르단 암만지사 설립
            </>
        ),
    },
    {
        year: "2006",
        title: "해외 파트너 계약 1",
        desc: (
            <>
                요르단 파트너 계약 <br/>
                리비아 파트너 계약 <br/>
                수단 파트너 계약 <br/>
                이집트 파트너 계약
            </>
        ),
    },
    {year: "2007", title: "해외 파트너 계약 2", desc: <>터키 파트너 계약 <br/> 두바이 파트너 계약</>},
    {year: "2014", title: "본사 확장 이전"},
    {year: "2014", title: "해외 파트너 계약 3", desc: "미얀마 파트너 계약"},
    {year: "2017", title: "무역 수출 사업팀 신설", desc: "요르단, 사우디, 두바이, 미얀마 직수출 진행"},
    {year: "2017", title: "해외 파트너 계약 4", desc: "우크라이나 파트너 계약"},
    {
        year: "2017",
        title: "국내 파트너 계약",
        desc: (
            <>
                오토위니 플렛폼 독점 계약 <br/>
                롯데렌탈 중고차 독점 계약 <br/>
                일본 SBT 한국지사 파트너 계약 <br/>
                글로비스 오토비즈 수출 계약
            </>
        ),
    },
];

// 좌측 목차 항목
const toc = [
    {id: "greeting", no: 1, title: "인사말"},
    {id: "history", no: 2, title: "회사 연혁"},
    {id: "org", no: 3, title: "조직도"},
    {id: "map", no: 4, title: "오시는 길"},
] as const;

export default function Intro() {
    const [active, setActive] = useState<string>(toc[0].id);

    // 스크롤 스파이
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                const visible = entries
                    .filter((e) => e.isIntersecting)
                    .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
                const id = visible?.target?.id;
                if (id) setActive(id);
            },
            {rootMargin: "-20% 0px -60% 0px", threshold: [0, 0.25, 0.5, 0.75, 1]}
        );
        toc.forEach(({id}) => {
            const el = document.getElementById(id);
            if (el) observer.observe(el);
        });
        return () => observer.disconnect();
    }, []);

    return (
        <div className={styles.container}>
            <div className={styles.layout}>
                {/* 왼쪽 TOC */}
                <nav className={styles.toc} aria-label="Intro sections">
                    <ol className={styles.tocList}>
                        {toc.map(({id, no, title}) => (
                            <li key={id}>
                                <a
                                    href={`#${id}`}
                                    className={`${styles.tocLink} ${active === id ? styles.active : ""}`}
                                >
                                    <span className={styles.tocBadge}>{no}</span>
                                    <div className={styles.tocText}>
                                        <strong>{title}</strong>
                                    </div>
                                </a>
                            </li>
                        ))}
                    </ol>
                </nav>

                {/* 오른쪽 본문 */}
                <div className={styles.content}>
                    {/* 인사말 */}
                    <section id="greeting" className={styles.section}>
                        <header className={styles.section}>
                            <h2>인사말</h2>
                            <p className={styles.greeting}>
                                "세계를 잇는 해상 물류의 파트너, 명성해운"
                                <br/>
                                안녕하십니까.
                                <br/>
                                명성해운 홈페이지를 방문해 주신 여러분께 진심으로 감사드립니다.
                                <br/>
                                우리 명성해운은 2004년 설립 이래 중고자동차 수출방식인 Ro-Ro(롤온/롤오프)
                                해상 운송과 CONTAINER 운송을 중심으로, 중동, 아프리카, 남미, 중앙 아시아 등 전 세계 주요
                                시장과 함께 성장해 왔습니다.
                                <br/>
                                20년 이상의 해운 경험과 전문성을 바탕으로, 우리는 고객의 신뢰를 최우선 가치로 삼고 안전하고 신속한
                                해상 운송 서비스를 제공하고 있습니다.
                                <br/>
                                명성해운은 끊임없는 혁신과 글로벌 네트워크를 통해 최적의 선박 운항 스케줄, 합리적인 운임 체계,
                                신속하고 투명한 통관 및 물류 관리를 구현하며 고객 만족을 실현해 왔습니다.
                                <br/>
                                앞으로도 명성해운은 “고객의 성공이 곧 우리의 성공”이라는 경영 철학을 바탕으로,
                                세계와 고객을 연결하는 신뢰받는 해상 물류 파트너로서 최선을 다하겠습니다.
                                <br/>
                                여러분의 변함없는 관심과 성원 부탁드립니다. 감사합니다.
                                <br/>
                                주식회사 명성해운
                            </p>
                        </header>
                    </section>

                    {/* 회사 연혁 */}
                    <section id="history" className={styles.section} aria-labelledby="about-heading">
                        <header className={styles.section}>
                            <h2 className={styles["main-header"]} id="about-heading">회사 연혁</h2>
                            <p className={styles.subtitle}>고객과 함께 성장해 온 명성해운의 발자취입니다.</p>
                        </header>

                        <ol className={styles.timeline}>
                            {history.map((m, i) => (
                                <li key={`${m.year}-${i}`} className={styles.item}>
                                    <div className={styles.yearBadge}>{m.year}</div>
                                    <div className={styles.content}>
                                        <h3 className={styles.title}>{m.title}</h3>
                                        {m.desc && <p className={styles.desc}>{m.desc}</p>}
                                    </div>
                                </li>
                            ))}
                        </ol>
                    </section>

                    {/* 조직도 */}
                    <section id="org" className={styles.section}>
                        <h2>조직도</h2>

                        <div className={`${styles.org} ${styles.orgCompact}`}>
                            {/* 최상단: 대표이사 */}
                            <div className={styles.ceo}>대표이사</div>

                            {/* 가로로 넓은 레벨은 모바일에서 가로 스크롤 */}
                            <div className={styles.orgScroll}>
                                <ul className={styles.level}>
                                    <li className={styles.nodeBlue}>경영지원팀</li>

                                    {/* 영업팀 + 하위 2팀 */}
                                    <li className={styles.nodeBlue}>영업팀</li>
                                    <li className={styles.nodeBlue}>영업지원팀</li>
                                    <li className={styles.nodeBlue}>선적관리팀</li>
                                </ul>
                            </div>
                        </div>
                    </section>

                    {/* 오시는 길 */}
                    <section id="map" className={styles.section}>
                        <h2>오시는 길</h2>
                        <address className={styles.addressBlock}>
                            <p>인천광역시 연수구 능허대로 136 KT송도빌딩 별관 1층 명성해운</p>
                            <p>1F, 136, Neungheodae-ro, Yeonsu-gu, Incheon, Republic of Korea (KT Songdo Annexed
                                B/D)</p>
                        </address>
                        <iframe
                            title="회사 위치"
                            className={styles.map}
                            src="https://maps.google.com/maps?q=인천광역시 연수구 능허대로 136&output=embed"
                            loading="lazy"
                        />
                    </section>
                </div>
            </div>
        </div>
    );
}
