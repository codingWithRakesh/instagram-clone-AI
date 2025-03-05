import { Schema, model } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const likeSchema = new Schema({
    postId: {
        type: Schema.Types.ObjectId,
        ref: "Post"
    },
    commentId: {
        type: Schema.Types.ObjectId,
        ref: "Comment"
    },
    likeOwner: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    storyId: {
        type: Schema.Types.ObjectId,
        ref: "Story"
    }
}, { timestamps: true })

export const Like = model("Like", likeSchema)