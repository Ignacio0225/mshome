import {useEffect, useState} from "react";
import classes from "./Home.module.css";


import slide1 from '/public/mscntr.jpeg';
import slide2 from '../assets/d15.jpeg'
import slide3 from '../assets/d9.jpeg'
import slide4 from '../assets/d16.jpeg'
import slide5 from '/public/mscntr2.jpeg';



const images = [
    {image: slide1, alt: 'slide1'},
    {image: slide2, alt: 'slide2'},
    {image: slide3, alt: 'slide1'},
    {image: slide4, alt: 'slide1'},
    {image: slide5, alt: 'slide1'},
];


export default function Home() {


    const [currentImageIndex, setCurrentImageIndex] = useState(0);   // 기본적인 useState 설정 (기본값 0)

    useEffect(() => {
        const interval = setInterval(() => { // interval 이라는 변수를 만들어주고 변수 안에는 setInterval 함수(시간차를 주는 내장함수)를 실행해줌(람다같은개념 변수가 실행되면 내부 함수가 실행됨)
            setCurrentImageIndex((prevIndex) => // setCurrentImageIndex() 안에 인자를 받아주는데 이 인자는 숫자로 이루어짐
                prevIndex < images.length - 1 ? prevIndex + 1 : 0 // prevIndex 가 images 배열의 길이보다 작으면 +1을 해주고 아니면 0으로 만들어줌
            );
        }, 3000); // 5000밀리초(5초) 첫 실행후 5초뒤에 상태변경이 없었으니 prevIndex 기본값은 useState(0) -> setCurrentImageIndex 으로 인해 0으로 설정됨,

        return () => clearInterval(interval); // return() => clearInterval()반복종료   이방식은 useEffect 안에서 사용가능 한방법으로 언마운트시 함수실행 이라는 의미
    }, []);


    return (
        <div className={classes.slideshow}>
            {images.map((image, index) => (
                <img
                    key={index}
                    src={image.image}
                    alt={image.alt}
                    className={`${classes.slideImg} ${index === currentImageIndex ? classes.active : ''}`}
                />
            ))}
        </div>
    )
}