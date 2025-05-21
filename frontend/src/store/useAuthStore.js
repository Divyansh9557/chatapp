import {create} from "zustand"
import { axiosInstance } from "../lib/axiosInstance"
import toast from "react-hot-toast"

export const useAuthStore = create((set)=>({
   authUser:null,
   isAuthChecking:true,
   isSigningUp:false,
   isLoggingIn:false,
   isProfileUpdating:false,

   checkauth:async()=>{
    try {
        const res= await axiosInstance.get('auth/getuser')
        set({authUser:res.data})
    } catch (error) {
        console.log(error)
        set({authUser:null})
    }
    finally{
        set({isAuthChecking:false})
    }
   },

   signup:async(data)=>{
        try {
            set({isSigningUp:true})
            const res= await axiosInstance.post("/auth/register",data)
            if(res.status===201){
                toast.success("user register succesfully")
                return true
            }

        } catch (error) {
            console.log(error)
            toast.error(error.response.data.message)
        }
        finally{
            set({isSigningUp:false})
        }

   },

   login:async(data)=>{
     try {
        set({isLoggingIn:true})
        const res= await axiosInstance.post('/auth/login',data)
        set({authUser:res.data})
        toast.success('login succesfully')
       
        if(res.data.error){
            throw new Error(res.data.message)
        }
     } catch (error) {
        toast.error(error.message)
     }
     finally{
        set({isLoggingIn:false})
     }
   },
   logout: async()=>{
    try {
       const res= await axiosInstance.get('/auth/logout')
       if(res.data.message){
        set({authUser:null})
        toast.success("logout succesfully")
       }
    } catch (error) {
        console.log(error)
    }
   },
   updateProfile:async(data)=>{
     try {
        set({isProfileUpdating:true})
        const res= await axiosInstance.post('/auth/profileUpdate',data)
        set({authUser:res.data})
     } catch (error) {
        console.log(error)
        toast.error(error.response.data.error)
     }
     finally{
        set({isProfileUpdating:false})
     }
   }

}))