import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { ApiError } from "../utils/apiError.js";
import mongoose from "mongoose";
import { FollowUser } from "../models/followUser.model.js";
import { Notification } from "../models/notification.model.js";
import { io } from "../socket/socket.js";

const followUnfollow = asyncHandler(async (req, res) => {
    const { userId } = req.body;

    if (!mongoose.isValidObjectId(userId)) {
        throw new ApiError(400, "Invalid user ID");
    }

    if (userId === req.user._id.toString()) {
        throw new ApiError(400, "You cannot follow yourself");
    }

    let followDoc = await FollowUser.findOne({ following: userId, follower: req.user._id });
    if (!followDoc) {
        followDoc = await FollowUser.create({
            follower: req.user._id,
            following: userId
        })
        // console.log("following you", userId)
        const notification = await Notification.create({
            user: userId,
            type: "follow",
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
            }
        ])
        if (!newNotiFication || newNotiFication.length === 0) {
            throw new ApiError(500, "Something went wrong")
        }

        io.to(userId.toString()).emit('newNotification', newNotiFication)

        return res.status(200).json(new ApiResponse(200, followDoc, "Followed successfully"));
    } else {
        const deleteValue = await FollowUser.deleteOne({
            follower: req.user._id,
            following: userId
        })
        await Notification.deleteOne({
            user: userId,
            type: "follow",
            sender: req.user._id
        })
        if (!deleteValue) {
            throw new ApiError(500, "Internal Server Error")
        }
        return res.status(200).json(new ApiResponse(200, {}, "Unfollowed successfully"));
    }

});

export { followUnfollow };