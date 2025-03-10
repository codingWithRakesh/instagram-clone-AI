import { ApiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { Post } from "../models/post.model.js";
import { deleteFromCloudinary, getPublicId, uploadOnCloudinary } from '../utils/cloudinary.js'
import mongoose from 'mongoose'

const createPost = asyncHandler(async (req, res) => {
    const {content, taggedUsers} = req.body
    if(!req.file){
        throw new ApiError(400,"Image is required")
    }
})