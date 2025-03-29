import React from 'react'
import videoS from "../assets/videos/videoMin.mp4"
import imageS from "../assets/images/profile.jpeg"
import Story from './Story'

const StoryViewSmall = ({opacity,isEmpty}) => {
  return (
    <div className={`h-[15.813rem] opacity-[${opacity}%] w-[8.875rem] relative flex items-center justify-center text-white rounded-[6px] overflow-hidden`}>
        <video src={videoS} className='w-full h-full object-cover'></video>
        <div className="proALl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center">
            <Story/>
            7h
        </div>
    </div>
  )
}

export default StoryViewSmall