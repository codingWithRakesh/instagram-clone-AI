import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { Like } from "../models/like.model.js";
import { Post } from "../models/post.model.js";
import mongoose from "mongoose";
import { Story } from "../models/story.model.js";
import { Comment } from "../models/comment.model.js";
import { io } from "../socket/socket.js"
import { Notification } from "../models/notification.model.js";

const toggleLikePost = asyncHandler(async (req, res) => {
    const { postId } = req.body;

    if (!mongoose.isValidObjectId(postId)) {
        throw new ApiError(400, "Invalid post ID");
    }

    const post = await Post.findById(postId);
    if (!post) {
        throw new ApiError(404, "Post not found");
    }

    const existingLike = await Like.findOne({ postId, likeOwner: req.user._id });

    if (existingLike) {
        await Like.deleteOne({ _id: existingLike._id });
        await Post.findByIdAndUpdate(postId, { $inc: { likeCount: -1 } }, { new: true });
        await Notification.deleteOne({
            user: post.owner,
            type: "like_post",
            post: postId,
            sender: req.user._id
        })

        return res.status(200).json(new ApiResponse(200, {}, "Unliked successfully"));
    } else {
        const like = await Like.create({
            postId,
            likeOwner: req.user._id
        });
        if (!like) {
            throw new ApiError(404, "not found")
        }
        await Post.findByIdAndUpdate(postId, { $inc: { likeCount: 1 } }, { new: true });
        if (post.owner.toString() !== req.user._id.toString()) {
            const notification = await Notification.create({
                user: post.owner,
                type: "like_post",
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
        }

        return res.status(200).json(new ApiResponse(200, like, "Liked successfully"));
    }
})

const toggleLikeStory = asyncHandler(async (req, res) => {
    const { storyId } = req.params
    if (!mongoose.isValidObjectId(storyId)) {
        throw new ApiError(400, "Invalid post ID");
    }

    const story = await Story.findById(storyId)
    if (!story) {
        throw new ApiError(400, "Invalid story ID");
    }

    console.log("storyOwner", story.owner, req.user._id)

    const existingLike = await Like.findOne({ storyId, likeOwner: req.user._id });

    if (existingLike) {
        await Like.deleteOne({ _id: existingLike._id });
        return res.status(200).json(new ApiResponse(200, {}, "Unliked successfully"));
    } else {
        const like = await Like.create({
            storyId,
            likeOwner: req.user._id
        });
        if (!like) {
            throw new ApiError(404, "not found")
        }

        return res.status(200).json(new ApiResponse(200, like, "Liked successfully"));
    }
})

const toggleLikeComment = asyncHandler(async (req, res) => {
    const { commentId } = req.body;

    if (!mongoose.isValidObjectId(commentId)) {
        throw new ApiError(400, "Invalid post ID");
    }

    const comment = await Comment.findById(commentId);
    if (!comment) {
        throw new ApiError(404, "Post not found");
    }

    const post = await Post.findById(comment.postId)
    // console.log("commentOwner", post.owner, req.user._id)

    const existingLike = await Like.findOne({ commentId, likeOwner: req.user._id });
    if (existingLike) {
        await Like.deleteOne({ _id: existingLike._id });
        await Comment.findByIdAndUpdate(commentId, { $inc: { likeCount: -1 } }, { new: true });
        await Notification.deleteOne({
            user: comment.commentOwner,
            type: "like_comment",
            post: post._id,
            comment : commentId,
            sender: req.user._id
        })

        return res.status(200).json(new ApiResponse(200, {}, "Unliked successfully"));
    } else {
        const like = await Like.create({
            commentId,
            likeOwner: req.user._id
        });
        if (!like) {
            throw new ApiError(500, "server error")
        }
        await Comment.findByIdAndUpdate(commentId, { $inc: { likeCount: 1 } }, { new: true });

        if (comment.commentOwner.toString() !== req.user._id.toString()) {
            const notification = await Notification.create({
                user: comment.commentOwner,
                type: "like_comment",
                post: post._id,
                comment : commentId,
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
                },
                {
                    $lookup: {
                        from: "comments",
                        localField: "comment",
                        foreignField: "_id",
                        as: "comment",
                        pipeline: [
                            {
                                $project: {
                                    _id: 1,
                                    content: 1
                                }
                            }
                        ]
                    }
                }
            ])

            if (!newNotiFication || newNotiFication.length === 0) {
                throw new ApiError(500, "Something went wrong")
            }

            io.to(comment.commentOwner.toString()).emit('newNotification', newNotiFication)
        }

        return res.status(200).json(new ApiResponse(200, like, "Liked successfully"));
    }
})

export {
    toggleLikePost,
    toggleLikeStory,
    toggleLikeComment
}