import React from 'react'
import profile from "../assets/images/profile.jpeg"

const Story = () => {
    return (
        <div className="image-item">
            <div className="sta">
                <img src={profile} alt="status" />
            </div>
            <div className="wri">tarapada_90</div>
        </div>
    )
}

export default Story