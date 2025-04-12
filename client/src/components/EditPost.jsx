import React, { useEffect, useState } from 'react'
import profile from "../assets/images/profile.jpeg"
import { FaArrowLeft } from "react-icons/fa6";
import { postStore } from '../store/postStore.js';
import { useEditPost } from '../contexts/editPostContext.jsx';
import { usePostData } from '../contexts/postDataContext.jsx';

const EditPost = () => {
    const [postData, setPostData] = usePostData();
    const [showfile, setShowfile] = useState(null);
    const [localContent, setLocalContent] = useState('');
    const [localTaggedUsers, setLocalTaggedUsers] = useState('');

    const uploadPost = postStore((state) => state.uploadPost);
    const fetchPostForEdit = postStore((state) => state.fetchPostForEdit);
    const editPostValue = postStore((state) => state.editPostValue);
    const submitEditPost = postStore((state) => state.submitEditPost);
    const [checktab, setChecktab] = useEditPost();

    useEffect(() => {
        if (checktab.postId) {
            fetchPostForEdit(checktab.postId);
        } else {
            const file = postData.file;
            if (file instanceof File) {
                setShowfile(URL.createObjectURL(file));
            }
            setLocalContent(postData.content || '');
            setLocalTaggedUsers(postData.taggedUsers || []);
        }
    }, []);

    useEffect(() => {
        if (editPostValue) {
            setShowfile(editPostValue.image || "");
            setLocalContent(editPostValue.content || "");
            setLocalTaggedUsers(editPostValue.taggedUsers || []);
        }
    }, [editPostValue]);


    const submitPostData = async () => {
        const formData = new FormData();
        formData.append('content', localContent);
        formData.append('taggedUsers', JSON.stringify(localTaggedUsers));
        formData.append('file', postData.file);

        uploadPost(formData);

        setTimeout(() => {
            setChecktab({
                value: "done",
                postId: null
            });
        }, 500);
    };

    const editPostData = async () => {
        const data = {
            postId: checktab.postId,
            content: localContent,
            taggedUsers: localTaggedUsers
        };

        await submitEditPost(data);

        setTimeout(() => {
            setChecktab({
                value: "done",
                postId: checktab.postId
            });
        }, 500);
    };

    // Helper function to generate preview URL
    const file = postData.file;
    const fileURL = showfile || (file instanceof File ? URL.createObjectURL(file) : file);
    const isVideo = file && file.type?.startsWith('video/');
    const isImage = file && file.type?.startsWith('image/');


    return (
        <div className='w-[60rem] h-[42rem] bg-white flex flex-col items-center justify-center rounded-2xl overflow-hidden'>
            <div className="navTopEdit w-full h-[2.6rem] flex items-center justify-between paddingLeftRight border-b border-[#ECF3FF]">
                <div className="iconBack cursor-pointer">
                    <FaArrowLeft />
                </div>
                <p className='font-bold'>Create new post</p>
                <button
                    className='text-[#0095F6] cursor-pointer'
                    onClick={checktab.postId ? editPostData : submitPostData}
                >
                    Share
                </button>
            </div>
            <div className="contentEdit w-full h-[39.4rem] flex-1 flex items-start justify-start">
                <div className="imgVideoShow flex-1 flex items-center justify-center h-full bg-[rgba(0,0,0,.05)]">
                    {isVideo ? (
                        <video
                            src={fileURL}
                            controls
                            className="w-full h-full object-contain"
                        />
                    ) : isImage ? (
                        <img
                            src={fileURL}
                            className="w-full h-full object-contain"
                            alt="Post"
                        />
                    ) : (
                        <p>No preview available</p>
                    )}
                </div>
                <div className="controlPostEdit w-[21.188rem] h-full border-l border-[#ECF3FF] ">
                    <div className="profileBox w-full h-[3rem] marginTop1rem flex items-center justify-start">
                        <div className='h-[1.75rem] w-[1.75rem] rounded-full overflow-hidden marginLeftRight1rem'>
                            <img src={profile} className='h-full w-full object-cover' alt="" />
                        </div>
                        <p className='font-bold'>tarapada_389</p>
                    </div>
                    <div className="inputBox w-full h-[10.5rem] border-b border-[#ECF3FF] ">
                        <textarea
                            onChange={(e) => setLocalContent(e.target.value)}
                            value={localContent}
                            className="resize-none w-full h-full outline-none paddingleftRight"
                            placeholder="Enter Post Title"
                        />
                    </div>
                    <div className="inputBox w-full h-[10.5rem] border-b border-[#ECF3FF] outline-none">
                        <textarea
                            onChange={(e) => setLocalTaggedUsers(e.target.value)}
                            value={localTaggedUsers}
                            className="resize-none w-full h-full outline-none"
                            placeholder="Enter Tagg Users Username"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditPost;
