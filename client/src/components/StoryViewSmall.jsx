import React from 'react'
import videoS from "../assets/videos/videoMin.mp4"
import imageS from "../assets/images/profile.jpeg"
import Story from './Story'
import { useStoryStartContext } from '../contexts/storyStartContext'
import { useNextStory2 } from '../contexts/nextStory2Context'
import TimeAgo from './TimeAgo'

const StoryViewSmall = ({ opacity, isEmpty, userIndex, data }) => {
  const [startingIndex, setStartingIndex] = useStoryStartContext()
  const [currentIndex, setCurrentIndex] = useNextStory2();
  const clickUser = () => {
    setCurrentIndex(userIndex)
    setStartingIndex(0)
  }
  console.log("data?.stories?.[0]", data?.stories?.[0].type)
  return (
    !isEmpty ? <div onClick={clickUser} className={`h-[22.25rem] w-[12.5rem] relative flex items-center justify-center text-white rounded-[10px] overflow-hidden`}>
      {data?.stories?.[0].type === "video" ? <video src={data?.stories?.[0].url} style={{opacity : `${opacity - 5}%` }} className='w-full h-full object-cover'></video> : <img src={data?.stories?.[0].url} style={{opacity : `${opacity - 5}%` }} className='w-full h-full object-cover' />}
      <div className="proALl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center">
        <Story isClick={false} value={data} />
        <TimeAgo date={data?.stories?.[0].createdAt} />
      </div>
    </div>
      :
      <div className={`h-[22.25rem] opacity-[${opacity}%] w-[12.5rem] relative flex items-center justify-center text-white rounded-[10px] overflow-hidden`}></div>
  )
}

export default StoryViewSmall