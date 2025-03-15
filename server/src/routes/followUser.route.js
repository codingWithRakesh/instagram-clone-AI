import { Router } from "express";
import {
   
} from '../controllers/followUser.controller.js'
import { verifyLogin } from "../middlewares/user.middleware.js"

const router = Router();

// router.route("/addCommentPost/:postId").post(verifyLogin, addCommentPost)

export default router;