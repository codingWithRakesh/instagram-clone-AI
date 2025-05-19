import React, { useState } from 'react'
import { useHighLight } from '../contexts/highLightContext'
import { handleError } from './ErrorMessage'

const TakeHighLightName = ({controls}) => {
  const [isHighLight, setIsHighLight] = useHighLight()
  const [highLightName, setHighLightName] = useState("")

  const [sendHighLight, setSendHighLight] = controls
  const handleNext = () => {
    if (highLightName.trim() === "") {
      handleError("Please enter a highlight name");
      return;
    }
    setSendHighLight((prev) => ({ ...prev, name: highLightName }));
    setIsHighLight("story");
  };

  return (
    <div className='w-[25rem] bg-white rounded-lg shadow-md flex flex-col justify-center items-center relative overflow-hidden'>
        <div className='w-full h-[2.688rem] border-b border-[#dbdbdb] flex items-center justify-center'>New Highlight</div>
        <div className='w-full'>
            <input value={highLightName} onChange={(e) => setHighLightName(e.target.value)} type="text" placeholder='Highlight Name' className='w-[22.5rem] h-[2.438rem] outline-none padding4px12px bg-[#EFEFEF] border-[#dbdbdb] border rounded-[5px] margin20Px' />
        </div>
        <div onClick={handleNext} className='w-full h-[3rem] flex items-center justify-center border-t border-[#dbdbdb] text-[#0095F6] font-bold cursor-pointer'>
            Next
        </div>
    </div>
  )
}

export default TakeHighLightName