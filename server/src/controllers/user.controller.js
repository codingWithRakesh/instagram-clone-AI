import { ApiError } from '../utils/apiError.js'
import { asyncHandler } from '../utils/asyncHandler.js'
import { ApiResponse } from '../utils/apiResponse.js'
import { User } from '../models/user.model.js'
import { options } from '../constants.js'
import { deleteFromCloudinary, getPublicId, uploadOnCloudinary } from '../utils/cloudinary.js'
import mongoose from 'mongoose'
import { sendVerificationEmail, sendWelcomeEmail } from '../utils/emailSend.js'

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
    const { email, fullName, userName, DOB, password } = req.body
    if ([email, fullName, userName, DOB, password].some((f) => f?.trim() === "")) {
        throw new ApiError(400, "All fields are required")
    }

    const existedUser = await User.findOne({ $or: [{ email }, { userName }] })
    if (existedUser) {
        throw new ApiError(400, "User already exists")
    }

    const OTP = Math.floor(100000 + Math.random() * 900000).toString()
    if (!OTP) {
        throw new ApiError(500, "Internal Server Error")
    }

    const user = await User.create({
        email,
        fullName,
        userName,
        DOB,
        password,
        OTP,
        OTPExpire: Date.now() + 24 * 60 * 60 * 1000
    })

    if (!user) {
        throw new ApiError(500, "Internal Server Error")
    }

    await sendVerificationEmail(user.email, OTP)

    const createUser = await User.findById(user._id).select("-password -refreshToken")
    if (!createUser) {
        throw new ApiError(500, "Something went wrong")
    }

    return res.status(201).json(new ApiResponse(200, createUser, "User created successfully"))
})

const verfiyEmail = asyncHandler(async (req, res) => {
    const { otp } = req.body;
    if (!otp) {
        throw new ApiError(400, "otp is required")
    }

    const user = await User.findOne({
        OTP: otp,
        OTPExpire: { $gt: Date.now() }
    }).select("-password -refreshToken")

    if (!user) {
        throw new ApiError(500, "Internal Server Error")
    }

    user.isVerified = true;
    user.OTP = undefined;
    user.OTPExpire = undefined;

    await user.save({ validateBeforeSave: false })

    await sendWelcomeEmail(user.email,user.name)

    return res.status(200).json(new ApiResponse(200, user, "Successfully"))
})

const login = asyncHandler(async (req, res) => {
    const { email, userName, password } = req.body
    if ((!email && !userName) || !password) {
        throw new ApiError(400, "All fields are required");
    }

    const user = await User.findOne({ $or: [{ email }, { userName }] })
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
    const { userName } = req.params
    const user = await User.aggregate([
        {
            $match: {
                userName
            }
        },
        {
            $project: {
                password: 0,
                refreshToken: 0
            }
        },
        {
            $lookup: {
                from: "posts",
                localField: "_id",
                foreignField: "owner",
                as: "postsCounts"
            }
        },
        {
            $lookup: {
                from: "followusers",
                localField: "_id",
                foreignField: "following",
                as: "followersCounts",
            }
        },
        {
            $lookup: {
                from: "followusers",
                localField: "_id",
                foreignField: "follower",
                as: "followingCounts"
            }
        },
        {
            $addFields: {
                postsCount: {
                    $size: "$postsCounts"
                },
                followersCount: {
                    $size: "$followersCounts"
                },
                followingCount: {
                    $size: "$followingCounts"
                }
            }
        },
        {
            $project: {
                postsCounts: 0,
                followersCounts: 0,
                followingCounts: 0
            }
        }
    ])
    if (!user) {
        throw new ApiError(404, "User not found")
    }

    return res.status(200).json(new ApiResponse(200, user[0], "User fetched successfully"))
})

export {
    register,
    verfiyEmail,
    login,
    logout,
    updateProfile,
    updateProfileImage,
    deleteProfileImage,
    currentUser,
    userProfile
}