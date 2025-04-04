import React, { useState } from 'react'
import { useSignUp } from '../contexts/signUpDivContext'
import axios from 'axios'
import { handleError, handleSuccess } from './ErrorMessage.jsx'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setAuthUser } from '../redux/authSlice.js'
import Spinner from './Spinner.jsx'
import { useAuthStore } from '../store/authStore.js'

const SignUpOTP = ({ setsignUpDetails }) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [, setIsSignUp] = useSignUp()
    const [otp, setOtp] = useState("")
    const [loading, setLoading] = useState(false)
    const isLoading = useAuthStore((state) => state.isLoading);
    const otpSubmit = useAuthStore((state) => state.otpSubmit);



    const submitOtp = async () => {
        if (otp.length !== 6) {
            handleError("Please enter a valid OTP");
            return;
        }
        otpSubmit(otp, navigate);
    };

    return (
        <div className="SignUpSiv border border-[#DBDBDB] w-full paddingTopBottom minH0 flex flex-col items-center justify-start">
            <div className="logoInstaO w-full h-[5rem] flex items-center justify-center">
                <i
                    aria-label="Email confirmation"
                    role="img"
                    style={{
                        backgroundImage: 'url(https://static.cdninstagram.com/rsrc.php/v4/yB/r/E7m8ZCMOFDS.png)',
                        backgroundPosition: '0px -395px',
                        backgroundSize: 'auto',
                        width: '96px',
                        height: '96px',
                        backgroundRepeat: 'no-repeat',
                        display: 'inline-block',
                    }}
                ></i>
            </div>
            <div className='font-bold'>
                Enter Confirmation Code
            </div>
            <div className='w-[16.75rem] text-center marginTopBottomHS leading-tight'>
                Enter the confirmation code we sent to {setsignUpDetails.email}. <span className='text-[#0095F6] cursor-pointer font-bold'>Resend Code</span>
            </div>
            <div className="formLogin w-full flex flex-col items-center justify-center gap-2">
                <input type="text" value={otp} onChange={(e) => setOtp(e.target.value)} className='bg-[#FAFAFA] border border-[#DBDBDB] outline-none w-[16.75rem] rounded-[5px] h-[2.375rem] forPaddingInputLogin' name="" placeholder='Confirmation Code' />
                <button onClick={submitOtp} className='itemCenterAllhild w-[16.75rem] bg-[#0095F6] hover:bg-[#006bf6] transition-all text-white cursor-pointer buttonLogin'>
                    {isLoading ? <Spinner /> : "Next"}
                </button>
            </div>
            <div onClick={() => setIsSignUp("DOB")} className='w-[16.75rem] cursor-pointer text-[#0095F6] font-bold hover:text-[#000] marginTopBottom text-center'>Go Back</div>

        </div>
    )
}

export default SignUpOTP