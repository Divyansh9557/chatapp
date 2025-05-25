import { getUserSocketID, io } from "../lib/socket.js"
import Message from "../models/message.model.js"
import User from "../models/user.model.js"
import { v2 as cloudinary } from 'cloudinary'


export const sendMessage= async(req,res)=>{
    try {
        
        const {text, image}= req.body
        const {id:receiverId}= req.params

        if(receiverId===req.user._id){
            throw new Error("you can't send messeage to yourself ")
        }
        if(!text && !image){
          throw new Error("image or video is required") 
        }

        const receiver = await User.findById(receiverId)
        if(!receiver){
            throw new Error("receiver id is incorrect") 
        }
       

        let imageUrl;
       
        if(image){
            const imageData= await cloudinary.uploader.upload(image)
            if(imageData){
                imageUrl= imageData.secure_url
            }
        }

        const message= await Message.create({
            senderId:req.user._id,
            receiverId,
            text,
            image:imageUrl
        })

        const messageNew = await Message.findById(message._id).populate(
          "senderId receiverId"
        );

        const socketId= getUserSocketID(receiverId)
            if(socketId){
                io.to(socketId).emit("newMessage",messageNew)
            }



        if(message){
           return res.status(201).json(messageNew)
        }
        else{
            throw new Error("internal server error")
        }


    } catch (error) {
        res.status(401).json({error:error.message})
    }
}

export const getUserLoggedIn= async(req,res)=>{
    try {
        const userId= req.user
        const users= await User.find({_id:{$ne:userId._id}})

        res.status(200).json(users)

    } catch (error) {
        res.status(401).json({error:"internal server error"})
    }
}


export const getMessage=async(req,res)=>{
 try {
    const user= req.user
    const me= user._id
    const {id:other} = req.params

    const message = await Message.find({
        $or:[
           {senderId:me,receiverId:other},
           {senderId:other,receiverId:me}
        ]
    }).populate("receiverId").populate("senderId")

    res.status(200).json(message)

 } catch (error) {
    res.status(401).json({error:error.message})
 }
}