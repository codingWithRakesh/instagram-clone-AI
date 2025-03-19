import React from 'react'
import profile from "../assets/images/profile.jpeg"

const SoloNotification = () => {
    return (
        <div className="thisW2">
            <div className="this2Img">
                <img src={profile}/>
            </div>
            <div className="this2Details">
                <p>
                    <span>tarapada_78</span>
                    is on instagram.
                    <span>tarapada_55</span>
                    and 3 others also follow them.
                    <span>1d</span>
                </p>
            </div>
            <div className="followBtn">
                <button>Follow</button>
            </div>
        </div>
    )
}

export default SoloNotification