import { ApiError } from '../utils/apiError.js'
import { asyncHandler } from '../utils/asyncHandler.js'
import { ApiResponse } from '../utils/ApiResponse.js'
import { User } from '../models/user.model.js'
import { options } from '../constants.js'

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
    const { number, email, fullName, userName, password } = req.body
    if ([fullName, userName, password].some((f) => f?.trim() === "")) {
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

export {
    register,
    login,
    logout
}