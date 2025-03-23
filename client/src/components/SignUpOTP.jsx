import React from 'react'

const SignUpOTP = () => {
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
                Enter the confirmation code we sent to sndlkaddaj@gmail.com. <span className='text-[#0095F6] cursor-pointer font-bold'>Resend Code</span>
            </div>
            <div className="formLogin w-full flex flex-col items-center justify-center gap-2">
                <input type="text" className='bg-[#FAFAFA] border border-[#DBDBDB] outline-none w-[16.75rem] rounded-[5px] h-[2.375rem] forPaddingInputLogin' name="" placeholder='Confirmation Code' />
                <button className='w-[16.75rem] bg-[#0095F6] hover:bg-[#006bf6] transition-all text-white cursor-pointer buttonLogin'>Next</button>
            </div>
            <div className='w-[16.75rem] cursor-pointer text-[#0095F6] font-bold hover:text-[#000] marginTopBottom text-center'>Go Back</div>

        </div>
    )
}

export default SignUpOTP