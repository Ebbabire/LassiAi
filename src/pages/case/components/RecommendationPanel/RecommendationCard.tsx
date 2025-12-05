import type { RecommendationItem } from "@/type";

interface RecommendationCardProps {
  item: RecommendationItem;
}

export const RecommendationCard = ({ item }: RecommendationCardProps) => {
  return (
    <div className="flex flex-col p-4 bg-blue-50 border border-blue-300  rounded-lg shadow-sm hover:border-blue-400 transition-colors duration-200">
      <span className="text-xs uppercase tracking-wider font-semibold text-slate-500 mb-1">
        {item.title}
      </span>
      <div
        className={`text-sm md:text-base font-medium text-slate-900 font-mono`}
      >
        {item.value}
      </div>
    </div>
  );
};
