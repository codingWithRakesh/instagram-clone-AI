import { Router } from "express";
import {
    createPost,
    deletePost,
    updatePost,
    viewPost,
    allUserPosts,
    allPosts,
    savePost,
    allReels,
    allTagUsers
} from '../controllers/post.controller.js'
import { verifyLogin } from "../middlewares/user.middleware.js"
import { upload } from "../middlewares/multer.middleware.js"

const router = Router();

router.route("/createPost").post(verifyLogin, upload.single("file"), createPost);
router.route("/deletePost/:postId").delete(verifyLogin, deletePost);
router.route("/updatePost/:postId").patch(verifyLogin, upload.single("file"), updatePost);
router.route("/viewPost/:postId").get(verifyLogin, viewPost);
router.route("/allUserPosts/:userName").get(verifyLogin, allUserPosts);
router.route("/allPosts").get(verifyLogin, allPosts)
router.route("/savePosts").get(verifyLogin, savePost)
router.route("/reels/:userName").get(verifyLogin, allReels)
router.route("/tagged/:userName").get(verifyLogin, allTagUsers)

export default router;