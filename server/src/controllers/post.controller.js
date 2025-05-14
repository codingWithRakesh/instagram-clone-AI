import { ApiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { Post } from "../models/post.model.js";
import { deleteFromCloudinary, getPublicId, uploadOnCloudinary } from '../utils/cloudinary.js'
import mongoose from 'mongoose'
import { User } from "../models/user.model.js";
import { SavedPost } from "../models/savedPost.model.js";

const createPost = asyncHandler(async (req, res) => {
    const { content, taggedUsers } = req.body;

    const parsedTaggedUsers = JSON.parse(taggedUsers || '[]');

    if (!req.file) {
        throw new ApiError(400, "File is required");
    }

    const fileMimeType = req.file.mimetype;
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

    const post = await Post.create({
        owner: req.user._id,
        content: content || "",
        image: imageUrl,
        video: videoUrl,
        taggedUsers: parsedTaggedUsers
    });

    if (!post) {
        throw new ApiError(500, "Something went wrong");
    }

    res.status(201).json(new ApiResponse(201, post, "Post created successfully"));
})

const deletePost = asyncHandler(async (req, res) => {
    const { postId } = req.body;
    if (!mongoose.isValidObjectId(postId)) {
        throw new ApiError(400, "Invalid post id");
    }

    const post = await Post.findById(postId);
    if (!post) {
        throw new ApiError(404, "Post not found");
    }

    if (post.owner.toString() !== req.user._id.toString()) {
        throw new ApiError(403, "You are not authorized to delete this post");
    }

    if (post.image) {
        const publicId = getPublicId(post.image);
        await deleteFromCloudinary(publicId, "image");
    }

    if (post.video) {
        const publicId = getPublicId(post.video);
        await deleteFromCloudinary(publicId, "video");
    }

    await Post.findByIdAndDelete(postId);
    await SavedPost.deleteOne({ postId: postId })

    res.status(200).json(new ApiResponse(200, {}, "Post deleted successfully"));
})

const updatePost = asyncHandler(async (req, res) => {
    const { content, taggedUsers, postId } = req.body;

    if (!mongoose.isValidObjectId(postId)) {
        throw new ApiError(400, "Invalid post id");
    }

    const post = await Post.findById(postId);
    if (!post) {
        throw new ApiError(404, "Post not found");
    }

    if (post.owner.toString() !== req.user._id.toString()) {
        throw new ApiError(403, "You are not authorized to update this post");
    }

    const updatedPost = await Post.findByIdAndUpdate(postId, {
        content: content || post.content,
        taggedUsers: taggedUsers || post.taggedUsers,
    }, { new: true });

    if (!updatedPost) {
        throw new ApiError(500, "Something went wrong");
    }

    res.status(200).json(new ApiResponse(200, updatedPost, "Post updated successfully"));
})

const editPostData = asyncHandler(async (req, res) => {
    const { postId } = req.body;
    if (!mongoose.isValidObjectId(postId)) {
        throw new ApiError(400, "Invalid post id");
    }

    const post = await Post.aggregate([
        {
            $match: { _id: new mongoose.Types.ObjectId(postId) }
        },
        {
            $lookup: {
                from: "users",
                localField: "owner",
                foreignField: "_id",
                as: "owner",
                pipeline: [
                    {
                        $project: {
                            "password": 0,
                            "refreshToken": 0,
                            "__v": 0
                        }
                    }
                ]
            },
        },
    ])

    if (!post) {
        throw new ApiError(500, "something went wrong")
    }

    return res.status(200).json(new ApiResponse(200, post, "fetch successfully"))
})

const viewPost = asyncHandler(async (req, res) => {
    const { postId } = req.params;
    if (!mongoose.isValidObjectId(postId)) {
        throw new ApiError(400, "Invalid post id");
    }

    // const post = await Post.findById(postId).populate("owner", "name email profilePic").populate("taggedUsers", "name email profilePic");
    const post = await Post.aggregate([
        {
            $match: { _id: new mongoose.Types.ObjectId(postId) }
        },
        {
            $lookup: {
                from: "users",
                localField: "owner",
                foreignField: "_id",
                as: "owner",
                pipeline: [
                    {
                        $project: {
                            "password": 0,
                            "refreshToken": 0,
                            "__v": 0
                        }
                    }
                ]
            },
        },
        {
            $lookup: {
                from: "users",
                localField: "taggedUsers",
                foreignField: "_id",
                as: "taggedUsers",
                pipeline: [
                    {
                        $project: {
                            "password": 0,
                            "refreshToken": 0,
                            "__v": 0
                        }
                    }
                ]
            }
        },
        {
            $lookup: {
                from: "likes",
                localField: "_id",
                foreignField: "postId",
                as: "likes",
                pipeline: [
                    {
                        $lookup: {
                            from: "users",
                            localField: "likeOwner",
                            foreignField: "_id",
                            as: "likeOwner",
                            pipeline: [{
                                $project: {
                                    "_id": 1,
                                    "userName": 1,
                                    "profilePic": 1
                                }
                            }]
                        }
                    }
                ]
            }
        },
        {
            $lookup: {
                from: "comments",
                localField: "_id",
                foreignField: "postId",
                as: "comments",
                pipeline: [
                    {
                        $lookup: {
                            from: "users",
                            localField: "commentOwner",
                            foreignField: "_id",
                            as: "commentOwner",
                            pipeline: [{
                                $project: {
                                    "_id": 1,
                                    "userName": 1,
                                    "profilePic": 1
                                }
                            }]
                        }
                    },
                    {
                        $lookup: {
                            from: "likes",
                            localField: "_id",
                            foreignField: "commentId",
                            as: "likes",
                            pipeline: [
                                {
                                    $lookup: {
                                        from: "users",
                                        localField: "likeOwner",
                                        foreignField: "_id",
                                        as: "likeOwner",
                                        pipeline: [{
                                            $project: {
                                                "_id": 1,
                                                "userName": 1,
                                                "profilePic": 1
                                            }
                                        }]
                                    }
                                }
                            ]
                        }
                    }
                ]
            }
        },
        {
            $lookup: {
                from: "savedposts",
                localField: "_id",
                foreignField: "postId",
                as: "savedPosts",
                pipeline: [
                    {
                        $lookup: {
                            from: "users",
                            localField: "owner",
                            foreignField: "_id",
                            as: "owner",
                            pipeline: [{
                                $project: {
                                    "_id": 1,
                                    "userName": 1,
                                    "profilePic": 1
                                }
                            }]
                        }
                    }
                ]
            }
        }
    ])
    if (!post) {
        throw new ApiError(404, "Post not found");
    }

    res.status(200).json(new ApiResponse(200, post, "Post fetched successfully"));
})

const allUserPosts = asyncHandler(async (req, res) => {
    const { userName } = req.params

    const posts = await User.aggregate([
        {
            $match: {
                userName
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
                from: "posts",
                localField: "_id",
                foreignField: "owner",
                as: "posts",
                pipeline: [
                    {
                        $lookup: {
                            from: "comments",
                            localField: "_id",
                            foreignField: "postId",
                            as: "comments"
                        }
                    },
                    {
                        $addFields: {
                            commentCount: {
                                $size: "$comments"
                            }
                        }
                    }
                ]
            }
        }
    ])
    if (!posts) {
        throw new ApiError(404, "Posts not found")
    }
    return res.status(200).json(new ApiResponse(200, posts, "Posts fetched successfully"))
});

const allPosts = asyncHandler(async (req, res) => {
    const posts = await User.aggregate([
        {
            $match: {
                _id: new mongoose.Types.ObjectId(req.user._id)
            }
        },
        {
            $project: {
                "fullName": 1,
                "userName": 1,
                "_id": 1
            }
        },
        {
            $lookup: {
                from: "posts",
                localField: "_id",
                foreignField: "owner",
                as: "posts",
                pipeline: [
                    {
                        $lookup: {
                            from: "users",
                            localField: "owner",
                            foreignField: "_id",
                            as: "owner",
                            pipeline: [
                                {
                                    $project: {
                                        "_id": 1,
                                        "userName": 1,
                                        "profilePic": 1
                                    }
                                }
                            ]
                        }
                    },
                    {
                        $lookup: {
                            from: "likes",
                            localField: "_id",
                            foreignField: "postId",
                            as: "likes",
                            pipeline: [
                                {
                                    $lookup: {
                                        from: "users",
                                        localField: "likeOwner",
                                        foreignField: "_id",
                                        as: "likeOwner",
                                        pipeline: [{
                                            $project: {
                                                "_id": 1,
                                                "userName": 1,
                                                "profilePic": 1
                                            }
                                        }]
                                    }
                                }
                            ]
                        }
                    },
                    {
                        $lookup: {
                            from: "comments",
                            localField: "_id",
                            foreignField: "postId",
                            as: "comments"
                        }
                    },
                    {
                        $lookup: {
                            from: "savedposts",
                            localField: "_id",
                            foreignField: "postId",
                            as: "savedPosts",
                            pipeline: [
                                {
                                    $lookup: {
                                        from: "users",
                                        localField: "owner",
                                        foreignField: "_id",
                                        as: "owner",
                                        pipeline: [{
                                            $project: {
                                                "_id": 1,
                                                "userName": 1,
                                                "profilePic": 1
                                            }
                                        }]
                                    }
                                }
                            ]
                        }
                    },
                    {
                        $addFields: {
                            commentCount: {
                                $size: "$comments"
                            }
                        }
                    }
                ]
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
                            as: "user",
                            pipeline: [
                                {
                                    $project: {
                                        "_id": 1,
                                        "userName": 1,
                                        "profilePic": 1
                                    }
                                },
                                {
                                    $lookup: {
                                        from: "posts",
                                        localField: "_id",
                                        foreignField: "owner",
                                        as: "posts",
                                        pipeline: [
                                            {
                                                $lookup: {
                                                    from: "users",
                                                    localField: "owner",
                                                    foreignField: "_id",
                                                    as: "owner",
                                                    pipeline: [
                                                        {
                                                            $project: {
                                                                "_id": 1,
                                                                "userName": 1,
                                                                "profilePic": 1
                                                            }
                                                        }
                                                    ]
                                                }
                                            },
                                            {
                                                $lookup: {
                                                    from: "likes",
                                                    localField: "_id",
                                                    foreignField: "postId",
                                                    as: "likes",
                                                    pipeline: [
                                                        {
                                                            $lookup: {
                                                                from: "users",
                                                                localField: "likeOwner",
                                                                foreignField: "_id",
                                                                as: "likeOwner",
                                                                pipeline: [{
                                                                    $project: {
                                                                        "_id": 1,
                                                                        "userName": 1,
                                                                        "profilePic": 1
                                                                    }
                                                                }]
                                                            }
                                                        }
                                                    ]
                                                }
                                            },
                                            {
                                                $lookup: {
                                                    from: "comments",
                                                    localField: "_id",
                                                    foreignField: "postId",
                                                    as: "comments"
                                                }
                                            },
                                            {
                                                $lookup: {
                                                    from: "savedposts",
                                                    localField: "_id",
                                                    foreignField: "postId",
                                                    as: "savedPosts",
                                                    pipeline: [
                                                        {
                                                            $lookup: {
                                                                from: "users",
                                                                localField: "owner",
                                                                foreignField: "_id",
                                                                as: "owner",
                                                                pipeline: [{
                                                                    $project: {
                                                                        "_id": 1,
                                                                        "userName": 1,
                                                                        "profilePic": 1
                                                                    }
                                                                }]
                                                            }
                                                        }
                                                    ]
                                                }
                                            },
                                            {
                                                $addFields: {
                                                    commentCount: {
                                                        $size: "$comments"
                                                    }
                                                }
                                            }
                                        ]
                                    }
                                }
                            ]
                        }
                    },
                ]
            }
        },
        {
            $project: {
                "posts": 1,
                "followusers.user": 1
            }
        }
    ])
    if (!posts) {
        throw new ApiError(404, "not found")
    }

    return res.status(200).json(new ApiResponse(200, posts, "all posts"))
})

