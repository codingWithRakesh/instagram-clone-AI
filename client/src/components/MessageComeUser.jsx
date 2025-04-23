import React from 'react'
import userNotPhoto from "../assets/images/profileNot.jpg"
import { Link, useParams } from 'react-router-dom'
import { messageStore } from '../store/messageStore.js'

const MessageComeUser = ({value}) => {
    const {id} = useParams()
    const onlineUsers = messageStore((state) => state.onlineUsers);
    const isOnline = onlineUsers.includes(value._id);
    // console.log(value)
    return (
        <Link to={`/direct/t/${value._id}`} className={`messcon2_1 relative ${id == value._id ? `bg-[#EFEFEF]` : ""}`}>
            <div className="messImg relative">
                <img src={value.profilePic ? value.profilePic : userNotPhoto} alt="" />
                {isOnline && <div className='showOnlineuser absolute h-[1.15rem] w-[1.15rem] bg-white bottom-[0rem] right-[0rem] rounded-full flex items-center justify-center'>
                    <div className='h-[.8rem] w-[.8rem] bg-green-500 rounded-full'></div>
                </div>}
            </div>
            <div className="messText">
                <div className="messText_1">
                    {value.userName}
                </div>
                {/* <div className="messText_2">
                    Active 46 m ago
                </div> */}
            </div>
            <div className=' h-full w-[1rem] absolute right-8 top-0 flex items-center justify-center'>
                <div className='bg-[#0095f6] h-[8px] w-[8px] rounded-full'></div>
            </div>
        </Link>
    )
}

export default MessageComeUser