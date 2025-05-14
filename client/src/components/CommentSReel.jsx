import React, { useEffect, useState } from "react";
import { FaHeart, FaTimes, FaSmile } from "react-icons/fa";
import TimeAgo from "./TimeAgo";
import { useAuthStore } from "../store/authStore.js";
import { postStore } from "../store/postStore.js";
import { useParams } from "react-router-dom";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import CommentSoloReel from "./CommentSoloReel.jsx";

const CommentSReel = ({ setIsCrose }) => {
  const [reelComments, setReelComments] = useState(null);
  // console.log("reelComments", reelComments);
  const user = useAuthStore((state) => state.user);
  const [commentInput, setCommentInput] = useState("");
  const uploadComment = postStore((state) => state.uploadComment);
  const allReelComment = postStore((state) => state.allReelComment);
  const likeComment = postStore((state) => state.likeComment);
  // console.log("user", user);
  const { id } = useParams()

  useEffect(() => {
    const fetchComments = async () => {
      await allReelComment(id, setReelComments)
    };
    fetchComments();
 
  }, [id, allReelComment]);
  

  const submitCommentReel = async (e) => {
    e.preventDefault()
    if (commentInput.trim() === "") {
      handleError("Please add a comment");
      return;
    }
    const data = {
      postId: id,
      content: commentInput,
    };

    console.log("data", data);

    await uploadComment(data)
    await allReelComment(id, setReelComments)
    // await fetchPost(pId);
    setCommentInput("");
  }

  // const commentLikeFunction = async () => {

  //   await fetchPost(pId);
  // }

  // const likedByUser = comment?.likes?.some((like) => like?.likeOwner?.[0]?.userName === user?.userName);

  return (
    <div className="w-full max-w-xs bg-white rounded-[5px] boxShadowCommentBox shadow-lg flex flex-col fixed top-[3rem] right-[4rem] h-[30rem]">
      {/* Header */}
      <div className="flex items-center justify-center relative padding75point">
        <button onClick={() => setIsCrose((e) => !e)} aria-label="Close comments" className="absolute cursor-pointer left-8 text-gray-700 hover:text-gray-900 focus:outline-none">
          <FaTimes className="text-lg" />
        </button>
        <h2 className="font-semibold text-base text-black">Comments</h2>
      </div>

      {/* Comments container */}
      <div className="flex-1 overflow-y-auto scrollbar-thin px-4 py-3 paddingTopBottom space-y-5">
        {reelComments?.[0]?.comments?.map((comment, idx) => (
          <CommentSoloReel comment={comment} setReelComments={setReelComments} key={idx}/>
        ))}
      </div>

      {/* Add comment input */}
      <form className="flex items-center rounded-b-xl px-4 py-2 paddingTop5Left1 space-x-3" onSubmit={(e) => e.preventDefault()}>
        <div className="flex items-center bg-[#F5F5F5] w-full gap-2 border rounded-[20px] paddinInInputBox border-gray-200 ">
          <img
            src={user?.profilePic}
            alt="Your profile"
            className="w-8 h-8 rounded-full object-cover"
          />
          <input
            type="text"
            value={commentInput}
            onChange={(e) => setCommentInput(e.target.value)}
            placeholder="Add a comment..."
            className="flex-1 text-sm text-gray-500 placeholder-gray-400 focus:outline-none"
          />
          <button
            type="submit"
            aria-label="Post comment"
            className="text-blue-400 hover:text-gray-600 focus:outline-none cursor-pointer"
            onClick={submitCommentReel}
          >
            Post
          </button>
        </div>
      </form>
    </div>
  );
};

export default CommentSReel;
