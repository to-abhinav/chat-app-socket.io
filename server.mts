import { createServer } from "node:http";
import next from "next";
import { Server } from "socket.io";

const dev = process.env.NODE_ENV !== "production";
const hostname = process.env.HOSTNAME || "localhost";
const port = parseInt(process.env.PORT || "3000", 10);

const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const httpServer = createServer(handle);
  const io = new Server(httpServer);
  io.on("connection", (socket) => {
    console.log("user connected :", socket.id);

    socket.on("message",({room, message,sender})=>{
      console.log(`Message from ${sender} in room ${room}: ${message}`);
      socket.to(room).emit("message", { message, sender });
    })
 
    socket.on("join-room", ({ room, username }) => {
      socket.join(room);
      console.log(`User ${username} joined room: ${room}`);
      socket.to(room).emit("user_joined", `${username} has joined the room.`);
    });
    socket.on("disconnect", () => {
      console.log("user disconnected :", socket.id);
    });
  });

  httpServer
    .once("error", (err) => {
      console.error(err);
      process.exit(1);
    })
    .listen(port, () => {
      console.log(`Ready on http://${hostname}:${port}`);
    });
});
