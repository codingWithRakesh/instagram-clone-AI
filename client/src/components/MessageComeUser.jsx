import React from 'react'
import userNotPhoto from "../assets/images/profileNot.jpg"
import { Link, useNavigate, useParams } from 'react-router-dom'
import { messageStore } from '../store/messageStore.js'
import { useEffect } from 'react'
import { useState } from 'react'
import { handleSuccess } from './ErrorMessage.jsx'

const MessageComeUser = ({ value }) => {
    const { id } = useParams()
    const onlineUsers = messageStore((state) => state.onlineUsers);
    const socket = messageStore((state) => state.socket);
    const isOnline = onlineUsers.includes(value._id);
    const [isNewMessage, setIsNewMessage] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (!socket) {
            handleError("socket is not connected");
            return;
        } else {
            handleSuccess("socket is connected");
        }

        const handleNewMessage = (newMessage) => {
            console.log("newMessage.senderId", newMessage.senderId, id)
            if (id !== newMessage.senderId && value._id === newMessage.senderId) {
                setIsNewMessage(true);
                // console.log("newMessage from socket", newMessage)
            }
        };

        socket.on("newMessage", handleNewMessage);

        return () => {
            socket.off("newMessage", handleNewMessage);
        };
    }, [id, value._id]);
    // console.log(value)

    const redirectAndRemove = () => {
        setIsNewMessage(false);
        navigate(`/direct/t/${value._id}`);
    }
    return (
        <div onClick={redirectAndRemove} className={`messcon2_1 relative ${id == value._id ? `bg-[#EFEFEF]` : ""}`}>
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
                {isNewMessage && <div className='bg-[#0095f6] h-[8px] w-[8px] rounded-full'></div>}
            </div>
        </div>
    )
}

export default MessageComeUser