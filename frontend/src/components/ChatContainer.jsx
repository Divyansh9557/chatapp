import React from "react";
import { X } from "lucide-react"; // Optional: using Lucide icon
import { useMessageStore } from "../store/useMessageStore";
import ChatSkeleton from "../skeleton/ChatSkeleton";

const mockMessages = [
  {
    _id: "1",
    senderId: "user1",
    text: "Hey John! How's it going? 😊",
    profilePic: "/avatar.png",
    time: "10:45 AM",
  },
  {
    _id: "2",
    senderId: "user2",
    text: "Heyy! Long time no see! 👀",
    profilePic: "/avatar.png",
    time: "10:46 AM",
  },
  {
    _id: "3",
    senderId: "user2",
    text: "Doing great, wbu?",
    profilePic: "/avatar.png",
    time: "10:47 AM",
  },
  {
    _id: "4",
    senderId: "user1",
    text: "Not that great, just fine 😔",
    profilePic: "/avatar.png",
    time: "10:48 AM",
  },
  {
    _id: "5",
    senderId: "user1",
    text: "Studying for the midterms...",
    profilePic: "/avatar.png",
    time: "10:49 AM",
  },
  {
    _id: "6",
    senderId: "user2",
    image:
      "https://em-content.zobj.net/source/apple/354/exploding-head_1f92f.png",
    profilePic: "/avatar.png",
    time: "10:50 AM",
  },
];

const ChatContainer = () => {
  const authUserId = "user2";

  const setSelectedUser= useMessageStore((store)=> store.setSelectedUser)
  const getUserMessages= useMessageStore((store)=> store.getUserMessages)
  const messages= useMessageStore((store)=> store.messages)
  const selectedUser= useMessageStore((store)=> store.selectedUser)
  const isMessageLoading= useMessageStore((store)=> store.isMessageLoading)

  const handleClose = () => {
    setSelectedUser(null)
  };

  if(isMessageLoading){
    return <ChatSkeleton/>
  }

  return (
    <div className="flex-1 flex flex-col overflow-auto bg-zinc-900 text-white relative">
      {/* Header */}
      <div className="p-4 border-b border-zinc-700 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img src="/avatar.png" className="w-8 h-8 rounded-full" alt="Jane" />
          <div>
            <div className="font-semibold text-yellow-300">Jane Doe</div>
            <div className="text-xs text-zinc-400">Offline</div>
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

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {mockMessages.map((message) => {
          const isMe = message.senderId === authUserId;

          return (
            <div
              key={message._id}
              className={`flex items-end space-x-2 ${
                isMe ? "justify-end" : "justify-start"
              }`}
            >
              {!isMe && (
                <img
                  src={message.profilePic || "/avatar.png"}
                  className="w-10 h-10 rounded-full border border-zinc-700"
                  alt="avatar"
                />
              )}

              <div className="flex flex-col items-start max-w-xs">
                <div
                  className={`rounded-lg p-3 shadow ${
                    isMe
                      ? "bg-blue-600 text-white rounded-br-none"
                      : "bg-zinc-800 text-white rounded-bl-none"
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
                <span className="text-xs text-zinc-400 mt-1 ml-1">
                  {message.time}
                </span>
              </div>

              {isMe && (
                <img
                  src={message.profilePic || "/avatar.png"}
                  className="w-10 h-10 rounded-full border border-zinc-700"
                  alt="avatar"
                />
              )}
            </div>
          );
        })}
      </div>

      {/* Message Input */}
      <div className="p-4 border-t border-zinc-700">
        <input
          type="text"
          placeholder="Type a message..."
          className="w-full p-3 rounded-lg bg-zinc-800 text-white placeholder-zinc-400 focus:outline-none"
        />
      </div>
    </div>
  );
};

export default ChatContainer;
