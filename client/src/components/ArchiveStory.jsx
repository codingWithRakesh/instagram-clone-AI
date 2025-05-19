import React from 'react'
import friends from "../assets/images/friend.png"
import FormatDate from './FormatDate'
import { useNavigate } from 'react-router-dom'
import { useNextStory2 } from '../contexts/nextStory2Context'
import { useStoryUserCheck } from '../contexts/userStoryCheckContext'

const ArchiveStory = ({ width = "24%", data, index, isClick }) => {
  const [currentIndex, setCurrentIndex] = useNextStory2()
  const [userStoryCheck, setUserStoryCheck] = useStoryUserCheck();
  // console.log("data", data)
  const navigate = useNavigate();
  const navigateByLink = () => {
    setCurrentIndex(index);
    navigate(`/stories/${data?.userName}/${data != undefined && data?.stories?.[0]?._id}`);
    setUserStoryCheck("userArchive");
  }
  return (
    <div onClick={isClick ? navigateByLink : null} className={`w-[${width}] cursor-pointer h-[28.875rem] bg-[rgba(0,0,0,0.77)] relative rounded-[5px] overflow-hidden flex flex-col justify-center items-center transition-all duration-200 ease-in-out hover:scale-[1.03]`}>
      {data?.stories?.[0]?.type == "image" ? <img src={data?.stories?.[0]?.url} alt="friends" className='w-full h-full object-contain' />
        : <video src={data?.stories?.[0]?.url} className='w-full h-full object-contain' />}
      <div className="timeShow leading-[1.1rem] paddingTimeZone absolute top-3 left-3 rounded-[5px] bg-[#fff] flex flex-col items-center justify-center ">
        <FormatDate dateString={data?.stories?.[0]?.createdAt} />
      </div>
    </div>
  )
}

export default ArchiveStory