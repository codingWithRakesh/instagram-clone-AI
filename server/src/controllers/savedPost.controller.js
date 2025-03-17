import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { ApiError } from "../utils/apiError.js";
import mongoose from "mongoose";
import { SavedPost } from "../models/savedPost.model.js";

const toggleSavePost = asyncHandler(async (req, res) => {
    const { postId } = req.body;

    if (!mongoose.isValidObjectId(postId)) {
        throw new ApiError(400, "Invalid post ID");
    }

    const existingSave = await SavedPost.findOne({ postId, owner: req.user._id });

    if (existingSave) {
        await SavedPost.deleteOne({ _id: existingSave._id });
        return res.status(200).json(new ApiResponse(200, {}, "UnSaved successfully"));
    } else {
        const savePost = await SavedPost.create({
            postId,
            owner: req.user._id
        });
        if (!savePost) {
            throw new ApiError(500, "Server error");
        }
        return res.status(200).json(new ApiResponse(200, savePost, "Saved successfully"));
    }
});

export { toggleSavePost };
