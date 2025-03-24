import React, { useEffect, useState } from 'react'
import playStore from "../assets/images/playStore.png"
import microsoft from "../assets/images/microsoft.png"
import firstImg from "../assets/images/firstImg.png"
import secondImg from "../assets/images/secondImg.png"
import therdImg from "../assets/images/therdImg.png"
import forthImg from "../assets/images/forthImg.png"
import { NavLink, useLocation } from 'react-router-dom'

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
                <div className="loginRealDiv border border-[#DBDBDB] w-full h-[26rem] flex flex-col items-center justify-start">
                    <div className="logoInsta w-full h-[8rem] flex items-center justify-center">
                        <i
                            aria-label="Instagram"
                            role="img"
                            style={{
                                backgroundImage: 'url("https://static.cdninstagram.com/rsrc.php/v4/yB/r/E7m8ZCMOFDS.png")',
                                backgroundPosition: '0px -52px',
                                backgroundSize: 'auto',
                                width: '175px',
                                height: '51px',
                                backgroundRepeat: 'no-repeat',
                                display: 'inline-block',
                            }}
                        ></i>
                    </div>
                    <div className=" w-full flex flex-col items-center justify-center gap-2">
                        <input type="text" className='bg-[#FAFAFA] border border-[#DBDBDB] outline-none w-[16.75rem] h-[2.375rem] forPaddingInputLogin' name="" placeholder='Username, or email' />
                        <input type="password" className='bg-[#FAFAFA] border border-[#DBDBDB] outline-none w-[16.75rem] h-[2.375rem] forPaddingInputLogin' name="" placeholder='Password' />
                        <button className='w-[16.75rem] bg-[#0095F6] hover:bg-[#006bf6] transition-all text-white cursor-pointer buttonLogin'>Log in</button>
                    </div>
                    <div className="orLogin w-[16.75rem] flex items-center justify-center relative h-[2rem] marginOrLogin">
                        <div className="lineLogin w-full h-[1px] bg-[#DBDBDB]"></div>
                        <div className="orText absolute bg-white p-4 text-[#737373] w-5 font-bold">OR</div>
                    </div>
                    <div className="otherLogin flex flex-col items-center justify-center gap-2">
                        <div className="asl group cursor-pointer flex items-center justify-center text-[#0095f6] gap-2 font-bold">
                            <svg aria-label="Log in with Facebook" class="x1lliihq x1n2onr6 x173jzuc" fill="currentColor" height="20" role="img" viewBox="0 0 16 16" width="20"><title>Log in with Facebook</title><g clip-path="url(#a)"><path d="M8 0C3.6 0 0 3.6 0 8c0 4 2.9 7.3 6.8 7.9v-5.6h-2V8h2V6.2c0-2 1.2-3.1 3-3.1.9 0 1.8.2 1.8.2v2h-1c-1 0-1.3.6-1.3 1.3V8h2.2l-.4 2.3H9.2v5.6C13.1 15.3 16 12 16 8c0-4.4-3.6-8-8-8Z" fill="currentColor"></path></g><defs><clipPath id="a"><rect fill="currentColor" height="16" width="16"></rect></clipPath></defs></svg>
                            <p className='group-hover:text-black'>Log in with Facebook</p>
                        </div>
                        <div className="shjhd">Forgot password?</div>
                    </div>
                </div>
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