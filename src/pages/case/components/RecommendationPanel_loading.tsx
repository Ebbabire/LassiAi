import { Skeleton } from "@/components/ui/Skeleton";

const RecommendationsPanelLoading = () => {
  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Recommendations Skeleton */}
      <section>
        <Skeleton className="h-4 w-32 mb-4" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-24 w-full" />
        </div>
      </section>
      {/* Flags Skeleton */}
      <section>
        <div className="flex items-center gap-2 mb-3">
          <Skeleton className="h-5 w-5 rounded-full" />
          <Skeleton className="h-4 w-24" />
        </div>
        <div className="flex gap-2">
          <Skeleton className="h-6 w-32 rounded-full" />
          <Skeleton className="h-6 w-40 rounded-full" />
        </div>
      </section>
    </div>
  );
};

export default RecommendationsPanelLoading;
