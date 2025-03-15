import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { ApiError } from "../utils/apiError.js";
import mongoose from "mongoose";
import { SavedPost } from "../models/savedPost.model.js";

const toggleSavePost = asyncHandler(async (req, res) => {
    const { postId } = req.params;
    
    if (!mongoose.isValidObjectId(postId)) {
        throw new ApiError(400, "Invalid ID");
    }

    if (req.method === "GET") {
        const savePost = await SavedPost.create({ postId, owner: req.user._id });
        if (!savePost) {
            throw new ApiError(500, "Internal server error");
        }
        return res.status(200).json(new ApiResponse(200, savePost, "Saved successfully"));
    }
    
    if (req.method === "DELETE") {
        const unSavePost = await SavedPost.findOneAndDelete({ postId, owner: req.user._id });
        if (!unSavePost) {
            throw new ApiError(500, "Internal server error");
        }
        return res.status(200).json(new ApiResponse(200, {}, "UnSaved successfully"));
    }
    
    throw new ApiError(405, "Method not allowed");
});

export { toggleSavePost };
