import { Schema, model } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const postSchema = new Schema({
    owner : {
        type : Schema.Types.ObjectId,
        ref : "User"
    },
    content : {
        type : String,
        required : true
    },
    image : {
        type : String,
        default : ""
    },
    video : {
        type : String,
        default : ""
    },
    likeCount : {
        type : Number,
        default : 0
    },
    taggedUsers : [{
        type : Schema.Types.ObjectId,
        ref : "User"
    }],
},{timestamps : true})

postSchema.plugin(mongooseAggregatePaginate)
export const Post = model("Post",postSchema)