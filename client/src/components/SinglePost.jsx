import React from 'react'
import profile from "../assets/images/profile.jpeg"

const SinglePost = () => {
    return (
        <div className="imagesPro">
            <img src={profile} alt="" />
            <div className="imagesPro_0">
                <div className="lijdjcs"><i className="fa-solid fa-heart"></i> 6,101</div>
                <div className="lijdjcs"><i className="fa-solid fa-comment fa-flip-horizontal"></i> 389</div>
            </div>
        </div>
    )
}

export default SinglePost