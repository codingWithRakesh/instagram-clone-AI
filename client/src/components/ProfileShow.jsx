import React, { useEffect, useState } from 'react'
import profileIMG from "../assets/images/profile.jpeg"
import { NavLink, useParams } from 'react-router-dom'
import axios from 'axios'
import { setUserProfile } from '../redux/authSlice'
import { useDispatch, useSelector } from 'react-redux'
import { handleError, handleSuccess } from './ErrorMessage'
import { FaRegUser } from 'react-icons/fa6'
import userNotPhoto from "../assets/images/profileNot.jpg"
import { AiOutlineLink } from "react-icons/ai";

const ProfileShow = () => {
    const { profile } = useParams()
    const dispatch = useDispatch()
    // const { userProfile } = useSelector(store => store.auth);
    const [userProfile, setUserProfile] = useState("")

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_CORS_ORIGIN_SERVER_USER}/userProfile/${profile}`,
                    {
                        withCredentials: true,
                    }
                );

                dispatch(setUserProfile(response.data.data));
                setUserProfile(response.data.data)
                console.log("user profile from URL", response.data.data)
            } catch (error) {
                console.error('Error:', error.response?.data?.message || error.message);
                handleError(error.response?.data?.message || error.message);
            }
        }
        fetchUserProfile()
    }, [])

    console.log("userProfile", userProfile)

    return (
        <div className="profile_box">
            <div className="profilePhoto">
                {userProfile.profilePic ? <img src={userProfile.profilePic} />
                :
                <img src={userNotPhoto}/>}
            </div>
            <div className="profileBTN">
                <div className="bjdbvjd">
                    <div className="profileBTN_0">
                        {userProfile.userName}
                    </div>
                    <NavLink to="/accounts/edit" className="esitPro">Edit profile</NavLink>
                    <button className="viewArch">View Archive</button>

                    <svg aria-label="Options" className="x1lliihq x1n2onr6" color="rgb(0, 0, 0)" fill="rgb(0, 0, 0)" height="24" role="img" viewBox="0 0 24 24" width="24"><title>Options</title><circle cx="12" cy="12" fill="none" r="8.635" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></circle><path d="M14.232 3.656a1.269 1.269 0 0 1-.796-.66L12.93 2h-1.86l-.505.996a1.269 1.269 0 0 1-.796.66m-.001 16.688a1.269 1.269 0 0 1 .796.66l.505.996h1.862l.505-.996a1.269 1.269 0 0 1 .796-.66M3.656 9.768a1.269 1.269 0 0 1-.66.796L2 11.07v1.862l.996.505a1.269 1.269 0 0 1 .66.796m16.688-.001a1.269 1.269 0 0 1 .66-.796L22 12.93v-1.86l-.996-.505a1.269 1.269 0 0 1-.66-.796M7.678 4.522a1.269 1.269 0 0 1-1.03.096l-1.06-.348L4.27 5.587l.348 1.062a1.269 1.269 0 0 1-.096 1.03m11.8 11.799a1.269 1.269 0 0 1 1.03-.096l1.06.348 1.318-1.317-.348-1.062a1.269 1.269 0 0 1 .096-1.03m-14.956.001a1.269 1.269 0 0 1 .096 1.03l-.348 1.06 1.317 1.318 1.062-.348a1.269 1.269 0 0 1 1.03.096m11.799-11.8a1.269 1.269 0 0 1-.096-1.03l.348-1.06-1.317-1.318-1.062.348a1.269 1.269 0 0 1-1.03-.096" fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="2"></path></svg>
                </div>
                <div className="proFollowers">
                    <div className="proPost">
                        <p className="bold">{userProfile.postsCount}</p><span>posts</span>
                    </div>
                    <div className="proPost">
                        <p className="bold">{userProfile.followersCount}</p><span>followers</span>
                    </div>
                    <div className="proPost">
                        <p className="bold">{userProfile.followingCount}</p><span>following</span>
                    </div>
                </div>
                <div className="thred">
                    <p className="bold">{userProfile.fullName}</p>
                </div>
                <div className="prodrapj">
                    {userProfile.bio || "00100001 00100001 01110101 01101110 01100100 01100101 01100110 01101001 01101110 01100101 01100100"}
                </div>
                <a href={`https://${userProfile.websiteURL}`} target='_blank' className='flex items-center gap-1 ml-2 text-[#00376B] cursor-pointer'>
                    <span>
                        <AiOutlineLink />
                    </span>
                    {userProfile.websiteURL}
                </a>
            </div>
        </div>
    )
}

export default ProfileShow