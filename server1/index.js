const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io")

app.use(cors());
const server = http.createServer(app);

const io = new Server(server,{
                cors:{
                                origin:["https://chat-app-node-react-63le-czcaalsvu-vishalboudhhs-projects.vercel.app/"],
                                methods:['GET',"POST"],
                                credentials:true
                },
});

io.on("connection",(socket)=>{
                console.log(`User Connected: {socket.id}`);

                socket.on("Join_room",(data) =>{
                                socket.join(data);
                                console.log(`User with ID :${socket.id} joined room:${data}`);
                })

                socket.on("send_message",(data)=>{
                                socket.to(data.room).emit("receive_message",data);
                })

                socket.on("disconnect",()=>{
                                console.log("user disconnect",socket.id);
                })
})

server.listen(3001,() => {
                console.log("server running");
})
