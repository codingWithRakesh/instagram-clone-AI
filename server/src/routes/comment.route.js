import { Router } from "express";
import {
    addCommentPost,
    addCommentStory,
    editComment,
    deleteStory
} from '../controllers/comment.controller.js'
import { verifyLogin } from "../middlewares/user.middleware.js"

const router = Router();

router.route("/addCommentPost/:postId").post(verifyLogin, addCommentPost)
router.route("/addCommentStory/:storyId").post(verifyLogin, addCommentStory)
router.route("/editComment").patch(verifyLogin, editComment)
router.route("/deleteStory").delete(verifyLogin, deleteStory)

export default router;