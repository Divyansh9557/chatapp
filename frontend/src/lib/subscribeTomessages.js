import React, { useEffect } from 'react'
import { useMessageStore } from '../store/useMessageStore'
import { useAuthStore } from '../store/useAuthStore'

const SubscribeTomessages = () => {

    const addMessages= useMessageStore((state)=>state.addMessages)
    const socket= useAuthStore((state)=>state.socket)

    useEffect(()=>{
       try {
        console.log("hello")
         socket.on("newMessage",(mes)=>{
             addMessages(mes)
         })
 
         return ()=>{
             socket.off("newMessage")
         }
       } catch (error) {
        console.log("error in message",error)
       }
    })

  return (
    null
  )
}

export default SubscribeTomessages