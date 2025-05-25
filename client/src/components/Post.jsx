import React from 'react'
import noProfile from "../assets/images/profileNot.jpg"
import TimeAgo from './TimeAgo'
import { useAuthStore } from '../store/authStore.js'
import { useControl } from '../contexts/controlContext.jsx'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { postStore } from '../store/postStore.js'
import { useStoryOrPost } from '../contexts/storyOrPostContext'
import { useUpload } from '../contexts/uploadContext'
import { useEditPost } from '../contexts/editPostContext.jsx'
import { useState } from 'react'
import { handleError, handleSuccess } from './ErrorMessage.jsx'

const Post = ({ value }) => {
    const user = useAuthStore((state) => state.user);
    const navigate = useNavigate();
    const [control, setControl] = useControl();
    const [checktab, setChecktab] = useEditPost()
    const [, setIsCreatVisible] = useUpload()
    const [isStoryOrPost, setIsStoryOrPost] = useStoryOrPost()
    const deletePost = postStore((state) => state.deletePost);
    const likePost = postStore((state) => state.likePost);
    const savePost = postStore((state) => state.savePost);
    const uploadComment = postStore((state) => state.uploadComment);

    const likedByUser = value?.likes?.some(
        (like) =>
            like?.likeOwner?.[0]?.userName === user?.userName &&
            like?.postId === value._id
    );
    // console.log("value from post", value, likedByUser);
    const [isLike, setisLike] = useState(likedByUser);

    const checkSave = value?.savedPosts?.some(
        (saved) =>
            saved?.owner?.[0]?.userName === user?.userName &&
            saved?.postId === value._id
    );
    const [isSave, setisSave] = useState(checkSave);

    const [comment, setComment] = useState("");
    const addComment = async () => {
        if (comment.trim() === "") {
            handleError("Please add a comment");
            return;
        }
        const data = {
            postId: value._id,
            content: comment,
        };

        await uploadComment(data)
        setComment("");
    }

    const commentControl = {
        isOn: true,
        data: [
            {
                name: "Delete",
                action: async () => {
                    await deletePost(value._id);
                    await navigate(-1);
                    await setControl(v => !v);
                },
                colorC: "ED4956"
            },
            {
                name: "Edit",
                action: async () => {
                    await setIsStoryOrPost("post")
                    await setIsCreatVisible(v => !v)
                    await setControl(v => !v);
                    await navigate(-1);
                    await setChecktab({
                        value: "view",
                        postId: value._id,
                    })
                },
                colorC: "000"
            },
            {
                name: "Cancel",
                action: () => setControl(v => !v),
                colorC: "000"
            }
        ]
    }

    const shareFunction = () => {
        if (!value || !value.owner?.[0]?.userName || !value._id) {
            handleError('Data is missing');
            return;
        }
        const textToCopy = `https://instagramcloneai.vercel.app/${value.owner[0].userName}/p/${value._id}`;

        navigator.clipboard.writeText(textToCopy)
            .then(() => {
                handleSuccess(`Copied`);
            })
            .catch((err) => {
                handleError(`Failed to copy text: ${err}`);
            });
    };

    const location = useLocation();

    const openDetailsPost = () => {
        navigate(`${location.pathname === "/" ? "" : location.pathname}/p/${value._id}`);
    }

    return (
        <div className="postContent">
            <div className="post1">
                <NavLink to={`/${value?.owner?.[0]?.userName}`} style={{ display: "flex", alignItems: "center", justifyContent: "flex-start" }}>
                    <div className="profilePost">
                        <img src={value?.owner?.[0]?.profilePic || noProfile} alt="" />
                    </div>
                    <div className="wirteProPost">
                        <p>
                            <span className="bold">{value?.owner?.[0]?.userName || "Unknown"}</span>
                            {/* <svg>
                        <path
                          d="M19.998 3.094 14.638 0l-2.972 5.15H5.432v6.354L0 14.64 3.094 20 0 25.359l5.432 3.137v5.905h5.975L14.638 40l5.36-3.094L25.358 40l3.232-5.6h6.162v-6.01L40 25.359 36.905 20 40 14.641l-5.248-3.03v-6.46h-6.419L25.358 0l-5.36 3.094Zm7.415 11.225 2.254 2.287-11.43 11.5-6.835-6.93 2.244-2.258 4.587 4.581 9.18-9.18Z"
                          fillRule="evenodd"></path>
                        </svg> */}
                            &nbsp;
                            .
                            &nbsp;
                            <TimeAgo date={value?.createdAt} />
                        </p>
                        {/* <p>Original audio</p> */}
                    </div>
                </NavLink>
                {user.userName == value?.owner?.[0]?.userName && (
                    <div className="iconPost" onClick={() => setControl(commentControl)}>
                        <svg aria-label="More options" className="_ab6-" color="rgb(0, 0, 0)" fill="rgb(0, 0, 0)"
                            height="24" role="img" viewBox="0 0 24 24" width="24">
                            <circle cx="12" cy="12" r="1.5"></circle>
                            <circle cx="6" cy="12" r="1.5"></circle>
                            <circle cx="18" cy="12" r="1.5"></circle>
                        </svg>
                    </div>
                )}
            </div>
            <div className="post2">
                {value?.image ? <img src={value?.image} alt="" />
                    :
                    <video src={value?.video} controls></video>}
            </div>
            <div className="post3">
                <div className="three">
                    <div className='cursor-pointer' onClick={async () => {
                        await likePost(value._id);
                        setisLike((v) => !v);
                    }}>
                        {!isLike ? <svg aria-label="Like" className="x1lliihq x1n2onr6 svgClass" color="rgb(38, 38, 38)"
                            fill="rgb(38, 38, 38)" height="24" role="img" viewBox="0 0 24 24" width="24">
                            <title>Like</title>
                            <path
                                d="M16.792 3.904A4.989 4.989 0 0 1 21.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 0 1 4.708-5.218 4.21 4.21 0 0 1 3.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 0 1 3.679-1.938m0-2a6.04 6.04 0 0 0-4.797 2.127 6.052 6.052 0 0 0-4.787-2.127A6.985 6.985 0 0 0 .5 9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 0 0 3.518 3.018 2 2 0 0 0 2.174 0 45.263 45.263 0 0 0 3.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 0 0-6.708-7.218Z">
                            </path>
                        </svg>
                            :
                            <svg aria-label="Unlike" className="x1lliihq x1n2onr6 xxk16z8 text-red-600" fill="currentColor" height="24" role="img" viewBox="0 0 48 48" width="24"><title>Unlike</title><path d="M34.6 3.1c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5s1.1-.2 1.6-.5c1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z"></path></svg>}
                    </div>
                    <div className='cursor-pointer' onClick={openDetailsPost}>
                        <svg aria-label="Comment" className="x1lliihq x1n2onr6" color="rgb(0, 0, 0)"
                            fill="rgb(0, 0, 0)" height="24" role="img" viewBox="0 0 24 24" width="24">
                            <title>Comment</title>
                            <path d="M20.656 17.008a9.993 9.993 0 1 0-3.59 3.615L22 22Z" fill="none"
                                stroke="currentColor" strokeLinejoin="round" strokeWidth="2"></path>
                        </svg>
                    </div>
                    <div onClick={shareFunction} className="cursor-pointer">
                        <svg aria-label="Share Post" className="x1lliihq x1n2onr6" color="rgb(0, 0, 0)"
                            fill="rgb(0, 0, 0)" height="24" role="img" viewBox="0 0 24 24" width="24">
                            <title>Share Post</title>
                            <line fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="2"
                                x1="22" x2="9.218" y1="3" y2="10.083"></line>
                            <polygon fill="none"
                                points="11.698 20.334 22 3.001 2 3.001 9.218 10.084 11.698 20.334"
                                stroke="currentColor" strokeLinejoin="round" strokeWidth="2"></polygon>
                        </svg>
                    </div>
                </div>
                <div className="one cursor-pointer" onClick={async () => {
                    await savePost(value._id);
                    setisSave((prev) => !prev);
                }}>
                    {!isSave ? <svg aria-label="Save" className="x1lliihq x1n2onr6 svgClass" color="rgb(0, 0, 0)"
                        fill="rgb(0, 0, 0)" height="24" role="img" viewBox="0 0 24 24" width="24">
                        <title>Save</title>
                        <polygon fill="none" points="20 21 12 13.44 4 21 4 3 20 3 20 21"
                            stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                            strokeWidth="2"></polygon>
                    </svg>
                        :
                        <svg aria-label="Remove" className="x1lliihq x1n2onr6 x5n08af" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24"><title>Remove</title><path d="M20 22a.999.999 0 0 1-.687-.273L12 14.815l-7.313 6.912A1 1 0 0 1 3 21V3a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1Z"></path></svg>}
                </div>
            </div>
            <div className="post4 bold">
                {value?.likeCount} likes
            </div>
            <div className="post5">
                <p>
                    <span className="bold h">{value?.owner?.[0]?.userName || "Unknown"}</span> <span> </span> <span>{value?.content || ""}</span>
                </p>
                <p className="nameUs cursor-pointer" onClick={openDetailsPost}>more</p>
            </div>
            <div className="post6">
                <p className="nameUs cursor-pointer" onClick={openDetailsPost}>View all comments</p>
                <div className="commentDiv">
                    <input type="text" value={comment} onChange={(e) => setComment(e.target.value)} id="commentsId" name="Comment" placeholder="Add a comment…" />
                    <button className='cursor-pointer' onClick={addComment}>Post</button>
                </div>
            </div>
        </div>
    )
}

export default Post