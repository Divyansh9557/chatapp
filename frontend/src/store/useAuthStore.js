import {create} from "zustand"
import { axiosInstance } from "../lib/axiosInstance"
import toast from "react-hot-toast"
import {io} from "socket.io-client"

const BASE_URL= "/"

export const useAuthStore = create((set,get)=>({
   authUser:null,
   isAuthChecking:true,
   isSigningUp:false,
   isLoggingIn:false,
   isProfileUpdating:false,
   onlineUsers:null,
   socket:null,

   

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
        get().connectSocket()
        toast.success('login succesfully')
       
        
     } catch (error) {
        toast.error(error.response.data.message)
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
        get().disconnectSocket()
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
   },

   connectSocket:()=>{

    const authUser= get().authUser
    if (!authUser || get().socket?.connected )  return;

     const socket = io(BASE_URL,{
        query: {userId:authUser._id}
     })
     socket.connect()
     set({socket})
      console.log("socket here")
     socket.on("onlineusers",(userIds)=>{
        set({onlineUsers:userIds})
     })
   },
   disconnectSocket: () => {
  const socket = get().socket;
  if (socket) {
    console.log("Disconnecting socket...");
    socket.disconnect();
    socket.removeAllListeners?.(); // Optional but safer
    set({ socket: null });
  } else {
    console.log("No socket to disconnect");
  }
},
getOnlineUsers:()=>{
    get().socket?.on("onlineusers",(userIds)=>{
        set({onlineUsers:userIds})
     })
}


}))