import { PanelShell } from "@/components/ui/PanelShell";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { useCaseContext } from "@/hooks/useCaseContext";
import type { CaseBundleV1 } from "@/type/intelligence";
import { Heart } from "lucide-react";

export interface CaseIntelPanelProps {
  bundle: CaseBundleV1;
  isLoading?: boolean;
}

export const CaseIntelPanel = ({ bundle, isLoading }: CaseIntelPanelProps) => {
  const { expandedPanels, togglePanel } = useCaseContext();

  if (isLoading || !bundle)
    return (
      <div className="h-24 bg-[#1A1D21] border border-[#2A2F33] rounded-xl animate-pulse" />
    );

  const { patient, case: caseInfo, flags, imaging } = bundle;

  // Format patient demographics string
  const demographics = [
    patient.age ? `${patient.age}yo` : null,
    patient.sex,
    patient.species,
    patient.breed,
    patient.weightKg ? `${patient.weightKg}kg` : null,
  ]
    .filter(Boolean)
    .join(" • ");

  return (
    <PanelShell
      title="Chief Complaint"
      variant="highlight"
      isExpanded={expandedPanels["patient"]}
      onToggle={() => togglePanel("patient")}
      icon={<Heart className="h-5 w-5" />}
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <h2 className="text-xl font-bold text-[#F2F2F2]">{patient.name}</h2>
          <p className="text-sm text-[#9BA3AF] font-medium mt-1">
            {demographics}
          </p>
        </div>
      </div>

      <div className="bg-[#0D0F12] p-3 rounded-lg border border-[#2A2F33] mb-4">
        <span className="text-xs font-bold text-[#2D9CDB] uppercase tracking-wide block mb-1">
          Clinical Summary
        </span>
        <p className="text-sm text-[#F2F2F2] leading-relaxed">
          {caseInfo.description ||
            caseInfo.clinicalHistory ||
            "No clinical details available."}
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        {flags?.map((flag) => (
          <StatusBadge
            key={flag}
            label={flag.replace(/_/g, " ")}
            variant="warning"
          />
        ))}
        {imaging && imaging.length > 0 && (
          <StatusBadge
            label="Imaging Available"
            variant="neutral"
            className="border-dashed"
          />
        )}
      </div>
    </PanelShell>
  );
};
