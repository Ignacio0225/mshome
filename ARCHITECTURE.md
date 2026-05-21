# mshome 프론트엔드 구조

이 문서는 다음에 직접 수정할 때 "어디를 보면 되는지" 빠르게 찾기 위한 지도입니다.

## 큰 흐름

`src/main.tsx`
- React Router의 URL 경로를 정의합니다.
- `/board`, `/admin`, `/auth`, `/member` 같은 페이지 연결이 여기에서 시작됩니다.

`src/routes/RootLayout.tsx`
- 모든 페이지 공통 레이아웃입니다.
- `Header`, `Footer`, `AuthSessionManager`가 여기에서 항상 렌더링됩니다.

`src/api`
- 프론트가 백엔드 FastAPI와 통신하는 공통 API 레이어입니다.
- `client.ts`: 기존 코드가 계속 쓸 수 있는 호환용 입구입니다. 실제 구현은 아래 파일들로 나뉩니다.
- `types.ts`: User, Post, Comment, DirectChat 같은 API 데이터 타입입니다.
- `session.ts`: 로그인 토큰 저장, 현재 로그인 사용자 저장, 30분 세션/3분 연장 상태를 담당합니다.
- `http.ts`: `fetch` 공통 처리, JWT Authorization 헤더, 공통 에러 메시지를 담당합니다.
- `endpoints.ts`: `/auth`, `/posts`, `/comments`, `/direct-chats`, `/users` API 함수를 모아둔 파일입니다.
- 백엔드 URL은 `VITE_API_BASE_URL` 환경변수가 있으면 그 값을 쓰고, 없으면 `http://127.0.0.1:8000`을 씁니다.

## 재사용 컴포넌트

`src/components/common/Pagination.tsx`
- 게시판, 사진 등 페이지 이동 UI에 재사용합니다.

`src/components/common/SearchBar.tsx`
- 제목/내용/작성자 검색 UI에 재사용합니다.

`src/components/AuthSessionManager.tsx`
- 로그인 후 30분이 지나면 3분짜리 연장 모달을 띄웁니다.
- `src/api/client.ts`의 세션 저장 시각과 연결됩니다.

## 기능별 폴더

`src/features/board`
- 게시판 기능 세트입니다.
- `page.tsx`: 게시판의 상태와 API 호출 흐름을 담당합니다.
- `types.ts`: 게시판 탭/모드 타입입니다.
- `api.ts`: 게시판 화면에서 필요한 API만 골라 쓰는 얇은 래퍼입니다.
- `hooks/useBoardPosts.ts`: 게시글 목록, 검색, 페이지네이션 상태를 담당합니다.
- `hooks/useDirectChat.ts`: 1:1 문의방 목록/선택 상태를 담당합니다.
- `Board.module.css`: 게시판 전용 스타일입니다.
- `components/*`: 탭, 목록, 상세, 작성폼, 1:1 문의 UI입니다.

`src/pages/Board.tsx`
- 라우터 호환용 얇은 연결 파일입니다. 실제 코드는 `src/features/board/page.tsx`에 있습니다.

`src/features/board/components/BoardTabs.tsx`
- NOTICE / QnA / 1:1 문의 탭 UI입니다.

`src/features/board/components/PostTable.tsx`
- NOTICE와 QnA 목록 테이블입니다.
- `Pagination`, `SearchBar`를 내부에서 재사용합니다.

`src/features/board/components/PostEditor.tsx`
- QnA 글쓰기/수정 폼입니다.

`src/features/board/components/PostDetail.tsx`
- 게시글 상세와 댓글 목록/작성/수정/삭제 UI입니다.

`src/features/board/components/DirectChatSection.tsx`
- 사용자용 1:1 문의방 목록, 생성, 메시지 전송 UI입니다.

`src/features/board/components/AuthRequiredPanel.tsx`
- 로그인하지 않은 사용자에게 로그인/회원가입을 유도하는 패널입니다.

`src/features/admin`
- 관리자 기능 세트입니다.
- `page.tsx`: 관리자 페이지 상태와 API 호출 흐름을 담당합니다.
- `types.ts`: 관리자 탭/권한 타입입니다.
- `api.ts`: 관리자 화면에서 필요한 API만 골라 쓰는 얇은 래퍼입니다.
- `hooks/useAdminData.ts`: 관리자 로그인 확인, 회원 목록, 1:1 문의, 공지 목록 로딩을 담당합니다.
- `Admin.module.css`: 관리자 페이지 전용 스타일입니다.
- `components/*`: 탭, 회원 테이블, 공지 업로드, 관리자 채팅 UI입니다.

`src/pages/Admin.tsx`
- 라우터 호환용 얇은 연결 파일입니다. 실제 코드는 `src/features/admin/page.tsx`에 있습니다.

`src/features/admin/components/AdminTabs.tsx`
- 관리자 페이지 탭입니다.

`src/features/admin/components/UserTable.tsx`
- 회원정보 확인과 권한관리 테이블입니다.

`src/features/admin/components/AdminDirectChat.tsx`
- 관리자용 1:1 문의 답변 UI입니다.

`src/features/admin/components/NoticeEditor.tsx`
- 슈퍼관리자 전용 공지사항 업로드 UI입니다.

## 공통 유틸

`src/utils/format.ts`
- 날짜 포맷, 권한 한글 라벨처럼 화면 전체에서 재사용하는 표시 함수를 둡니다.

`src/utils/permissions.ts`
- 프론트에서 버튼을 보여줄지 판단하는 권한 헬퍼입니다.
- 실제 보안은 백엔드가 다시 검사하므로, 프론트 권한 함수는 UI 표시용입니다.

`src/hooks/useCurrentUser.ts`
- 로그인 사용자 정보를 localStorage, 브라우저 이벤트, `/auth/me` API와 동기화합니다.

## 배경/현장 사진

`src/assets/background.jpg`
- 사이트 전역 배경 전용 이미지입니다.

`src/pages/Photos.tsx`
- `src/assets`의 사진을 자동 수집하되 `background.jpg`는 현장사진 목록에서 제외합니다.
