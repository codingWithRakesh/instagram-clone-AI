import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { deleteFromCloudinary, getPublicId, uploadOnCloudinary } from '../utils/cloudinary.js'
import { User } from "../models/user.model.js";
import { Story } from "../models/story.model.js";
import mongoose from "mongoose";

const createStory = asyncHandler(async (req, res) => {
    const { text } = req.body
    if (!req.file) {
        throw new ApiError(400, "File is required");
    }
    const fileMimeType = req.file.mimetype
    const base64File = `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`
    if (!base64File) {
        throw new ApiError(400, "File is required")
    }
    let imageUrl = "";
    let videoUrl = "";

    if (fileMimeType.startsWith("image/")) {
        const postImage = await uploadOnCloudinary(base64File, "image")
        if (!postImage.url) {
            throw new ApiError(500, "Something went wrong")
        }
        imageUrl = postImage.url
    } else if (fileMimeType.startsWith("video/")) {
        const postVideo = await uploadOnCloudinary(base64File, "video")
        if (!postVideo.url) {
            throw new ApiError(500, "Something went wrong")
        }
        videoUrl = postVideo.url
    } else {
        throw new ApiError(400, "Only image or video files are allowed");
    }

    const story = await Story.create({
        owner: req.user._id,
        text: text || "",
        image: imageUrl,
        video: videoUrl
    })

    if (!story) {
        throw new ApiError(500, "something went wrong")
    }

    return res.status(200).json(new ApiResponse(200, story, "Story Created Successfully"))
})

const updateStory = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { text } = req.body;

    const story = await Story.findById(id)
    if (!story) {
        throw new ApiError(404, "not found")
    }
    if (story.owner.toString() !== req.user._id.toString()) {
        throw new ApiError(403, "You are not authorized to update this post");
    }

    story.text = text

    await story.save({ validateBeforeSave: false })

    return res.status(200).json(new ApiResponse(200, story, "story upload successfully"))
})

const deleteStory = asyncHandler(async (req, res) => {
    const { id } = req.params;

    if (!id) {
        throw new ApiError(400, "bad request")
    }

    const story = await Story.findById(id)
    if (!story) {
        throw new ApiError(404, "story not found")
    }

    if (story.owner.toString() !== req.user._id.toString()) {
        throw new ApiError(403, "You are not authorized to delete this story");
    }

    if (story.image) {
        const publicId = getPublicId(story.image);
        await deleteFromCloudinary(publicId, "image");
    }

    if (story.video) {
        const publicId = getPublicId(story.video);
        await deleteFromCloudinary(publicId, "video");
    }

    await Story.findByIdAndDelete(id);
    return res.status(200).json(new ApiResponse(200, {}, "Story deleted successfully"));

})

const showStory = asyncHandler(async (req, res) => {
    const { userName } = req.params;
    const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);

    const story = await User.aggregate([
        {
            $match: { userName }
        },
        {
            $project: {
                "userName": 1,
                "fullName": 1,
                "profilePic": 1,
                "_id": 1
            }
        },
        {
            $lookup: {
                from: "stories",
                localField: "_id",
                foreignField: "owner",
                as: "stories",
                pipeline: [
                    {
                        $match: { createdAt: { $gt: twentyFourHoursAgo } }
                    },
                    {
                        $addFields: {
                            url: {
                                $cond: [
                                    { $ne: ["$video", ""] },
                                    "$video",
                                    "$image"
                                ]
                            },
                            type: {
                                $cond: [
                                    { $ne: ["$video", ""] },
                                    "video",
                                    "image"
                                ]
                            }
                        }
                    }
                ]
            }
        }
    ]);

    if (!story || story.length === 0) {
        throw new ApiError(404, "not found");
    }

    return res.status(200).json(new ApiResponse(200, story, "userStory"));
})

const allStories = asyncHandler(async (req, res) => {
    const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
    const stories = await User.aggregate([
        {
            $match: {
                _id: new mongoose.Types.ObjectId(req.user._id)
            }
        },
        {
            $project: {
                "profilePic": 1,
                "fullName": 1,
                "_id": 1
            }
        },
        {
            $lookup: {
                from: "followusers",
                localField: "_id",
                foreignField: "follower",
                as: "followusers",
                pipeline: [
                    {
                        $lookup: {
                            from: "users",
                            localField: "following",
                            foreignField: "_id",
                            as: "followingUser"
                        }
                    },
                    {
                        $unwind: "$followingUser"
                    },
                    {
                        $project: {
                            "following": "$followingUser._id",
                            "profilePic": "$followingUser.profilePic",
                            "fullName": "$followingUser.fullName",
                            "userName": "$followingUser.userName",
                            "createdAt": "$followingUser.createdAt",
                            "updatedAt": "$followingUser.updatedAt"
                        }
                    },
                    {
                        $lookup: {
                            from: "stories",
                            localField: "following",
                            foreignField: "owner",
                            as: "stories",
                            pipeline: [
                                {
                                    $match: { createdAt: { $gt: twentyFourHoursAgo } }
                                },
                                {
                                    $addFields: {
                                        url: {
                                            $cond: [
                                                { $ne: ["$video", ""] },
                                                "$video",
                                                "$image"
                                            ]
                                        },
                                        type: {
                                            $cond: [
                                                { $ne: ["$video", ""] },
                                                "video",
                                                "image"
                                            ]
                                        }
                                    }
                                }
                            ]
                        }
                    },
                    {
                        $match: {
                            $expr: { $gt: [{ $size: "$stories" }, 0] }
                        }
                    }
                ]
            }
        }
    ])
    if (!stories) {
        throw new ApiError(500, "something went wrong")
    }

    return res.status(200).json(new ApiResponse(200, stories, "all stories"))
})

