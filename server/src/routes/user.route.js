import { Router } from "express";
import {
    register,
    login,
    logout
} from '../controllers/user.controller.js'
import { verifyLogin } from "../middlewares/user.middleware.js"

const router = Router()

router.route("/register").post(register)
router.route("/login").post(login)
router.route("/logout").get(verifyLogin, logout)

export default router