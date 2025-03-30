import React from 'react'
import profile from "../assets/images/profile.jpeg"
import { NavLink } from 'react-router-dom'

const Story = ({ isClick }) => {
    return (
        isClick ? <NavLink to="stories/tarapada_90/adfjahfbdkajd" className="image-item">
            <div className="sta">
                <img src={profile} alt="status" />
            </div>
            <div className="wri">tarapada_90</div>
        </NavLink> 
        :
        <div to="stories/tarapada_90/adfjahfbdkajd" className="image-item">
            <div className="sta">
                <img src={profile} alt="status" />
            </div>
            <div className="wri">tarapada_90</div>
        </div>
    )
}

export default Story