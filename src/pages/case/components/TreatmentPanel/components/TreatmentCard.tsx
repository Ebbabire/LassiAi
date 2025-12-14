import { memo } from "react";
import type { TreatmentItem } from "@/type/intelligence";
import { Calculator } from "lucide-react";

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
              <h4 className="text-sm font-bold text-[#F2F2F2]">
                {treatment.drugName}
              </h4>
              {treatment.source?.protocolName && (
                <span className="text-[10px] text-[#2D9CDB] bg-[#2D9CDB]/10 px-1.5 py-0.5 rounded border border-[#2D9CDB]/20">
                  {treatment.source.protocolName}
                </span>
              )}
            </div>
            {treatment.calculation && (
              <button
                className="text-[#9BA3AF] hover:text-[#F2F2F2] transition-colors p-1 rounded hover:bg-[#2A2F33]"
                title="View Math & Source"
                onClick={() => onViewCalculation(treatment)}
              >
                <Calculator />
              </button>
            )}
          </div>

          {/* Rationale & Display Text */}
          <div className="text-sm text-[#F2F2F2] font-medium mb-1">
            {treatment.displayText}
          </div>
          <p className="text-xs text-[#9BA3AF] italic">{treatment.rationale}</p>

          {/* Dose Pills */}
          {treatment.dose && (
            <div className="flex flex-wrap gap-2 mt-2">
              <span className="text-[10px] font-mono text-[#9BA3AF] bg-[#2A2F33] px-2 py-0.5 rounded border border-[#2A2F33]">
                {treatment.dose.mgPerKg} mg/kg
              </span>
              <span className="text-[10px] font-mono text-[#9BA3AF] bg-[#2A2F33] px-2 py-0.5 rounded border border-[#2A2F33]">
                {treatment.dose.frequency}
              </span>
              <span className="text-[10px] font-mono text-[#9BA3AF] bg-[#2A2F33] px-2 py-0.5 rounded border border-[#2A2F33]">
                {treatment.dose.durationDays} days
              </span>
              <span className="text-[10px] font-mono text-[#9BA3AF] bg-[#2A2F33] px-2 py-0.5 rounded border border-[#2A2F33]">
                {treatment.dose.route}
              </span>
            </div>
          )}
        </div>

        {/* Warnings Strip */}
        {treatment.warnings && treatment.warnings.length > 0 && (
          <div className="bg-[#F2C94C]/10 border-t border-[#F2C94C]/20 px-3 py-1.5 flex items-start gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-[#F2C94C] mt-0.5"
            >
              <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
              <line x1="12" x2="12" y1="9" y2="13" />
              <line x1="12" x2="12.01" y1="17" y2="17" />
            </svg>
            <div className="text-[10px] text-[#F2C94C] font-medium">
              {treatment.warnings.join(" • ")}
            </div>
          </div>
        )}
      </div>
    );
  }
);
