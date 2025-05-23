import { create } from "zustand";
import { axiosInstance } from "../lib/axiosInstance";
import toast from "react-hot-toast";

export const useMessageStore = create((set) => ({
  messages: [],
  users:[],
  selectedUser:null,
  isUserLoading:false,
  isMessageLoading:false,

   getActiveUsers:async()=>{
    try {
    //    set({isUserLoading:true}) 
       const res= await axiosInstance.get("/message/getUser")
       set({users:res.data})

    } catch (error) {
        toast.error(error.response.data.error);
        console.log(error)
    }
    finally{
       set({isUserLoading:false})
    }
   } ,

   getUserMessages:async(userId)=>{
    try {
        set({ isMessageLoading: true });
        const res = await axiosInstance.get(`/message/${userId}`)
        set({messages:res.data})
    } catch (error) {
        toast.error(error.response.data.error)
        console.log(error)
    }
    finally{
       set({ isMessageLoading: false });
    }
   },

   setSelectedUser:(selectedUser)=>{set({selectedUser})},


}));