const savePost = asyncHandler(async (req, res) => {
    const posts = await User.aggregate([
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
                from: "savedposts",
                localField: "_id",
                foreignField: "owner",
                as: "savedposts",
                pipeline: [
                    {
                        $lookup: {
                            from: "posts",
                            localField: "postId",
                            foreignField: "_id",
                            as: "savePosts",
                            pipeline: [
                                {
                                    $lookup: {
                                        from: "comments",
                                        localField: "_id",
                                        foreignField: "postId",
                                        as: "comments"
                                    }
                                },
                                {
                                    $addFields: {
                                        commentCount: {
                                            $size: "$comments"
                                        }
                                    }
                                }
                            ]
                        }
                    }
                ]
            }
        }
    ])
    if (!posts) {
        throw new ApiError(404, "not found")
    }
    return res.status(200).json(new ApiResponse(200, posts, "all saveposts"))
})

const allReels = asyncHandler(async (req, res) => {
    const { userName } = req.params

    const userReels = await User.aggregate([
        {
            $match: {
                userName
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
                from: "posts",
                localField: "_id",
                foreignField: "owner",
                as: "posts",
                pipeline: [
                    {
                        $match: {
                            video: { $ne: "" }
                        }
                    },
                ]
            }
        }
    ])
    if (!userReels) {
        throw new ApiError(404, "not found")
    }
    return res.status(200).json(new ApiResponse(200, userReels, "all Reels"))
})

