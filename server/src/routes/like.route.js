import { Router } from "express";
import {
    toggleLikePost,
    toggleLikeStory,
    toggleLikeComment
} from '../controllers/like.controller.js'
import { verifyLogin } from "../middlewares/user.middleware.js"

const router = Router();

router.route("/toggleLikePost/:postId").get(verifyLogin, toggleLikePost)
router.route("/toggleLikeStory/:storyId").get(verifyLogin, toggleLikeStory)
router.route("/toggleLikeComment/:commentId").get(verifyLogin, toggleLikeComment)


export default router;