import React from 'react'
import profile from "../assets/images/profile.jpeg"
import TimeAgo from './TimeAgo'

const SoloNotification = ({ value }) => {
    console.log("value", value)
    return (
        <div className="thisW2">
            <div className="this2Img">
                <img src={value?.postSender?.[0]?.profilePic} />
            </div>
            <div className="this2Details">
                <div className='flex gap-2'>
                    <div className='flex flex-wrap leading-tight flex-1 items-center'>
                        <p className=' marginleftR font-bold'>{value?.postSender?.[0]?.userName}</p>
                        {value?.type == "like_post" ? `like your post.` : value?.type == "like_comment" ? `like your comment : ${value?.comment?.[0]?.content}` : value?.type == "comment_post" ? `commented on your post` : value?.type == "follow" ? `started following you` : ""}
                        <p className='marginleftR text-[#737373] text-[12px]'><TimeAgo date={value?.createdAt} /></p>
                    </div>
                </div>
            </div>
            {value?.type == "like_post" || value?.type == "like_comment" || value?.type == "comment_post" ? <div className='h-[3rem] w-[3rem] rounded-[10px] overflow-hidden'>
                {value?.post?.[0]?.image ? <img src={value?.post?.[0]?.image} className='w-full h-full object-cover' alt="" />
                    :
                    <video src={value?.post?.[0]?.video} className='w-full h-full object-cover'></video>
                }
            </div>
                :
            <div className="h-[2rem] w-[6.313rem] flex items-center justify-center bg-[#EFEFEF] rounded-[10px]">
                <button>Following</button>
            </div>}
        </div>
    )
}

export default SoloNotification