import styles from "./About.module.css";

type Section = {
    id: string;
    title: string;
    subtitle?: string;
};

const sections: Section[] = [
    {id: "ro-ro", title: "RO-RO", subtitle: "중고차/특수차량 전용 해상 운송"},
    {id: "general-project", title: "GENERAL & PROJECT CARGO", subtitle: "중량·장대 화물 및 프로젝트 물류"},
    {id: "container", title: "CONTAINER", subtitle: "FCL/LCL 글로벌 컨테이너 운송"},
    {id: "air", title: "AIR CARGO SERVICE", subtitle: "긴급/고부가가치 항공 운송"},
    {id: "agency", title: "SHIPPING AGENCY", subtitle: "선박 대리점/항만 오퍼레이션"},
    {id: "trade", title: "INTERNATIONAL TRADE", subtitle: "해외조달·수출입 트레이딩"},
];

export default function About() {
    return (
        <div className={styles.container}>
            {/* 상단 헤더 */}
            <header className={styles.hero}>
                <h1>사업 분야</h1>
            </header>

            <div className={styles.layout}>
                {/* 좌측 목차 */}
                <nav className={styles.toc} aria-label="사업 분야 목차">
                    <ol className={styles.tocList}>
                        {sections.map((s, idx) => (
                            <li key={s.id}>
                                <a href={`#${s.id}`} className={styles.tocLink}>
                                    <span className={styles.badge}>{idx + 1}</span>
                                    <div className={styles.tocText}>
                                        <strong>{s.title}</strong>
                                        {s.subtitle && <small>{s.subtitle}</small>}
                                    </div>
                                </a>
                            </li>
                        ))}
                    </ol>
                </nav>

                {/* 우측 콘텐츠 */}
                <main className={styles.content}>
                    {/* 1. RO-RO */}
                    <section id="ro-ro" className={styles.section} aria-labelledby="ro-ro-title">
                        <header className={styles.sectionHeader}>
                            <h2 id="ro-ro-title">RO-RO</h2>
                            <p className={styles.sectionSubtitle}>중고차·특수차량 전용 롤온/롤오프 운송</p>
                        </header>

                        <div className={styles.card}>
                            <h3 className={styles.subTitle}>서비스 개요</h3>
                            <p>차량/장비를 컨테이너 적입 없이 선내 램프로 직접 적재·양하하는 운송 방식입니다.</p>

                            <h3 className={styles.subTitle}></h3>
                            <ul className={styles.list}>
                                <li>명성해운은 국적 선사 및 글로벌 Ro-Ro 선사 및 해외 터미널과의 긴밀한 네트워크를 기반으로, 중동, 아프리카, 남미, 중앙아시아 등 전략적
                                    거점 항로를 안정적으로 운영하고 있습니다. Ro-Ro 서비스는 한 번에 수백 대에서 수천 대까지차량 운송이 가능해컨테이너 대비 운임이 합리적이고, 운송
                                    효율성이 극대화됩니다.이를 통해 정확한 도착 일정과 원활한 하역 서비스를 보장합니다.
                                </li>
                            </ul>

                            <h3 className={styles.subTitle}>취급 품목</h3>
                            <ul className={styles.chips}>
                                <li>Passenger Car</li>
                                <li>Bus</li>
                                <li>Truck</li>
                                <li>Construction Equipment</li>
                            </ul>
                        </div>
                    </section>

                    {/* 2. GENERAL & PROJECT CARGO */}
                    <section id="general-project" className={styles.section} aria-labelledby="gp-title">
                        <header className={styles.sectionHeader}>
                            <h2 id="gp-title">GENERAL & PROJECT CARGO</h2>
                            <p className={styles.sectionSubtitle}>중량·장대 화물 및 프로젝트 물류</p>
                        </header>

                        <div className={styles.card}>
                            <h3 className={styles.subTitle}>서비스 개요</h3>
                            <p>현장 실사부터 포장/적재 설계, 특수장비/선적선택, 현지 운송까지 토털 솔루션을 제공합니다.</p>

                            <h3 className={styles.subTitle}></h3>
                            <ul className={styles.list}>
                                <li>명성해운은 일반 화물(General Cargo)부터 대형·특수화물(Project Cargo)까지폭넓은 운송 경험을 보유하고 있습니다.건설 장비,
                                    중장비, 플랜트 기자재, 산업 설비 등 규격·중량 제한이 있는 화물도 안전하게 운송할 수 있는 노하우를 갖추고 있습니다.

                                    맞춤형 운송 솔루션 제공
                                    화물의 규격, 중량, 목적지를 고려한 최적의 운송 계획 수립
                                    Ro-Ro, 벌크선, 컨테이너선, 플랫랙 등 다양한 운송 방식 활용
                                    고객별 프로젝트 특성에 맞춘 전담 관리 시스템운영

                                    안전성 보장 및 전문 장비 활용
                                    초대형 화물에 적합한 전용 하역 장비 및 래싱(Lashing) 기술보유
                                    국제 안전 규정(IMO)과 선사 표준을 준수한 안전한 적재·하역
                                    실시간 모니터링을 통한 위험 최소화 및 안정적 운송지원
                                </li>
                            </ul>
                        </div>
                    </section>

                    {/* 3. CONTAINER */}
                    <section id="container" className={styles.section} aria-labelledby="cntr-title">
                        <header className={styles.sectionHeader}>
                            <h2 id="cntr-title">CONTAINER</h2>
                            <p className={styles.sectionSubtitle}>FCL/LCL 글로벌 컨테이너 운송</p>
                        </header>

                        <div className={styles.card}>
                            <h3 className={styles.subTitle}>서비스 개요</h3>
                            <p>정기선 기반의 안정적인 스페이스와 합리적인 운임을 제공합니다.</p>

                            <h3 className={styles.subTitle}></h3>
                            <ol className={styles.list}>
                                <li>안정적이고 신뢰할 수 있는 운송<br/>
                                    명성해운은 글로벌 컨테이너 선사 및 해외 터미널과의 긴밀한 협력을 통해세계 주요 항로에서 안정적이고 신뢰할 수 있는 운송 서비스를 제공합니다.정확한
                                    출항 및 도착 스케줄을 기반으로, 안전하고 예측 가능한 물류 관리가 가능합니다.
                                </li>
                                <li>다양한 컨테이너 옵션 제공<br/>
                                    20FT / 40FT 표준 컨테이너
                                    하이큐브(High Cube) 및 냉동·냉장 컨테이너
                                    플랫랙(Flat Rack) 및 오픈탑(Open Top) 컨테이너
                                    특수화물 및 초중량 화물에 최적화된 맞춤형 컨테이너 솔루션
                                    화물의 크기, 중량, 특성에 따라 최적의 컨테이너 옵션을 제공합니다.
                                </li>
                                <li>원스톱 통합 물류 서비스<br/>
                                    화물 픽업 → 컨테이너 포장 → 선적 및 통관 → 최종 하역까지 전 과정 일괄 지원
                                    실시간 화물 추적 시스템을 통한 투명한 운송 관리
                                    고객별 니즈에 맞춘 맞춤형 물류 솔루션제공
                                </li>
                            </ol>
                        </div>
                    </section>

                    {/* 4. AIR CARGO SERVICE */}
                    <section id="air" className={styles.section} aria-labelledby="air-title">
                        <header className={styles.sectionHeader}>
                            <h2 id="air-title">AIR CARGO SERVICE</h2>
                            <p className={styles.sectionSubtitle}>긴급/고부가가치 항공 운송</p>
                        </header>

                        <div className={styles.card}>
                            <h3 className={styles.subTitle}>서비스 개요</h3>
                            <p>리드타임이 중요한 화물을 대상으로 글로벌 항공 운송을 제공합니다.</p>

                            <h3 className={styles.subTitle}></h3>
                            <ol className={styles.list}>
                                <li>신속한 글로벌 운송<br/>
                                    명성해운의 항공 화물 서비스는 가장 빠르고 효율적인 운송을 목표로 합니다.긴급 부품, 고가 제품, 샘플 화물, 전자제품, 의약품 등 시간이 중요한
                                    화물을전 세계 어디든 안전하고 정확하게운송해 드립니다.
                                </li>
                                <li>글로벌 네트워크를 통한 안정적 스케줄<br/>
                                    명성해운은 글로벌 주요 항공사 및 해외 물류 파트너사와의 협력 네트워크를 보유하고 있어
                                    중동, 아프리카, 남미, 유럽, 북미 등 전 세계 주요 허브 공항을 연결하는 안정적 운송 스케줄을 제공합니다.
                                </li>
                                <li>다양한 화물 맞춤 솔루션<br/>
                                    일반 화물 (General Cargo)
                                    긴급 화물 및 고가 화물
                                    의약품, 전자부품 등 민감 화물
                                    초중량 및 대형 특수 화물 (Project Cargo by Air)
                                    Door-to-Door 서비스 가능
                                    화물의 특성, 중량, 긴급성을 고려한 최적의 항공 운송 솔루션을 설계합니다.
                                </li>
                            </ol>
                        </div>
                    </section>

                    {/* 5. SHIPPING AGENCY */}
                    <section id="agency" className={styles.section} aria-labelledby="agency-title">
                        <header className={styles.sectionHeader}>
                            <h2 id="agency-title">SHIPPING AGENCY</h2>
                            <p className={styles.sectionSubtitle}>선박 대리점/항만 오퍼레이션</p>
                        </header>

                        <div className={styles.card}>
                            <h3 className={styles.subTitle}>서비스 개요</h3>
                            <p>입출항 서류, 터미널 협조, 도선/예선/급유/검역 등 원스톱 에이전시 서비스를 제공합니다.</p>

                            <h3 className={styles.subTitle}></h3>
                            <ul className={styles.list}>
                                <li>명성해운은 국내 주요 항구에서 선박의 입출항과 관련된 모든 절차를 원스톱으로 지원하는글로벌 선박 대리점 서비스(Shipping Agency
                                    Service)를 제공합니다.선박의 입항 허가, 하역 계획, 선원 지원, 통관 및 행정 업무까지 전 과정을 전문적으로 관리합니다.<br/>
                                    다양한 부가 서비스 제공
                                    하역 관리 및 항만 작업 지원
                                    선원 교대, 숙박, 비자 및 입국 지원
                                    선용품, 연료, 식자재 공급 서비스
                                    항만세 및 행정 업무 대행
                                    선박 유지·보수 네트워크 지원
                                </li>
                            </ul>
                        </div>
                    </section>

                    {/* 6. INTERNATIONAL TRADE */}
                    <section id="trade" className={styles.section} aria-labelledby="trade-title">
                        <header className={styles.sectionHeader}>
                            <h2 id="trade-title">INTERNATIONAL TRADE</h2>
                            <p className={styles.sectionSubtitle}>해외 조달·수출입 트레이딩</p>
                        </header>

                        <div className={styles.card}>
                            <h3 className={styles.subTitle}>서비스 개요</h3>
                            <p>글로벌 벤더 네트워크를 활용해 경쟁력 있는 조달/판매를 지원합니다.</p>

                            <h3 className={styles.subTitle}>주요 서비스</h3>
                            <ol className={styles.list}>
                                <li>20년 노하우 기반의 무역 서비스<br/>
                                    명성해운은 2004년 설립 이후, 중동·아프리카·중앙아시아·남미 등전 세계 다양한 시장과의 무역 경험을 쌓아왔습니다.중고차, 기계 설비, 화학 제품,
                                    생활용품 등 다양한 품목의 수출입을 전문적으로 지원하며,글로벌 비즈니스 파트너로서 고객의 경쟁력을 강화합니다.
                                </li>
                                <li>수출입 원스톱 서비스<br/>
                                    무역 계약부터 선적, 통관, 현지 인도까지 전 과정 통합 지원
                                    국가별 수입 규제 및 통관 조건에 따른 맞춤형 솔루션 제공
                                    바이어 발굴, 거래처 관리, 현지 시장 조사 등 부가 서비스 지원
                                </li>
                                <li>맞춤형 무역 컨설팅 서비스<br/>
                                    국가별 통관 규정 및 수입 요건 분석
                                    시장 진입 전략 및 경쟁력 있는 가격 제안
                                    해외 바이어와의 직접 협상 및 계약 체결 지원
                                    현지 유통망 확보 및 사후 관리까지 토탈 컨설팅 제공
                                    다양한 상품 카테고리 지원
                                    자동차 및 부품
                                    산업 기계 및 설비
                                    화학 제품 및 생활용품
                                    헬스·뷰티 제품
                                    특수 프로젝트 및 대형 기자재</li>
                            </ol>
                        </div>
                    </section>
                </main>
            </div>
        </div>
);
}
