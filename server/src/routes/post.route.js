import { Router } from "express";
import {
    createPost,
    deletePost,
    updatePost,
    viewPost,
    allUserPosts
} from '../controllers/post.controller.js'
import { verifyLogin } from "../middlewares/user.middleware.js"
import { upload } from "../middlewares/multer.middleware.js"

const router = Router();

router.route("/createPost").post(verifyLogin, upload.single("file"), createPost);
router.route("/deletePost/:postId").delete(verifyLogin, deletePost);
router.route("/updatePost/:postId").patch(verifyLogin, upload.single("file"), updatePost);
router.route("/viewPost/:postId").get(verifyLogin, viewPost);
router.route("/allUserPosts").get(verifyLogin, allUserPosts);

export default router;