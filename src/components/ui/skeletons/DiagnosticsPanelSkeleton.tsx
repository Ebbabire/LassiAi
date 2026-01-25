export const DiagnosticsPanelSkeleton = () => {
  return (
    <div className="space-y-3 animate-in fade-in duration-200">
      {[1, 2, 3].map((idx) => (
        <div
          key={idx}
          className="p-3 rounded-md border border-[#2A2F33] bg-[#0D0F12]"
        >
          <div className="flex justify-between items-start gap-4">
            <div className="flex-1 space-y-2">
              {/* Test Name and Badge */}
              <div className="flex items-center gap-2">
                <div className="h-4 w-40 bg-[#2A2F33]/50 rounded animate-pulse" />
                <div className="h-5 w-16 bg-[#2A2F33]/50 rounded animate-pulse" />
              </div>
              {/* Reasoning */}
              <div className="space-y-1">
                <div className="h-3 w-full bg-[#2A2F33]/50 rounded animate-pulse" />
                <div className="h-3 w-4/5 bg-[#2A2F33]/30 rounded animate-pulse" />
              </div>
            </div>
            {/* Priority Badge */}
            <div className="h-6 w-16 bg-[#2A2F33]/50 rounded animate-pulse shrink-0" />
          </div>
        </div>
      ))}
    </div>
  );
};
