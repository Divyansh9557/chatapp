/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import { useMessageStore } from "../store/useMessageStore";
import ChatSkeleton from "../skeleton/ChatSkeleton";
import { useAuthStore } from "../store/useAuthStore";
import ChatInput from "./CHatInput";

const ChatContainer = () => {
  const setSelectedUser = useMessageStore((store) => store.setSelectedUser);
  const getUserMessages = useMessageStore((store) => store.getUserMessages);
  const messages = useMessageStore((store) => store.messages);
  const selectedUser = useMessageStore((store) => store.selectedUser);
  const isMessageLoading = useMessageStore((store) => store.isMessageLoading);
  const subscribedMessages = useMessageStore((store) => store.subscribedMessages);
  const unSubscribedMessages = useMessageStore((store) => store.unSubscribedMessages);
  const authUser = useAuthStore((state) => state.authUser);
  const onlineUsers = useAuthStore((state) => state.onlineUsers);

  const [isOnline,setIsOnline]= useState(false)

  const scrollRef = useRef(null);


  useEffect(() => {
    if (selectedUser?._id) {
      getUserMessages(selectedUser._id);
    }
    subscribedMessages()
    
    const online = onlineUsers.some((curr)=>{
          return curr === selectedUser?._id;
      })
      setIsOnline(online)
    
   
    return ()=> {
      unSubscribedMessages()
    }
  }, [selectedUser]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  

  const handleClose = () => {
    setSelectedUser(null);
  };

  if (isMessageLoading) {
    return <ChatSkeleton />;
  }

  return (
    <div className="flex-1 flex flex-col overflow-auto bg-zinc-900 text-white relative">
      <div className="p-4 border-b border-zinc-700 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img
            src={selectedUser.image || "/avatar.png"}
            className="w-8 h-8 rounded-full"
            alt={selectedUser.name}
          />
   

          <div>
            <div className="font-semibold text-yellow-300">{selectedUser.name}</div>
            <div className="text-xs text-zinc-400">
              {
                isOnline?"Online":"Offline"
              }
            </div>
          </div>
        </div>
        <button
          onClick={handleClose}
          className="text-zinc-400 hover:text-red-500 transition"
          title="Close Chat"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages?.map((message) => {
          const isMe = message.senderId._id === authUser._id;

          return (
            <div
              key={message._id}
              className={`flex items-end  space-x-2 ${isMe ? "justify-end" : "justify-start"}`}
            >
              {!isMe && (
                <img
                  src={message.senderId.image || "/avatar.png"}
                  className="w-10 h-10 rounded-full border border-zinc-700"
                  alt="avatar"
                />
              )}
              <div className="flex flex-col justify-center items-start max-w-xs">
                <div
                  className={`rounded-lg p-3  shadow ${
                    isMe
                      ? "bg-blue-600 text-white rounded-br-none"
                      : "bg-zinc-800 text-white translate-y-2.5 rounded-bl-none"
                  }`}
                >
                  {message.image && (
                    <img
                      src={message.image}
                      alt="attachment"
                      className="rounded mb-2 max-w-[200px]"
                    />
                  )}
                  {message.text && <p>{message.text}</p>}
                </div>
                <span className="text-xs text-zinc-400 mt-1 ml-1">{message.time}</span>
              </div>
              {isMe && (
                <img
                  src={message.senderId.image || "/avatar.png"}
                  className="w-10 h-10 rounded-full border border-zinc-700"
                  alt="avatar"
                />
              )}
            </div>
          );
        })}
        <div ref={scrollRef} />
      </div>

      <ChatInput />
    </div>
  );
};

export default ChatContainer;
