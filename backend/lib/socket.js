import {Server} from "socket.io"
import http from "http"
import express from "express"

const app = express()

const server = http.createServer(app)

const io= new Server(server,{
    cors:{
        origin:["http://localhost:5173"]
    }
})
 const onlineUsermap= {}

 export const getUserSocketID= (userId)=>{
    return onlineUsermap[userId]
 }

io.on("connection",(socket)=>{
   console.log("user is connected",socket.id)
   const userId= socket.handshake.query.userId
   onlineUsermap[userId] = socket.id;

   io.emit("onlineusers", Object.keys(onlineUsermap))

  socket.on("disconnect",()=>{
    console.log("user disconnected",socket.id)
    delete onlineUsermap[userId];
  }) 
  
})


export {io ,server,app}
