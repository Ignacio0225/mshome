// src/data/photosMeta.ts
export type PhotoMeta = { title?: string; desc?: string };

export const photosMeta: Record<string, PhotoMeta> = {
    // 예시) "test1.jpg" → 키는 "test1"
    d1: {
        title: "타이틀 테스트1 ",
        desc: "설명 테스트1.",
    },
    d2: {
        title: "타이틀 테스트2 ",
        desc: "설명 테스트2.",
    },
    d3: {
        title: "타이틀 테스트3 ",
        desc: "설명 테스트3.",
    },
    d4: {
        title: "타이틀 테스트4 ",
        desc: "설명 테스트4.",
    },
    d5: {
        title: "타이틀 테스트5 ",
        desc: "설명 테스트5.",
    },
    d6: {
        title: "타이틀 테스트 ",
        desc: "설명 테스트.",
    },
    d7: {
        title: "타이틀 테스트6 ",
        desc: "설명 테스트6.",
    },
    d8: {
        title: "타이틀 테스트7 ",
        desc: "설명 테스트7.",
    },

    // 필요할 때 원하는 만큼 추가해줘
};
