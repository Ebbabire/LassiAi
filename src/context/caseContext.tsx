import { createContext } from "react";

interface CaseContextType {
  activeCaseId: string | null;
  setActiveCaseId: (id: string | null) => void;
  expandedPanels: Record<string, boolean>;
  togglePanel: (panelId: string) => void;
  activeReasoningTrace: string | null;
  setActiveReasoningTrace: (id: string | null) => void;
  setExpandedPanels: React.Dispatch<
    React.SetStateAction<Record<string, boolean>>
  >;
}

export const CaseContext = createContext<CaseContextType | undefined>(
  undefined
);