const allTagUsers = asyncHandler(async (req, res) => {
    const { userName } = req.params;

    const users = await User.aggregate([
        {
            $match: { userName: userName }
        },
        {
            $lookup: {
                from: "posts",
                localField: "_id",
                foreignField: "taggedUsers",
                as: "taggedPosts",
                pipeline: [
                    {
                        $lookup: {
                            from: "comments",
                            localField: "_id",
                            foreignField: "postId",
                            as: "comments"
                        }
                    },
                    {
                        $addFields: {
                            commentCount: {
                                $size: "$comments"
                            }
                        }
                    }
                ]
            }
        },
        // {
        //     $unwind: {
        //         path: "$taggedPosts",
        //         preserveNullAndEmptyArrays: true
        //     }
        // },
        {
            $lookup: {
                from: "users",
                localField: "taggedPosts.taggedUsers",
                foreignField: "_id",
                as: "taggedUsersDetails"
            }
        },
        {
            $project: {
                password: 0,
                refreshToken: 0,
                __v: 0,
                "taggedUsersDetails.password": 0,
                "taggedUsersDetails.refreshToken": 0,
                "taggedUsersDetails.__v": 0
            }
        }
    ]);

    if (users.length === 0) {
        throw new ApiError(404, "Not Found");
    }

    return res.status(200).json(new ApiResponse(200, users, "All tagged users"));
});

