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
    allTagUsers,
    editPostData,
    allPostExplore,
    allReelsPage,
    commentOnReel,
    reelPostLike,
    reelSavePost
} from '../controllers/post.controller.js'
import { verifyLogin } from "../middlewares/user.middleware.js"
import { upload } from "../middlewares/multer.middleware.js"

const router = Router();

router.route("/createPost").post(verifyLogin, upload.single("file"), createPost);
router.route("/deletePost").delete(verifyLogin, deletePost);
router.route("/updatePost").patch(verifyLogin, updatePost);
router.route("/viewPost/:postId").get(verifyLogin, viewPost);
router.route("/allUserPosts/:userName").get(verifyLogin, allUserPosts);
router.route("/allPosts").get(verifyLogin, allPosts);
router.route("/editPostData").post(verifyLogin, editPostData);
router.route("/savePosts").get(verifyLogin, savePost);
router.route("/reels/:userName").get(verifyLogin, allReels);
router.route("/tagged/:userName").get(verifyLogin, allTagUsers);
router.route("/allPostExplore").get(verifyLogin, allPostExplore);
router.route("/allReelsPage").get(verifyLogin, allReelsPage);
router.route("/commentOnReel/:postId").get(verifyLogin, commentOnReel);
router.route("/reelPostLike/:postId").get(verifyLogin, reelPostLike)
router.route("/reelSavePost/:postId").get(verifyLogin, reelSavePost)

export default router;
