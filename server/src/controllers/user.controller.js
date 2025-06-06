import { ApiError } from '../utils/apiError.js'
import { asyncHandler } from '../utils/asyncHandler.js'
import { ApiResponse } from '../utils/apiResponse.js'
import { User } from '../models/user.model.js'
import { options } from '../constants.js'
import { deleteFromCloudinary, getPublicId, uploadOnCloudinary } from '../utils/cloudinary.js'
import mongoose from 'mongoose'
import { sendVerificationEmail, sendWelcomeEmail } from '../utils/emailSend.js'
import { FollowUser } from '../models/followUser.model.js'

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

    await User.removeInvalidIndex();

    const user = await User.create({
        email,
        fullName,
        userName,
        DOB,
        password,
        OTP,
        OTPExpire: Date.now() + 10 * 60 * 1000
    })

    if (!user) {
        throw new ApiError(500, "Internal Server Error")
    }

    await sendVerificationEmail(user.email, OTP)

    const createUser = await User.findById(user._id).select("-password -refreshToken")
    if (!createUser) {
        throw new ApiError(500, "Something went wrong")
    }

    return res.status(201).json(new ApiResponse(200, {}, "User created successfully"))
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

    await sendWelcomeEmail(user.email, user.fullName)

    const { accessToken, refreshToken } = await accessAndRefreshTokenGenrator(user._id)
    const loginUser = await User.findById(user._id).select("-password -refreshToken")
    if (!loginUser) {
        throw new ApiError(500, "Something went wrong")
    }

    return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(new ApiResponse(200, { user: loginUser, accessToken, refreshToken }, "User created successfully"))
})

const login = asyncHandler(async (req, res) => {
    const { email, userName, password, fullName, DOB, profilePic, gender } = req.body

    let user = await User.findOne({ $or: [{ email }, { userName }] })

    if (!user && fullName && DOB && gender && email) {
        try {
            user = await User.create({
                email,
                fullName,
                userName: email.split('@')[0] + "_" + Date.now().toString().slice(-2),
                DOB,
                OTP: undefined,
                OTPExpire: undefined,
                profilePic,
                gender,
                isVerified: true,
                password: email.split('@')[0] + "!$@" + DOB.slice(-2)
            });
        } catch (error) {
            throw new ApiError(409, "User already exists with this email or username");
        }
    }

    if (!user) {
        throw new ApiError(400, "Missing required information for registration");
    }

    if ((email || userName) && password) {
        const isPassword = await user.isPasswordCorrect(password)
        if (!isPassword) {
            throw new ApiError(401, "Invalid credentials")
        }
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
    const { gender, bio, websiteURL, phoneNumber } = req.body
    if (!(gender || bio || websiteURL || phoneNumber)) {
        throw new ApiError(400, "All fields are required")
    }

    const user = await User.findByIdAndUpdate(
        req.user._id,
        {
            gender,
            bio,
            websiteURL,
            phoneNumber
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
                // followersCounts: 0,
                // followingCounts: 0
            }
        }
    ])
    if (!user) {
        throw new ApiError(404, "User not found")
    }

    return res.status(200).json(new ApiResponse(200, user[0], "User fetched successfully"))
})

const allFollowers = asyncHandler(async (req, res) => {
    const followers = await User.aggregate([
        {
            $match: { _id: new mongoose.Types.ObjectId(req.user._id) }
        },
        {
            $project: {
                password: 0,
                refreshToken: 0
            }
        },
        {
            $lookup: {
                from: "followusers",
                localField: "_id",
                foreignField: "following",
                as: "followersCounts",
                pipeline: [
                    {
                        $lookup: {
                            from: "users",
                            localField: "follower",
                            foreignField: "_id",
                            as: "allUserFollower",
                            pipeline: [
                                {
                                    $project: {
                                        _id: 1,
                                        userName: 1
                                    }
                                }
                            ]
                        }
                    }
                ]
            }
        },
    ]);

    if (!followers || followers.length === 0) {
        throw new ApiError(404, "User not found");
    }

    return res.status(200).json(new ApiResponse(200, followers[0], "User fetched successfully"));
});

const searchUser = asyncHandler(async (req, res) => {
    const { searchValue } = req.body;
    const loggedInUserId = req.user._id;
    const regex = new RegExp(`.*${searchValue}.*`, 'i');

    const data = await User.aggregate([
        {
            $match: {
                _id: { $ne: loggedInUserId },
                $or: [
                    { userName: { $regex: regex } },
                    { fullName: { $regex: regex } }
                ]
            }
        },
        {
            $lookup: {
                from: "followusers",
                localField: "_id",
                foreignField: "following",
                as: "followersCounts"
            }
        },
        {
            $addFields: {
                followersCount: { $size: "$followersCounts" }
            }
        },
        {
            $project: {
                password: 0,
                refreshToken: 0,
                followersCounts: 0
            }
        },
        {
            $sort: { followersCount: -1 }
        }
    ]);

    if (!data || data.length === 0) {
        throw new ApiError(404, "User not found");
    }

    return res.status(200).json(new ApiResponse(200, data, "User fetched successfully"));
})

