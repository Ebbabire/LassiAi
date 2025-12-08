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
    return <div className="h-24 bg-slate-50 rounded-xl animate-pulse" />;

  const { patient, case: caseInfo, flags, imaging } = bundle;

  return (
    <PanelShell
      title="Patient Context"
      variant="highlight"
      isExpanded={expandedPanels["patient"]}
      onToggle={() => togglePanel("patient")}
      icon={<Heart className="w-4 h-4 text-blue-600" />}
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900">{patient.name}</h2>
          <p className="text-sm text-slate-500 font-medium">
            {patient.age}y {patient.sex} {patient.species} •{" "}
            {patient.breed || "Mixed"} • {patient.weightKg}kg
          </p>
        </div>
        <div className="text-right">
          <StatusBadge
            label={caseInfo.priority.toUpperCase()}
            variant={caseInfo.priority === "urgent" ? "danger" : "neutral"}
          />
        </div>
      </div>

      <div className="bg-blue-50/50 p-3 rounded-lg border border-blue-100 mb-4">
        <span className="text-xs font-bold text-blue-800 uppercase tracking-wide block mb-1">
          Presenting Complaint
        </span>
        <p className="text-sm text-slate-700 leading-relaxed">
          {caseInfo.description || caseInfo.reasonForVisit}
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        {flags?.map((flag) => (
          <StatusBadge
            key={flag}
            label={flag.replace("_", " ")}
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
