import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { ApiError } from "../utils/apiError.js";
import mongoose from "mongoose";
import { Comment } from "../models/comment.model.js";
import { Post } from "../models/post.model.js";
import { Notification } from "../models/notification.model.js";
import { io } from "../socket/socket.js";

const addCommentPost = asyncHandler(async (req, res) => {
    const { content, postId } = req.body;

    if (!mongoose.isValidObjectId(postId)) {
        throw new ApiError(400, "Invalid ID");
    }

    if (!content || content.trim() === "") {
        throw new ApiError(400, "Comment content is required");
    }

    const postComment = await Comment.create({
        postId,
        commentOwner: req.user._id,
        content
    })
    if (!postComment) {
        throw new ApiError(500, "Internal Server Error")
    }

    const post = await Post.findById(postId)
    if (post.owner.toString() !== req.user._id.toString()) {
        const notification = await Notification.create({
            user: post.owner,
            type: "comment_post",
            post: postId,
            sender: req.user._id
        })
        const newNotiFication = await Notification.aggregate([
            {
                $match: {
                    _id: notification._id
                }
            },
            {
                $lookup: {
                    from: "users",
                    localField: "user",
                    foreignField: "_id",
                    as: "postOwner",
                    pipeline: [
                        {
                            $project: {
                                password: 0,
                                refreshToken: 0
                            }
                        }
                    ]
                }
            },
            {
                $lookup: {
                    from: "users",
                    localField: "sender",
                    foreignField: "_id",
                    as: "postSender",
                    pipeline: [
                        {
                            $project: {
                                password: 0,
                                refreshToken: 0
                            }
                        }
                    ]
                }
            },
            {
                $lookup: {
                    from: "posts",
                    localField: "post",
                    foreignField: "_id",
                    as: "post"
                }
            }
        ])

        if (!newNotiFication || newNotiFication.length === 0) {
            throw new ApiError(500, "Something went wrong")
        }


        io.to(post.owner.toString()).emit('newNotification', newNotiFication)
        // console.log("postOwner", newNotiFication)
    }


    return res.status(200).json(new ApiResponse(200, postComment, "comment successfully"))
});

const addCommentStory = asyncHandler(async (req, res) => {
    const { storyId } = req.params;
    const { content } = req.body;

    if (!mongoose.isValidObjectId(storyId)) {
        throw new ApiError(400, "Invalid ID");
    }

    if (!content || content.trim() === "") {
        throw new ApiError(400, "Comment content is required");
    }

    const storyComment = await Comment.create({
        storyId,
        commentOwner: req.user._id,
        content
    })
    if (!storyComment) {
        throw new ApiError(500, "Internal Server Error")
    }

    return res.status(200).json(new ApiResponse(200, storyComment, "comment successfully"))
})

const editComment = asyncHandler(async (req, res) => {
    const { id, content } = req.body

    if (!mongoose.isValidObjectId(id)) {
        throw new ApiError(400, "Invalid ID");
    }

    if (!content || content.trim() === "") {
        throw new ApiError(400, "Comment content is required");
    }

    const editComment = await Comment.findByIdAndUpdate(id, { content }, { new: true })
    if (!editComment) {
        throw new ApiError(500, "internal server error")
    }

    return res.status(200).json(new ApiResponse(200, editComment, "update successfully"))
})

const deleteComment = asyncHandler(async (req, res) => {
    const { id } = req.body
    if (!mongoose.isValidObjectId(id)) {
        throw new ApiError(400, "Invalid ID");
    }
    const deleteComment = await Comment.findByIdAndDelete(id)
    if (!deleteComment) {
        throw new ApiError(500, "internal server error")
    }
    const post = await Post.findById(deleteComment.postId)
    // console.log(" COmment owner", post.owner)
    await Notification.deleteOne({
        user: post.owner,
        type: "comment_post",
        post: post._id,
        sender: req.user._id
    })

    return res.status(200).json(new ApiResponse(200, {}, "delete successfully"))
})

export {
    addCommentPost,
    addCommentStory,
    editComment,
    deleteComment
}