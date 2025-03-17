import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { ApiError } from "../utils/apiError.js";
import mongoose from "mongoose";
import { Comment } from "../models/comment.model.js";

const addCommentPost = asyncHandler(async (req, res) => {
    const { postId } = req.params;
    const { content } = req.body;

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
    const {id, content} = req.body

    if (!mongoose.isValidObjectId(id)) {
        throw new ApiError(400, "Invalid ID");
    }

    if (!content || content.trim() === "") {
        throw new ApiError(400, "Comment content is required");
    }

    const editComment = await Comment.findByIdAndUpdate(id, {content},{new: true}) 
    if(!editComment){
        throw new ApiError(500, "internal server error")
    }

    return res.status(200).json(new ApiResponse(200, editComment, "update successfully"))
})

const deleteComment = asyncHandler(async (req, res) => {
    const {id} = req.body
    if (!mongoose.isValidObjectId(id)) {
        throw new ApiError(400, "Invalid ID");
    }
    const deleteComment = await Comment.findByIdAndDelete(id)
    if(!deleteComment){
        throw new ApiError(500, "internal server error")
    }

    return res.status(200).json(new ApiResponse(200, {}, "delete successfully"))
})

export {
    addCommentPost,
    addCommentStory,
    editComment,
    deleteComment
}