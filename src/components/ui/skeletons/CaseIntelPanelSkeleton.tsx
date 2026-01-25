export const CaseIntelPanelSkeleton = () => {
  return (
    <div className="space-y-4 animate-in fade-in duration-200">
      {/* Status Banner Skeleton */}
      <div className="w-full h-10 bg-[#2A2F33]/50 rounded-md animate-pulse" />

      {/* Patient Info Skeleton */}
      <div className="flex justify-between items-start">
        <div className="space-y-2">
          <div className="h-6 w-32 bg-[#2A2F33]/50 rounded animate-pulse" />
          <div className="h-4 w-48 bg-[#2A2F33]/30 rounded animate-pulse" />
        </div>
      </div>

      {/* Clinical Summary Skeleton */}
      <div className="bg-[#0D0F12] p-3 rounded-lg border border-[#2A2F33] space-y-2">
        <div className="h-3 w-32 bg-[#2A2F33]/50 rounded animate-pulse" />
        <div className="space-y-1.5">
          <div className="h-3 w-full bg-[#2A2F33]/50 rounded animate-pulse" />
          <div className="h-3 w-5/6 bg-[#2A2F33]/30 rounded animate-pulse" />
          <div className="h-3 w-4/5 bg-[#2A2F33]/30 rounded animate-pulse" />
        </div>
      </div>

      {/* Next Steps Skeleton */}
      <div className="bg-[#0D0F12] p-3 rounded-lg border border-[#2A2F33] space-y-2">
        <div className="h-3 w-24 bg-[#2A2F33]/50 rounded animate-pulse" />
        <div className="space-y-2">
          {[1, 2].map((idx) => (
            <div
              key={idx}
              className="flex items-start gap-2 p-2 bg-[#1A1D21] rounded-md border border-[#2A2F33]"
            >
              <div className="w-4 h-4 bg-[#2A2F33]/50 rounded animate-pulse mt-0.5 shrink-0" />
              <div className="flex-1 space-y-1">
                <div className="h-3 w-3/4 bg-[#2A2F33]/50 rounded animate-pulse" />
                <div className="h-3 w-full bg-[#2A2F33]/30 rounded animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Flags Skeleton */}
      <div className="flex flex-wrap gap-2">
        {[1, 2, 3].map((idx) => (
          <div
            key={idx}
            className="h-6 w-24 bg-[#2A2F33]/50 rounded animate-pulse"
          />
        ))}
      </div>
    </div>
  );
};