const storyViewers = asyncHandler(async (req, res) => {
    const { storyId } = req.params;
    const userId = req.user._id;

    try {
        const story = await Story.findById(storyId);

        if (!story) {
            throw new ApiError(404, "Story not found")
        }

        if (!story.viewers.includes(userId)) {
            story.viewers.push(userId);
            await story.save({ validateBeforeSave: false });
        }

        res.status(200).json(new ApiResponse(200, { viewers: story.viewers }, "all viewers"));
    } catch (error) {
        throw new ApiError(500, "Internal Server Error")
    }
})

const storyViewClient = asyncHandler(async (req, res) => {
    const { storyId } = req.params

    if (!mongoose.Types.ObjectId.isValid(storyId)) {
        throw new ApiError(400, "Invalid Story ID");
    }

    try {
        const userExists = await User.findById(req.user._id);
        if (!userExists) {
            throw new ApiError(404, "User not found");
        }

        const story = await User.aggregate([
            {
                $match: {
                    _id: new mongoose.Types.ObjectId(req.user._id)
                }
            },
            {
                $project: {
                    "password": 0,
                    "refreshToken": 0,
                    "__v": 0
                }
            },
            {
                $lookup: {
                    from: "stories",
                    localField: "_id",
                    foreignField: "owner",
                    as: "stories",
                    pipeline: [
                        {
                            $match: {
                                _id: new mongoose.Types.ObjectId(storyId)
                            }
                        },
                        {
                            $project: {
                                "__v": 0
                            }
                        },
                        {
                            $lookup: {
                                from: "users",
                                localField: "viewers",
                                foreignField: "_id",
                                as: "views",
                                pipeline: [
                                    {
                                        $project: {
                                            "password": 0,
                                            "refreshToken": 0,
                                            "__v": 0
                                        }
                                    },
                                ]
                            }
                        },
                        {
                            $lookup: {
                                from: "likes",
                                localField: "_id",
                                foreignField: "storyId",
                                as: "likes",
                                pipeline: [
                                    {
                                        $lookup: {
                                            from: "users",
                                            localField: "likeOwner",
                                            foreignField: "_id",
                                            as: "usersLikes",
                                        }
                                    },
                                    {
                                        $addFields: {
                                            profilePic: { $arrayElemAt: ["$usersLikes.profilePic", 0] },
                                            userName: { $arrayElemAt: ["$usersLikes.userName", 0] },
                                            _id: { $arrayElemAt: ["$usersLikes._id", 0] }
                                        }
                                    },
                                    {
                                        $project: {
                                            "profilePic": 1,
                                            "userName": 1,
                                            "_id": 1
                                        }
                                    }
                                ]
                            }
                        },
                        {
                            $lookup: {
                                from: "comments",
                                localField: "_id",
                                foreignField: "storyId",
                                as: "comments",
                                pipeline: [
                                    {
                                        $lookup: {
                                            from: "users",
                                            localField: "commentOwner",
                                            foreignField: "_id",
                                            as: "userComments",
                                        }
                                    },
                                    {
                                        $addFields: {
                                            profilePic: { $arrayElemAt: ["$userComments.profilePic", 0] },
                                            userName: { $arrayElemAt: ["$userComments.userName", 0] },
                                            _id: { $arrayElemAt: ["$userComments._id", 0] }
                                        }
                                    },
                                    {
                                        $project: {
                                            "profilePic": 1,
                                            "userName": 1,
                                            "_id": 1,
                                            "likeCount": 1,
                                            "content": 1
                                        }
                                    }
                                ]
                            }
                        },
                        {
                            $addFields: {
                                likeCount: {
                                    $size: "$likes"
                                },
                                commentCount: {
                                    $size: "$comments"
                                },
                                viewsCount: {
                                    $size: "$views"
                                }
                            }
                        }
                    ]
                }
            }
        ])
        if (!story) {
            throw new ApiError(500, "Internal Server Error")
        }

        return res.status(200).json(new ApiResponse(200, story, "story"))
    } catch (error) {
        throw new ApiError(500, "Internal Server Error")
    }
})

export {
    createStory,
    updateStory,
    deleteStory,
    showStory,
    allStories,
    storyViewers,
    storyViewClient
}