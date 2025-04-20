import React from 'react'
import profile from "../assets/images/profile.jpeg"

const SoloNotification = () => {
    return (
        <div className="thisW2">
            <div className="this2Img">
                <img src={profile}/>
            </div>
            <div className="this2Details">
                <div className='flex gap-2'>
                    <span className='font-bold'>tarapada_78</span>
                    follow you .
                    <p className='text-[#737373]'>1d</p>
                </div>
            </div>
            {/* <div className='h-[3rem] w-[3rem] rounded-[10px] overflow-hidden'>
                <img src={profile} className='w-full h-full object-cover' alt="" />
            </div> */}
            <div className="h-[2rem] w-[6.313rem] flex items-center justify-center bg-[#EFEFEF] rounded-[10px]">
                <button>Following</button>
            </div>
        </div>
    )
}

export default SoloNotification