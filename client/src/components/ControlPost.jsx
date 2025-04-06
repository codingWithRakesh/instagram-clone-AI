import React from 'react'
import { useControl } from '../contexts/controlContext'

const ControlPost = () => {
    const [control, setControl] = useControl()
  return (
    <div className='w-[24rem] overflow-hidden bg-white rounded-2xl flex flex-col items-start justify-start'>
        <div className='w-full h-[3rem] flex items-center justify-center gap-2 border-b text-[#ED4956] font-bold cursor-pointer border-[#eaeaea]'>
            Delete
        </div>
        <div className='w-full h-[3rem] flex items-center justify-center gap-2 border-b text-[#000] cursor-pointer border-[#eaeaea]'>
            Edit
        </div>
        <div onClick={()=>setControl((v)=>!v)} className='w-full h-[3rem] flex items-center justify-center gap-2 border-b text-[#000] cursor-pointer border-[#eaeaea]'>
            Cancel
        </div>
    </div>
  )
}

export default ControlPost