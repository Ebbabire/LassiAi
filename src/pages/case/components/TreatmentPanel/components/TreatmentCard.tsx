import { memo } from "react";
import type { TreatmentItem } from "@/type/intelligence";
import { Calculator, TriangleAlert } from "lucide-react";

interface TreatmentItemProps {
  treatment: TreatmentItem;
  onViewCalculation: (treatment: TreatmentItem) => void;
}

export const TreatmentCard = memo(
  ({ treatment, onViewCalculation }: TreatmentItemProps) => {
    return (
      <div className="border border-[#2A2F33] rounded-lg bg-[#0D0F12] overflow-hidden group hover:border-[#F2C94C]/30 transition-colors">
        {/* Header: Drug Name + Protocol Source */}
        <div className="p-3">
          <div className="flex justify-between items-start mb-1">
            <div className="flex items-center gap-2">
              <h4 className="text-base font-bold text-[#F2F2F2]">
                {treatment.drugName}
              </h4>
            </div>
            {treatment.calculation && (
              <button
                className="text-[#9BA3AF] hover:text-[#F2F2F2] transition-colors rounded hover:bg-[#2A2F33] flex items-center gap-2 hover:cursor-pointer px-2 py-2"
                title="View Math & Source"
                onClick={() => onViewCalculation(treatment)}
              >
                <Calculator className="size-4" />
                <span className="text-xs">View Math & Source</span>
              </button>
            )}
          </div>

          {/* Rationale & Display Text */}
          <div className="text-sm text-[#F2F2F2] font-medium mb-1">
            {treatment.displayText}
          </div>
          <p className="text-xs text-[#9BA3AF] italic mt-2">
            Why: "{treatment.rationale}"
          </p>

          {/* Dose Pills */}
          {treatment.dose && (
            <div className="flex flex-wrap gap-2 mt-4">
              <span className="text-[12px] font-mono text-[#abb3c0] bg-[#2A2F33] px-2 py-0.5 rounded border border-[#2A2F33]">
                {treatment.dose.mgPerKg} mg/kg
              </span>
              <span className="text-[12px] font-mono text-[#9BA3AF] bg-[#2A2F33] px-2 py-0.5 rounded border border-[#2A2F33]">
                {treatment.dose.frequency}
              </span>
              <span className="text-[12px] font-mono text-[#9BA3AF] bg-[#2A2F33] px-2 py-0.5 rounded border border-[#2A2F33]">
                {treatment.dose.durationDays} days
              </span>
              <span className="text-[12px] font-mono text-[#9BA3AF] bg-[#2A2F33] px-2 py-0.5 rounded border border-[#2A2F33]">
                {treatment.dose.route}
              </span>
            </div>
          )}
        </div>

        {/* Warnings Strip */}
        {treatment.warnings && treatment.warnings.length > 0 && (
          <div className="bg-[#F2C94C]/10 border-t border-[#F2C94C]/20 px-3 py-1.5 flex items-start gap-2">
            <TriangleAlert className="size-3 text-[#F2C94C]" />
            <div className="text-xs text-[#F2C94C] font-medium">
              {treatment.warnings.join(" • ")}
            </div>
          </div>
        )}
      </div>
    );
  }
);
