import { Router } from "express";
import {
    register,
    login,
    logout,
    updateProfileImage,
    updateProfile,
    deleteProfileImage,
    currentUser,
    userProfile
} from '../controllers/user.controller.js'
import { verifyLogin } from "../middlewares/user.middleware.js"
import { upload } from "../middlewares/multer.middleware.js"

const router = Router()

router.route("/register").post(register)
router.route("/login").post(login)
router.route("/logout").get(verifyLogin, logout)
router.route("/updateProfile").patch(verifyLogin, updateProfile)
router.route("/updateProfileImage").patch(verifyLogin, upload.single("profileImg"), updateProfileImage)
router.route("/deleteProfileImage").delete(verifyLogin, deleteProfileImage)
router.route("/currentUser").get(verifyLogin, currentUser)
router.route("/userProfile").get(verifyLogin, userProfile)

export default router