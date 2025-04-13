import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express()
app.use(cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:5173/",
    credentials: true
}))
app.use(express.json())
app.use(express.urlencoded())
app.use(express.static("public"))
app.use(cookieParser())

import userRouter from "./routes/user.route.js"
import postRouter from "./routes/post.route.js"
import storyRouter from "./routes/story.route.js"
import likeRouter from "./routes/like.route.js"
import commentRouter from "./routes/comment.route.js"
import followUserRouter from "./routes/followUser.route.js"
import savedPostRouter from "./routes/savedPost.route.js"
import messageRouter from "./routes/message.route.js"

app.use("/api/v1/user", userRouter)
app.use("/api/v1/post", postRouter)
app.use("/api/v1/story", storyRouter)
app.use("/api/v1/like", likeRouter)
app.use("/api/v1/comment", commentRouter)
app.use("/api/v1/followUser", followUserRouter)
app.use("/api/v1/savedPost", savedPostRouter)
app.use("/api/v1/message", messageRouter)

app.get("/", (_, res) => {
    res.send("working")
})


export { app }