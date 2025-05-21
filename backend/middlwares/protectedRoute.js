 import jwt from "jsonwebtoken"
import User from "../models/user.model.js"
 
 const protectedRoute = async(req,res,next)=>{
    try {
        const token=req.cookies.token
        if(!token){
            throw new Error("token not available")
        }
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
        
        
        if(!decodedToken){
            throw new Error("token is invaild")
        }

        const user =  await User.findById(decodedToken.id).select("-password")

        if(!user){
            throw new Error("user not found")
        }
        req.user= user
        next()




    } catch (error) {
        res.status(401).json({ error: error.message });
    }
 }

 export default protectedRoute