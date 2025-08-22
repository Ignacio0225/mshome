import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// react-route-dom 을 설치후 import
import {RouterProvider, createBrowserRouter} from 'react-router-dom'

import './global.css'

import Home from "./pages/Home.tsx";
import Intro from "./pages/Intro.tsx";
import RootLayout from "./routes/RootLayout.tsx";
import NotFound from "./NotFound.tsx";
import Contact from "./pages/Contact.tsx";
import Photos from "./pages/Photos.tsx";
import About from "./pages/About.tsx";


const router=createBrowserRouter([

    {
        path:'/',
        element:<RootLayout/>,
        children:[
            {path:'/', element: <Home/>,},
            {path:'/intro', element:<Intro/>},
            {path:'/contact', element:<Contact/>},
            {path:'/about',element:<About/>},
            {path:'/photos',element:<Photos/>},
            {path:'*',element:<NotFound/>},
        ],
    },
]);

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        {/*route를 사용하기 위해 router를 설정해줌 기존에 있던 App컴포넌트는 router 내부로 이동*/}
        <RouterProvider router={router}/>
    </StrictMode>,
)