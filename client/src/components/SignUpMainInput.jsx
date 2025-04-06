import React, { useState } from 'react'
import { IoLogoFacebook } from 'react-icons/io'
import { useSignUp } from '../contexts/signUpDivContext'
import FacebookLogin from '@greatsumini/react-facebook-login'
import axios from 'axios'
import { handleError, handleSuccess } from './ErrorMessage'
import { setAuthUser } from '../redux/authSlice'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Spinner from './Spinner'
import { useAuthStore } from '../store/authStore.js'
import { useSwitch } from '../contexts/switchContext.jsx'
import { useMore } from '../contexts/moreContext.jsx'

const SignUpMainInput = ({ inputsD }) => {
  const [isSwitch, setIsSwitch] = useSwitch()
  const [, setMore] = useMore()
  const [, setIsSignUp] = useSignUp()
  const [signUpDetails, setSignUpDetails] = inputsD
  const navigate = useNavigate()
  const logInFacebook = useAuthStore((state) => state.logInFacebook);
  const isLoading = useAuthStore((state) => state.isLoading);

  const signUpDataCollect = (e) => {
    e.preventDefault()

    const formData = new FormData(e.target)
    const userData = Object.fromEntries(formData.entries())

    setSignUpDetails((prevDetails) => ({
      ...prevDetails,
      ...userData,
    }))

    // console.log('Sign Up Details:', userData)
    setIsSignUp('DOB')

  }

  const loginWithFacebook = async (response) => {
    const userData = {
      fullName: response.name,
      email: response.email,
      DOB: response.birthday,
      profilePic: response.picture?.data?.url,
      gender: response.gender
    }

    logInFacebook(userData, setIsSwitch, setMore, navigate)
  }

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
      <div className='gap-1 forMarginFace flex items-center justify-center w-[16.75rem] bg-[#0095F6] hover:bg-[#006bf6] transition-all text-white cursor-pointer buttonLogin'>
        <span className='text-[1.3rem]'>
          <IoLogoFacebook />
        </span>
        {/* <p>Log in with Facebook</p> */}
        <FacebookLogin
          appId={import.meta.env.VITE_FACEBOOK_USER}
          fields="name,email,birthday,picture,gender"
          scope="public_profile,email,user_birthday,user_gender"
          onSuccess={(response) => {
            console.log('Login Success!', response);
          }}
          onFail={(error) => {
            console.log('Login Failed!', error);
          }}
          onProfileSuccess={loginWithFacebook}
          className=" cursor-pointer"
        />
      </div>
      <div className="orLoginS w-[16.75rem] flex items-center justify-center relative h-[2rem] marginOrLoginS">
        <div className="lineLogin w-full h-[1px] bg-[#DBDBDB]"></div>
        <div className="orText absolute bg-white p-4 text-[#737373] w-5 font-bold">OR</div>
      </div>
      <form onSubmit={signUpDataCollect} className="formLogin w-full flex flex-col items-center justify-center gap-2">
        <input type="text" className='bg-[#FAFAFA] border border-[#DBDBDB] outline-none w-[16.75rem] h-[2.375rem] forPaddingInputLogin' name="email" placeholder='Email' required />
        <input type="password" className='bg-[#FAFAFA] border border-[#DBDBDB] outline-none w-[16.75rem] h-[2.375rem] forPaddingInputLogin' name="password" placeholder='Password' required />
        <input type="text" className='bg-[#FAFAFA] border border-[#DBDBDB] outline-none w-[16.75rem] h-[2.375rem] forPaddingInputLogin' name="fullName" placeholder='Full Name' required />
        <input type="text" className='bg-[#FAFAFA] border border-[#DBDBDB] outline-none w-[16.75rem] h-[2.375rem] forPaddingInputLogin' name="userName" placeholder='Username' required />

        <p className='w-[16.75rem] marginTop2 text-center text-[.9rem] leading-tight text-[#737373]'>
          People who use our service may have uploaded your contact information to Instagram. <span className='text-[#00376B] cursor-pointer'>Learn More</span>
        </p>
        <p className='w-[16.75rem] text-center text-[.9rem] leading-tight text-[#737373]'>
          By signing up, you agree to our <span className='text-[#00376B] cursor-pointer'>Terms, Privacy Policy and Cookies Policy.</span>
        </p>

        <button type='submit' className='itemCenterAllhild w-[16.75rem] bg-[#0095F6] hover:bg-[#006bf6] transition-all text-white cursor-pointer buttonLogin'>
          {isLoading ? <Spinner /> : `Sign up`}
        </button>
      </form>
    </div>
  )
}

export default SignUpMainInput
