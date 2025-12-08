import { useMemo, useEffect } from "react";
import { GlobalIntelPanel } from "./GlobalIntelPanel/GlobalIntelPanel";
import { useCaseContext } from "@/hooks/useCaseContext";
import type { Case } from "@/type/case";
import { CaseIntelPanel } from "./CaseInelPanel/CaseInetPanel";
import { mockBundles } from "@/data/mockIntellegence";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { ChevronLeft, FileText } from "lucide-react";

// Panels

// Mock Data Source (In real app, this would be a React Query hook)

interface CaseDetailProps {
  caseData: Case;
  onBack?: () => void;
}

export const CaseDetail = ({ caseData, onBack }: CaseDetailProps) => {
  const { setActiveCaseId } = useCaseContext();

  // Sync active case with context
  useEffect(() => {
    setActiveCaseId(caseData.id);
  }, [caseData.id, setActiveCaseId]);

  // Retrieve Intelligence Data
  const bundle = useMemo(() => mockBundles[caseData.id] || null, [caseData.id]);
  // const aiResponse = useMemo(() => mockAIResponses[caseData.id] || null, [caseData.id]);

  return (
    <div className="h-full bg-slate-50/50 border border-slate-200 rounded-lg shadow-sm flex flex-col overflow-hidden animate-in fade-in duration-300 relative">
      {/* Global Intelligence Layer (Top) */}
      <GlobalIntelPanel />

      {/* Header */}
      <div className="px-6 py-4 bg-white border-b border-slate-100 shrink-0 z-10 flex justify-between items-center shadow-sm">
        <div className="flex items-center gap-3">
          {onBack && (
            <button
              title="back"
              onClick={onBack}
              className="p-1.5 hover:bg-slate-100 rounded-full text-slate-500 transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          )}
          <div>
            <h1 className="text-lg font-bold text-slate-900 leading-tight">
              {caseData.name}
            </h1>
            <span className="text-xs text-slate-400 font-mono">
              #{caseData.id}
            </span>
          </div>
        </div>
        <div className="text-right">
          <StatusBadge label={caseData.status} variant={caseData.status} />
        </div>
      </div>

      {/* Scrollable Panel Area */}
      <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-2">
        {bundle ? (
          <>
            <CaseIntelPanel bundle={bundle} />
          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm max-w-sm">
              <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-300">
                <FileText className="w-6 h-6" />
              </div>
              <h3 className="text-slate-900 font-medium">Standard Case View</h3>
              <p className="text-slate-500 text-sm mt-1">
                Intelligence features are not enabled for this case type.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
