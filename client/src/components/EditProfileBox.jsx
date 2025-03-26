import React from 'react'
import profile from "../assets/images/profile.jpeg"

const EditProfileBox = () => {
    return (
        <div className="navListDivEdit w-[70%] min-h-screen bg-white absolute right-0 top-0">
            <div className="headingTitleEdit text-2xl font-bold">
                Edit profile
            </div>

            <div className="profileSecEdit bg-[#EFEFEF] flex items-center justify-between w-full h-[5.5rem] rounded-2xl">
                <div className="profileEdit flex items-center gap-3.5">
                    <div className='w-[3.5rem] h-[3.5rem] rounded-full overflow-hidden'>
                        <img src={profile} alt="" className='h-full w-full object-cover' />
                    </div>
                    <div className='leading-tight'>
                        <p className='font-bold text-[18px]'>tarapada_9679</p>
                        <p className='text-[#737373] text-[14px]'>Tarapada Garai</p>
                    </div>
                </div>
                <div className="selectImageBox h-[2rem] w-[8rem] bg-[#0095F6] text-white font-bold text-[14px] flex items-center justify-center rounded-[10px] cursor-pointer">
                    <input type="file" id='uploadImg' hidden />
                    <label htmlFor="uploadImg" className='cursor-pointer'>Change photo</label>
                </div>
            </div>

            <div className="websitesjdh sjfhkjfh w-full h-[6rem]">
                <div className="nameTitleWeb font-bold text-[1.2rem]">Website</div>
                <input type="text" className='border border-[#dbdbdb] w-full h-[2.625rem] outline-none rounded-[10px]' />
            </div>

            <div className="websitesjdh w-full h-[8rem]">
                <div className="nameTitleWeb font-bold text-[1.2rem]">Bio</div>
                <textarea type="text" className='border border-[#dbdbdb] w-full h-[4.5rem] outline-none rounded-[10px] resize-none' ></textarea>
            </div>

            <div className="websitesjdh w-full h-[6rem]">
                <div className="nameTitleWeb font-bold text-[1.2rem]">Mobile Number</div>
                <input type="text" className='border border-[#dbdbdb] w-full h-[2.625rem] outline-none rounded-[10px]' />
            </div>

            <div className="websitesjdh w-full h-[6rem]">
                <div className="nameTitleWeb font-bold text-[1.2rem]">Gender</div>
                <select type="text" className='border border-[#dbdbdb] w-full h-[3.375rem] outline-none rounded-[10px]' >
                    <option value="">Male</option>
                    <option value="">FeMale</option>
                    <option value="">Other</option>
                </select>
            </div>

            <div className="websitesjdh forButtonEdit w-full h-[6rem] flex items-center justify-end">
                <button className='w-[15.813rem] cursor-pointer text-white rounded-[10px] h-[2.75rem] bg-[#0095f6] hover:bg-[#0062f6]'>Submit</button>
            </div>

        </div>
    )
}

export default EditProfileBox