import { Skeleton } from "@/components/ui/skeleton";
import { Search, BookOpen } from "lucide-react";

export default function Loading() {
  return (
    <div className="w-full h-full flex flex-col bg-white dark:bg-black rounded-lg border-[1.5px] overflow-hidden">
      <div className="p-6 border-b border-[#3b82f6]/20">
        <Skeleton className="h-8 w-64 mb-2" />
        <Skeleton className="h-5 w-96" />
      </div>

      <div className="border-b border-[#3b82f6]/20">
        <div className="flex p-0">
          <div className="px-6 py-3 border-b-2 border-[#3b82f6] text-[#3b82f6] flex items-center">
            <Search className="w-4 h-4 mr-2" />
            <Skeleton className="h-5 w-16" />
          </div>
          <div className="px-6 py-3 flex items-center">
            <Skeleton className="h-4 w-4 mr-2 rounded-full" />
            <Skeleton className="h-5 w-20" />
          </div>
          <div className="px-6 py-3 flex items-center">
            <Skeleton className="h-4 w-4 mr-2 rounded-full" />
            <Skeleton className="h-5 w-16" />
          </div>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        <div className="w-full md:w-1/3 border-r border-[#3b82f6]/20 p-4 flex flex-col">
          <div className="relative mb-4">
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            <Skeleton className="h-10 w-full rounded-md" />
          </div>

          <div className="flex items-center justify-between mb-2">
            <Skeleton className="h-5 w-20" />
          </div>

          <div className="flex-1">
            <div className="flex flex-col space-y-2 py-2">
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className="p-3 border border-gray-200 dark:border-gray-800 rounded-lg animate-pulse"
                >
                  <div className="h-5 bg-gray-200 dark:bg-gray-800 rounded w-1/4 mb-2"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-3/4"></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
          <BookOpen className="h-16 w-16 text-[#3b82f6]/30 mb-4" />
          <Skeleton className="h-7 w-64 mb-4" />
          <Skeleton className="h-5 w-96 mb-6" />
          <div className="flex gap-2">
            <Skeleton className="h-10 w-32 rounded-md" />
            <Skeleton className="h-10 w-32 rounded-md" />
            <Skeleton className="h-10 w-32 rounded-md" />
          </div>
        </div>
      </div>
    </div>
  );
}
