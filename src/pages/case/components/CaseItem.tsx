import { StatusBadge } from "@/components/ui/StatusBadge";
import type { Case } from "@/type/case";
import { ChevronRightIcon } from "lucide-react";

interface CaseItemProps {
  patientCase: Case;
  onSelectCase: (id: string) => void;
  isSelected?: boolean;
}

const CaseItem = ({ patientCase, onSelectCase, isSelected }: CaseItemProps) => {
  return (
    <div
      onClick={() => onSelectCase(patientCase.id)}
      className={`group relative flex items-center p-4 hover:bg-slate-100 cursor-pointer transition-colors duration-150 ease-in-out border-l-4 ${
        isSelected
          ? "bg-blue-50/60 border-blue-800 rounded-l-md"
          : "bg-white border-transparent hover:bg-slate-50 hover:border-slate-300"
      }`}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          onSelectCase(patientCase.id);
        }
      }}
    >
      {/* Left Column: ID & Main Info */}
      <div className="flex-1 min-w-0 grid gap-1">
        <div className="flex items-center gap-3">
          <span className="text-xs font-mono font-medium text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded">
            {patientCase.id}
          </span>
          <div className="flex items-baseline gap-2 truncate">
            <h3 className="text-sm font-semibold text-slate-900 truncate">
              {patientCase.name}
            </h3>
            <span className="text-xs text-slate-500 font-medium uppercase tracking-wide">
              {patientCase.species}
            </span>
          </div>
        </div>

        {/* Complaint truncated to 1 line */}
        <p className="text-sm text-slate-600 truncate pr-4">
          {patientCase.complaint}
        </p>

        <div className="flex items-center gap-2 mt-1 md:hidden">
          <StatusBadge
            label={patientCase.status}
            variant={patientCase.status}
          />

          <span className="text-xs text-slate-400">
            {patientCase.createdAt}
          </span>
        </div>
      </div>

      {/* Right Column: Status, Date, Action (Visible on medium screens and up) */}
      <div className="hidden md:flex items-center gap-6 shrink-0 ml-4">
        <StatusBadge label={patientCase.status} variant={patientCase.status} />
        <span className="text-xs text-slate-500 w-20 text-right">
          {patientCase.createdAt}
        </span>
        <div className="pl-2">
          <ChevronRightIcon />
        </div>
      </div>

      {/* Mobile Arrow only */}
      <div className="md:hidden ml-2">
        <ChevronRightIcon />
      </div>
    </div>
  );
};

export default CaseItem;
