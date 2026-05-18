import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {RouterProvider, createBrowserRouter} from 'react-router-dom'


import "pretendard/dist/web/variable/pretendardvariable.css";

import './global.css'

import Home from "./pages/Home.tsx";
import Intro from "./pages/Intro.tsx";
import RootLayout from "./routes/RootLayout.tsx";
import NotFound from "./NotFound.tsx";
import Contact from "./pages/Contact.tsx";
import Photos from "./pages/Photos.tsx";
import About from "./pages/About.tsx";
import Vision from "./pages/Vision.tsx";


const router=createBrowserRouter([

    {
        path:'/',
        element:<RootLayout/>,
        children:[
            {path:'/', element: <Home/>,},
            {path:'/intro', element:<Intro/>},
            {path:'/contact', element:<Contact/>},
            {path:'/vision',element:<Vision/>},
            {path:'/about',element:<About/>},
            {path:'/photos',element:<Photos/>},
            {path:'*',element:<NotFound/>},
        ],
    },
]);

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <RouterProvider router={router}/>
    </StrictMode>,
)
