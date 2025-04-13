import React from 'react'
import profile from "../assets/images/profile.jpeg"
import { Link } from 'react-router-dom'

const MessageComeUser = () => {
    return (
        <Link to="/direct/t/dnfsfkfjk" className="messcon2_1">
            <div className="messImg">
                <img src={profile} alt="" />
            </div>
            <div className="messText">
                <div className="messText_1">
                    ishan 89
                </div>
                {/* <div className="messText_2">
                    Active 46 m ago
                </div> */}
            </div>
        </Link>
    )
}

export default MessageComeUser