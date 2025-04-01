import React, { useState } from 'react'
import playStore from "../assets/images/playStore.png"
import microsoft from "../assets/images/microsoft.png"
import SignUpMainInput from '../components/SignUpMainInput';
import SignUpBirthday from '../components/SignUpBirthday';
import SignUpOTP from '../components/SignUpOTP';
import { NavLink } from 'react-router-dom';
import { useSignUp } from '../contexts/signUpDivContext';

const Signup = () => {
  const [isSignUp] = useSignUp()
  const [setsignUpDetails, setSetsignUpDetails] = useState({
    email: '',
    fullName: '',
    userName: '',
    DOB: '',
    password: '',
  })
  return (
    <div className='flex items-center justify-center w-full minH paddingTopBottomP'>
      <div className='w-[22rem] minH flex flex-col items-center justify-start gap-2'>
        {isSignUp == "input" ? <SignUpMainInput inputsD={[setsignUpDetails, setSetsignUpDetails]} /> : isSignUp == "DOB" ? <SignUpBirthday inputsD={[setsignUpDetails, setSetsignUpDetails]} /> : isSignUp == "OTP" ? <SignUpOTP setsignUpDetails={setsignUpDetails} /> : null}

        <div className="otherOption border border-[#DBDBDB] w-full h-[5.5rem] flex flex-col items-center justify-center content-center">
          <p>Have an account?</p><NavLink to="/accounts/login" className='text-[#0095f6] cursor-pointer font-bold'>Log in</NavLink>
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

export default Signup