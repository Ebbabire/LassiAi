import type { TreatmentItem } from "@/type/intelligence";
import { X, AlertTriangle } from "lucide-react";

interface CalculationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  treatment: TreatmentItem;
}

export const CalculationDialog = ({
  isOpen,
  onClose,
  treatment,
}: CalculationDialogProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-[2px] animate-in fade-in duration-200">
      <div
        className="bg-[#1A1D21] border border-[#2A2F33] rounded-xl shadow-2xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]"
        role="dialog"
      >
        {/* Header */}
        <div className="flex justify-between items-start p-4 border-b border-[#2A2F33] bg-[#1A1D21]">
          <h3 className="text-base font-bold text-[#F2F2F2] leading-tight pr-4">
            Calculation & Source for{" "}
            <span className="text-[#2D9CDB]">{treatment.drugName}</span>
          </h3>
          <button
            title="close"
            onClick={onClose}
            className="text-[#9BA3AF] hover:text-[#F2F2F2] transition-colors p-1 rounded hover:bg-[#2A2F33]"
          >
            <X size={18} />
          </button>
        </div>

        <div className="p-5 space-y-5 overflow-y-auto">
          {/* Critical Warnings */}
          {treatment.warnings && treatment.warnings.length > 0 && (
            <div className="border border-[#EB5757]/30 bg-[#EB5757]/5 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-3 text-[#EB5757] font-bold text-xs uppercase tracking-wide">
                <AlertTriangle size={14} /> Critical Warnings
              </div>
              <ul className="space-y-2">
                {treatment.warnings.map((w, i) => (
                  <li
                    key={i}
                    className="text-sm text-[#EB5757] flex items-start gap-2.5"
                  >
                    <span className="mt-2 w-1 h-1 bg-[#EB5757] rounded-full shrink-0" />
                    <span className="leading-snug">{w}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Dose Calculation */}
          {treatment.calculation && (
            <div className="border border-[#2A2F33] bg-[#0D0F12] rounded-lg p-4">
              <h4 className="text-sm font-bold text-[#F2F2F2] mb-4">
                Dose Calculation
              </h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between items-center">
                  <span className="text-[#9BA3AF]">Patient Weight:</span>
                  <span className="text-[#F2C94C] font-mono font-medium">
                    {treatment.calculation.patientWeightKg} kg
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[#9BA3AF]">Per-dose mg:</span>
                  <span className="text-[#F2C94C] font-mono font-medium">
                    {treatment.calculation.perDoseMg} mg
                  </span>
                </div>
                {treatment.calculation.tabletStrengthMg && (
                  <div className="flex justify-between items-center">
                    <span className="text-[#9BA3AF]">Tablet Strength:</span>
                    <span className="text-[#F2C94C] font-mono font-medium">
                      {treatment.calculation.tabletStrengthMg} mg
                    </span>
                  </div>
                )}
                {treatment.calculation.totalTablets && (
                  <div className="flex justify-between items-center pt-2 mt-2 border-t border-[#2A2F33]">
                    <span className="text-[#9BA3AF]">Total Tablets:</span>
                    <span className="text-[#F2C94C] font-mono font-bold">
                      {treatment.calculation.totalTablets} tab(s)
                    </span>
                  </div>
                )}
              </div>
              {treatment.calculation.notes && (
                <div className="mt-4 pt-3 border-t border-[#2A2F33] text-xs text-[#9BA3AF] leading-relaxed">
                  <span className="text-[#2D9CDB] font-medium">
                    Rounding Logic:
                  </span>{" "}
                  {treatment.calculation.notes}
                </div>
              )}
            </div>
          )}

          {/* Guideline Source */}
          {treatment.source && (
            <div className="border border-[#2A2F33] bg-[#0D0F12] rounded-lg p-4">
              <h4 className="text-sm font-bold text-[#F2F2F2] mb-3">
                Guideline Source
              </h4>
              <div className="space-y-2 text-sm">
                {treatment.source.guideline && (
                  <div className="flex flex-col gap-0.5">
                    <span className="text-[#9BA3AF] text-xs">Guideline:</span>
                    <span className="text-[#F2F2F2] font-medium">
                      {treatment.source.guideline}
                    </span>
                  </div>
                )}
                {treatment.source.protocolName && (
                  <div className="flex flex-col gap-0.5">
                    <span className="text-[#9BA3AF] text-xs">Protocol:</span>
                    <span className="text-[#F2F2F2] font-medium">
                      {treatment.source.protocolName}
                    </span>
                  </div>
                )}
                {treatment.source.url && (
                  <div className="flex flex-col gap-0.5 pt-1">
                    <span className="text-[#9BA3AF] text-xs">Url:</span>
                    <a
                      href={treatment.source.url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[#2D9CDB] hover:underline truncate block"
                    >
                      {treatment.source.url}
                    </a>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
