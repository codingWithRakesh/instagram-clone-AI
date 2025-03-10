import { ApiError } from '../utils/apiError.js'
import { asyncHandler } from '../utils/asyncHandler.js'
import { ApiResponse } from '../utils/apiResponse.js'
import { User } from '../models/user.model.js'
import { options } from '../constants.js'
import { deleteFromCloudinary, getPublicId, uploadOnCloudinary } from '../utils/cloudinary.js'
import mongoose from 'mongoose'

const accessAndRefreshTokenGenrator = async (userId) => {
    try {
        const user = await User.findById(userId)
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()

        user.refreshToken = refreshToken
        await user.save({ validateBeforeSave: false })

        return { accessToken, refreshToken }
    } catch (error) {
        throw new ApiError(500, "Something went wrong")
    }
}

const register = asyncHandler(async (req, res) => {
    const { number, email, fullName, userName, DOB, password } = req.body
    if ([fullName, userName, DOB, password].some((f) => f?.trim() === "")) {
        throw new ApiError(400, "All fields are required")
    }
    if ((number == null && email == null) || (number != null && email != null)) {
        throw new ApiError(400, "Either email or number is required")
    }

    const existedUser = await User.findOne({ $or: [{ number }, { email }, { userName }] })
    if (existedUser) {
        throw new ApiError(400, "User already exists")
    }

    const user = await User.create({
        number: number || "",
        email: email || "",
        fullName,
        userName,
        DOB,
        password
    })

    const createUser = await User.findById(user._id).select("-password -refreshToken")
    if (!createUser) {
        throw new ApiError(500, "Something went wrong")
    }

    return res.status(201).json(new ApiResponse(200, createUser, "User created successfully"))
})

const login = asyncHandler(async (req, res) => {
    const { number, email, userName, password } = req.body
    if ((number || email || userName) == null && password == null) {
        throw new ApiError(400, "All fields are required")
    }

    const user = await User.findOne({ $or: [{ number }, { email }, { userName }] })
    console.log(user)
    if (!user) {
        throw new ApiError(404, "User not found")
    }

    const isPassword = await user.isPasswordCorrect(password)
    if (!isPassword) {
        throw new ApiError(401, "Invalid credentials")
    }

    const { accessToken, refreshToken } = await accessAndRefreshTokenGenrator(user._id)
    const loginUser = await User.findById(user._id).select("-password -refreshToken")
    if (!loginUser) {
        throw new ApiError(500, "Something went wrong")
    }

    return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(new ApiResponse(200, { user: loginUser, accessToken, refreshToken }, "User logged in successfully"))
})

const logout = asyncHandler(async (req, res) => {
    await User.findByIdAndUpdate(req.user._id, {
        $unset: { refreshToken: 1 }
    },
        { new: true }
    )

    return res
        .status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json(new ApiResponse(200, {}, "User logged out successfully"))
})

const updateProfile = asyncHandler(async (req, res) => {
    const { gender, bio, websiteURL } = req.body
    if (!(gender || bio || websiteURL)) {
        throw new ApiError(400, "All fields are required")
    }

    const user = await User.findByIdAndUpdate(
        req.user._id,
        {
            gender,
            bio,
            websiteURL
        },
        { new: true }
    ).select("-password -refreshToken")

    if (!user) {
        throw new ApiError(500, "Something went wrong")
    }

    return res.status(200).json(new ApiResponse(200, user, "User updated successfully"))
})

const updateProfileImage = asyncHandler(async (req, res) => {
    if (!req.file) {
        throw new ApiError(400, "Image is required")
    }
    const user = await User.findById(req.user._id).select("-password -refreshToken")
    if (!user) {
        throw new ApiError(404, "User not found")
    }
    if (user.profilePic) {
        try {
            const publicId = getPublicId(user.profilePic)
            await deleteFromCloudinary(publicId)
        } catch (error) {
            console.log(error)
        }
    }
    const base64Image = `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`
    if (!base64Image) {
        throw new ApiError(400, "Image is required")
    }
    const profileImg = await uploadOnCloudinary(base64Image)
    if (!profileImg.url) {
        throw new ApiError(500, "Something went wrong")
    }

    user.profilePic = profileImg.url
    await user.save({ validateBeforeSave: false })

    return res.status(200).json(new ApiResponse(200, user.profilePic, "Profile image updated successfully"))
})

const deleteProfileImage = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id).select("-password -refreshToken")
    if (!user) {
        throw new ApiError(404, "User not found")
    }
    if (user.profilePic) {
        try {
            const publicId = getPublicId(user.profilePic)
            await deleteFromCloudinary(publicId)
        } catch (error) {
            console.log(error)
        }
    }
    user.profilePic = ""
    await user.save({ validateBeforeSave: false })

    return res.status(200).json(new ApiResponse(200, {}, "Profile image deleted successfully"))
})

const currentUser = asyncHandler(async (req, res) => {
    return res.status(200).json(new ApiResponse(200, req.user, "User fetched successfully"))
})

const userProfile = asyncHandler(async (req, res) => {
    const user = await User.aggregate([
        {
            $match : {
                _id : new mongoose.Types.ObjectId(req.user._id)
            }
        },
        {
            $project : {
                password : 0,
                refreshToken : 0
            }
        },
        {
            $lookup : {
                from : "posts",
                localField : "_id",
                foreignField : "owner",
                as : "postsCounts"
            }
        },
        {
            $lookup : {
                from : "followUsers",
                localField : "_id",
                foreignField : "follower",
                as : "followersCounts",
                pipeline : [
                    {
                        $lookup : {
                            from : "users",
                            localField : "follower",
                            foreignField : "_id",
                            as : "followersC"
                        }
                    }
                ]
            }
        },
        {
            $addFields : {
                postsCount : {
                    $size : "$postsCounts"
                },
                followersCount : {
                    $size : "$followersCounts"
                }
            }
        }
    ])
    if(!user){
        throw new ApiError(404,"User not found")
    }

    return res.status(200).json(new ApiResponse(200, user[0], "User fetched successfully"))
})

export {
    register,
    login,
    logout,
    updateProfile,
    updateProfileImage,
    deleteProfileImage,
    currentUser,
    userProfile
}