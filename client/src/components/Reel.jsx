import React, { useEffect, useRef, useState } from 'react'
import video from "../assets/videos/videoMin.mp4"
import profile from "../assets/images/profile.jpeg"
import { NavLink, useLocation, useNavigate, useParams } from 'react-router-dom'
import userNotPhoto from "../assets/images/profileNot.jpg"
import { postStore } from '../store/postStore.js'
import CommentSReel from './CommentSReel.jsx'
import { useAuthStore } from '../store/authStore.js'
import { useMute } from '../contexts/muteContext.jsx'
import { handleError, handleSuccess } from './ErrorMessage.jsx'

const Reel = ({ id, isActive, valueReel }) => {
    const navigate = useNavigate();
    const videoRef = useRef(null);
    const allReelComment = postStore((state) => state.allReelComment);
    const allReelLike = postStore((state) => state.allReelLike);
    const allReelSave = postStore((state) => state.allReelSave);
    const [reelComments, setReelComments] = useState(null);
    const [isVideoPlay, setIsVideoPlay] = useState(true);
    const [isCrose, setIsCrose] = useState(false);
    const likePost = postStore((state) => state.likePost);
    const postid = useParams()
    const user = useAuthStore((state) => state.user);
    const [allReelsLikeArray, setAllReelsLikeArray] = useState([])
    const [isSaveReel, setIsSaveReel] = useState([])
    const savePost = postStore((state) => state.savePost);

    const [doMute, setDoMute] = useMute();

    // Store playback position in a ref instead of state
    const playbackPositionRef = useRef(0);

    useEffect(() => {
        allReelComment(id, setReelComments);
        allReelLike(id, setAllReelsLikeArray);
        allReelSave(id, setIsSaveReel);
        if (isActive) {
            navigate(`/reels/${id}`, { replace: true });
            if (videoRef.current) {
                // Restore playback position from ref
                videoRef.current.currentTime = playbackPositionRef.current;
                videoRef.current.play().catch(e => console.error("Autoplay prevented:", e));
            }
        } else {
            if (videoRef.current) {
                // Save playback position to ref when pausing
                playbackPositionRef.current = videoRef.current.currentTime;
                videoRef.current.pause();
            }
        }
        setIsCrose(false);
    }, [isActive, id, navigate]);

    const videoPlayPause = () => {
        if (videoRef.current) {
            if (videoRef.current.paused) {
                videoRef.current.play().catch(e => console.error("Autoplay prevented:", e));
                setIsVideoPlay(true);
            } else {
                playbackPositionRef.current = videoRef.current.currentTime;
                videoRef.current.pause();
                setIsVideoPlay(false);
            }
        }
    };

    const likeReel = async () => {
        await likePost(id)
        await allReelLike(id, setAllReelsLikeArray);
    }

    const saveReelFun = async () => {
        await savePost(id);
        await allReelSave(id, setIsSaveReel);
    }

    const likedByUser = allReelsLikeArray?.likes?.some(
        (like) =>
            like?.likeOwner?.[0]?.userName === user?.userName
    );

    const checkSave = isSaveReel?.some(
        (saved) =>
            saved?.owner?.[0]?.userName === user?.userName &&
            saved?.postId == id
    );

    // console.log("isSaveReel", reelComments?.[0]?.comments, checkSave)

    function changeBorderNav() {
        if (window.scrollY >= 100) {
            setIsCrose(false)
            // console.log("this is for scroll")
        }
    }

    useEffect(() => {
        window.addEventListener('scroll', changeBorderNav);
        return () => {
            window.removeEventListener('scroll', changeBorderNav);
        };
    }, []);

    const handleCopy = (e) => {
        const textToCopy = `https://instagramcloneai.vercel.app/${valueReel?.owner?.[0]?.userName}/p/${id}`; // Get the text of the clicked button
        navigator.clipboard.writeText(textToCopy)
            .then(() => {
                handleSuccess(`Copied`);
            })
            .catch((err) => {
                handleError('Failed to copy text: ', err);
            });
    };

    return (
        <div className="reelContent">
            <div className="videoCon">
                <div className="videoRel" onClick={videoPlayPause}>
                    <video
                        muted={doMute}
                        ref={videoRef}
                        loop
                    >
                        <source src={valueReel?.video} />
                    </video>


                    <div className="videoControl" onClick={(e) => {
                        e.stopPropagation(); // Prevent triggering video play/pause
                        setDoMute(prev => !prev);
                    }}>
                        {!doMute ? <div className="noMute displayNone displayFlex">
                            <svg aria-label="Audio is playing" className="x1lliihq x1n2onr6" color="rgb(255, 255, 255)" fill="rgb(255, 255, 255)" height="16" role="img" viewBox="0 0 24 24" width="16"><title>Audio is playing</title><path d="M16.636 7.028a1.5 1.5 0 10-2.395 1.807 5.365 5.365 0 011.103 3.17 5.378 5.378 0 01-1.105 3.176 1.5 1.5 0 102.395 1.806 8.396 8.396 0 001.71-4.981 8.39 8.39 0 00-1.708-4.978zm3.73-2.332A1.5 1.5 0 1018.04 6.59 8.823 8.823 0 0120 12.007a8.798 8.798 0 01-1.96 5.415 1.5 1.5 0 002.326 1.894 11.672 11.672 0 002.635-7.31 11.682 11.682 0 00-2.635-7.31zm-8.963-3.613a1.001 1.001 0 00-1.082.187L5.265 6H2a1 1 0 00-1 1v10.003a1 1 0 001 1h3.265l5.01 4.682.02.021a1 1 0 001.704-.814L12.005 2a1 1 0 00-.602-.917z"></path></svg>
                        </div>
                            :
                            <div className="mute displayNone displayFlex">
                                <svg aria-label="Audio is muted" className="x1lliihq x1n2onr6" color="rgb(255, 255, 255)" fill="rgb(255, 255, 255)" height="16" role="img" viewBox="0 0 48 48" width="16"><title>Audio is muted</title><path clipRule="evenodd" d="M1.5 13.3c-.8 0-1.5.7-1.5 1.5v18.4c0 .8.7 1.5 1.5 1.5h8.7l12.9 12.9c.9.9 2.5.3 2.5-1v-9.8c0-.4-.2-.8-.4-1.1l-22-22c-.3-.3-.7-.4-1.1-.4h-.6zm46.8 31.4-5.5-5.5C44.9 36.6 48 31.4 48 24c0-11.4-7.2-17.4-7.2-17.4-.6-.6-1.6-.6-2.2 0L37.2 8c-.6.6-.6 1.6 0 2.2 0 0 5.7 5 5.7 13.8 0 5.4-2.1 9.3-3.8 11.6L35.5 32c1.1-1.7 2.3-4.4 2.3-8 0-6.8-4.1-10.3-4.1-10.3-.6-.6-1.6-.6-2.2 0l-1.4 1.4c-.6.6-.6 1.6 0 2.2 0 0 2.6 2 2.6 6.7 0 1.8-.4 3.2-.9 4.3L25.5 22V1.4c0-1.3-1.6-1.9-2.5-1L13.5 10 3.3-.3c-.6-.6-1.5-.6-2.1 0L-.2 1.1c-.6.6-.6 1.5 0 2.1L4 7.6l26.8 26.8 13.9 13.9c.6.6 1.5.6 2.1 0l1.4-1.4c.7-.6.7-1.6.1-2.2z" fillRule="evenodd"></path></svg>
                            </div>}
                    </div>

                    {!isVideoPlay && <div className="playVID flex">
                        <svg aria-label="Play button icon" className="x1lliihq x1n2onr6" color="rgb(255, 255, 255)" fill="rgb(255, 255, 255)" height="24" role="img" viewBox="0 0 24 24" width="24"><title>Play button icon</title><path d="M5.888 22.5a3.46 3.46 0 0 1-1.721-.46l-.003-.002a3.451 3.451 0 0 1-1.72-2.982V4.943a3.445 3.445 0 0 1 5.163-2.987l12.226 7.059a3.444 3.444 0 0 1-.001 5.967l-12.22 7.056a3.462 3.462 0 0 1-1.724.462Z"></path></svg>
                    </div>}

                    <div className="videoInfo">
                        <NavLink to={`/${valueReel?.owner?.[0]?.userName}`} className="videoInfoC ">
                            <div className="profileC">
                                <img src={valueReel?.owner?.[0]?.profilePic || userNotPhoto} alt="" />
                            </div>
                            <p>{valueReel?.owner?.[0]?.userName} {/*• <span className="followId">Follow</span>*/}  </p>
                        </NavLink>
                        <div className="videoInfoC">
                            <p>{valueReel?.content} </p> {/*<span id="MoreId">&nbsp;&nbsp;...more</span> */}
                        </div>
                        <div className="videoInfoC">
                            <div className="logoViDREl">
                                <svg aria-label="Audio image" className="x1lliihq x1n2onr6" color="rgb(255, 255, 255)" fill="rgb(255, 255, 255)" height="12" role="img" viewBox="0 0 24 24" width="12"><title>Audio image</title><path d="M21.002 16.972V2.044a.999.999 0 0 0-.36-.769 1.012 1.012 0 0 0-.823-.214L6.816 3.479A1 1 0 0 0 6 4.462v10.864A3.75 3.75 0 1 0 9 19V9.56l9.003-1.675v5.442A3.75 3.75 0 1 0 21.005 17c0-.01-.003-.02-.003-.029Z"></path></svg>
                            </div>
                            <div className="conteMusic">
                                <marquee scrollmount="0.1">Original audio</marquee>
                            </div>
                            <div className="ldhbjz">
                                <svg aria-label="Tagged users" className="x1lliihq x1n2onr6" color="rgb(255, 255, 255)" fill="rgb(255, 255, 255)" height="12" role="img" viewBox="0 0 24 24" width="12"><title>Tagged users</title><path d="M21.334 23H2.666a1 1 0 0 1-1-1v-1.354a6.279 6.279 0 0 1 6.272-6.272h8.124a6.279 6.279 0 0 1 6.271 6.271V22a1 1 0 0 1-1 1ZM12 13.269a6 6 0 1 1 6-6 6.007 6.007 0 0 1-6 6Z"></path></svg>
                                <p>{valueReel?.owner?.[0]?.userName}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="videoLike">
                    <div className="likeContern">
                        <div className="likeBtn" onClick={likeReel}>
                            {likedByUser ? <svg aria-label="Unlike" class="x1lliihq x1n2onr6 xxk16z8 text-red-600" fill="currentColor" height="24" role="img" viewBox="0 0 48 48" width="24"><title>Unlike</title><path d="M34.6 3.1c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5s1.1-.2 1.6-.5c1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z"></path></svg>
                                :
                                <svg aria-label="Like" className="x1lliihq x1n2onr6" color="rgb(38, 38, 38)" fill="rgb(38, 38, 38)" height="24" role="img" viewBox="0 0 24 24" width="24"><title>Like</title><path d="M16.792 3.904A4.989 4.989 0 0 1 21.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 0 1 4.708-5.218 4.21 4.21 0 0 1 3.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 0 1 3.679-1.938m0-2a6.04 6.04 0 0 0-4.797 2.127 6.052 6.052 0 0 0-4.787-2.127A6.985 6.985 0 0 0 .5 9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 0 0 3.518 3.018 2 2 0 0 0 2.174 0 45.263 45.263 0 0 0 3.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 0 0-6.708-7.218Z"></path></svg>
                            }
                        </div>
                        <p>{allReelsLikeArray?.likeCount}</p>
                    </div>
                    <div className="likeContern newForHover" onClick={() => setIsCrose((e) => !e)}>
                        <svg aria-label="Comment" className="x1lliihq x1n2onr6" color="rgb(38, 38, 38)" fill="rgb(38, 38, 38)" height="24" role="img" viewBox="0 0 24 24" width="24"><title>Comment</title><path d="M20.656 17.008a9.993 9.993 0 1 0-3.59 3.615L22 22Z" fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="2"></path></svg>
                        <p>{reelComments?.[0]?.commentCount}</p>
                    </div>
                    {isCrose && <CommentSReel setIsCrose={setIsCrose} />}
                    <div className="likeContern newForHover" onClick={handleCopy}>
                        <svg aria-label="Direct" className="x1lliihq x1n2onr6" color="rgb(38, 38, 38)" fill="rgb(38, 38, 38)" height="24" role="img" viewBox="0 0 24 24" width="24"><title>Direct</title><line fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="2" x1="22" x2="9.218" y1="3" y2="10.083"></line><polygon fill="none" points="11.698 20.334 22 3.001 2 3.001 9.218 10.084 11.698 20.334" stroke="currentColor" strokeLinejoin="round" strokeWidth="2"></polygon></svg>
                    </div>
                    <div className={`likeContern ${checkSave ? "" : `newForHover`}`} onClick={saveReelFun}>
                        {checkSave ? <svg aria-label="Remove" class="x1lliihq x1n2onr6 x5n08af" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24"><title>Remove</title><path d="M20 22a.999.999 0 0 1-.687-.273L12 14.815l-7.313 6.912A1 1 0 0 1 3 21V3a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1Z"></path></svg>
                            :
                            <svg aria-label="Save" className="x1lliihq x1n2onr6" color="rgb(0, 0, 0)" fill="rgb(0, 0, 0)" height="24" role="img" viewBox="0 0 24 24" width="24"><title>Save</title><polygon fill="none" points="20 21 12 13.44 4 21 4 3 20 3 20 21" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></polygon></svg>
                        }
                    </div>
                    <div className="likeContern newForHover">
                        <svg aria-label="More" className="x1lliihq x1n2onr6" color="rgb(38, 38, 38)" fill="rgb(38, 38, 38)" height="24" role="img" viewBox="0 0 24 24" width="24"><title>More</title><circle cx="12" cy="12" r="1.5"></circle><circle cx="6" cy="12" r="1.5"></circle><circle cx="18" cy="12" r="1.5"></circle></svg>
                    </div>
                    <div className="likeContern newForHover">
                        <div className="reelPro">
                            <img src={valueReel?.owner?.[0]?.profilePic || userNotPhoto} alt="" />
                            <div className="hideImg"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default React.memo(Reel);