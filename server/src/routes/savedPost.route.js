import { Router } from "express";
import {
    toggleSavePost
} from '../controllers/savedPost.controller.js'
import { verifyLogin } from "../middlewares/user.middleware.js"

const router = Router();

router.route("/savePost/:postId").get(verifyLogin, toggleSavePost);
router.route("/unSavePost/:postId").delete(verifyLogin, toggleSavePost);

export default router;