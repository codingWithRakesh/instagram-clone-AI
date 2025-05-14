import React from 'react'
import profile from "../assets/images/profile.jpeg"
import { NavLink } from 'react-router-dom'
import noProfile from "../assets/images/profileNot.jpg"
import { useAuthStore } from '../store/authStore.js'

const SuggaFollower = ({user}) => {
    const followUnFollow = useAuthStore((state) => state.followUnFollow);
    const setAllSuggestedUser = useAuthStore((state) => state.setAllSuggestedUser);
    const followUser = async () => {
        await followUnFollow(user?._id);
        await setAllSuggestedUser();
    };
    return (
        <div className="suggaFolCon">
            <NavLink to={`/${user?.userName}`} className="suggImg">
                <img src={user?.profilePic || noProfile} alt="" />
            </NavLink>
            <NavLink to={`/${user?.userName}`} className="suggwir">
                <p className="bold">{user?.userName}</p>
                <p className="nameUs">{user?.fullName}</p>
            </NavLink>
            <div className="followBtn" onClick={followUser}>
                Follow
            </div>
        </div>
    )
}

export default SuggaFollower