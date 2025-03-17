import { Router } from "express";
import {
    followUnfollow
} from '../controllers/followUser.controller.js'
import { verifyLogin } from "../middlewares/user.middleware.js"

const router = Router();

router.route("/followUnfollow").post(verifyLogin, followUnfollow)

export default router;