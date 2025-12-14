import React, { useState } from "react";
import { PanelShell } from "../../../../components/ui/PanelShell";
import { Activity } from "lucide-react";
import { useCaseContext } from "@/hooks/useCaseContext";

import type { TreatmentItem as TreatmentResponse } from "../../../../type/intelligence";
import { TreatmentCard } from "./components/TreatmentCard";
import { CalculationDialog } from "./components/CalculationDialog";

interface TreatmentPanelProps {
  treatmentResponse: TreatmentResponse[] | null;
}

export const TreatmentPanel: React.FC<TreatmentPanelProps> = ({
  treatmentResponse,
}) => {
  const [selectedTreatment, setSelectedTreatment] =
    useState<TreatmentResponse | null>(null);

  const hasRecommendations = treatmentResponse && treatmentResponse.length > 0;

  const { expandedPanels, togglePanel } = useCaseContext();
  const panelKey = "treatments";
  const isExpanded = expandedPanels[panelKey];

  const handleViewCalculation = (treatment: TreatmentResponse) => {
    setSelectedTreatment(treatment);
  };

  return (
    <>
      <PanelShell
        title="Treatment Recommendations"
        icon={<Activity size={18} />}
        isExpanded={isExpanded}
        onToggle={() => togglePanel(panelKey)}
      >
        {hasRecommendations ? (
          treatmentResponse?.map((treatment, index) => (
            <TreatmentCard
              key={index}
              treatment={treatment}
              onViewCalculation={handleViewCalculation}
            />
          ))
        ) : (
          <div className="flex items-center justify-center border-2 border-dashed border-[#2A2F33] rounded-lg p-6 bg-[#0D0F12]">
            <span className="text-sm text-[#9BA3AF] font-medium">
              No AI Treatment Recommendations available for this case.
            </span>
          </div>
        )}
      </PanelShell>

      {selectedTreatment && (
        <CalculationDialog
          isOpen={!!selectedTreatment}
          onClose={() => setSelectedTreatment(null)}
          treatment={selectedTreatment}
        />
      )}
    </>
  );
};
