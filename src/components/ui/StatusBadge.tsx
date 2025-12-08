interface BadgeProps {
  label: string;
  variant?:
    | "default"
    | "neutral"
    | "outline"
    | "warning"
    | "danger"
    | "New"
    | "In Progress"
    | "Completed";
  className?: string;
}

export const StatusBadge = ({
  label,
  variant = "default",
  className = "",
}: BadgeProps) => {
  const styles = {
    default: "bg-blue-50 text-blue-700 border-blue-200",
    neutral: "bg-slate-100 text-slate-600 border-slate-200",
    outline: "bg-white text-slate-600 border-slate-300",
    warning: "bg-amber-50 text-amber-700 border-amber-200",
    danger: "bg-red-50 text-red-700 border-red-200",
    success: "bg-emerald-50 text-emerald-700 border-emerald-200",
    New: "bg-blue-50 text-blue-700 border-blue-200",
    "In Progress": "bg-amber-50 text-amber-700 border-amber-200",
    Completed: "bg-emerald-50 text-emerald-700 border-emerald-200",
  };

  console.log(variant);

  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium border ${styles[variant]} ${className}`}
    >
      {label}
    </span>
  );
};
