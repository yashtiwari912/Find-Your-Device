import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";

const app = express();
const port = 3000;
const server = createServer(app);
const io = new Server(server);
app.use(express.static("public"));

io.on("connection",(socket)=>{
    socket.on("send-location",(data)=>{
        io.emit("recieve-location",{id:socket.id,...data})
    });
    socket.on("disconnect",()=>{
        io.emit("user-disconected",socket.id);
    })
});


app.get("/",(req,res)=>{
    res.render("index.ejs");
});



server.listen(port ,()=>{
    console.log(`listening to port :${port}`);
});