import { Schema, model } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const storySchema = new Schema({
    owner:{
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    image:{
        type: String,
        default: ""
    }
},{timestamps : true})

storySchema.plugin(mongooseAggregatePaginate)
export const Story = model("Story",storySchema)