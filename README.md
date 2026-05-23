# (주)명성해운 홈페이지

(주)명성해운 기업 홈페이지입니다. React, TypeScript, Vite 기반으로 제작되었으며 회사 소개, 사업분야, 비전, 연락처, 현장 사진, 회원, 게시판, 관리자 페이지를 제공합니다.

## 주요 페이지

- `/` 홈
- `/intro` 회사 소개
- `/about` 사업분야
- `/vision` 비전
- `/contact` 문의 및 오시는 길
- `/photos` 현장 사진
- `/auth` 로그인/회원가입
- `/member` 회원정보
- `/board` NOTICE / QnA / 1:1 문의
- `/admin` 회원관리 / 권한관리 / 공지 업로드 / 1:1 문의 답변

## 환경변수

개발 서버는 로컬 FastAPI를 호출합니다.

```env
# .env.development
VITE_API_BASE_URL=http://127.0.0.1:8000
```

배포 빌드는 운영 API를 호출합니다.

```env
# .env.production
VITE_API_BASE_URL=https://api.msshipping.co.kr
```

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

`npm run build`로 생성된 `dist` 폴더 전체를 정적 호스팅에 업로드합니다. 기존 배포 파일과 섞이지 않게 원격 파일을 비우고 새 `dist` 전체를 올리는 것을 권장합니다.
