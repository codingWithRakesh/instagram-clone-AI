import { Router } from "express";
import {
    toggleSavePost
} from '../controllers/savedPost.controller.js'
import { verifyLogin } from "../middlewares/user.middleware.js"

const router = Router();

router.route("/saveUnsavePost").post(verifyLogin, toggleSavePost);

export default router;