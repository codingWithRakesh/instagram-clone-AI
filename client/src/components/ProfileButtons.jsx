import React from 'react';
import { useAuthStore } from '../store/authStore.js';
import { NavLink, useParams } from 'react-router-dom';

const ProfileButtons = ({ selectedUser }) => {
    const user = useAuthStore((state) => state.user);
    const followUnFollow = useAuthStore((state) => state.followUnFollow);
    const fetchSelectedUser = useAuthStore((state) => state.fetchSelectedUser);
    const { profile } = useParams()

    const isOwnProfile = selectedUser?.userName === user?.userName;
    const isFollowing = selectedUser?.followersCounts?.some(
        (v) => v?.follower === user?._id
    );

    const followUser = async () => {
        await followUnFollow(selectedUser?._id);
        await fetchSelectedUser(profile)
    };

    if (isOwnProfile) {
        return (
            <>
                <NavLink to="/accounts/edit" className="esitPro">Edit Profile</NavLink>
                <button className="viewArch">View Archive</button>
            </>
        );
    }

    return (
        isFollowing ? (
            <>
                <button onClick={followUser} className="esitPro">Unfollow</button>
                <button className="viewArch">Message</button>
            </>
        ) : (
            <button onClick={followUser} className="forFollow">Follow</button>
        )
    );
};

export default ProfileButtons;
