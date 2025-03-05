import { Schema, model } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const conversationSchema = new Schema({
    participants : [{
        type : Schema.Types.ObjectId,
        ref : "User"
    }],
    messages : [{
        type : Schema.Types.ObjectId,
        ref : "Message"
    }]
},{timestamps : true})

conversationSchema.plugin(mongooseAggregatePaginate)
export const Conversation = model("Conversation",conversationSchema)