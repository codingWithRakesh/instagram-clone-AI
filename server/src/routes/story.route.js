import { Router } from "express";
import {
    createStory,
    updateStory,
    deleteStory,
    showStory,
    allStories,
    storyViewers,
    storyViewClient
} from '../controllers/story.controller.js'
import { verifyLogin } from "../middlewares/user.middleware.js"
import { upload } from "../middlewares/multer.middleware.js"

const router = Router();

router.route("/createStory").post(verifyLogin, upload.single("file"), createStory);
router.route("/updateStory/:id").patch(verifyLogin, updateStory)
router.route("/deleteStory/:id").delete(verifyLogin, deleteStory)
router.route("/viewStory/:userName/:id").get(verifyLogin, showStory)
router.route("/allStories").get(verifyLogin, allStories)
router.route("/storyViewers/:storyId").get(verifyLogin, storyViewers)
router.route("/storyViewClient/:storyId").get(verifyLogin, storyViewClient)


export default router;