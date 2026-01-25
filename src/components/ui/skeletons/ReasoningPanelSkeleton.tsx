export const ReasoningPanelSkeleton = () => {
  return (
    <div className="space-y-4 animate-in fade-in duration-200">
      {/* Progression Mode Header Skeleton */}
      <div className="w-full h-10 bg-[#2A2F33]/50 rounded-md animate-pulse" />

      {/* Primary Diagnosis Skeleton */}
      <div className="relative pl-4 border-l-2 border-[#2A2F33]/30">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-5 h-5 rounded-full bg-[#2A2F33]/50 animate-pulse" />
          <div className="h-3 w-32 bg-[#2A2F33]/50 rounded animate-pulse" />
        </div>
        <div className="h-7 w-3/4 bg-[#2A2F33]/50 rounded animate-pulse mb-2" />
        <div className="h-4 w-full bg-[#2A2F33]/30 rounded animate-pulse" />
      </div>

      {/* Differentials List Skeleton */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 border-b border-[#2A2F33] pb-2">
          <div className="h-3.5 w-24 bg-[#2A2F33]/50 rounded animate-pulse" />
        </div>
        <div className="grid gap-1.5">
          {[1, 2, 3].map((idx) => (
            <div
              key={idx}
              className="w-full h-12 bg-[#0D0F12] border border-[#2A2F33] rounded-md flex items-center gap-3 p-2"
            >
              <div className="w-5 h-5 rounded bg-[#2A2F33]/50 animate-pulse" />
              <div className="h-4 flex-1 bg-[#2A2F33]/50 rounded animate-pulse" />
            </div>
          ))}
        </div>
      </div>

      {/* Safety Protocols Skeleton */}
      <div className="bg-[#EB5757]/5 border border-[#EB5757]/30 rounded-lg p-3">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-3.5 h-3.5 bg-[#2A2F33]/50 rounded animate-pulse" />
          <div className="h-3 w-32 bg-[#2A2F33]/50 rounded animate-pulse" />
        </div>
        <div className="space-y-1.5">
          {[1, 2].map((idx) => (
            <div key={idx} className="flex gap-2 items-start">
              <div className="mt-1.5 w-1 h-1 rounded-full bg-[#2A2F33]/50" />
              <div className="h-4 flex-1 bg-[#2A2F33]/50 rounded animate-pulse" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
