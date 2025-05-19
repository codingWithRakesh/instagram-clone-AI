import React, { useEffect, useState } from 'react';
import profile from "../assets/images/profile.jpeg";
import { FaArrowLeft } from "react-icons/fa6";
import { postStore } from '../store/postStore.js';
import { useEditPost } from '../contexts/editPostContext.jsx';
import { usePostData } from '../contexts/postDataContext.jsx';
import { BsStars } from "react-icons/bs";
import Tesseract from 'tesseract.js';
import { RxCross2 } from "react-icons/rx";
import { useAuthStore } from '../store/authStore.js';
import { useStoryOrPost } from '../contexts/storyOrPostContext.jsx';
import storyStore from '../store/storyStore.js';
import noProfile from "../assets/images/profileNot.jpg"
import { GoogleGenerativeAI } from "@google/generative-ai";
import { handleError } from './ErrorMessage.jsx';

const EditPost = () => {
    const [postData] = usePostData();
    const [showfile, setShowfile] = useState(null);
    const [localContent, setLocalContent] = useState('');
    const [localTaggedUsers, setLocalTaggedUsers] = useState([]); // Array of user IDs
    const [searchTerm, setSearchTerm] = useState('');
    const [isInitialized, setIsInitialized] = useState(false);
    const setAllFollowersUser = useAuthStore((state) => state.setAllFollowersUser);
    const allFollowersUser = useAuthStore((state) => state.allFollowersUser);
    const [isStoryOrPost, setIsStoryOrPost] = useStoryOrPost();
    const user = useAuthStore((state) => state.user);

    const uploadPost = postStore((state) => state.uploadPost);
    const fetchPostForEdit = postStore((state) => state.fetchPostForEdit);
    // const editPostValue = postStore((state) => state.editPostValue);
    const submitEditPost = postStore((state) => state.submitEditPost);
    const uploadStory = storyStore((state) => state.uploadStory);
    const [checktab, setChecktab] = useEditPost();
    const [text, setText] = useState('');
    const [editPostValue, setEditPostValue] = useState(null)

    // console.log("allFollowersUser",allFollowersUser)
    const allUsers = allFollowersUser || [];

    const filteredUserOptions = allUsers.filter(
        (user) =>
            user?.userName?.toLowerCase()?.includes(searchTerm.toLowerCase()) &&
            !localTaggedUsers.includes(user._id)
    );

    const handleSelectUser = (user) => {
        setLocalTaggedUsers([...localTaggedUsers, user._id]);
        setSearchTerm('');
    };

    const handleRemoveUser = (userId) => {
        setLocalTaggedUsers(localTaggedUsers.filter((id) => id !== userId));
    };

    useEffect(() => {
        setAllFollowersUser();
        if (checktab.postId) {
            fetchPostForEdit(checktab.postId, setEditPostValue);
        } else {
            setLocalContent(postData.content || '');
            setLocalTaggedUsers(postData.taggedUsers || []);
        }
    }, []);

    useEffect(() => {
        if (editPostValue && !isInitialized) {
            setShowfile(editPostValue.image || editPostValue.video || "");
            setLocalContent(editPostValue.content || "");
            setLocalTaggedUsers(editPostValue.taggedUsers || []);
            setIsInitialized(true);
        }
    }, [editPostValue, isInitialized]);

    const fileToText = async () => {
        try {
            const result = await Tesseract.recognize(postData.file, 'eng', {
                logger: (m) => console.log(m),
            });
            setText(result.data.text);
        } catch (error) {
            console.error('OCR Error:', error);
            setText('Failed to extract text.');
        }
    };

    useEffect(() => {
        let objectUrl;
        const file = postData.file;
        if (file instanceof File) {
            objectUrl = URL.createObjectURL(file);
            setShowfile(objectUrl);
        }
        return () => {
            if (objectUrl) {
                URL.revokeObjectURL(objectUrl);
            }
        };
    }, [postData.file]);

    const fetchImageTitle = async () => {
       try {
            const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API);
            const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

            const prompt = `
                You are a social media expert. Randomly pick one style from the list below and generate only one Instagram bio in that style. Output only the bio — no extra text, no style name, no follow-up.
                Styles:
                1. Attitude  
                2. Cute  
                3. Motivational  
                4. Funny  
                5. Aesthetic  
                6. Savage  
                7. Professional  
                8. Romantic  
                9. Traveler  
                10. Gamer/Techie

                The bio must:
                - Be under 150 characters
                - Match the chosen style
                - Be creative and original
                - Use emojis only if they enhance the tone

                IMPORTANT: Only output the bio text. Do not mention the style or anything else.
            `;
            const result = await model.generateContent(prompt);
            // console.log("AI response:", result.response.text());
            setLocalContent(result.response.text());
            // setTitle(result.response.text());
        } catch (error) {
            console.error("Error generating AI response:", error);
            handleError("Failed to get a response.");
            // setTitle("Failed to get a response.");
        }

    };

    const submitPostData = async () => {
        const formData = new FormData();
        formData.append('content', localContent);
        formData.append('taggedUsers', JSON.stringify(localTaggedUsers)); // Array of strings
        formData.append('file', postData.file);
        // console.log(localTaggedUsers);
        uploadPost(formData);
        setTimeout(() => {
            setChecktab({ value: "done", postId: null });
        }, 500);
    };

    const submitStoryData = async () => {
        const formData = new FormData();
        formData.append('text', localContent);
        formData.append('file', postData.file);
        uploadStory(formData);
        setTimeout(() => {
            setChecktab({ value: "done", postId: null });
        }, 500);
    }

    const editPostData = async () => {
        const data = {
            postId: checktab.postId,
            content: localContent,
            taggedUsers: localTaggedUsers
        };
        await submitEditPost(data);
        setTimeout(() => {
            setChecktab({ value: "done", postId: checktab.postId });
        }, 500);
    };

    const file = postData.file;
    const isVideo = showfile?.includes(".mp4") || file?.type?.startsWith("video/");
    const isImage = showfile?.includes(".jpg") || showfile?.includes(".jpeg") || showfile?.includes(".png") || file?.type?.startsWith("image/");

    return (
        <div className='w-[60rem] h-[42rem] bg-white flex flex-col items-center justify-center rounded-2xl overflow-hidden'>
            <div className="navTopEdit w-full h-[2.6rem] flex items-center justify-between paddingLeftRight border-b border-[#ECF3FF]">
                <div className="iconBack cursor-pointer">
                    <FaArrowLeft />
                </div>
                <p className='font-bold'>Create new {isStoryOrPost}</p>
                <button
                    className='text-[#0095F6] cursor-pointer'
                    onClick={isStoryOrPost === "post" ? (checktab.postId ? editPostData : submitPostData) : submitStoryData}
                >
                    Share
                </button>
            </div>

            <div className="contentEdit w-full h-[39.4rem] flex-1 flex items-start justify-start">
                <div className="imgVideoShow flex-1 flex items-center justify-center h-full bg-[rgba(0,0,0,.05)]">
                    {isVideo ? (
                        <video src={showfile} controls className="w-full h-full object-contain" />
                    ) : isImage ? (
                        <img src={showfile} className="w-full h-full object-contain" alt="Post" />
                    ) : (
                        <p>No preview available</p>
                    )}
                </div>

                <div className="controlPostEdit w-[21.188rem] h-full border-l border-[#ECF3FF]">
                    <div className="profileBox w-full h-[3rem] marginTop1rem flex items-center justify-start">
                        <div className='h-[1.75rem] w-[1.75rem] rounded-full overflow-hidden marginLeftRight1rem'>
                            <img src={user?.profilePic || noProfile} className='h-full w-full object-cover' alt="" />
                        </div>
                        <p className='font-bold'>{user?.userName || "Unknown"}</p>
                    </div>

                    <div className="inputBox w-full h-[10.5rem] border-b border-[#ECF3FF] relative">
                        <textarea
                            onChange={(e) => setLocalContent(e.target.value)}
                            value={localContent}
                            className="resize-none w-full h-full outline-none paddingleftRight"
                            placeholder={`Enter ${isStoryOrPost.charAt(0).toUpperCase() + isStoryOrPost.slice(1)} Title`}
                        />
                        <div onClick={fetchImageTitle} className='absolute boxShadowAI top-0 bg-white right-[1rem] w-[2rem] h-[2rem] flex items-center justify-center rounded-full cursor-pointer'>
                            <BsStars />
                        </div>
                    </div>

                    {isStoryOrPost === "post" && <div className="inputBox paddingAll w-full h-[13.5rem] flex flex-col border-b border-[#ECF3FF] outline-none relative px-2 pt-2">
                        <div className='w-full h-[2rem] flex gap-2 marginBottomLL'>
                            <p>Tag: </p>
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder="Search & tag usernames..."
                                className=" flex-1 paddingForSerchUser border border-[#dbdbdb] h-[1.75rem] rounded-md bg-[#F5F5F5] text-sm mb-2 outline-none"
                            />
                        </div>

                        {searchTerm && filteredUserOptions.length > 0 && (
                            <ul className="absolute z-10 top-[3rem] bg-white border border-gray-200 rounded-md shadow-md w-[90%] max-h-44 overflow-y-auto mt-1 suggasonUL">
                                {filteredUserOptions.map((user) => (
                                    <li
                                        key={user._id}
                                        onClick={() => handleSelectUser(user)}
                                        className="px-4 py-2 cursor-pointer hover:bg-gray-100 text-sm"
                                    >
                                        {user.userName}
                                    </li>
                                ))}
                            </ul>
                        )}

                        <div className="flex flex-wrap gap-2 mb-2">
                            {localTaggedUsers.map((userId) => {
                                const user = allUsers.find((u) => u._id === userId);
                                return (
                                    <div key={userId} className="bg-blue-500 text-white text-[.9rem] paddingInTagusre rounded-[5px] flex items-center gap-2">
                                        {user?.userName}
                                        <button
                                            className="ml-2 hover:text-gray-200 cursor-pointer"
                                            onClick={() => handleRemoveUser(userId)}
                                        >
                                            <RxCross2 />
                                        </button>
                                    </div>
                                );
                            })}
                        </div>

                        {/* <textarea
                            value={JSON.stringify(localTaggedUsers, null, 2)}
                            readOnly
                            className="mt-2 resize-none w-full h-[5rem] outline-none text-xs text-gray-500 bg-gray-100 p-2 rounded-md"
                            placeholder="Tagged user IDs"
                        /> */}
                    </div>}
                </div>
            </div>
        </div>
    );
};

export default EditPost;
