import React from 'react'
import SoloNotification from './SoloNotification'

const Notification = () => {
    return (
        <div className="notificationsContaner" id="notificationsContanerId">
            <div className="notificationsLogo">
                <i className="fa-solid fa-less-than"></i>
                Notifications
            </div>
            <div className="thisWeek">
                <div className="thisW1 w2">This week</div>
                <SoloNotification/>
            </div>

            <div className="thisMonth">
                <div className="thisW1 w2">This month</div>
                <SoloNotification/>

            </div>

            <div className="earlier">
                <div className="thisW1 w2">Earlier</div>
                <SoloNotification/>

                <SoloNotification/>

                <SoloNotification/>
                <SoloNotification/>
                <SoloNotification/>
            </div>

        </div>
    )
}

export default Notification