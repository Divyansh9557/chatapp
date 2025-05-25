import { MessageSquare } from "lucide-react";

const NoChatSelected = () => {
  return (
    <div className="w-full h-full flex items-center justify-center bg-base-100/50 p-6">
      <div className="max-w-md text-center space-y-6 animate-fade-in">
        {/* Icon Display */}
        <div className="flex justify-center">
          <div className="relative p-4 rounded-full bg-gradient-to-tr from-primary/10 to-primary/20 shadow-lg">
            <div className="w-20 h-20 bg-primary/20 rounded-2xl flex items-center justify-center shadow-inner animate-pulse-slow">
              <MessageSquare className="w-10 h-10 text-primary" />
            </div>
          </div>
        </div>

        {/* Welcome Text */}
        <h2 className="text-3xl font-bold text-base-content">
          Welcome to <span className="text-primary">chattuu</span> 🎉
        </h2>
        <p className="text-base text-base-content/70">
          Start a conversation by selecting a user from the sidebar. Happy chatting!
        </p>
      </div>
    </div>
  );
};

export default NoChatSelected;
