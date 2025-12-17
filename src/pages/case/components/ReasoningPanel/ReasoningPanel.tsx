import { PanelShell } from "@/components/ui/PanelShell";
import { useCaseContext } from "@/hooks/useCaseContext";
import type { ClinicalAIResponse } from "@/type/intelligence";
import { BookOpen, TriangleAlert } from "lucide-react";

interface ReasoningPanelProps {
  reasoningResponse: ClinicalAIResponse | null;
  isLoading?: boolean;
}

export const ReasoningPanel = ({ reasoningResponse }: ReasoningPanelProps) => {
  const { expandedPanels, togglePanel, activeCaseId } = useCaseContext();
  const hasRecommendations =
    reasoningResponse &&
    reasoningResponse.differentials &&
    reasoningResponse.differentials.length > 0;

  const primaryDx = hasRecommendations
    ? reasoningResponse.differentials[0]
    : [];
  const otherDx = hasRecommendations
    ? reasoningResponse.differentials.slice(1)
    : [];

  return (
    <PanelShell
      title="Clinical Reasoning"
      isExpanded={expandedPanels["reasoning"]}
      onToggle={() => togglePanel("reasoning")}
      icon={<BookOpen size={18} />}
      telemetryLabel="reasoning_panel_viewed"
      caseId={activeCaseId}
    >
      {hasRecommendations ? (
        <div className="space-y-4">
          {/* Primary Diagnosis */}
          <div>
            <span className="text-xs font-bold text-[#27AE60] uppercase tracking-wider block mb-1">
              Primary Consideration
            </span>
            <div className="text-lg font-bold text-[#F2F2F2] flex items-center gap-2">
              {primaryDx}
              <span className="inline-flex h-2 w-2 rounded-full bg-[#27AE60] animate-pulse"></span>
            </div>
            <p className="text-sm text-[#9BA3AF] mt-1">
              {reasoningResponse.summary}
            </p>
          </div>

          {/* Red Flags */}
          {reasoningResponse.redFlags &&
            reasoningResponse.redFlags.length > 0 && (
              <div className="bg-[#0D0F12] border border-[#EB5757]/40 p-3 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <TriangleAlert className="text-[#EB5757] size-4" />
                  <span className="text-xs font-bold text-[#EB5757] uppercase">
                    Red Flags
                  </span>
                </div>
                <ul className="list-disc list-inside text-sm text-[#F2F2F2] space-y-1">
                  {reasoningResponse.redFlags.map((flag, idx) => (
                    <li key={idx}>{flag}</li>
                  ))}
                </ul>
              </div>
            )}

          {/* Differentials List */}
          {otherDx.length > 0 && (
            <div className="border-t border-[#2A2F33] pt-3">
              <span className="text-xs font-semibold text-[#9BA3AF] uppercase mb-2 block">
                Differentials
              </span>
              <ul className="space-y-2">
                {otherDx.map((dx, idx) => (
                  <li
                    key={idx}
                    className="flex items-center text-sm text-[#F2F2F2]"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#2A2F33] mr-2"></span>
                    {dx}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ) : (
        <div className="flex items-center justify-center border-2 border-dashed border-[#2A2F33] rounded-lg p-6 bg-[#0D0F12]">
          <span className="text-sm text-[#9BA3AF] font-medium">
            No AI Clinical Reasoning available for this case.
          </span>
        </div>
      )}
    </PanelShell>
  );
};
