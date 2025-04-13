import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { User } from "../models/user.model.js";
import { Conversation } from "../models/conversation.model.js"
import { Message } from "../models/message.model.js"
import { io } from "../socket/socket.js"

const sendMessage = asyncHandler(async (req, res) => {
    const senderId = req.user._id
    const receiverId = req.params.id;
    const { textMessage: message } = req.body;

    let conversation = await Conversation.findOne({
        participants: { $all: [senderId, receiverId] }
    })

    if (!conversation) {
        conversation = await Conversation.create({
            participants: [senderId, receiverId]
        })
    }

    const newMessage = await Message.create({
        senderId,
        receiverId,
        message
    })

    if (newMessage) {
        conversation.messages.push(newMessage._id)
    }

    await Promise.all([conversation.save({ validateBeforeSave: false }), newMessage.save({ validateBeforeSave: false })])

    io.to(receiverId).emit('newMessage', newMessage)

    return res.status(200).json(new ApiResponse(200, newMessage, "new message"))
})

const getMessages = asyncHandler(async (req, res) => {
    const senderId = req.user._id
    const receiverId = req.params.id;

    const conversation = await Conversation.findOne({
        participants : {$all: [senderId, receiverId]}
    })
    if(!conversation){
        throw new ApiError(500, "something went wrong")
    }

    return res.status(200).json(new ApiResponse(200, conversation, "all message"))
})

export {
    sendMessage,
    getMessages
}