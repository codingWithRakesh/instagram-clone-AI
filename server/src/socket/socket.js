import {Server} from "socket.io"
import http from "http"
import { app } from "../app.js"

const server = http.createServer(app)

const io = new Server(server, {
    cors :{
        origin : process.env.CORS_ORIGIN || "http://localhost:5173",
        methods : ['GET','POST']
    }
})

let onlineUsers = new Map();
io.on("connection", (socket) => {
    console.log("A user connected:", socket.id);

    socket.on("make-id", (makeId)=>{
        onlineUsers.set(socket.id, makeId);
        const rooms = Array.from(socket.rooms);
        if (!rooms.includes(makeId)) {
            socket.join(makeId);
        }
        console.log("socket join",makeId)
        io.emit("online-users", Array.from(onlineUsers.values()));
    });

    socket.on("connect_error", (err) => {
        console.error("Socket connection error:", err.message);
    });

    socket.on("disconnect", () => {
        console.log("User disconnected:", socket.id);
        onlineUsers.delete(socket.id);
        io.emit("online-users", Array.from(onlineUsers.values()));
    });
});

export { server, io };
