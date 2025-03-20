import React from 'react'
import profile from "../assets/images/profile.jpeg"

const MessageComeUser = () => {
    return (
        <div className="messcon2_1">
            <div className="messImg">
                <img src={profile} alt="" />
            </div>
            <div className="messText">
                <div className="messText_1">
                    ishan 89
                </div>
                <div className="messText_2">
                    Active 46 m ago
                </div>
            </div>
        </div>
    )
}

export default MessageComeUser