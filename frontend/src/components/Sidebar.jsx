
import { Users } from "lucide-react";
import { useMessageStore } from "../store/useMessageStore";
import SidebarSkeleton from "../skeleton/MessageSkeleton";
import { useEffect } from "react";

const Sidebar = () => {
 
  const getActiveUsers = useMessageStore((state) => state.getActiveUsers);
const isUserLoading = useMessageStore((state) => state.isUserLoading);
const users = useMessageStore((state) => state.users);
const selectedUser = useMessageStore((state) => state.selectedUser);
const setSelectedUser = useMessageStore((state) => state.setSelectedUser);

  useEffect(()=>{
    getActiveUsers()
  },[getActiveUsers])

  if(isUserLoading){
    return <SidebarSkeleton/>
  }

const onlineUsers=[]
// const filteredUsers=[]
  return (
    <aside className="h-full w-20 lg:w-72 border-r border-base-300 flex flex-col transition-all duration-200">
      <div className="border-b border-base-300 w-full p-5">
        <div className="flex items-center gap-2">
          <Users className="size-6" />
          <span className="font-medium hidden lg:block">Contacts</span>
        </div>
        
        <div className="mt-3 hidden lg:flex items-center gap-2">
          <label className="cursor-pointer flex items-center gap-2">
            <input
              type="checkbox"
              
              
              className="checkbox checkbox-sm"
            />
            <span className="text-sm">Show online only</span>
          </label>
          <span className="text-xs text-zinc-500">( online)</span>
        </div>
      </div>

      <div className="overflow-y-auto w-full py-3">
        {users?.map((user) => (
          <button
            key={user._id}
          onClick={()=> setSelectedUser(user._id) }
            className={`
              w-full p-3 flex items-center gap-3
              hover:bg-base-300 transition-colors
              ${selectedUser === user._id ? "bg-base-300  ring-1 ring-base-300" : ""}
            `}
          >
            <div className="relative mx-auto lg:mx-0">
              <img
                src={user.image || "/avatar.png"}
                alt={user.name}
                className="size-12 object-cover rounded-full"
              />
              {onlineUsers.includes(user._id) && (
                <span
                  className="absolute bottom-0 right-0 size-3 bg-green-500 
                  rounded-full ring-2 ring-zinc-900"
                />
              )}
            </div>

            
            <div className="hidden lg:block text-left min-w-0">
              <div className="font-medium truncate">{user.name}</div>
              <div className="text-sm text-zinc-400">
                {onlineUsers.includes(user._id) ? "Online" : "Offline"}
              </div>
            </div>
          </button>
        ))}

        {users.length === 0 && (
          <div className="text-center text-zinc-500 py-4">No online users</div>
        )}
      </div>
    </aside>
  );
};
export default Sidebar;