import generateCookie from "../lib/generateCookie.js"
import User from "../models/user.model.js"
import bcrypt from "bcrypt"
import { v2 as cloudinary } from 'cloudinary'

export const registerUser = async(req,res)=>{
    try {
        const {name,email,password,confirmPassword}= req.body
        if(password!==confirmPassword){
            throw new Error("password does not match")
        }
        
        const user = await User.findOne({email})
        if(user){
            throw new Error("email already exist")
        }

        const salt = await bcrypt.genSalt(10)
        const hassedPassword= await bcrypt.hash(password,salt)

        const newUser = await User.create({
            name,
            email,
            password:hassedPassword,
        }) 

        res.status(201).json(newUser)

    } catch (error) {
        res.status(401).json({error:true,message:error.message})
        console.log(error);
        
    }
}

export const loginUser= async(req,res)=>{
    try {
        const {email,password}= req.body
        const user = await User.findOne({email})
        if(!user){
            throw new Error("user does not exist")
        }
        const checkPassword = await bcrypt.compare(password,user.password)
        if(!checkPassword){
            throw new Error("password does not match")
        }
        generateCookie(user._id,res)
        res.status(201).json(user)
    } catch (error) {
        res.status(401).json({error:true,message:error.message})
    }
}

export const logoutUser = async(req,res)=>{
    res.cookie('token',"",{maxAge:0})
    res.status(200).json({message:"logout successful"})
}


export const getUser= async(req,res)=>{
    try {
       res.status(200).json(req.user)
    } catch (error) {
        console.log(error)
    }
}

export const updateProfile= async(req,res)=>{
    try {
        const {profilePic}= req.body

        const user =req.user

        const imageCred= await cloudinary.uploader.upload(profilePic)
        if(!imageCred.secure_url){
            throw new Error("failed to upload image")
        }

         const image= await User.findByIdAndUpdate(user._id,{image:imageCred.secure_url},{new:true}).select("-password")

         res.status(201).json(image)
    } catch (error) {
        res.status(401).json({error:error.message,})
    }
}