import { Router } from "express";
import {
    sendMessage,
    getMessages,
    getMessageUsers
} from '../controllers/message.controller.js'
import { verifyLogin } from "../middlewares/user.middleware.js"

const router = Router();

router.route("/sendMessage/:id").post(verifyLogin, sendMessage)
router.route("/getMessages/:id").get(verifyLogin, getMessages)
router.route("/getMessageUsers").get(verifyLogin, getMessageUsers)


export default router;