import { ApiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { Post } from "../models/post.model.js";
import { deleteFromCloudinary, getPublicId, uploadOnCloudinary } from '../utils/cloudinary.js'
import mongoose from 'mongoose'
import { User } from "../models/user.model.js";

const createPost = asyncHandler(async (req, res) => {
    const { content, taggedUsers } = req.body;

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
        content : content || "",
        image: imageUrl || "",
        video: videoUrl || "",
        taggedUsers : taggedUsers || []
    });

    if (!post) {
        throw new ApiError(500, "Something went wrong");
    }

    res.status(201).json(new ApiResponse(201, post, "Post created successfully"));
})

const deletePost = asyncHandler(async (req, res) => {
    const { postId } = req.params;
    if (!mongoose.isValidObjectId(postId)) {
        throw new ApiError(400, "Invalid post id");
    }

    const post = await Post.findByIdAndDelete(postId);
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

    res.status(200).json(new ApiResponse(200, {}, "Post deleted successfully"));
})

const updatePost = asyncHandler(async (req, res) => {
    const { postId } = req.params;
    const { content, taggedUsers } = req.body;

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

    let imageUrl = "";
    let videoUrl = "";
    if(req.file){
        if (post.image) {
            const publicId = getPublicId(post.image);
            await deleteFromCloudinary(publicId, "image");
        }
    
        if (post.video) {
            const publicId = getPublicId(post.video);
            await deleteFromCloudinary(publicId, "video");
        }
    
        const fileMimeType = req.file.mimetype;
        const base64File = `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`
        if (!base64File) {
            throw new ApiError(400, "File is required")
        }
    
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
    }


    const updatedPost = await Post.findByIdAndUpdate(postId, {
        content: content || post.content,
        taggedUsers: taggedUsers || post.taggedUsers,
        image: imageUrl || post.image,
        video: videoUrl || post.video
    }, { new: true });

    if (!updatedPost) {
        throw new ApiError(500, "Something went wrong");
    }

    res.status(200).json(new ApiResponse(200, updatedPost, "Post updated successfully"));
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
                pipeline : [
                    {
                        $project : {
                            "password" : 0,
                            "refreshToken" : 0,
                            "__v" : 0
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
                pipeline : [
                    {
                        $project : {
                            "password" : 0,
                            "refreshToken" : 0,
                            "__v" : 0
                        }
                    }
                ]
            }
        },
        {
            $lookup : {
                from : "likes",
                localField : "_id",
                foreignField : "postId",
                as : "likes",
                pipeline : [
                    {
                        $lookup : {
                            from: "users",
                            localField : "likeOwner",
                            foreignField : "_id",
                            as : "likeOwner"
                        }
                    }
                ]
            }
        },
        {
            $lookup : {
                from : "comments",
                localField : "_id",
                foreignField : "postId",
                as : "comments",
                pipeline : [
                    {
                        $lookup : {
                            from: "users",
                            localField : "commentOwner",
                            foreignField : "_id",
                            as : "commentOwner"
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
    const posts = await User.aggregate([
        {
            $match : {
                _id : new mongoose.Types.ObjectId(req.user._id)
            }
        },
        {
            $project : {
                "password" : 0,
                "refreshToken" : 0,
                "__v" : 0
            }
        },
        {
            $lookup : {
                from : "posts",
                localField : "_id",
                foreignField : "owner",
                as : "posts",
                pipeline : [
                    {
                        $lookup : {
                            from : "comments",
                            localField : "_id",
                            foreignField : "postId",
                            as : "comments"
                        }
                    },
                    {
                        $addFields : {
                            commentCount : {
                                $size : "$comments"
                            }
                        }
                    }
                ]
            }
        }
    ])
    if(!posts){
        throw new ApiError(404,"Posts not found")
    }
    return res.status(200).json(new ApiResponse(200,posts,"Posts fetched successfully"))
});

const allPosts = asyncHandler(async (req,res) => {
    const posts = User.aggregate([
        {
            $match : {
                _id : new mongoose.Types.ObjectId(req.user._id)
            }
        },
        {
            $project : {
                "password" : 0,
                "refreshToken" : 0,
                "__v" : 0
            }
        },
        {
            $lookup : {
                from : "posts",
                localField : "_id",
                foreignField : "owner",
                as : "posts",
            }
        }
    ])
})

export {
    createPost,
    deletePost,
    updatePost,
    viewPost,
    allUserPosts
}