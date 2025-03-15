import { Schema, model } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const followUserSchema = new Schema({
    follower : [{
        type : Schema.Types.ObjectId,
        ref : "User"
    }],
    following : [{
        type : Schema.Types.ObjectId,
        ref : "User"
    }]
},{timestamps : true})

followUserSchema.plugin(mongooseAggregatePaginate)
export const FollowUser = model("FollowUser",followUserSchema)