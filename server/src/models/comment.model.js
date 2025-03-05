import { Schema,model } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const commentSchema = new Schema({
    postId : {
        type : Schema.Types.ObjectId,
        ref : "Post"
    },
    commentOwner : {
        type : Schema.Types.ObjectId,
        ref : "User"
    },
    content : {
        type : String,
        required : true
    },
    likeCount : {
        type : Number,
        default : 0
    },
    storyId : {
        type : Schema.Types.ObjectId,
        ref : "Story"
    }
},{timestamps : true})

commentSchema.plugin(mongooseAggregatePaginate)
export const Comment = model("Comment",commentSchema)