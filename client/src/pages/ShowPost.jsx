import React, { useEffect, useState } from 'react';
import profile from '../assets/images/profile.jpeg';
import video from '../assets/videos/videoMin.mp4';
import CommentSolo from '../components/CommentSolo';
import { useParams } from 'react-router-dom';
import { handleError, handleSuccess } from '../components/ErrorMessage';
import axios from 'axios';
import { useAuthStore } from '../store/authStore.js';
import TimeAgo from '../components/TimeAgo.jsx';

const ShowPost = () => {
  const [showPost, setShowPost] = useState("");
  const user = useAuthStore((state) => state.user);
  const { pId, profile: profileParam } = useParams(); // Avoid naming conflict
  console.log("params", pId);

  useEffect(() => {
    const fetchPost = async () => {
      console.log("fetchPost start");
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_CORS_ORIGIN_SERVER_POST}/viewPost/${pId}`,
          {
            withCredentials: true,
          }
        );

        if (response.status === 200) {
          setShowPost(response.data.data[0]);
          console.log("from store all values", response.data.data[0]);
          handleSuccess(response.data.message);
        }
        console.log("fetchPost end");
      } catch (error) {
        handleError(error.response?.data?.message || error.message);
        console.error('Error:', error.response?.data?.message || error.message);
      }
    };
    fetchPost();
  }, [pId]);

  const a =
    showPost?.likes?.[0]?.likeOwner?.[0]?.userName === user?.userName &&
    showPost?.likes?.[0]?.postId === pId;

    const likedByUser = showPost?.likes?.filter(
      (like) =>
        like?.likeOwner?.[0]?.userName === user?.userName &&
        like?.postId === pId
    );
    console.log("likedByUser", likedByUser);
    const b = showPost?.likes?.filter((v) => v?.postId === pId)

    console.log("showPost", showPost );

  return (
    <div className='bg-white h-[37rem] flex items-center justify-center rounded-tr-[3px] rounded-br-[3px] overflow-hidden'>
      <div className={`imgOrVideo h-full ${showPost?.image ? `w-[38rem]` : ""}`}>
        {showPost?.image ? (
          <img src={showPost?.image} alt="" className='h-full w-full object-cover' />
        ) : (
          <video src={showPost?.video} className='h-full w-full object-cover' />
        )}
      </div>

      <div className="showLikeComment w-[30rem] h-full flex flex-col align-center justify-between">
        <div className="rowForUser w-full h-[3.75rem] border-b border-[#dbdbdb] flex items-center justify-between paddingNewhsdgh">
          <div className="imageSIde flex items-center justify-center gap-3">
            <div className="imgjdhks h-8 w-8 rounded-full overflow-hidden">
              <img
                src={showPost?.owner?.[0]?.profilePic}
                className='h-full w-full object-cover'
                alt=""
              />
            </div>
            <p className='font-bold'>{showPost?.owner?.[0]?.userName}</p>
          </div>
          <div className="arrowSide h-[1.5rem] w-[1.5rem] cursor-pointer">
            <svg aria-label="More options" className="x1lliihq x1n2onr6 x5n08af" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24"><title>More options</title><circle cx="12" cy="12" r="1.5"></circle><circle cx="6" cy="12" r="1.5"></circle><circle cx="18" cy="12" r="1.5"></circle></svg>
          </div>
        </div>

        <div className="forCommentShowOther paddingNewhsdgh flex-1 border-b border-[#dbdbdb] overflow-auto no-scrollbar-container">
          {showPost?.comments?.map((v, i) => (
            <CommentSolo key={i} values={v} />
          ))}
        </div>

        <div className="likeShowAndDo w-full h-[6.375rem] border-b border-[#dbdbdb] flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {likedByUser?.length > 0 ? (
                <svg style={{ color: "red" }} aria-label="Unlike" className="x1lliihq x1n2onr6 xxk16z8" fill="currentColor" height="24" role="img" viewBox="0 0 48 48" width="24"><title>Unlike</title><path d="M34.6 3.1c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5s1.1-.2 1.6-.5c1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z"></path></svg>
              ) : (
                <svg aria-label="Like" className="x1lliihq x1n2onr6 cursor-pointer" color="rgb(38, 38, 38)"
                  fill="rgb(38, 38, 38)" height="24" role="img" viewBox="0 0 24 24" width="24">
                  <title>Like</title>
                  <path
                    d="M16.792 3.904A4.989 4.989 0 0 1 21.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 0 1 4.708-5.218 4.21 4.21 0 0 1 3.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 0 1 3.679-1.938m0-2a6.04 6.04 0 0 0-4.797 2.127 6.052 6.052 0 0 0-4.787-2.127A6.985 6.985 0 0 0 .5 9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 0 0 3.518 3.018 2 2 0 0 0 2.174 0 45.263 45.263 0 0 0 3.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 0 0-6.708-7.218Z">
                  </path>
                </svg>
              )}
              <svg aria-label="Comment" className="x1lliihq x1n2onr6 cursor-pointer" color="rgb(0, 0, 0)"
                fill="rgb(0, 0, 0)" height="24" role="img" viewBox="0 0 24 24" width="24">
                <title>Comment</title>
                <path d="M20.656 17.008a9.993 9.993 0 1 0-3.59 3.615L22 22Z" fill="none"
                  stroke="currentColor" strokeLinejoin="round" strokeWidth="2"></path>
              </svg>
            </div>
            <div>
            
              {showPost?.savedPosts?.[0]?.owner?.[0]?.userName === user?.userName ? <svg aria-label="Remove" class="x1lliihq x1n2onr6 x5n08af" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24"><title>Remove</title><path d="M20 22a.999.999 0 0 1-.687-.273L12 14.815l-7.313 6.912A1 1 0 0 1 3 21V3a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1Z"></path></svg> :<svg aria-label="Save" className="x1lliihq x1n2onr6 cursor-pointer" color="rgb(0, 0, 0)"
                fill="rgb(0, 0, 0)" height="24" role="img" viewBox="0 0 24 24" width="24">
                <title>Save</title>
                <polygon fill="none" points="20 21 12 13.44 4 21 4 3 20 3 20 21"
                  stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                  strokeWidth="2"></polygon>
              </svg>}
            </div>
          </div>
          <div className="sjjsdhjadh leading-tight">
            {showPost?.likes?.length > 0 ? <p>Liked by <span className='font-bold cursor-pointer'>{showPost?.likes?.[0]?.likeOwner?.[0]?.userName}</span> and <span className='font-bold cursor-pointer'>{ showPost?.likes?.length -1} others</span></p> : <p>Be the first to like this</p>}
            <p className='text-[#737373] text-[14px] cursor-pointer'> <TimeAgo date={showPost?.createdAt} /> </p>
          </div>
        </div>

        <div className="doComment w-full h-[3.313rem] border-b border-[#dbdbdb] flex items-center justify-between">
          <div className="emojiJHD h-[3.3rem] w-[3.3rem] flex items-center justify-center cursor-pointer">
            <svg aria-label="Emoji" className="x1lliihq x1n2onr6 x5n08af" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24"><title>Emoji</title><path d="M15.83 10.997a1.167 1.167 0 1 0 1.167 1.167 1.167 1.167 0 0 0-1.167-1.167Zm-6.5 1.167a1.167 1.167 0 1 0-1.166 1.167 1.167 1.167 0 0 0 1.166-1.167Zm5.163 3.24a3.406 3.406 0 0 1-4.982.007 1 1 0 1 0-1.557 1.256 5.397 5.397 0 0 0 8.09 0 1 1 0 0 0-1.55-1.263ZM12 .503a11.5 11.5 0 1 0 11.5 11.5A11.513 11.513 0 0 0 12 .503Zm0 21a9.5 9.5 0 1 1 9.5-9.5 9.51 9.51 0 0 1-9.5 9.5Z"></path></svg>
          </div>
          <div className="inputBOxCo flex-1">
            <input type="text" className='w-full outline-none' placeholder='Add a comment...' />
          </div>
          <div className="postButtonadg h-[3.3rem] w-[3.8rem] flex items-center justify-center cursor-pointer">
            <button>Post</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowPost;
