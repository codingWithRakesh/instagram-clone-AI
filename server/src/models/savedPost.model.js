import { Schema,model } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const savedPostSchema = new Schema({
    postId : {
        type : Schema.Types.ObjectId,
        ref : "Post"
    },
    owner : {
        type : Schema.Types.ObjectId,
        ref : "User"
    }
},{timestamps : true})

savedPostSchema.plugin(mongooseAggregatePaginate)
export const SavedPost = model("SavedPost",savedPostSchema)