import { Schema, model } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const notificationSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    type: {
        type: String,
        enum: ['like_post', 'like_story', 'comment_post', 'comment_story', 'follow'],
        required: true
    },
    post: {
        type: Schema.Types.ObjectId,
        ref: 'Post',
    },
    story: {
        type: Schema.Types.ObjectId,
        ref: 'Story',
    },
    sender: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    isRead: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

notificationSchema.plugin(mongooseAggregatePaginate);
export const Notification = model("Notification", notificationSchema);
