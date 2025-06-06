import React, { useEffect, useState } from 'react';
import loaderIMG from "../assets/gif/loaderGif.gif";
import doneUpload from "../assets/gif/successfullyDone.gif";
import { handleError, handleSuccess } from "./ErrorMessage";
import { postStore } from '../store/postStore';
import { useEditPost } from '../contexts/editPostContext';
import { usePostData } from '../contexts/postDataContext';
import { useStoryOrPost } from '../contexts/storyOrPostContext';
import { BsStars } from 'react-icons/bs';
import { IoIosWarning } from "react-icons/io";
import axios from 'axios';
import Spinner from './Spinner';
import { useAuthStore } from '../store/authStore';

const TakePost = ({ loader }) => {
    const userCanGenerate = useAuthStore((state) => state.userCanGenerate);
    const user = useAuthStore((state) => state.user);
    const setUserCanGenerate = useAuthStore((state) => state.setUserCanGenerate);
    const checkForUserIsGeneratedImage = useAuthStore((state) => state.checkForUserIsGeneratedImage);
    const [isCanGenerate, setIsCanGenerate] = useState(true);
    useEffect(() => {
        //   checkForUserIsGeneratedImage(setIsCanGenerate); // Uncomment this line if you want to check if the user has generated an image before
        setIsCanGenerate(false); //if want to disable AI image generation, set it to false
    }, [userCanGenerate]);


    const [checktab, setChecktab] = useEditPost();
    const [, setPostData] = usePostData();
    const isLoading = postStore((state) => state.isLoading);
    const [dragActive, setDragActive] = useState(false);
    const [isStoryOrPost, setIsStoryOrPost] = useStoryOrPost();
    const [loadingImg, setloadingImg] = useState(false);

    const [prompt, setPrompt] = useState("");

    const validateAndUpload = (file) => {
        if (!file) return;

        const imageTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
        const videoTypes = ["video/mp4", "video/webm", "video/ogg"];

        const isImage = imageTypes.includes(file.type);
        const isVideo = videoTypes.includes(file.type);

        if (!isImage && !isVideo) {
            handleError("Only image or video files are allowed.");
            return;
        }

        if (isImage && file.size > 4 * 1024 * 1024) {
            handleError("Image size must be less than 4 MB.");
            return;
        }

        if (isVideo && file.size > 20 * 1024 * 1024) {
            handleError("Video size must be less than 20 MB.");
            return;
        }

        setPostData(prev => ({
            ...prev,
            file: file
        }));

        setChecktab({
            value: "view",
            postId: null
        });
    };

    const uploadPostImg = (e) => {
        const selectedFile = e.target.files[0];
        validateAndUpload(selectedFile);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            validateAndUpload(e.dataTransfer.files[0]);
        }
    };

    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const createFromAI = async () => {
        if (!isCanGenerate) {
            // handleError("You have reached your daily limit for AI image generation.");
            handleError("AI image generation is currently disabled.");
            return;
        }
        setChecktab({
            value: "AI",
            postId: null
        });
    }

    const generateImage = async () => {
        if (!isCanGenerate) {
            // handleError("You have reached your daily limit for AI image generation.");
            handleError("AI image generation is currently disabled.");
            return;
        }
        if (!prompt.trim()) {
            handleError("Prompt cannot be empty.");
            return;
        }

        const formData = new FormData();
        formData.append('prompt', prompt);

        try {
            setloadingImg(true);
            const response = await axios.post(
                'https://clipdrop-api.co/text-to-image/v1',
                formData,
                {
                    headers: {
                        'x-api-key': import.meta.env.VITE_IMG_API,
                        'Content-Type': 'multipart/form-data',
                    },
                    responseType: 'arraybuffer', // necessary to get binary data
                }
            );

            // Convert binary image to File
            const blob = new Blob([response.data], { type: 'image/png' });
            const file = new File([blob], 'ai-generated.png', { type: 'image/png' });

            // Save to context (your existing logic)
            setPostData(prev => ({
                ...prev,
                file: file
            }));

            // Change tab to view (your existing logic)
            setChecktab({
                value: "view",
                postId: null
            });

            handleSuccess("Image generated successfully!");

        } catch (error) {
            console.error("Failed to generate image:", error);
            handleError("Failed to generate image. Try again later.");
        } finally {
            setloadingImg(false);
            await setUserCanGenerate(setIsCanGenerate);
        }
    };

    return (
        <div className="upload overflow-hidden" id="postDiv"
            onDragEnter={handleDrag}
            onDragOver={handleDrag}
            onDragLeave={handleDrag}
            onDrop={handleDrop}
        >
            {loader == "take" ? (
                <>
                    <div className="uploadTitle">Create new {isStoryOrPost}</div>
                    <div className={`uploadFile ${dragActive ? "border-blue-500 border-t-1" : ""}`}>
                        <div className="uploadLogo">
                            <svg aria-label="Icon to represent media such as images or videos" className="x1lliihq x1n2onr6" color="rgb(0, 0, 0)" fill="rgb(0, 0, 0)" height="77" role="img" viewBox="0 0 97.6 77.3" width="96"><title>Icon to represent media such as images or videos</title><path d="M16.3 24h.3c2.8-.2 4.9-2.6 4.8-5.4-.2-2.8-2.6-4.9-5.4-4.8s-4.9 2.6-4.8 5.4c.1 2.7 2.4 4.8 5.1 4.8zm-2.4-7.2c.5-.6 1.3-1 2.1-1h.2c1.7 0 3.1 1.4 3.1 3.1 0 1.7-1.4 3.1-3.1 3.1-1.7 0-3.1-1.4-3.1-3.1 0-.8.3-1.5.8-2.1z" fill="currentColor"></path><path d="M84.7 18.4 58 16.9l-.2-3c-.3-5.7-5.2-10.1-11-9.8L12.9 6c-5.7.3-10.1 5.3-9.8 11L5 51v.8c.7 5.2 5.1 9.1 10.3 9.1h.6l21.7-1.2v.6c-.3 5.7 4 10.7 9.8 11l34 2h.6c5.5 0 10.1-4.3 10.4-9.8l2-34c.4-5.8-4-10.7-9.7-11.1zM7.2 10.8C8.7 9.1 10.8 8.1 13 8l34-1.9c4.6-.3 8.6 3.3 8.9 7.9l.2 2.8-5.3-.3c-5.7-.3-10.7 4-11 9.8l-.6 9.5-9.5 10.7c-.2.3-.6.4-1 .5-.4 0-.7-.1-1-.4l-7.8-7c-1.4-1.3-3.5-1.1-4.8.3L7 49 5.2 17c-.2-2.3.6-4.5 2-6.2zm8.7 48c-4.3.2-8.1-2.8-8.8-7.1l9.4-10.5c.2-.3.6-.4 1-.5.4 0 .7.1 1 .4l7.8 7c.7.6 1.6.9 2.5.9.9 0 1.7-.5 2.3-1.1l7.8-8.8-1.1 18.6-21.9 1.1zm76.5-29.5-2 34c-.3 4.6-4.3 8.2-8.9 7.9l-34-2c-4.6-.3-8.2-4.3-7.9-8.9l2-34c.3-4.4 3.9-7.9 8.4-7.9h.5l34 2c4.7.3 8.2 4.3 7.9 8.9z" fill="currentColor"></path><path d="M78.2 41.6 61.3 30.5c-2.1-1.4-4.9-.8-6.2 1.3-.4.7-.7 1.4-.7 2.2l-1.2 20.1c-.1 2.5 1.7 4.6 4.2 4.8h.3c.7 0 1.4-.2 2-.5l18-9c2.2-1.1 3.1-3.8 2-6-.4-.7-.9-1.3-1.5-1.8zm-1.4 6-18 9c-.4.2-.8.3-1.3.3-.4 0-.9-.2-1.2-.4-.7-.5-1.2-1.3-1.1-2.2l1.2-20.1c.1-.9.6-1.7 1.4-2.1.8-.4 1.7-.3 2.5.1L77 43.3c1.2.8 1.5 2.3.7 3.4-.2.4-.5.7-.9.9z" fill="currentColor"></path></svg>
                        </div>
                        <div className="uploadTitle2">
                            Drag photos and videos here
                        </div>
                        <div className="uploadSelect">
                            <label htmlFor="uploadItem">Select from computer</label>
                            <input type="file" id="uploadItem" name="post" hidden onChange={uploadPostImg} />
                        </div>
                        <div className="uploadSelect" onClick={createFromAI}>
                            <button className=' cursor-none'>Generate from AI <BsStars /> </button>
                        </div>
                    </div>
                </>
            ) : loader == "done" ? (
                <div className='h-full w-full flex items-center justify-center flex-col gap-[1rem]'>
                    {isLoading ? (
                        <img src={loaderIMG} className='h-[6rem] w-[6rem] object-cover' alt="loading" />
                    ) : (
                        <>
                            <img src={doneUpload} className='h-[6rem] w-[6rem] object-cover' alt="done" />
                            <p className='text-2xl'>Your {isStoryOrPost} has been shared.</p>
                        </>
                    )}
                </div>
            ) : loader == "AI" ? (
                <>
                    <div className="uploadTitle">Create new {isStoryOrPost} using AI</div>
                    <div className="uploadFileDiv flex flex-col gap-4">
                        <div className='warn w-full bg-[#FFF9C4] rounded-2xl flex gap-2 paddingShow'>
                            <div className='h-full marginTopLittle text-2xl'>
                                <IoIosWarning />
                            </div>
                            <div className='h-full '>
                                You have only one chance per day to generate an image, so make sure to write your prompt carefully.
                            </div>
                        </div>
                        <div className="inputShowPage w-full h-[9rem] rounded-2xl">
                            <textarea value={prompt} onChange={(e) => setPrompt(e.target.value)} className='w-full outline-none rounded-2xl h-[9rem] resize-none border border-[#dbdbdb] bg-[#F5F5F5]' placeholder='Write your prompt here...' name="aiPrompt" id=""></textarea>
                            <button type="button" onClick={generateImage} className='itemCenterAllhild marginLeftAUto w-[15.813rem] cursor-pointer text-white rounded-[10px] h-[2.75rem] bg-[#0095f6] hover:bg-[#0062f6]'>
                                {loadingImg ? <Spinner /> : <>Generate<BsStars /></>}
                            </button>
                        </div>
                    </div>
                </>
            ) : ""}
        </div>
    );
};

export default TakePost;
