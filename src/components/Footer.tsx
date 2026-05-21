// src/components/Footer.tsx

// Footer 전용 CSS Module 파일을 불러옵니다.
// CSS Module은 클래스 이름 충돌을 막아줍니다.
import styles from './Footer.module.css';

// public 폴더에 있는 MsLogo.png 파일 경로를 만듭니다.
// import.meta.env.BASE_URL은 Vite에서 public 경로 기준을 안전하게 잡아주는 값입니다.
const logoSrc = `${import.meta.env.BASE_URL}MsLogo.png`;

// Footer 컴포넌트를 선언합니다.
export default function Footer() {
  // 화면에 보여줄 JSX를 반환합니다.
  return (
    // footer 태그는 웹사이트 하단 정보를 담는 시맨틱 태그입니다.
    <footer className={styles.footer}>
      {/* 푸터 내부 전체 폭과 정렬을 담당하는 컨테이너입니다. */}
      <div className={styles.container}>

        {/* 왼쪽 영역입니다. 회사 정보와 Copyright를 함께 묶습니다. */}
        <div>
          {/* 회사명입니다. */}
          <strong className={styles.companyName}>
            (주)명성해운
          </strong>

          {/* 주소 정보입니다. */}
          <p className={styles.info}>
            ADDRESS : 인천시 연수구 능허대로 136 송도 KT빌딩 별관 1층 〒21960
          </p>

          {/* 전화번호와 팩스 정보입니다. */}
          <p className={styles.info}>
            TEL : 032-891-7003  /  FAX : 032-891-8003
          </p>

          {/* 이메일 정보입니다. */}
          <p className={styles.info}>
            E-MAIL : mssp@msshipping.kr
          </p>

          {/* 저작권 문구입니다. */}
          <p className={styles.copy}>
            Copyright (C) 2013 MS SHIPPING CO., LTD. All rights reserved.
          </p>
        </div>

        {/* 오른쪽 로고 영역입니다. */}
        <div className={styles.logoFooter}>
          {/* (주)명성해운 로고 이미지입니다. */}
          <img src={logoSrc} alt="(주)명성해운 로고" />
        </div>

      </div>
    </footer>
  );
}