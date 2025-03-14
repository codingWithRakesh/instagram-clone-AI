import { Schema, model } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const storySchema = new Schema({
    owner:{
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    text : {
        type : String
    },
    image:{
        type: String,
        default: ""
    },
    video : {
        type : String,
        default : ""
    },
    viewers : [{
        type : Schema.Types.ObjectId,
        ref : "User"
    }]
},{timestamps : true})

storySchema.plugin(mongooseAggregatePaginate)
export const Story = model("Story",storySchema)