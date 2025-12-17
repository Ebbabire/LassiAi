interface SuccessCardProps {
  title: string;
  message: string;
  icon: React.ReactNode;
  variant?: "success" | "calm";
  className?: string;
}

export const SuccessCard = ({
  title,
  message,
  icon,
  variant = "success",
  className = "",
}: SuccessCardProps) => {
  const styles = {
    success: {
      container: "bg-[#27AE60]/5 border-[#27AE60]/20",
      iconWrapper: "bg-[#27AE60]/10 text-[#27AE60]",
      text: "text-[#27AE60]",
    },
    calm: {
      container: "bg-[#2D9CDB]/5 border-[#2D9CDB]/20",
      iconWrapper: "bg-[#2D9CDB]/10 text-[#2D9CDB]",
      text: "text-[#2D9CDB]",
    },
  };

  const currentStyle = styles[variant];

  return (
    <div
      className={`flex flex-col items-center justify-center p-6 rounded-xl border ${currentStyle.container} text-center w-full animate-in fade-in zoom-in-95 duration-300 ${className}`}
    >
      <div
        className={`w-10 h-10 rounded-full flex items-center justify-center mb-3 ${currentStyle.iconWrapper}`}
      >
        {icon}
      </div>
      <h4 className="text-[#F2F2F2] font-semibold text-sm tracking-tight">
        {title}
      </h4>
      <p className={`text-xs mt-1 font-medium ${currentStyle.text}`}>
        {message}
      </p>
    </div>
  );
};
