import { Router } from "express";
import {
    toggleLikePost,
    toggleLikeStory,
    toggleLikeComment
} from '../controllers/like.controller.js'
import { verifyLogin } from "../middlewares/user.middleware.js"

const router = Router();

router.route("/toggleLikePost").post(verifyLogin, toggleLikePost);
router.route("/toggleLikeStory/:storyId").get(verifyLogin, toggleLikeStory)
router.route("/toggleLikeComment").post(verifyLogin, toggleLikeComment)


export default router;