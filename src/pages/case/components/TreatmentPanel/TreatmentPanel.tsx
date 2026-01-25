import { useState, useMemo, useCallback, memo } from "react";
import { Activity, ShieldCheck } from "lucide-react";
import { useCaseContext } from "@/hooks/useCaseContext";

import type {
  TreatmentItem as TreatmentResponse,
  ProgressionMode,
  TrustMetadata,
} from "../../../../type/intelligence";
import { TreatmentCard } from "./components/TreatmentCard";
import { CalculationDialog } from "./components/CalculationDialog";
import { OperationalReferenceBlock } from "./components/OperationalReferenceBlock";
import { PanelShell } from "@/components/ui/PanelShell";
import { logEvent } from "@/lib/telemetry";
import { SuccessCard } from "@/components/ui/SuccessCard";
import { TreatmentPanelSkeleton } from "@/components/ui/skeletons";

interface TreatmentPanelProps {
  treatmentResponse: TreatmentResponse[] | null;
  progressionMode?: ProgressionMode;
  trustData?: TrustMetadata;
  isLoading?: boolean;
}

export const TreatmentPanel = memo(({
  treatmentResponse,
  progressionMode,
  trustData,
  isLoading,
}: TreatmentPanelProps) => {
  const [selectedTreatment, setSelectedTreatment] =
    useState<TreatmentResponse | null>(null);

  const { expandedPanels, togglePanel, activeCaseId } = useCaseContext();
  const isExpanded = expandedPanels["treatment"];

  // Memoize toggle handler
  const handleToggle = useCallback(() => {
    togglePanel("treatment");
  }, [togglePanel]);

  // Memoize computed values
  const hasRecommendations = useMemo(
    () => treatmentResponse && Array.isArray(treatmentResponse) && treatmentResponse.length > 0,
    [treatmentResponse]
  );

  // Only show operational reference in ADVANCE or PIVOT modes
  const showOperationalReference = useMemo(
    () => progressionMode === "ADVANCE" || progressionMode === "PIVOT",
    [progressionMode]
  );

  const handleViewCalculation = useCallback((treatment: TreatmentResponse) => {
    if (activeCaseId) {
      logEvent("treatment_math_expanded", activeCaseId, {
        drug: treatment.drugName,
      });
    }
    setSelectedTreatment(treatment);
  }, [activeCaseId]);

  const handleCloseDialog = useCallback(() => {
    setSelectedTreatment(null);
  }, []);

  return (
    <>
      <PanelShell
        title="Treatment Plan"
        icon={<Activity size={18} />}
        isExpanded={isExpanded}
        onToggle={handleToggle}
        telemetryLabel="treatments_panel_viewed"
        caseId={activeCaseId}
        trustData={trustData}
      >
        {isLoading ? (
          <TreatmentPanelSkeleton />
        ) : (
          <div className="flex flex-col gap-3">
            {hasRecommendations && Array.isArray(treatmentResponse) ? (
              treatmentResponse.map((treatment, index) => (
                <div key={index}>
                  <TreatmentCard
                    treatment={treatment}
                    onViewCalculation={handleViewCalculation}
                  />
                  {/* Operational Reference Block - only in ADVANCE/PIVOT modes when data present */}
                  {showOperationalReference && treatment?.operationalReference && (
                    <OperationalReferenceBlock
                      data={treatment.operationalReference}
                    />
                  )}
                </div>
              ))
            ) : (
              <SuccessCard
                title="No active pharmacological interventions"
                message="Continue current supportive care"
                icon={<ShieldCheck size={20} />}
                variant="calm"
              />
            )}
          </div>
        )}
      </PanelShell>

      {selectedTreatment && (
        <CalculationDialog
          isOpen={!!selectedTreatment}
          onClose={handleCloseDialog}
          treatment={selectedTreatment}
        />
      )}
    </>
  );
});

TreatmentPanel.displayName = "TreatmentPanel";
