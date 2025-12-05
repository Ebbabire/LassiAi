import { useMemo, useState } from "react";

import type { Case } from "@/type";
import { SortIcon } from "@/components/ui/SortIcon";
import CaseItem from "./CaseItem";

interface CaseListProps {
  cases: Case[];
  onSelectCase: (id: string) => void;
  selectedId?: string | null;
}

const CaseList = ({ cases, onSelectCase, selectedId }: CaseListProps) => {
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  const sortedCases = useMemo(() => {
    return [...cases].sort((a, b) => {
      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();
      return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
    });
  }, [cases, sortOrder]);

  const toggleSort = () => {
    setSortOrder((prev) => (prev === "desc" ? "asc" : "desc"));
  };
  return (
    <div className="w-full bg-white border border-slate-200 rounded-lg shadow-sm overflow-hidden flex flex-col h-full">
      {/* Header bar with sort control */}
      <div className="px-4 py-3 bg-blue-800 border-b border-slate-200 flex justify-between items-center shrink-0">
        <span className="text-xs font-bold text-slate-200 uppercase tracking-wider">
          Cases
        </span>
        <button
          onClick={toggleSort}
          className="flex items-center gap-1 text-[11px] font-medium text-slate-600 hover:text-blue-600 transition-colors bg-white border border-slate-200 hover:border-blue-200 rounded px-2 py-1 shadow-sm"
          title={`Sort by Date ${
            sortOrder === "asc" ? "(Oldest First)" : "(Newest First)"
          }`}
        >
          <span>Date</span>
          <SortIcon order={sortOrder} />
        </button>
      </div>

      <div className="flex flex-col gap-1 divide-slate-100 flex-1">
        {sortedCases.length === 0 ? (
          <div className="p-8 text-center text-slate-500 text-sm">
            No cases found.
          </div>
        ) : (
          sortedCases.map((patientCase) => (
            <CaseItem
              key={patientCase.id}
              patientCase={patientCase}
              onSelectCase={onSelectCase}
              isSelected={patientCase.id === selectedId}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default CaseList;
