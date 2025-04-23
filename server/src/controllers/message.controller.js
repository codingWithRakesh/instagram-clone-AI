import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { User } from "../models/user.model.js";
import { Conversation } from "../models/conversation.model.js"
import { Message } from "../models/message.model.js"
import { io } from "../socket/socket.js"
import mongoose from "mongoose";

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
    // console.log("message send successfully from server", newMessage, receiverId)

    return res.status(200).json(new ApiResponse(200, newMessage, "new message"))
})

const getMessages = asyncHandler(async (req, res) => {
    const senderId = req.user._id;
    const receiverId = req.params.id;

    const result = await Conversation.aggregate([
        {
            $match: {
                participants: { $all: [new mongoose.Types.ObjectId(senderId), new mongoose.Types.ObjectId(receiverId)] }
            }
        },
        { $limit: 1 },
        {
            $lookup: {
                from: "messages",
                let: { messageIds: "$messages" },
                pipeline: [
                    { $match: { $expr: { $in: ["$_id", "$$messageIds"] } } },
                    { $sort: { createdAt: -1 } },
                    {
                        $lookup: {
                            from: "users",
                            localField: "senderId",
                            foreignField: "_id",
                            as: "senderUserId"
                        }
                    },
                    { $unwind: "$senderUserId" },
                    {
                        $project: {
                            "senderUserId.profilePic": 1,
                            "message": 1,
                            "receiverId": 1,
                            "senderId": 1
                        }
                    }
                ],
                as: "messages"
            }
        },
        {
            $lookup: {
                from: "users",
                localField: "participants",
                foreignField: "_id",
                as: "participantsInfo",
                pipeline: [
                    {
                        $project: {
                            _id: 1,
                            fullName: 1,
                            userName: 1,
                            profilePic: 1
                        }
                    }
                ]
            }
        }
    ]);


    if (!result) {
        new ApiResponse(200, {}, "No messages")
    }

    return res.status(200).json(
        new ApiResponse(200, result, "All messages")
    );
});

const getMessageUsers = asyncHandler(async (req, res) => {
    const loggedInUserId = new mongoose.Types.ObjectId(req.user._id);

    const result = await Conversation.aggregate([
        {
            $match: {
                participants: loggedInUserId
            }
        },
        {
            $unwind: "$participants"
        },
        {
            $match: {
                participants: { $ne: loggedInUserId }
            }
        },
        {
            $lookup: {
                from: "users",
                localField: "participants",
                foreignField: "_id",
                as: "userDetails"
            }
        },
        {
            $unwind: "$userDetails"
        },
        {
            $group: {
                _id: "$userDetails._id",
                fullName: { $first: "$userDetails.fullName" },
                userName: { $first: "$userDetails.userName" },
                profilePic: { $first: "$userDetails.profilePic" }
            }
        }
    ]);

    if (!result || result.length === 0) {
        throw new ApiError(404, "No message users found");
    }

    return res.status(200).json(new ApiResponse(200, result, "All message users"));
})

export {
    sendMessage,
    getMessages,
    getMessageUsers
}