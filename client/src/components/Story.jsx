import React from 'react'
import profile from "../assets/images/profile.jpeg"
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { useStoryOrPost } from '../contexts/storyOrPostContext';
import { useUpload } from '../contexts/uploadContext';
import noProfile from "../assets/images/profileNot.jpg"
import {shortenText} from "../constants/constant.js"
import { useNextStory2 } from '../contexts/nextStory2Context.jsx';
import { useStoryUser } from '../contexts/storyUserContext.jsx';
import { useAuthStore } from '../store/authStore.js';
import { useStoryUserCheck } from '../contexts/userStoryCheckContext.jsx';
import storyStore from '../store/storyStore.js';

const Story = ({ isClick, isUser, value, index }) => {
    // console.log("value", value != undefined && value)
    const [currentIndex, setCurrentIndex] = useNextStory2()
    const location = useLocation();
    const [, setIsCreatVisible] = useUpload();
    const [isStoryOrPost, setIsStoryOrPost] = useStoryOrPost();
    const [userStoriesAll, setUserStoriesAll] = useStoryUser();
    const [userStoryCheck, setUserStoryCheck] = useStoryUserCheck();
    const user = useAuthStore((state) => state.user);
    const userStorys = storyStore((state) => state.userStorys);

    const navigate = useNavigate();
    const navigateByLink = () => {
        setCurrentIndex(index);
        navigate(`/stories/${value?.userName}/${value != undefined && value?.stories?.[0]?._id}`);
        setUserStoryCheck("friendStories");
    }

    const navigateUserLink = () => {
        userStorys(user.userName,setUserStoriesAll);
        setCurrentIndex(0);
        navigate(`/stories/${user?.userName}/${userStoriesAll?.[0]?.stories?.[0]?._id}`);
        setUserStoryCheck("userStories");
    }

    const uploadStory = () => {
        setIsCreatVisible((v) => !v);
        setIsStoryOrPost("story");
    }

    // console.log("value from story", value != undefined && value?.stories?.[0]?._id)
    return (
        isClick ? <div className="image-item">
            <div className={`sta ${value ? `backgroundLikeInsta` : ""}`}>
                <img src={isUser ? user?.profilePic || noProfile : value?.profilePic || noProfile} alt="status" onClick={isUser ? userStoriesAll?.[0]?.stories?.length ? navigateUserLink : ()=>{} : navigateByLink} />
                {isUser && <div onClick={uploadStory} className='absolute bottom-0 right-1 h-[1.3rem] w-[1.3rem] bg-white rounded-full  border border-white flex items-center justify-center'>
                    <svg aria-label="Plus icon" class="x1lliihq x1n2onr6 x173jzuc text-blue-500" fill="currentColor" height="16" role="img" viewBox="0 0 24 24" width="16"><title>Plus icon</title><path d="M12.001.504a11.5 11.5 0 1 0 11.5 11.5 11.513 11.513 0 0 0-11.5-11.5Zm5 12.5h-4v4a1 1 0 0 1-2 0v-4h-4a1 1 0 1 1 0-2h4v-4a1 1 0 1 1 2 0v4h4a1 1 0 0 1 0 2Z"></path></svg>
                </div>}
            </div>
            <div className="wri">{!isUser ? (value?.userName ? shortenText(value?.userName) : `tarapada_90`) : "Your story"}</div>
        </div>
            :
            <div className={`imageCenter ${location.pathname === "/" ? `h-[5rem] w-[5rem]` : ""}`}>
                <div className={`sta ${!isUser ? `backgroundLikeInsta` : ""}`}>
                    <img src={value?.profilePic || noProfile} alt="status" onClick={isUser ? uploadStory : ""} />
                    {isUser && <div onClick={uploadStory} className='absolute bottom-0 right-1 h-[1.3rem] w-[1.3rem] bg-white rounded-full  border border-white flex items-center justify-center'>
                        <svg aria-label="Plus icon" class="x1lliihq x1n2onr6 x173jzuc text-blue-500" fill="currentColor" height="16" role="img" viewBox="0 0 24 24" width="16"><title>Plus icon</title><path d="M12.001.504a11.5 11.5 0 1 0 11.5 11.5 11.513 11.513 0 0 0-11.5-11.5Zm5 12.5h-4v4a1 1 0 0 1-2 0v-4h-4a1 1 0 1 1 0-2h4v-4a1 1 0 1 1 2 0v4h4a1 1 0 0 1 0 2Z"></path></svg>
                    </div>}
                </div>
                <div className={`wri ${location.pathname !== "/" ? "overWriteFont text-white" : ""}`}>{!isUser ? (value?.userName ? shortenText(value?.userName) : `tarapada_90`) : "Your story"}</div>
            </div>
    )
}

export default Story