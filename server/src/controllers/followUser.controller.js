import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { ApiError } from "../utils/apiError.js";
import mongoose from "mongoose";
import { FollowUser } from "../models/followUser.model.js";

const followUnfollow = asyncHandler(async (req, res) => {
    const { userId } = req.body;

    if (!mongoose.isValidObjectId(userId)) {
        throw new ApiError(400, "Invalid user ID");
    }

    if (userId === req.user._id.toString()) {
        throw new ApiError(400, "You cannot follow yourself");
    }

    let followDoc = await FollowUser.findOne({ following: userId, follower : req.user._id });
    if(!followDoc){
        followDoc = await FollowUser.create({
            follower : req.user._id,
            following : userId
        })
        console.log("following you",userId)
        return res.status(200).json(new ApiResponse(200, followDoc, "Followed successfully"));
    }else{
        const deleteValue = await FollowUser.deleteOne({
            follower : req.user._id,
            following : userId
        })
        if(!deleteValue){
            throw new ApiError(500, "Internal Server Error")
        }
        return res.status(200).json(new ApiResponse(200, {}, "Unfollowed successfully"));
    }

});

export { followUnfollow };