import React from 'react'
import GenerateBirthBox from './GenerateBirthBox'

const SignUpBirthday = () => {
    return (
        <div className="SignUpSiv border border-[#DBDBDB] w-full paddingTopBottom minH0 flex flex-col items-center justify-start">
            <div className="logoInstaS w-full h-[5rem] flex items-center justify-center">
                <i
                    aria-label="Birthday cupcake"
                    role="img"
                    style={{
                        backgroundImage: 'url("https://static.cdninstagram.com/rsrc.php/v4/yB/r/E7m8ZCMOFDS.png")',
                        backgroundPosition: '0px -201px',
                        backgroundSize: 'auto',
                        width: '144px',
                        height: '96px',
                        backgroundRepeat: 'no-repeat',
                        display: 'inline-block',
                    }}
                ></i>
            </div>
            <div className='w-full text-center marginTopoBottom4'>
                Add Your Birthday
            </div>
            <div className="normaltext w-[17rem] leading-[1.2rem]">
                <p className='text-[#000] text-center'>This won't be a part of your public profile.</p>
                <p className='text-[#0095F6] text-center'>Why do I need to provide my birthday</p>
            </div>

            <GenerateBirthBox />

            <div className='marginTopjdshkh w-[17.5rem] text-[#737373] text-[.87rem] leading-[1rem] text-center'>
                Use your own birthday, even if this account is for a business, a pet, or something else
            </div>

            <button className='w-[16.75rem] bg-[#0095F6] hover:bg-[#006bf6] transition-all text-white cursor-pointer buttonLogin'>Next</button>
            <div className='w-[16.75rem] cursor-pointer text-[#0095F6] font-bold hover:text-[#000] marginTopBottom text-center'>Go Back</div>
        </div>
    )
}

export default SignUpBirthday