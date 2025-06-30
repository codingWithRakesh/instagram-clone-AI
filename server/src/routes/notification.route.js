import { Router } from "express";
import {
    allNotification
} from '../controllers/notification.controller.js'
import { verifyLogin } from "../middlewares/user.middleware.js"

const router = Router();

router.route("/allNotification").get(verifyLogin, allNotification);


export default router;
