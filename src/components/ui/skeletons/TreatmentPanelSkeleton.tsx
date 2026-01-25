export const TreatmentPanelSkeleton = () => {
  return (
    <div className="flex flex-col gap-3 animate-in fade-in duration-200">
      {[1, 2].map((idx) => (
        <div
          key={idx}
          className="border border-[#2A2F33] rounded-lg bg-[#0D0F12] overflow-hidden"
        >
          {/* Warnings Strip Skeleton */}
          <div className="bg-[#EB5757]/10 border-b border-[#EB5757]/20 px-3 py-2">
            <div className="h-3 w-48 bg-[#2A2F33]/50 rounded animate-pulse" />
          </div>

          {/* Content Skeleton */}
          <div className="p-3 space-y-3">
            {/* Header Row */}
            <div className="flex justify-between items-center">
              <div className="h-4 w-32 bg-[#2A2F33]/50 rounded animate-pulse" />
              <div className="h-6 w-20 bg-[#2A2F33]/50 rounded animate-pulse" />
            </div>

            {/* Main Instruction */}
            <div className="h-10 w-full bg-[#1A1D21] border border-[#2A2F33] rounded px-2 py-1.5">
              <div className="h-4 w-3/4 bg-[#2A2F33]/50 rounded animate-pulse" />
            </div>

            {/* Rationale */}
            <div className="space-y-1">
              <div className="h-3 w-full bg-[#2A2F33]/50 rounded animate-pulse" />
              <div className="h-3 w-5/6 bg-[#2A2F33]/30 rounded animate-pulse" />
            </div>

            {/* Dose Metadata Pills */}
            <div className="flex flex-wrap gap-1.5">
              {[1, 2, 3, 4].map((pillIdx) => (
                <div
                  key={pillIdx}
                  className="h-5 w-16 bg-[#1A1D21] border border-[#2A2F33] rounded animate-pulse"
                />
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
