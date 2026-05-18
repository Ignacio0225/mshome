# 명성해운 홈페이지

명성해운 기업 홈페이지입니다. React, TypeScript, Vite 기반으로 제작되었으며 회사 소개, 사업분야, 비전, 연락처, 현장 사진 페이지를 제공합니다.

## 주요 페이지

- `/` 홈
- `/intro` 회사 소개
- `/about` 사업분야
- `/vision` 비전
- `/contact` 문의 및 오시는 길
- `/photos` 현장 사진

## 개발

```bash
npm install
npm run dev
```

## 검증

```bash
npm run lint
npm run build
```

## 배포

Vercel 정적 배포를 기준으로 구성되어 있습니다. SPA 라우팅은 `vercel.json`에서 `index.html`로 rewrite 처리합니다.
