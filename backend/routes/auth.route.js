import { Router } from "express";
import { getUser, loginUser, logoutUser, registerUser, updateProfile } from "../controller/auth.controller.js";
import protectedRoute from "../middlwares/protectedRoute.js";

const router= Router()

 router.post('/register',registerUser)
 router.post('/login',loginUser)
 router.get('/logout',logoutUser)
 router.get('/getuser' ,protectedRoute,getUser)
 router.post('/profileUpdate' ,protectedRoute,updateProfile)


 export default router