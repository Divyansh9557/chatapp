import Sidebar from "../components/Sidebar";
import NoChatSelected from "../components/NoChatSelected";
import ChatContainer from "../components/ChatContainer";
import { useMessageStore } from "../store/useMessageStore";

const HomePage = () => {
  const selectedUser = useMessageStore((state) => state.selectedUser);

  return (
    <div className="h-[91.6vh] bg-cover bg-center  text-white"  style={{ backgroundImage: "url('/star.jpg')" }} >
      <div className="flex items-center justify-center h-full px-4 py-10">
        <div className="w-full max-w-6xl h-full rounded-2xl border border-zinc-700 shadow-xl bg-zinc-900/60 backdrop-blur-md">
          <div className="flex h-full rounded-2xl overflow-hidden">
            <Sidebar />
            {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
