export type EventName =
  | "case_opened"
  | "reasoning_panel_viewed"
  | "diagnostics_panel_viewed"
  | "treatments_panel_viewed"
  | "treatment_math_expanded"
  | "guideline_source_viewed"
  | "ops_panel_viewed"
  | "patient_panel_viewed";

interface EventPayload {
  caseId: string;
  timestamp: string;
  metadata?: Record<string, any>;
}

export const logEvent = (event: EventName, caseId: string, metadata?: any) => {
  const payload: EventPayload = {
    caseId,
    timestamp: new Date().toISOString(),
    metadata,
  };

  // 1. Log to console in Dev (for QA)
  if (import.meta.env.VITE_DEV) {
    console.groupCollapsed(`📡 Telemetry: ${event}`);
    console.log(payload);
    console.groupEnd();
  }

  // 2. Fire and Forget to Backend (Mocked for now)
  // In production, this would send the data
  try {
    // data post implementation:
  } catch (e) {
    // Silent fail - telemetry should never crash the app
    if (import.meta.env.VITE_DEV) {
      console.warn("Telemetry failed to send", e);
    }
  }
};
