import React from 'react'
import TimeAgo from './TimeAgo';
import { useParams } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { postStore } from '../store/postStore';
import { HiOutlineDotsHorizontal } from 'react-icons/hi';
import { useControl } from '../contexts/controlContext';
import userNotPhoto from "../assets/images/profileNot.jpg"

const CommentSoloReel = ({ comment, setReelComments }) => {
    const user = useAuthStore((state) => state.user);
    const { id } = useParams()
    const allReelComment = postStore((state) => state.allReelComment);
    const likeComment = postStore((state) => state.likeComment);
    const deleteComment = postStore((state) => state.deleteComment);
    const [control, setControl] = useControl()

    const commentControl = {
        isOn : true,
        data : [
        {
            name: "Delete",
            action: async () => {
                await deleteComment(comment._id);
                await allReelComment(id, setReelComments);
                await setControl(v => !v);
            },
            colorC : "ED4956"
        },
        {
            name: "Cancel",
            action: () => setControl(v => !v),
            colorC : "000"
        }
    ]}

    const showOption = (user?.userName === comment?.commentOwner?.[0]?.userName)
    return (
        <div className={`flex group items-start gap-3 marBottomInComment space-x-3 ${comment.indent ? "ml-8" : ""}`}>
            <img
                src={comment.commentOwner?.[0]?.profilePic || userNotPhoto}
                alt={`Profile picture of ${comment.commentOwner?.[0]?.userName}`}
                className="w-8 h-8 rounded-full object-cover"
            />
            <div className="flex-1">
                <div className="flex flex-wrap gap-2 items-center space-x-1 text-sm">
                    <span className="font-semibold text-black">{comment.commentOwner?.[0]?.userName}</span>

                </div>
                <div className={`text-base leading-tight mt-1 ${comment.bold ? "font-semibold" : ""}`}>
                    {comment.content}
                </div>
                {(
                    <div className="flex items-center gap-4 space-x-4 text-xs text-gray-400 mt-1 marginTop25 select-none">
                        <span className="text-gray-400"><TimeAgo date={comment.createdAt} /></span>
                        {comment.likeCount != 0 && <span>{comment.likeCount.toLocaleString()} likes</span>}
                        {showOption && <span onClick={()=>setControl(commentControl)} className="cursor-pointer text-[17px] hidden group-hover:flex"><HiOutlineDotsHorizontal /></span>}
                    </div>
                )}

            </div>
            <button
                aria-label={`Like comment by ${comment.user}`}
                className="text-gray-400 hover:text-gray-600 focus:outline-none marginTop1rem"
                onClick={async () => {
                    await likeComment(comment._id);
                    await allReelComment(id, setReelComments)
                }}
            >
                {comment?.likes?.some((like) => like?.likeOwner?.[0]?.userName === user?.userName) ? <svg aria-label="Unlike" class="x1lliihq x1n2onr6 xxk16z8 text-red-400" fill="currentColor" height="16" role="img" viewBox="0 0 48 48" width="16"><title>Unlike</title><path d="M34.6 3.1c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5s1.1-.2 1.6-.5c1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z"></path></svg>
                    :
                    <svg aria-label="Like" class="x1lliihq x1n2onr6 x1cp0k07" fill="currentColor" height="16" role="img" viewBox="0 0 24 24" width="16"><title>Like</title><path d="M16.792 3.904A4.989 4.989 0 0 1 21.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 0 1 4.708-5.218 4.21 4.21 0 0 1 3.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 0 1 3.679-1.938m0-2a6.04 6.04 0 0 0-4.797 2.127 6.052 6.052 0 0 0-4.787-2.127A6.985 6.985 0 0 0 .5 9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 0 0 3.518 3.018 2 2 0 0 0 2.174 0 45.263 45.263 0 0 0 3.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 0 0-6.708-7.218Z"></path></svg>
                }
            </button>
        </div>
    )
}

export default CommentSoloReel