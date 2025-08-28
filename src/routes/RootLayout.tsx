// 칠드런 패스를 받아오지 못하기때문에 핋요함
// 중첩된 라우트가 가진 실제 콘텐츠가 렌더링되고 삽입되어야 할 위치에 사용됨
import {Outlet} from 'react-router-dom'
import Header from "../components/Header";



export default function RootLayout() {
  return (
    <>
      {/* 항상 보이는 헤더 */}
      <Header />
      {/* ✅ 전역 레이아웃(폭/여백)은 main이 담당 */}
      <main>
        <Outlet />
      </main>
    </>
  );
}