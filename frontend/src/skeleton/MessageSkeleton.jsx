import { Users } from "lucide-react";

const SidebarSkeleton = () => {
  return (
    <aside className="h-full w-20 lg:w-72 border-r border-base-300 flex flex-col animate-pulse">
      <div className="border-b border-base-300 w-full p-5">
        <div className="flex items-center gap-2">
          <Users className="size-6 text-zinc-400" />
          <span className="bg-zinc-300 h-4 w-20 rounded hidden lg:block" />
        </div>

        <div className="mt-3 hidden lg:flex items-center gap-2">
          <div className="h-4 w-4 bg-zinc-300 rounded" />
          <span className="bg-zinc-300 h-3 w-24 rounded" />
        </div>
      </div>

      <div className="overflow-y-auto w-full py-3 space-y-3 px-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="w-full p-3 flex items-center gap-3 hover:bg-base-300 transition-colors"
          >
            <div className="relative mx-auto lg:mx-0">
              <div className="size-12 bg-zinc-300 rounded-full" />
            </div>

            <div className="hidden lg:block min-w-0 space-y-1">
              <div className="h-4 w-32 bg-zinc-300 rounded" />
              <div className="h-3 w-20 bg-zinc-200 rounded" />
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
};

export default SidebarSkeleton;
