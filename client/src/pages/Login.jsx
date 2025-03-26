import React, { useEffect, useState } from 'react'
import playStore from "../assets/images/playStore.png"
import microsoft from "../assets/images/microsoft.png"
import firstImg from "../assets/images/firstImg.png"
import secondImg from "../assets/images/secondImg.png"
import therdImg from "../assets/images/therdImg.png"
import forthImg from "../assets/images/forthImg.png"
import { NavLink, useLocation } from 'react-router-dom'
import LoginBox from '../components/LoginBox'

const Login = () => {
    const images = [firstImg, secondImg, therdImg, forthImg];
    const [currentImage, setCurrentImage] = useState(0);
    const [nextImage, setNextImage] = useState(1);
    const [fade, setFade] = useState(true);
    const location = useLocation();

    useEffect(() => {
        const interval = setInterval(() => {
            setFade(false);
            setTimeout(() => {
                setCurrentImage(nextImage);
                setNextImage((prev) => (prev + 1) % images.length);
                setFade(true);
            }, 3500);
        }, 3000);

        return () => clearInterval(interval);
    }, [nextImage]);

    return (
        <div className="loginContainer flex items-center justify-center w-full h-screen">
            {location.pathname != "/accounts/login" && <div className="imgBoxLo w-[25rem] h-[90vh] relative">
                <div className="imgChange w-[16.1rem] absolute top-[1.77rem] right-[3.7999rem]">
                    <img
                        src={images[currentImage]}
                        alt="Slideshow"
                        className={`w-full h-full object-cover transition-opacity duration-[1500ms] ${fade ? 'opacity-100' : 'opacity-30'}`}
                    />
                    <img
                        src={images[nextImage]}
                        alt="Next Slide"
                        className={`w-full h-full object-cover absolute top-0 left-0 transition-opacity duration-[1500ms] ${fade ? 'opacity-0' : 'opacity-70'}`}
                    />
                </div>
            </div>}

            <div className="loginBoxLo w-[22rem] h-[95vh] flex flex-col items-center justify-center content-start gap-2">
                <LoginBox />
                <div className="otherOption gap-1.5 border border-[#DBDBDB] w-full h-[3.938rem] flex items-center justify-center">
                    <p>Don't have an account? </p><NavLink to="/accounts/emailsignup" className='text-[#0095f6] cursor-pointer font-bold'>Sign up</NavLink>
                </div>
                <div className="showStore w-full h-[5.938rem] flex flex-col items-center justify-center gap-2">
                    <p>Get the app.</p>
                    <div className="imgRowLogin flex items-center justify-center gap-2">
                        <img src={playStore} alt="" className='w-[8.393rem]' />
                        <img src={microsoft} alt="" className='w-[6.6rem]' />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login