import React from 'react';
import { useAuthStore } from '../store/authStore.js';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { useChatList } from '../contexts/chatListContext.jsx';

const ProfileButtons = ({ selectedUser }) => {
    const user = useAuthStore((state) => state.user);
    const followUnFollow = useAuthStore((state) => state.followUnFollow);
    const fetchSelectedUser = useAuthStore((state) => state.fetchSelectedUser);
    const { profile } = useParams()
    const [chatList, setChatList] = useChatList()
    const navigate = useNavigate()

    const isOwnProfile = selectedUser?.userName === user?.userName;
    const isFollowing = selectedUser?.followersCounts?.some(
        (v) => v?.follower === user?._id
    );

    const followUser = async () => {
        await followUnFollow(selectedUser?._id);
        await fetchSelectedUser(profile)
    };

    const sendMessage = () => {
        const { fullName, profilePic, userName, _id } = selectedUser;
        console.log("profile", { fullName, profilePic, userName, _id });
    
        setChatList((prevChatList) => {
            const alreadyInChat = prevChatList.some(user => user._id === _id);
            if (!alreadyInChat) {
                return [...prevChatList, { fullName, profilePic, userName, _id }];
            }
            return prevChatList;
        });
    
        navigate(`/direct/t/${_id}`);
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
                <button onClick={sendMessage} className="viewArch">Message</button>
            </>
        ) : (
            <button onClick={followUser} className="forFollow">Follow</button>
        )
    );
};

export default ProfileButtons;
