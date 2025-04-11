import React, { useEffect, useState } from 'react'
import profile from "../assets/images/profile.jpeg"
import friend from "../assets/images/friend.png"
import { FaArrowLeft } from "react-icons/fa6";
import { postStore } from '../store/postStore.js';

const EditPost = ({ setChecktab, submitContent }) => {
    const [postData, setPostData] = submitContent
    const [showfile, setShowfile] = useState(null)
    const uploadPost = postStore((state) => state.uploadPost);

    useEffect(() => {
        setShowfile(URL.createObjectURL(postData.file))
    }, [setShowfile])
    
    
    const submitPostData = async () => {
        const formData = new FormData();
        formData.append('content', postData.content);
        formData.append('taggedUsers', JSON.stringify(postData.taggedUsers));
        formData.append('file', postData.file);
    
        // Log formData properly
        for (let pair of formData.entries()) {
            console.log(pair[0] + ':', pair[1]);
        }

        uploadPost(formData)
    
        setTimeout(() => {
            setChecktab("done");
        }, 1000 - 500);
    };

    return (
        <div className='w-[60rem] h-[42rem] bg-white flex flex-col items-center justify-center rounded-2xl overflow-hidden'>
            <div className="navTopEdit w-full h-[2.6rem] flex items-center justify-between paddingLeftRight border-b border-[#ECF3FF]">
                <div className="iconBack cursor-pointer">
                    <FaArrowLeft />
                </div>
                <p className='font-bold'>Create new post</p>
                <button className='text-[#0095F6] cursor-pointer' onClick={submitPostData}>Share</button>
            </div>
            <div className="contentEdit w-full h-[39.4rem] flex-1 flex items-start justify-start">
                <div className="imgVideoShow flex-1 flex items-center justify-center h-full bg-[rgba(0,0,0,.05)]">
                    <img src={showfile} className='w-full h-full object-contain' alt="" />
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
                            onChange={(e) =>
                                setPostData(prev => ({
                                    ...prev,
                                    content: e.target.value
                                }))
                            }
                            value={postData.content}
                            className="resize-none w-full h-full outline-none paddingleftRight"
                            placeholder="Enter Post Title"
                        />
                    </div>
                    <div className="inputBox w-full h-[10.5rem] border-b border-[#ECF3FF] outline-none">
                        <textarea
                            onChange={(e) =>
                                setPostData(prev => ({
                                    ...prev,
                                    taggedUsers: e.target.value
                                }))
                            }
                            value={postData.taggedUsers}
                            className="resize-none w-full h-full outline-none"
                            placeholder="Enter Tagg Users Username"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditPost