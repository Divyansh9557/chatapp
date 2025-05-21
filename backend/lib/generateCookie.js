import jwt from "jsonwebtoken"

const generateCookie = (id,res)=>{
   const token = jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: "1d"})
   const options={
     maxAge:24*60*60*1000,
     httpOnly:true,
     secure: true,
     sameSite: "strict"
   }
    res.cookie('token',token,options)
}
export default generateCookie;