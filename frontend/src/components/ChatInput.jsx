import { useState } from "react";
import { FiImage, FiSend } from "react-icons/fi";
import { useMessageStore } from "../store/useMessageStore";

function ChatInput() {
  const [text, setMessage] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [isSending, setIsSending] = useState(false);

  const sendMessages = useMessageStore((state) => state.sendMessage);
  const selectedUser = useMessageStore((state) => state.selectedUser);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file)); // Generate preview URL
    }
  };

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result); // returns base64 string
      reader.onerror = (error) => reject(error);
    });
  };

  const handleSend = async () => {
    if (!selectedUser) return;

    setIsSending(true);

    try {
      let base64Image = null;
      if (image) {
        base64Image = await convertToBase64(image);
      }

      await sendMessages(selectedUser._id, {
        text,
        image: base64Image,
      });

      // Clear UI state
      setMessage("");
      setImage(null);
      setPreview(null);
    } catch (error) {
      console.error("Failed to send message:", error);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="p-4 border-t border-zinc-700 bg-zinc-900">
      {/* Optional Preview */}
      {preview && (
        <div className="mb-2 flex items-center gap-2">
          <img src={preview} alt="Preview" className="h-16 rounded-md" />
          <button
            onClick={() => {
              setImage(null);
              setPreview(null);
            }}
            className="text-red-400 hover:text-red-300"
          >
            Remove
          </button>
        </div>
      )}

      {/* Input Row */}
      <div className="flex items-center">
        {/* Avatar */}
        <div className="mr-3">
          <img
            src="/avatar.png"
            alt="User Avatar"
            className="w-10 h-10 rounded-full object-cover"
          />
        </div>

        {/* Input + Buttons */}
        <div className="flex items-center w-full bg-zinc-800 rounded-lg px-3 py-2">
          {/* Message Input */}
          <input
            type="text"
            value={text}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-grow bg-transparent text-white placeholder-zinc-400 focus:outline-none"
          />

          {/* Image Upload */}
          <label className="mx-2 text-green-500 hover:text-green-400 cursor-pointer">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
            <FiImage size={20} />
          </label>

          {/* Send Button */}
          <button
            onClick={handleSend}
            disabled={(text === "" && image === null) || isSending}
            className={`${
              text === "" && image === null
                ? "text-gray-300"
                : "text-yellow-400 hover:text-yellow-300"
            } ${isSending ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            <FiSend size={20} className="rotate-45" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChatInput;
