import { useCaseContext } from "@/hooks/useCaseContext";

import type { DiagnosticItem as DiagnosticItemType } from "../../../../type/intelligence";

import { PanelShell } from "@/components/ui/PanelShell";
import { DiagnosticItem } from "./DiagnosticsItem";
import { LucideMicroscope } from "lucide-react";

export interface DiagnosticsPanelProps {
  diagnosticsResponse: DiagnosticItemType[];
}
export const DiagnosticsPanel = ({
  diagnosticsResponse,
}: DiagnosticsPanelProps) => {
  const { expandedPanels, togglePanel } = useCaseContext();

  const diagnostics = diagnosticsResponse || [];

  return (
    <PanelShell
      title="Diagnostic Recommendations"
      isExpanded={expandedPanels["diagnostics"]}
      onToggle={() => togglePanel("diagnostics")}
      icon={<LucideMicroscope className="h-5 w-5 text-[#9BA3AF]" />}
    >
      {diagnostics.length === 0 ? (
        <div className="flex items-center justify-center border-2 border-dashed border-[#2A2F33] rounded-lg p-6 bg-[#0D0F12]">
          <span className="text-sm text-[#9BA3AF] font-medium">
            No diagnostic recommendations.
          </span>
        </div>
      ) : (
        <div className="space-y-3">
          {diagnostics.map((item, idx) => (
            <DiagnosticItem key={idx} test={item} />
          ))}
        </div>
      )}
    </PanelShell>
  );
};