const allPostExplore = asyncHandler(async (req, res) => {
    const posts = await Post.aggregate([
        {
            $lookup: {
                from: "users",
                localField: "owner",
                foreignField: "_id",
                as: "owner",
                pipeline: [
                    {
                        $project: {
                            "_id": 1
                        }
                    }
                ]
            },
        },
        {
            $lookup: {
                from: "likes",
                localField: "_id",
                foreignField: "postId",
                as: "likes",
                pipeline: [
                    {
                        $lookup: {
                            from: "users",
                            localField: "likeOwner",
                            foreignField: "_id",
                            as: "likeOwner",
                            pipeline: [{
                                $project: {
                                    "_id": 1,
                                    "userName": 1,
                                    "profilePic": 1
                                }
                            }]
                        }
                    }
                ]
            }
        },
        {
            $lookup: {
                from: "comments",
                localField: "_id",
                foreignField: "postId",
                as: "comments"
            }
        },
        {
            $addFields: {
                commentCount: {
                    $size: "$comments"
                }
            }
        }
    ])
    if (!posts) {
        throw new ApiError(404, "not found")
    }

    return res.status(200).json(new ApiResponse(200, posts, "all posts"))
})

const allReelsPage = asyncHandler(async (req, res) => {
    const reels = await Post.aggregate([
        {
            $match: {
                video: { $ne: "" }
            }
        },
        {
            $lookup: {
                from: "users",
                localField: "owner",
                foreignField: "_id",
                as: "owner",
                pipeline: [
                    {
                        $project: {
                            "_id": 1,
                            "userName": 1,
                            "profilePic": 1
                        }
                    }
                ]
            },
        }
    ])
    if (!reels) {
        throw new ApiError(404, "not found")
    }

    return res.status(200).json(new ApiResponse(200, reels, "all reels"))
})

