import cookieParser from "cookie-parser";
import connectDb from "./db/index.js";
import express from "express" 
import authRoutes from "./routes/auth.route.js"
import messageRoutes from "./routes/message.route.js"
import dotenv from "dotenv"
import { v2 as cloudinary } from 'cloudinary'
import cors from "cors"
import { app,server,io } from "./lib/socket.js";




dotenv.config()

cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_SECRET
});




const port = process.env.PORT || 8000

  app.use(express.urlencoded({extended:true}))
  app.use(express.json({limit:"5mb"}))
  app.use(cookieParser())
  app.use(cors({
   origin:process.env.CORS_ORIGIN,
   credentials:true
  }))


  app.use("/api/v2/auth",authRoutes)
  app.use("/api/v2/message",messageRoutes)

 connectDb().then(()=>{
    server.listen(port,()=>{
        console.log(`app is listening on port ${port}`);
        
    })
 })
 .catch((err)=>{
    console.log("failed to connect with database")
 })