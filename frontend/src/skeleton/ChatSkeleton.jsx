const ChatSkeleton = () => {
  const messageCount = 6;

  return (
    <div className="flex-1 flex flex-col overflow-auto bg-zinc-900 text-white relative animate-pulse">
      {/* Header Skeleton */}
      <div className="p-4 border-b border-zinc-700 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-zinc-700" />
          <div className="space-y-1">
            <div className="w-24 h-4 bg-zinc-700 rounded" />
            <div className="w-16 h-3 bg-zinc-700 rounded" />
          </div>
        </div>
        <div className="w-5 h-5 bg-zinc-700 rounded" />
      </div>

      {/* Messages Skeleton */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {Array.from({ length: messageCount }).map((_, index) => {
          const isMe = index % 2 === 0;

          return (
            <div
              key={index}
              className={`flex items-end space-x-2 ${
                isMe ? "justify-end" : "justify-start"
              }`}
            >
              {!isMe && (
                <div className="w-10 h-10 rounded-full bg-zinc-700 border border-zinc-600" />
              )}

              <div className="flex flex-col items-start max-w-xs">
                <div
                  className={`rounded-lg p-3 ${
                    isMe
                      ? "bg-zinc-700 rounded-br-none"
                      : "bg-zinc-800 rounded-bl-none"
                  }`}
                >
                  <div className="w-40 h-4 bg-zinc-600 rounded mb-2" />
                  <div className="w-24 h-4 bg-zinc-600 rounded" />
                </div>
                <div className="w-12 h-3 bg-zinc-600 rounded mt-1 ml-1" />
              </div>

              {isMe && (
                <div className="w-10 h-10 rounded-full bg-zinc-700 border border-zinc-600" />
              )}
            </div>
          );
        })}
      </div>

      {/* Input Skeleton */}
      <div className="p-4 border-t border-zinc-700">
        <div className="w-full h-10 bg-zinc-800 rounded-lg" />
      </div>
    </div>
  );
};

export default ChatSkeleton;