const reelSavePost = asyncHandler(async (req, res) => {
    const { postId } = req.params
    if (!mongoose.isValidObjectId(postId)) {
        throw new ApiError(400, "Invalid post id");
    }

    const post = await Post.aggregate([
        {
            $match: { _id: new mongoose.Types.ObjectId(postId) }
        },
        {
            $lookup: {
                from: "savedposts",
                localField: "_id",
                foreignField: "postId",
                as: "savedPosts",
                pipeline: [
                    {
                        $lookup: {
                            from: "users",
                            localField: "owner",
                            foreignField: "_id",
                            as: "owner",
                            pipeline: [{
                                $project: {
                                    "_id": 1,
                                    "userName": 1,
                                    "profilePic": 1
                                }
                            }]
                        }
                    }
                ]
            }
        }
    ])

    if (!post) {
        throw new ApiError(404, "Post not found");
    }

    res.status(200).json(new ApiResponse(200, post, "all savePost like"))
})

const reelPostLike = asyncHandler(async (req, res) => {
    const { postId } = req.params
    if (!mongoose.isValidObjectId(postId)) {
        throw new ApiError(400, "Invalid post id");
    }

    const post = await Post.aggregate([
        {
            $match: { _id: new mongoose.Types.ObjectId(postId) }
        },
        {
            $lookup: {
                from: "likes",
                localField: "_id",
                foreignField: "postId",
                as: "likes",
                pipeline: [
                    {
                        $lookup: {
                            from: "users",
                            localField: "likeOwner",
                            foreignField: "_id",
                            as: "likeOwner",
                            pipeline: [{
                                $project: {
                                    "_id": 1,
                                    "userName": 1,
                                    "profilePic": 1
                                }
                            }]
                        }
                    }
                ]
            }
        },
    ])

    if (!post) {
        throw new ApiError(404, "Post not found");
    }

    res.status(200).json(new ApiResponse(200, post, "all reels like"))
})

const commentOnReel = asyncHandler(async (req, res) => {
    const { postId } = req.params
    if (!mongoose.isValidObjectId(postId)) {
        throw new ApiError(400, "Invalid post id");
    }

    const post = await Post.aggregate([
        {
            $match: { _id: new mongoose.Types.ObjectId(postId) }
        },
        {
            $lookup: {
                from: "comments",
                localField: "_id",
                foreignField: "postId",
                as: "comments",
                pipeline: [
                    {
                        $lookup: {
                            from: "users",
                            localField: "commentOwner",
                            foreignField: "_id",
                            as: "commentOwner",
                            pipeline: [{
                                $project: {
                                    "_id": 1,
                                    "userName": 1,
                                    "profilePic": 1
                                }
                            }]
                        }
                    },
                    {
                        $lookup: {
                            from: "likes",
                            localField: "_id",
                            foreignField: "commentId",
                            as: "likes",
                            pipeline: [
                                {
                                    $lookup: {
                                        from: "users",
                                        localField: "likeOwner",
                                        foreignField: "_id",
                                        as: "likeOwner",
                                        pipeline: [{
                                            $project: {
                                                "_id": 1,
                                                "userName": 1,
                                                "profilePic": 1
                                            }
                                        }]
                                    }
                                }
                            ]
                        }
                    }
                ]
            }
        },
        {
            $addFields: {
                commentCount: {
                    $size: "$comments"
                }
            }
        }
    ])

    if (!post) {
        throw new ApiError(404, "Post not found");
    }
    return res.status(200).json(new ApiResponse(200, post, "all reels"))
})


export {
    createPost,
    deletePost,
    updatePost,
    viewPost,
    allUserPosts,
    allPosts,
    savePost,
    allReels,
    allTagUsers,
    editPostData,
    allPostExplore,
    allReelsPage,
    commentOnReel,
    reelPostLike,
    reelSavePost
}