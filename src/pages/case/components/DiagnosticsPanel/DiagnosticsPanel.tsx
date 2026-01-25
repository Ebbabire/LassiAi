import { useMemo, useCallback, memo } from "react";
import { useCaseContext } from "@/hooks/useCaseContext";

import type {
  DiagnosticItem as DiagnosticItemType,
  TrustMetadata,
} from "../../../../type/intelligence";

import { PanelShell } from "@/components/ui/PanelShell";
import { DiagnosticItem } from "./DiagnosticsItem";
import { CheckCircle2, LucideMicroscope } from "lucide-react";
import { SuccessCard } from "@/components/ui/SuccessCard";
import { DiagnosticsPanelSkeleton } from "@/components/ui/skeletons";

export interface DiagnosticsPanelProps {
  diagnosticsResponse: DiagnosticItemType[] | null;
  trustData?: TrustMetadata;
  isLoading?: boolean;
}
export const DiagnosticsPanel = memo(({
  diagnosticsResponse,
  trustData,
  isLoading,
}: DiagnosticsPanelProps) => {
  const { expandedPanels, togglePanel, activeCaseId } = useCaseContext();

  const diagnostics = useMemo(
    () => diagnosticsResponse || [],
    [diagnosticsResponse]
  );

  const handleToggle = useCallback(() => {
    togglePanel("diagnostics");
  }, [togglePanel]);

  return (
    <PanelShell
      title="Diagnostic Panel"
      isExpanded={expandedPanels["diagnostics"]}
      onToggle={handleToggle}
      icon={<LucideMicroscope className="h-5 w-5 text-[#9BA3AF]" />}
      telemetryLabel="diagnostics_panel_viewed"
      caseId={activeCaseId}
      trustData={trustData}
    >
      {isLoading ? (
        <DiagnosticsPanelSkeleton />
      ) : diagnostics.length === 0 ? (
        <SuccessCard
          title="No immediate diagnostics pending"
          message="Standard monitoring protocols apply"
          icon={<CheckCircle2 size={20} />}
          variant="success"
        />
      ) : (
        <div className="space-y-3">
          {diagnostics.map((item, idx) => (
            <DiagnosticItem key={idx} test={item} />
          ))}
        </div>
      )}
    </PanelShell>
  );
});

DiagnosticsPanel.displayName = "DiagnosticsPanel";
