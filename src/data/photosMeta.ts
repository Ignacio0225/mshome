// src/data/photosMeta.ts
export type PhotoMeta = { title?: string; desc?: string };

export const photosMeta: Record<string, PhotoMeta> = {
    d1: {
        title: "컨테이너 선적 현장",
        desc: "수출 화물 선적을 준비하는 항만 작업 현장입니다.",
    },
    d2: {
        title: "항만 야적 작업",
        desc: "컨테이너와 차량 화물의 이동 동선을 관리합니다.",
    },
    d3: {
        title: "Ro-Ro 운송 준비",
        desc: "차량 화물의 안전한 선적을 위한 현장 확인 과정입니다.",
    },
    d4: {
        title: "프로젝트 카고",
        desc: "규격과 중량에 맞춰 운송 방식을 설계하는 대형 화물 현장입니다.",
    },
    d5: {
        title: "수출 차량 관리",
        desc: "출항 일정에 맞춰 차량 상태와 선적 순서를 관리합니다.",
    },
    d6: {
        title: "터미널 작업",
        desc: "해외 목적지까지 이어지는 운송 절차를 현장에서 점검합니다.",
    },
    d7: {
        title: "항만 물류 네트워크",
        desc: "선사, 터미널, 현지 파트너와 연계해 안정적인 운송을 지원합니다.",
    },
    d8: {
        title: "현장 운송 관리",
        desc: "화물 특성에 맞춰 선적, 통관, 현지 운송 일정을 조율합니다.",
    },
    d9: {title: "해상 운송 현장"},
    d10: {title: "컨테이너 운송"},
    d11: {title: "항만 장비 작업"},
    d12: {title: "화물 검수"},
    d13: {title: "선적 대기 차량"},
    d14: {title: "물류 현장 전경"},
    d15: {title: "수출 준비 현장"},
    d16: {title: "차량 선적 작업"},
};
