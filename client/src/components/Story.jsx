import React from 'react'
import profile from "../assets/images/profile.jpeg"
import { NavLink } from 'react-router-dom'

const Story = () => {
    return (
        <NavLink to="stories/tarapada_90/adfjahfbdkajd" className="image-item">
            <div className="sta">
                <img src={profile} alt="status" />
            </div>
            <div className="wri">tarapada_90</div>
        </NavLink>
    )
}

export default Story