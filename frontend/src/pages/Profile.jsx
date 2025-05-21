import { useRef, useState } from "react";
import { FaCamera, FaUser, FaEnvelope } from "react-icons/fa";
import { useAuthStore } from "../store/useAuthStore";

export default function Profile() {
  const fileInputRef = useRef(null);
  const [imagePreview, setImagePreview] = useState(
    ""
  );

  const updateProfile= useAuthStore((store)=>store.updateProfile)
  const authUser= useAuthStore((store)=>store.authUser)

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file)
      reader.onload = async() => {
        setImagePreview(reader.result);
        const base64= reader.result

        await updateProfile({profilePic:base64})

      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="min-h-screen bg-[#1a1a1a] text-white px-4 py-8 flex justify-center items-center">
      <div className="w-full max-w-xl bg-[#2a2a2a] p-8 rounded-2xl shadow-lg space-y-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-yellow-400">Profile</h2>
          <p className="text-sm text-gray-400 mt-1">Your profile information</p>
        </div>

        <div className="flex flex-col items-center relative">
          <div className="relative w-28 h-28 rounded-full bg-[#1a1a1a] border-4 border-[#3a3a3a] flex items-center justify-center">
            <img
              src={imagePreview || authUser.image|| "/avatar.png" }
              alt="Profile"
              className="w-20 h-20 object-cover rounded-full"
            />
            <div
              onClick={triggerFileInput}
              className="absolute bottom-1 right-1 bg-yellow-500 p-1 rounded-full cursor-pointer hover:bg-yellow-400"
            >
              <FaCamera className="text-black text-sm" />
            </div>
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              accept="image/*"
              onChange={handleImageChange}
            />
          </div>
          <p className="text-xs text-gray-400 mt-2">Click the camera icon to update your photo</p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-sm text-gray-400 flex items-center gap-1">
              <FaUser className="text-gray-500" />
              Full Name
            </label>
            <input
              type="text"
              className="w-full mt-1 px-4 py-2 rounded-md bg-[#1a1a1a] border border-[#444] text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
              value={authUser.name}
              disabled={true}
            />
          </div>

          <div>
            <label className="text-sm text-gray-400 flex items-center gap-1">
              <FaEnvelope className="text-gray-500" />
              Email Address
            </label>
            <input
              type="email"
              className="w-full mt-1 px-4 py-2 rounded-md bg-[#1a1a1a] border border-[#444] text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
              value={authUser.email}

              disabled={true}
            />
          </div>
        </div>

        <div className="pt-6 border-t border-[#444]">
          <h3 className="text-sm font-medium text-yellow-400 mb-2">Account Information</h3>
          <div className="flex justify-between text-sm text-gray-300 mb-1">
            <span>Member Since</span>
            <span>January 2024</span>
          </div>
          <div className="flex justify-between text-sm text-gray-300">
            <span>Account Status</span>
            <span className="text-green-500 font-semibold">Active</span>
          </div>
        </div>
      </div>
    </div>
  );
}
