import React from 'react'
import userNotPhoto from "../assets/images/profileNot.jpg"
import { Link, useParams } from 'react-router-dom'

const MessageComeUser = ({value}) => {
    const {id} = useParams()
    console.log(value)
    return (
        <Link to={`/direct/t/${value._id}`} className={`messcon2_1 ${id == value._id ? `bg-[#EFEFEF]` : ""}`}>
            <div className="messImg">
                <img src={value.profilePic ? value.profilePic : userNotPhoto} alt="" />
            </div>
            <div className="messText">
                <div className="messText_1">
                    {value.userName}
                </div>
                {/* <div className="messText_2">
                    Active 46 m ago
                </div> */}
            </div>
        </Link>
    )
}

export default MessageComeUser