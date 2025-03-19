import React from 'react'
import profile from "../assets/images/profile.jpeg"

const SuggaFollower = () => {
    return (
        <div className="suggaFolCon">
            <div className="suggImg">
                <img src={profile} alt="" />
            </div>
            <div className="suggwir">
                <p className="bold">tarapaga_90</p>
                <p className="nameUs">tapada_89</p>
            </div>
            <div className="followBtn">
                Follow
            </div>
        </div>
    )
}

export default SuggaFollower