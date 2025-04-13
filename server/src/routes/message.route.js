import { Router } from "express";
import {
    sendMessage,
    getMessages
} from '../controllers/message.controller.js'
import { verifyLogin } from "../middlewares/user.middleware.js"

const router = Router();

router.route("/sendMessage/:id").post(verifyLogin, sendMessage)
router.route("/getMessages/:id").get(verifyLogin, getMessages)


export default router;