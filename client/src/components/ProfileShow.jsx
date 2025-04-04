import React, { useEffect, useState } from 'react'
import { NavLink, useParams } from 'react-router-dom'
import userNotPhoto from "../assets/images/profileNot.jpg"
import { AiOutlineLink } from "react-icons/ai";
import { useAuthStore } from '../store/authStore.js'

const ProfileShow = () => {
    const { profile } = useParams()
    const isLoading = useAuthStore((state) => state.isLoading);
    const fetchSelectedUser = useAuthStore((state) => state.fetchSelectedUser);
    const selectedUser = useAuthStore((state) => state.selectedUser);


    useEffect(() => {
        const fetchUserProfile = async () => {
            fetchSelectedUser(profile)
        }
        fetchUserProfile()
    }, [fetchSelectedUser, profile])

    console.log("userProfile", selectedUser)

    return (
        <div className="profile_box">
            <div className="profilePhoto">
                {selectedUser?.profilePic ? <img src={selectedUser?.profilePic} />
                :
                <img src={userNotPhoto}/>}
            </div>
            <div className="profileBTN">
                <div className="bjdbvjd">
                    <div className="profileBTN_0">
                        {selectedUser?.userName}
                    </div>
                    <NavLink to="/accounts/edit" className="esitPro">Edit profile</NavLink>
                    <button className="viewArch">View Archive</button>

                    <svg aria-label="Options" className="x1lliihq x1n2onr6" color="rgb(0, 0, 0)" fill="rgb(0, 0, 0)" height="24" role="img" viewBox="0 0 24 24" width="24"><title>Options</title><circle cx="12" cy="12" fill="none" r="8.635" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></circle><path d="M14.232 3.656a1.269 1.269 0 0 1-.796-.66L12.93 2h-1.86l-.505.996a1.269 1.269 0 0 1-.796.66m-.001 16.688a1.269 1.269 0 0 1 .796.66l.505.996h1.862l.505-.996a1.269 1.269 0 0 1 .796-.66M3.656 9.768a1.269 1.269 0 0 1-.66.796L2 11.07v1.862l.996.505a1.269 1.269 0 0 1 .66.796m16.688-.001a1.269 1.269 0 0 1 .66-.796L22 12.93v-1.86l-.996-.505a1.269 1.269 0 0 1-.66-.796M7.678 4.522a1.269 1.269 0 0 1-1.03.096l-1.06-.348L4.27 5.587l.348 1.062a1.269 1.269 0 0 1-.096 1.03m11.8 11.799a1.269 1.269 0 0 1 1.03-.096l1.06.348 1.318-1.317-.348-1.062a1.269 1.269 0 0 1 .096-1.03m-14.956.001a1.269 1.269 0 0 1 .096 1.03l-.348 1.06 1.317 1.318 1.062-.348a1.269 1.269 0 0 1 1.03.096m11.799-11.8a1.269 1.269 0 0 1-.096-1.03l.348-1.06-1.317-1.318-1.062.348a1.269 1.269 0 0 1-1.03-.096" fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="2"></path></svg>
                </div>
                <div className="proFollowers">
                    <div className="proPost">
                        <p className="bold">{selectedUser?.postsCount}</p><span>posts</span>
                    </div>
                    <div className="proPost">
                        <p className="bold">{selectedUser?.followersCount}</p><span>followers</span>
                    </div>
                    <div className="proPost">
                        <p className="bold">{selectedUser?.followingCount}</p><span>following</span>
                    </div>
                </div>
                <div className="thred">
                    <p className="bold">{selectedUser?.fullName}</p>
                </div>
                {selectedUser?.bio && <div className="prodrapj">
                    {selectedUser?.bio}
                </div>}
                {selectedUser?.websiteURL && <a href={`https://${selectedUser?.websiteURL}`} target='_blank' className='flex items-center gap-1 ml-2 text-[#00376B] cursor-pointer'>
                    <span>
                        <AiOutlineLink />
                    </span>
                    {selectedUser?.websiteURL}
                </a>}
            </div>
        </div>
    )
}

export default ProfileShow