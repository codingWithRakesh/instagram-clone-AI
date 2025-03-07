import { Schema,model } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const onlineSchema = new Schema({
    userId:{
        type : Schema.Types.ObjectId,
        ref : "User"
    }
}, { timestamps: true });

onlineSchema.plugin(mongooseAggregatePaginate);
export const Online = model("Online", onlineSchema);