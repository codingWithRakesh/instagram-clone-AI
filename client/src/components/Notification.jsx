import React, { useEffect, useState } from 'react'
import SoloNotification from './SoloNotification'
import { notificationStore } from '../store/notificationStore.js';
import { messageStore } from '../store/messageStore.js';
import { handleError, handleSuccess } from './ErrorMessage.jsx';

const Notification = () => {
    const fetchAllNotification = notificationStore((state) => state.fetchAllNotification);
    const allNotification = notificationStore((state) => state.allNotification);
    const socket = messageStore((state) => state.socket);
    const [notificationAll, setNotificationAll] = useState([])
    useEffect(() => {
        fetchAllNotification(setNotificationAll)
    }, [])

    // setNotificationAll(allNotification?.notifications)

    useEffect(() => {
        if (!socket) {
            handleError("socket is not connected");
            return;
        } else {
            handleSuccess("socket is connected");
        }

        const handleNewMessage = (newMessage) => {
            console.log("socket message", newMessage?.[0])
            setNotificationAll((prv) => [...prv, newMessage?.[0]])
        };

        socket.on("newNotification", handleNewMessage);

        return () => {
            socket.off("newNotification", handleNewMessage);
        };
    }, [])



    // console.log("allNotification", notificationAll)

    return (
        <div className="notificationsContaner" id="notificationsContanerId">
            <div className="notificationsLogo">
                <i className="fa-solid fa-less-than"></i>
                Notifications
            </div>
            <div className="thisWeek">
                <div className="thisW1 w2">This week</div>
                {[...notificationAll]?.reverse().map((v, i) => (
                    <SoloNotification value={v} key={i} />
                ))}
                {/* <SoloNotification /> */}
            </div>

            <div className="thisMonth">
                <div className="thisW1 w2">This month</div>
                <SoloNotification />

            </div>

            <div className="earlier">
                <div className="thisW1 w2">Earlier</div>
                <SoloNotification />

                <SoloNotification />

                <SoloNotification />
                <SoloNotification />
                <SoloNotification />
            </div>

        </div>
    )
}

export default Notification