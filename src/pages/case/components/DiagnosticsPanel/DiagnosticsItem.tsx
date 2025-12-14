import { memo } from "react";
import type { DiagnosticItem as DiagnosticItemType } from "@/type/intelligence";
import {
  getPriorityHoverClasses,
  getPriorityVariant,
} from "@/utils/ui-helpers";
import { StatusBadge } from "@/components/ui/StatusBadge";

interface DiagnosticItemProps {
  test: DiagnosticItemType;
}

export const DiagnosticItem = memo(({ test }: DiagnosticItemProps) => {
  const priorityHoverClass = getPriorityHoverClasses(test.priority);
  const priorityVariant = getPriorityVariant(test.priority);

  return (
    <div
      className={`p-3 rounded-md border bg-[#0D0F12] transition-all duration-200 ${
        test.recommendedByAI
          ? "border-[#F2C94C]/40 bg-[#F2C94C]/5"
          : "border-[#2A2F33]"
      } ${priorityHoverClass}`}
    >
      <div className="flex justify-between items-start gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-bold text-[#F2F2F2] text-sm">
              {test.testName}
            </span>
            {test.recommendedByAI && (
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#F2C94C] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#F2C94C]"></span>
              </span>
            )}
          </div>
          <p className="text-sm text-[#9BA3AF] leading-snug">
            {test.reasoning}
          </p>
        </div>
        <StatusBadge
          label={test.priority.toUpperCase()}
          variant={priorityVariant}
          className="shrink-0"
        />
      </div>
    </div>
  );
});
