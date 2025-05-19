import React from 'react'
import noProfile from "../assets/images/profileNot.jpg"
import { useHighLight } from '../contexts/highLightContext'
import { useNavigate } from 'react-router-dom'
import { useNextStory2 } from '../contexts/nextStory2Context'
import { useStoryUserCheck } from '../contexts/userStoryCheckContext'

const ArchiveStorySelected = ({ isUser, item, index }) => {
    const [currentIndex, setCurrentIndex] = useNextStory2()
    const [userStoryCheck, setUserStoryCheck] = useStoryUserCheck();
    const [isHighLight, setIsHighLight] = useHighLight()
    // console.log("item", item?.stories?.[0]?.type)
    const navigate = useNavigate();
    const navigateByLink = () => {
        setCurrentIndex(index);
        navigate(`/stories/${item?.userName}/${item != undefined && item?.stories?.[0]?._id}`);
        setUserStoryCheck("friendArchive");
    }
    return (
        <div className="asgbvsa" onClick={isUser ? () => setIsHighLight("name") : navigateByLink}>
            <div className="plusBTN">
                {isUser ? <svg aria-label="Plus icon" className="x1lliihq x1n2onr6" color="rgb(199, 199, 199)" fill="rgb(199, 199, 199)" height="44" role="img" viewBox="0 0 24 24" width="44"><title>Plus icon</title><path d="M21 11.3h-8.2V3c0-.4-.3-.8-.8-.8s-.8.4-.8.8v8.2H3c-.4 0-.8.3-.8.8s.3.8.8.8h8.2V21c0 .4.3.8.8.8s.8-.3.8-.8v-8.2H21c.4 0 .8-.3.8-.8s-.4-.7-.8-.7z"></path></svg>
                    : item?.stories?.[0]?.type == "image" ? <img src={item?.stories?.[0]?.url} className='w-full h-full object-cover rounded-full' alt="No Profile" />
                        : <video src={item?.stories?.[0]?.url} className='w-full h-full object-cover rounded-full' alt="No Profile" />}
            </div>
            <p>{item?.stories?.[0]?.highLightedTitle || "New"}</p>
        </div>
    )
}

export default ArchiveStorySelected