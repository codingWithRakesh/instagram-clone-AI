import React from 'react'
import profile from "../assets/images/profile.jpeg"
import TimeAgo from './TimeAgo'
import { useAuthStore } from '../store/authStore.js';
import userNotPhoto from "../assets/images/profileNot.jpg"
import { notificationStore } from '../store/notificationStore.js';

const SoloNotification = ({ value, setNotificationAll }) => {
    const followUnFollow = useAuthStore((state) => state.followUnFollow);
    const fetchAllNotification = notificationStore((state) => state.fetchAllNotification);
    const user = useAuthStore((state) => state.user);
    // console.log("user", user._id)
    // console.log("value followUnFollow", value)
    const followUser = async () => {
        await followUnFollow(value?.postSender?.[0]?._id);
        await fetchAllNotification(setNotificationAll)
    };

    const isFollowing = value?.postSender?.[0]?.followingCounts?.some(
        (v) => v?.follower === user?._id
    );
    // console.log("isFollowing", isFollowing)
    return (
        <div className="thisW2">
            <div className="this2Img">
                <img src={value?.postSender?.[0]?.profilePic || userNotPhoto} />
            </div>
            <div className="this2Details">
                <div className='flex gap-2'>
                    <div className='flex flex-wrap leading-tight flex-1 items-center'>
                        <p className=' marginleftR font-bold'>{value?.postSender?.[0]?.userName}</p>
                        {value?.type == "like_post" ? `like your post.` : value?.type == "like_comment" ? `like your comment : ${value?.comment?.[0]?.content}` : value?.type == "comment_post" ? `commented on your post` : value?.type == "follow" ? `started following you` : value?.type == "like_story" ? `like your story` : value?.type == "story_view" ? `viewed your story` : value?.type == "unfollow" ? `unfollowed you` : ""}
                        <p className='marginleftR text-[#737373] text-[12px]'><TimeAgo date={value?.createdAt} /></p>
                    </div>
                </div>
            </div>
            {value?.type == "like_post" || value?.type == "like_comment" || value?.type == "comment_post" || value?.type == "like_story" ||  value?.type == "story_view" ? <div className='h-[3rem] w-[3rem] rounded-[10px] overflow-hidden'>
                {value?.post?.[0]?.image || value?.stories?.[0]?.image ? <img src={value?.post?.[0]?.image || value?.stories?.[0]?.image} className='w-full h-full object-cover' alt="" />
                    :
                    <video src={value?.post?.[0]?.video || value?.stories?.[0]?.video} className='w-full h-full object-cover'></video>
                }
            </div>
                :
            !isFollowing ? <div onClick={followUser} className="h-[2rem] bg-[#3797F0] w-[6.313rem] flex items-center justify-center text-white rounded-[10px] cursor-pointer">
                <button className='cursor-pointer'>Follow</button>
            </div> 
            :
            <div className="h-[2rem] bg-[#EFEFEF] w-[6.313rem] flex items-center justify-center rounded-[10px] cursor-pointer">
                <button className='cursor-pointer'>Following</button>
            </div>}
        </div>
    )
}

export default SoloNotification