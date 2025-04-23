import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { Notification } from "../models/notification.model.js";
import { User } from "../models/user.model.js";
import { Post } from "../models/post.model.js";
import { Story } from "../models/story.model.js";
import mongoose from "mongoose";

const allNotification = asyncHandler(async (req, res) => {
    const notification = await User.aggregate([
        {
            $match: { _id: new mongoose.Types.ObjectId(req.user._id) }
        },
        {
            $project: {
                userName: 1,
                profilePic: 1,
                _id : 1
            }
        },
        {
            $lookup : {
                from : "notifications",
                localField : "_id",
                foreignField : "user",
                as : "notifications",
                pipeline : [
                    {
                        $lookup: {
                            from: "users",
                            localField: "user",
                            foreignField: "_id",
                            as: "postOwner",
                            pipeline : [
                                {
                                    $project: {
                                        userName: 1,
                                        profilePic: 1,
                                        _id : 1
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
                            pipeline : [
                                {
                                    $project: {
                                        userName: 1,
                                        profilePic: 1,
                                        _id : 1
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
                            pipeline : [
                                {
                                    $project : {
                                        _id : 1,
                                        content : 1
                                    }
                                }
                            ]
                        }
                    }
                ]
            }
        }
    ])
    if(!notification){
        throw new ApiError(500, "Internal server Error")
    }

    return res.status(200).json(new ApiResponse(200,notification,"all notification"))
})

export {
    allNotification
}