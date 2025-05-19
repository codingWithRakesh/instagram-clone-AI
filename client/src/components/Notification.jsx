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

    useEffect(() => {
        if (!socket) {
            // handleError("socket is not connected");
            return;
        } else {
            // handleSuccess("socket is connected");
        }

        const handleNewMessage = (newMessage) => {
            // console.log("socket message", newMessage?.[0])
            setNotificationAll((prev) => [newMessage?.[0], ...prev])
        };

        socket.on("newNotification", handleNewMessage);

        return () => {
            socket.off("newNotification", handleNewMessage);
        };
    }, [])

    // Filter and sort notifications by time period (newest first)
    const getFilteredNotifications = () => {
        const now = new Date();
        const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        const oneMonthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        
        // Sort all notifications in reverse chronological order first
        const sortedNotifications = [...notificationAll].sort((a, b) => {
            return new Date(b.createdAt) - new Date(a.createdAt);
        });

        const thisWeek = [];
        const thisMonth = [];
        const earlier = [];
        
        sortedNotifications.forEach(notification => {
            if (!notification.createdAt) return;
            
            const notificationDate = new Date(notification.createdAt);
            
            if (notificationDate >= oneWeekAgo) {
                thisWeek.push(notification);
            } else if (notificationDate >= oneMonthAgo) {
                thisMonth.push(notification);
            } else {
                earlier.push(notification);
            }
        });
        
        return { thisWeek, thisMonth, earlier };
    };
    
    const { thisWeek, thisMonth, earlier } = getFilteredNotifications();

    return (
        <div className="notificationsContaner" id="notificationsContanerId">
            <div className="notificationsLogo">
                <i className="fa-solid fa-less-than"></i>
                Notifications
            </div>
            
            {thisWeek.length > 0 && (
                <div className="thisWeek">
                    <div className="thisW1 w2">This week</div>
                    {thisWeek.map((v, i) => (
                        <SoloNotification value={v} key={`week-${i}`} setNotificationAll={setNotificationAll} />
                    ))}
                </div>
            )}
            
            {thisMonth.length > 0 && (
                <div className="thisMonth">
                    <div className="thisW1 w2">This month</div>
                    {thisMonth.map((v, i) => (
                        <SoloNotification value={v} key={`month-${i}`} setNotificationAll={setNotificationAll} />
                    ))}
                </div>
            )}
            
            {earlier.length > 0 && (
                <div className="earlier">
                    <div className="thisW1 w2">Earlier</div>
                    {earlier.map((v, i) => (
                        <SoloNotification value={v} key={`earlier-${i}`} setNotificationAll={setNotificationAll} />
                    ))}
                </div>
            )}

            {notificationAll.length === 0 && (
                <div className="no-notifications w-full h-[90%] flex items-center justify-center text-gray-500">
                    No notifications available
                </div>
            )}
        </div>
    )
}

export default Notification