import { ChevronDown } from "lucide-react";

interface PanelShellProps {
  title: string;
  icon?: React.ReactNode;
  action?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "highlight";
  isExpanded?: boolean;
  onToggle?: () => void;
}

export const PanelShell: React.FC<PanelShellProps> = ({
  title,
  icon,
  action,
  children,
  className = "",
  variant = "default",
  isExpanded = true,
  onToggle,
}) => {
  return (
    <div
      className={`
        bg-white border rounded-xl shadow-sm mb-4 overflow-hidden transition-all duration-200
        ${
          variant === "highlight"
            ? "border-blue-200 ring-1 ring-blue-50"
            : "border-slate-200"
        }
        ${className}
    `}
    >
      <div
        onClick={onToggle}
        className={`
          px-4 py-3 border-b flex items-center justify-between
          ${
            variant === "highlight"
              ? "bg-blue-50/30 border-blue-100"
              : "bg-white border-slate-100"
          }
          ${onToggle ? "cursor-pointer hover:bg-slate-50" : ""}
      `}
      >
        <div className="flex items-center gap-2.5">
          {icon && (
            <span
              className={
                variant === "highlight" ? "text-blue-600" : "text-slate-400"
              }
            >
              {icon}
            </span>
          )}
          <h3
            className={`font-semibold text-sm ${
              variant === "highlight" ? "text-blue-900" : "text-slate-800"
            }`}
          >
            {title}
          </h3>
        </div>

        <div className="flex items-center gap-2">
          {action && <div onClick={(e) => e.stopPropagation()}>{action}</div>}
          {onToggle && (
            <div
              className={`text-slate-400 transition-transform duration-200 ${
                isExpanded ? "rotate-180" : ""
              }`}
            >
              <ChevronDown className="w-4 h-4" />
            </div>
          )}
        </div>
      </div>

      {isExpanded && (
        <div className="p-4 animate-in slide-in-from-top-1 duration-200">
          {children}
        </div>
      )}
    </div>
  );
};
