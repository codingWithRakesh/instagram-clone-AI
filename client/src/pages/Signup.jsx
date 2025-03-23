import React from 'react'
import playStore from "../assets/images/playStore.png"
import microsoft from "../assets/images/microsoft.png"
import SignUpMainInput from '../components/SignUpMainInput';
import SignUpBirthday from '../components/SignUpBirthday';
import SignUpOTP from '../components/SignUpOTP';

const Signup = () => {
  return (
    <div className='flex items-center justify-center w-full minH paddingTopBottomP'>
      <div className='w-[22rem] minH flex flex-col items-center justify-start gap-2'>
        <SignUpMainInput/>
        {/* <SignUpBirthday/> */}
        {/* <SignUpOTP/> */}

        <div className="otherOption border border-[#DBDBDB] w-full h-[5.5rem] flex flex-col items-center justify-center content-center">
          <p>Have an account?</p><p className='text-[#0095f6] cursor-pointer font-bold'>Log in</p>
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