const checkGenerateImage = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id).select("-password -refreshToken");
    if (!user) {
        throw new ApiError(404, "User not found");
    }

    const today = new Date().getDate().toString();

    if(user.lastGeneratedImg == null || user.lastGeneratedImg != today) {
        user.lastGeneratedImg = new Date().getDate().toString();
        await user.save({ validateBeforeSave: false });
        return res.status(200).json(new ApiResponse(200, { canGenerate: true }, "User fetched successfully"));
    }else{
        return res.status(200).json(new ApiResponse(200, { canGenerate: false }, "User fetched successfully"));
    }
});

const checkForUserIsGeneratedImage = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id).select("-password -refreshToken");
    if (!user) {
        throw new ApiError(404, "User not found");
    }

    const today = new Date().getDate().toString();

    if(user.lastGeneratedImg == null || user.lastGeneratedImg != today) {
        return res.status(200).json(new ApiResponse(200, { canGenerate: true }, "User fetched successfully"));
    }else{
        return res.status(200).json(new ApiResponse(200, { canGenerate: false }, "User fetched successfully"));
    }
})

const isNotFollowed = (followData, userId) => {
    for (const i of followData) {

        if (i.following.toString() == userId.toString()) {
            return false
        }
        // if("67f029b0411f4d938830e6db" == userId.toString()) {
        //     console.log("i, userId.toString()", i.following.toString(), userId.toString())
        // }
    }
    return true
}

const suggestedUsers = asyncHandler(async (req, res) => {
    const loggedInUserId = req.user._id;
    const allFollowData = await User.aggregate([
        {
            $match: {
                _id: new mongoose.Types.ObjectId(loggedInUserId)
            }
        },
        {
            $lookup: {
                from: "followusers",
                localField: "_id",
                foreignField: "follower",
                as: "followData1"
            }
        }
    ])

    // console.log("allFollowData", allFollowData)

    const followData1 = allFollowData[0].followData1;

    const suggestedUsers = [];
    let detailsUser = [];
    let level2Users = [];
    for (const v1 of followData1) {
        // console.log("v1", v1)
        const followData2 = await FollowUser.aggregate([
            {
                $match: {
                    follower: v1.following
                }
            }
        ])
        level2Users = [...level2Users, ...followData2]
    }
    for (const v2 of level2Users) {
        // console.log("v2", v2)
        // console.log("isNotFollowed 1", isNotFollowed(followData1, v2.following))
        // console.log("suggestedUsers", suggestedUsers)
        if (isNotFollowed(followData1, v2.following) && v2.following.toString() !== loggedInUserId.toString() && !suggestedUsers.includes(v2.following.toString())) {
            suggestedUsers.push(v2.following.toString());
            // if(v2.following.toString() == "67f029b0411f4d938830e6db"){
            //     console.log("isNotFollowed", isNotFollowed(followData1, v2.following))
            //     console.log("followData1, v2", followData1, v2)
            // }
            const user = await User.findById(new mongoose.Types.ObjectId(v2.following.toString())).select("-password -refreshToken");
            detailsUser.push(user);
            if (detailsUser.length >= 5) {
                break;
            }
        }
        const followData = await FollowUser.aggregate([
            {
                $match: {
                    follower: v2.following
                }
            }
        ])
        level2Users = [...level2Users, ...followData]
    }
    if (detailsUser.length < 5) {
        const suggestedUserObjectIds = suggestedUsers.map(id => new mongoose.Types.ObjectId(id));
        const limitNum = 5 - detailsUser.length;
        const mostFollowedUsers = await FollowUser.aggregate([
            {
                $group: {
                    _id: "$following",
                    followerCount: { $sum: 1 }
                }
            },
            {
                $lookup: {
                    from: "followusers",
                    localField: "_id",
                    foreignField: "following",
                    as: "followData",
                    pipeline: [
                        {
                            $match: {
                                follower: loggedInUserId
                            }
                        }
                    ]
                }
            },
            {
                $match: {
                    followData: { $eq: [] },
                    _id: { $ne: loggedInUserId, $nin: suggestedUserObjectIds }
                }
            },
            {
                $sort: { followerCount: -1 }
            },
            { $limit: limitNum },
            {
                $lookup: {
                    from: "users",
                    localField: "_id",
                    foreignField: "_id",
                    as: "user"
                }
            },
            {
                $project: {
                    user: { $arrayElemAt: ["$user", 0] }
                }
            }
        ])
        detailsUser = [...detailsUser, ...mostFollowedUsers.map(u => u.user)]
    }

    // console.log("suggestedUsers 2", suggestedUsers)

    // console.log("suggestedUsers 3", detailsUser)

    return res.status(200).json(new ApiResponse(200, detailsUser, "Suggested users fetched successfully"));

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
    userProfile,
    allFollowers,
    searchUser,
    checkGenerateImage,
    checkForUserIsGeneratedImage,
    suggestedUsers
}