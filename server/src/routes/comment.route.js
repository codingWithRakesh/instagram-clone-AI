import { Router } from "express";
import {
    addCommentPost,
    addCommentStory,
    editComment,
    deleteComment
} from '../controllers/comment.controller.js'
import { verifyLogin } from "../middlewares/user.middleware.js"

const router = Router();

router.route("/addCommentPost").post(verifyLogin, addCommentPost)
router.route("/addCommentStory/:storyId").post(verifyLogin, addCommentStory)
router.route("/editComment").patch(verifyLogin, editComment)
router.route("/deleteComment").delete(verifyLogin, deleteComment)

export default router;