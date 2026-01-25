import { ErrorBoundary } from "react-error-boundary";
import { AlertTriangle, RefreshCw } from "lucide-react";
import type { ReactNode } from "react";

interface PanelErrorBoundaryProps {
  children: ReactNode;
  panelName?: string;
  onRetry?: () => void;
}

interface ErrorFallbackProps {
  error: unknown;
  resetErrorBoundary: () => void;
  panelName?: string;
  onRetry?: () => void;
}

function ErrorFallback({
  error,
  resetErrorBoundary,
  panelName,
  onRetry,
}: ErrorFallbackProps) {
  const handleRetry = () => {
    resetErrorBoundary();
    if (onRetry) {
      onRetry();
    }
  };

  // Safely convert error to string
  const errorMessage =
    error instanceof Error ? error.toString() : String(error);

  return (
    <div className="bg-[#1A1D21] border border-[#EB5757]/30 rounded-lg p-6 mb-2">
      <div className="flex flex-col items-center justify-center text-center space-y-4">
        <div className="w-12 h-12 bg-[#EB5757]/10 rounded-full flex items-center justify-center">
          <AlertTriangle size={24} className="text-[#EB5757]" />
        </div>
        <div className="space-y-2">
          <h3 className="text-sm font-bold text-[#F2F2F2]">
            {panelName || "Panel"} Unavailable
          </h3>
          <p className="text-xs text-[#9BA3AF] max-w-sm">
            This intelligence module encountered an error and could not load.
            The rest of the case view remains functional.
          </p>
        </div>
        <button
          onClick={handleRetry}
          className="flex items-center gap-2 px-4 py-2 bg-[#2A2F33] hover:bg-[#3A3F43] border border-[#2A2F33] rounded-md text-sm text-[#F2F2F2] font-medium transition-colors"
        >
          <RefreshCw size={14} />
          Retry
        </button>
        {import.meta.env.DEV && (
          <details className="mt-4 text-left w-full max-w-md">
            <summary className="text-xs text-[#9BA3AF] cursor-pointer hover:text-[#F2F2F2]">
              Error Details (Dev Only)
            </summary>
            <pre className="mt-2 p-2 bg-[#0D0F12] border border-[#2A2F33] rounded text-[10px] text-[#EB5757] overflow-auto max-h-32">
              {errorMessage}
            </pre>
          </details>
        )}
      </div>
    </div>
  );
}

export function PanelErrorBoundary({
  children,
  panelName,
  onRetry,
}: PanelErrorBoundaryProps) {
  return (
    <ErrorBoundary
      FallbackComponent={(props) => (
        <ErrorFallback {...props} panelName={panelName} onRetry={onRetry} />
      )}
      onError={(error, errorInfo) => {
        // Log error to console
        console.error(
          "Panel Error Boundary caught an error:",
          error,
          errorInfo
        );
      }}
    >
      {children}
    </ErrorBoundary>
  );
}
