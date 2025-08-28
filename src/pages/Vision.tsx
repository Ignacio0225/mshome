import styles from "./Vision.module.css";

export default function Vision() {
  return (
    <div className={styles.container}>
      <div className={styles.wrap}>

        {/* 상단 히어로 */}
        {/*<header className={styles.hero}>*/}
        {/*  <h1>OUR VISION | 비전</h1>*/}
        {/*  <p className={styles.tagline}>“세계와 고객을 잇는 글로벌 해상 물류 리더”</p>*/}
        {/*  <p className={styles.lead}>*/}
        {/*    명성해운은 2004년 설립 이후, 중고차 Ro-Ro 운송을 중심으로*/}
        {/*    중동, 아프리카, 중앙아시아, 남미 등 글로벌 시장에서 신뢰를 쌓아왔습니다.*/}
        {/*    앞으로도 변화하는 글로벌 해상 물류 환경 속에서 지속 가능한 성장을 추구하며,*/}
        {/*    고객에게 가장 신뢰받는 파트너로 자리매김하는 것이 우리의 목표입니다.*/}
        {/*  </p>*/}
        {/*</header>*/}

        {/* 비전/사명 2열 */}
        <section className={styles.grid2}>
          <div className={styles.card}>
            <h2 className={styles.sectionTitle}>OUR VISION | 비전</h2>
            <p className={styles.text}>
              “세계와 고객을 잇는 글로벌 해상 물류 리더”<br/>
                명성해운은 2004년 설립 이후, 중고차 Ro-Ro 운송을 중심으로
            중동, 아프리카, 중앙아시아, 남미 등 글로벌 시장에서 신뢰를 쌓아왔습니다.
            앞으로도 변화하는 글로벌 해상 물류 환경 속에서 지속 가능한 성장을 추구하며,
            고객에게 가장 신뢰받는 파트너로 자리매김하는 것이 우리의 목표입니다.
            </p>
          </div>

          <div className={styles.card}>
            <h2 className={styles.sectionTitle}>OUR MISSION | 사명</h2>
            <p className={styles.text}>
              “안전·신속·신뢰 기반의 해상 운송 서비스로 고객의 가치를 세계와 연결합니다.”
              명성해운은 고객의 비즈니스 성공을 최우선으로 생각하며,
              차량 한 대, 화물 한 건마다 정확하고 투명한 운송을 약속합니다.
            </p>
          </div>
        </section>

        {/* 전략 4가지 */}
        <section className={styles.section} id="strategy">
          <h2 className={styles.sectionTitle}>OUR STRATEGY | 전략</h2>
          <div className={styles.strategyGrid}>
            {/* 1 */}
            <article className={styles.card}>
              <div className={styles.badge}>1</div>
              <h3 className={styles.subTitle}>서비스 혁신 (Service Innovation)</h3>
              <ul className={styles.list}>
                <li>Ro-Ro, 컨테이너, 프로젝트 카고, 항공 운송 등 종합 물류 체계 강화</li>
                <li>디지털 물류 관리 시스템 도입으로 실시간 화물 추적 및 고객 맞춤형 솔루션 제공</li>
                <li>국제 무역 지원 서비스 확대를 통한 토탈 물류 솔루션 완성</li>
              </ul>
            </article>

            {/* 2 */}
            <article className={styles.card}>
              <div className={styles.badge}>2</div>
              <h3 className={styles.subTitle}>글로벌 네트워크 확장 (Global Network Expansion)</h3>
              <ul className={styles.list}>
                <li>중동, 아프리카, 중앙아시아, 남미 등 신흥 시장 중심의 운송망 강화</li>
                <li>해외 현지 파트너 및 터미널과의 전략적 제휴 확대</li>
                <li>국제 항로 다변화로 운송 효율 극대화</li>
              </ul>
            </article>

            {/* 3 */}
            <article className={styles.card}>
              <div className={styles.badge}>3</div>
              <h3 className={styles.subTitle}>고객 신뢰 강화 (Customer Value & Trust)</h3>
              <ul className={styles.list}>
                <li>안전 최우선 원칙을 기반으로 한 선적 및 운송 관리</li>
                <li>고객별 맞춤 운임/스케줄 제공으로 만족도 극대화</li>
                <li>장기 파트너십을 위한 투명한 운영 체계 확립</li>
              </ul>
            </article>

            {/* 4 */}
            <article className={styles.card}>
              <div className={styles.badge}>4</div>
              <h3 className={styles.subTitle}>지속 가능 경영 (Sustainability)</h3>
              <ul className={styles.list}>
                <li>친환경 선박/운송 방안 도입으로 ESG 경영 실현</li>
              </ul>
            </article>
          </div>
        </section>

      </div>
    </div>
  );
}
