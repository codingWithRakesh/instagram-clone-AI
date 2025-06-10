import { Router } from "express";
import {
    register,
    verfiyEmail,
    login,
    logout,
    updateProfileImage,
    updateProfile,
    deleteProfileImage,
    currentUser,
    userProfile,
    allFollowers,
    searchUser,
    checkGenerateImage,
    checkForUserIsGeneratedImage,
    suggestedUsers
} from '../controllers/user.controller.js'
import { verifyLogin } from "../middlewares/user.middleware.js"
import { upload } from "../middlewares/multer.middleware.js"

const router = Router()

router.route("/register").post(register);
router.route("/verfiyEmail").post(verfiyEmail);
router.route("/login").post(login);
router.route("/logout").get(verifyLogin, logout);
router.route("/updateProfile").patch(verifyLogin, updateProfile);
router.route("/updateProfileImage").patch(verifyLogin, upload.single("profileImg"), updateProfileImage);
router.route("/deleteProfileImage").delete(verifyLogin, deleteProfileImage);
router.route("/currentUser").get(verifyLogin, currentUser);
router.route("/userProfile/:userName").get(verifyLogin, userProfile)
router.route("/allFollowers").get(verifyLogin, allFollowers)
router.route("/searchUser").post(verifyLogin, searchUser)
router.route("/checkGenerateImage").patch(verifyLogin, checkGenerateImage)
router.route("/checkForUserIsGeneratedImage").get(verifyLogin, checkForUserIsGeneratedImage)
router.route("/suggestedUsers").get(verifyLogin, suggestedUsers)

export default router