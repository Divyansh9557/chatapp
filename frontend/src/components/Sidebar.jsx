import { Users } from "lucide-react";
import { useMessageStore } from "../store/useMessageStore";
import SidebarSkeleton from "../skeleton/MessageSkeleton";
import { useEffect } from "react";
import { useAuthStore } from "../store/useAuthStore";

const Sidebar = () => {
  const getActiveUsers = useMessageStore((state) => state.getActiveUsers);
  const isUserLoading = useMessageStore((state) => state.isUserLoading);
  const users = useMessageStore((state) => state.users);
  const selectedUser = useMessageStore((state) => state.selectedUser);
  const setSelectedUser = useMessageStore((state) => state.setSelectedUser);
  const onlineUsers= useAuthStore((state)=>state.onlineUsers)

  useEffect(() => {
    getActiveUsers();
  }, [getActiveUsers]);

  if (isUserLoading) return <SidebarSkeleton />;

  

  return (
    <aside className="h-full w-20 lg:w-72 border-r border-zinc-800 bg-zinc-900/60 backdrop-blur-lg flex flex-col transition-all duration-200">
      {/* Header */}
      <div className="border-b border-zinc-800 px-4 py-5">
        <div className="flex items-center gap-2 text-white">
          <Users className="size-6" />
          <span className="font-semibold hidden lg:block text-lg">Contacts</span>
        </div>

        {/* Online Filter */}
        <div className="mt-4 hidden lg:flex items-center gap-2 text-zinc-400">
          <label className="cursor-pointer flex items-center gap-2 text-sm">
            <input type="checkbox" className="form-checkbox h-4 w-4 accent-green-500" />
            Show online only
          </label>
          <span className="text-xs ml-auto">(online)</span>
        </div>
      </div>

      {/* Users */}
      <div className="overflow-y-auto w-full py-3">
        {users?.map((user) => (
          <button
            key={user._id}
            onClick={() => {
              if (selectedUser !== user._id) {
                setSelectedUser(user);
              }
            }}
            className={`w-full px-4 py-2 flex items-center gap-3 transition-colors duration-150 ${
              selectedUser === user._id
                ? "bg-zinc-800 ring-1 ring-yellow-500"
                : "hover:bg-zinc-800/50"
            }`}
          >
            <div className="relative mx-auto lg:mx-0">
              <img
                src={user.image || "/avatar.png"}
                alt={user.name}
                className="w-12 h-12 rounded-full object-cover border border-zinc-700"
              />
              {onlineUsers?.includes(user._id) && (
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-zinc-900" />
              )}
            </div>

            {/* User Info */}
            <div className="hidden lg:block text-left min-w-0">
              <div className="font-medium truncate text-white">{user.name}</div>
              <div className="text-sm text-zinc-400">
                {onlineUsers?.includes(user._id) ? "Online" : "Offline"}
              </div>
            </div>
          </button>
        ))}

        {users.length === 0 && (
          <div className="text-center text-zinc-500 py-4 text-sm">No online users</div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
