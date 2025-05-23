import { Link } from "react-router-dom";
import { FiLogOut, FiSettings } from "react-icons/fi";
import { FaUser } from "react-icons/fa";
import { useAuthStore } from "../store/useAuthStore";

export default function Navbar() {
    const authuser= useAuthStore((state)=>state.authUser)
    const logout= useAuthStore((state)=>state.logout)
  return (
    <nav className="bg-[#0f0f0f] text-white px-6 py-2 flex justify-between items-center shadow-md border-b border-[#2a2a2a]">
      <Link to={'/'} >
      <div className="flex items-center gap-2">
        <div className="bg-purple-700 p-2 rounded-md">
          <span className="text-white font-bold text-lg">🟪</span>
        </div>
        <span className="text-xl font-semibold">Chatty</span>
      </div>
      </Link>

      <div className="flex items-center gap-6 text-sm">
        <Link to="/settings" className="flex items-center gap-1 hover:text-gray-300">
          <FiSettings className="text-lg" />
          Settings
        </Link>

        {
            authuser && <>
             <Link to="/profile" className="flex items-center gap-1 hover:text-gray-300">
          <FaUser className="text-lg" />
          Profile
        </Link>
        <button onClick={logout} className="flex items-center gap-1 hover:text-gray-300">
          <FiLogOut className="text-lg" />
          Logout
        </button>
            
            </>
        }
       
      </div>
    </nav>
  );
}
