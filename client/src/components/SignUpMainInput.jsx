import React from 'react'
import { IoLogoFacebook } from 'react-icons/io'

const SignUpMainInput = () => {
    return (
        <div className="SignUpSiv border border-[#DBDBDB] w-full paddingTopBottom minH0 flex flex-col items-center justify-start">
            <div className="logoInstaS w-full h-[5rem] flex items-center justify-center">
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
            <div className="textJHJ w-[16.75rem] min-h-2 text-center flex items-center justify-center text-[#737373] text-[1.2rem] leading-tight">
                Sign up to see photos and videos from your friends.
            </div>
            <button className='gap-1 forMarginFace flex items-center justify-center w-[16.75rem] bg-[#0095F6] hover:bg-[#006bf6] transition-all text-white cursor-pointer buttonLogin'>
                <span className='text-[1.3rem]'>
                    <IoLogoFacebook />
                </span>
                <p>Log in with Facebook</p>
            </button>
            <div className="orLoginS w-[16.75rem] flex items-center justify-center relative h-[2rem] marginOrLoginS">
                <div className="lineLogin w-full h-[1px] bg-[#DBDBDB]"></div>
                <div className="orText absolute bg-white p-4 text-[#737373] w-5 font-bold">OR</div>
            </div>
            <div className="formLogin w-full flex flex-col items-center justify-center gap-2">
                <input type="text" className='bg-[#FAFAFA] border border-[#DBDBDB] outline-none w-[16.75rem] h-[2.375rem] forPaddingInputLogin' name="" placeholder='Mobile number or email' />
                <input type="password" className='bg-[#FAFAFA] border border-[#DBDBDB] outline-none w-[16.75rem] h-[2.375rem] forPaddingInputLogin' name="" placeholder='Password' />
                <input type="text" className='bg-[#FAFAFA] border border-[#DBDBDB] outline-none w-[16.75rem] h-[2.375rem] forPaddingInputLogin' name="" placeholder='Full Name' />
                <input type="text" className='bg-[#FAFAFA] border border-[#DBDBDB] outline-none w-[16.75rem] h-[2.375rem] forPaddingInputLogin' name="" placeholder='Username' />

                <p className='w-[16.75rem] marginTop2 text-center text-[.9rem] leading-tight text-[#737373]'>
                    People who use our service may have uploaded your contact information to Instagram. <span className='text-[#00376B] cursor-pointer'>Learn More</span>
                </p>
                <p className='w-[16.75rem] text-center text-[.9rem] leading-tight text-[#737373]'>
                    By signing up, you agree to our <span className='text-[#00376B] cursor-pointer'>Terms , Privacy Policy and Cookies Policy .</span>
                </p>

                <button className='w-[16.75rem] bg-[#0095F6] hover:bg-[#006bf6] transition-all text-white cursor-pointer buttonLogin'>Sign up</button>
            </div>
        </div>
    )
}

export default SignUpMainInput