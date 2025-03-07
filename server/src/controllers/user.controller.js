import {ApiError} from '../utils/apiError.js'
import {asyncHandler} from '../utils/asyncHandler.js'
import {ApiResponse} from '../utils/ApiResponse.js'
import {User} from '../models/user.model.js'

const register = asyncHandler(async (req,res) =>{
    const {number, email, fullName, userName, password} = req.body
    if([fullName, userName, password].some((f) => f?.trim() === "")){
        throw new ApiError(400, "All fields are required")
    }
    if((number == null && email == null) || (number != null && email != null)){
        throw new ApiError(400, "Either email or number is required")
    }

    const existedUser = await User.findOne({$or: [{number}, {email}, {userName}]})
    if(existedUser){
        throw new ApiError(400,"User already exists")
    }

    const user = await User.create({
        number : number || "", 
        email : email || "", 
        fullName, 
        userName, 
        password
    })

    const createUser = await User.findById(user._id).select("-password -refreshToken")
    if(!createUser){
        throw new ApiError(500, "Something went wrong")
    }

    return res.status(201).json(new ApiResponse(200, createUser, "User created successfully"))
})

export {register}