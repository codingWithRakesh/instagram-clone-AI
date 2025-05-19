import React from 'react'
import { VscChromeClose } from "react-icons/vsc";
import noProfile from "../assets/images/profileNot.jpg"
import { IoHeartSharp } from 'react-icons/io5';
import { useParams } from 'react-router-dom';
import storyStore from '../store/storyStore';
import { useEffect } from 'react';

const LikeShowStory = ({ setIsClickSeenStory, setIsPaused }) => {
    const value = useParams();
    const setShowStory = storyStore((state) => state.setShowStory);
    const showStory = storyStore((state) => state.showStory);

    useEffect(() => {
        setShowStory(value.storyId);
    }, [value.storyId]);

    return (
        <div className='absolute z-[999999999] overflow-hidden top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-2xl w-[99%] h-[25rem] flex flex-col justify-center items-center bg-gray-900'>
            <div className="headerPart w-full h-[10%] border-b border-[#46484c] text-white flex items-center justify-center relative">
                <p>Viewers</p>
                <button onClick={() => {
                    setIsClickSeenStory((v) => !v)
                    setIsPaused(prev => !prev)
                }} className='absolute right-3 top-3 cursor-pointer'><VscChromeClose /></button>
            </div>
            <div className="mainpart paddingInStoryUser w-full h-[90%]">

                {
                    showStory?.views?.map((item, index) => (
                        <div className='singleLike flex gap-3 items-center justify-start'>
                            <div className="profileImage relative h-[2rem] w-[2rem] flex justify-center items-center ">
                                <img src={item.profilePic || noProfile} className='w-full h-full object-cover rounded-full' alt="" />
                                {item.isLiked && <div className='absolute bottom-[-.2rem] right-[-.2rem] text-red-600'>
                                    <IoHeartSharp />
                                </div>}
                            </div>
                            <div className="detailsUser h-[2.3rem] leading-[1rem] text-[14px] flex flex-col justify-center items-start">
                                <p className='userName text-white'>{item.userName}</p>
                                <p className='fullName text-[#737373]'>{item.fullName}</p>
                            </div>
                        </div>
                    ))
                }

            </div>
        </div>
    )
}

export default LikeShowStory