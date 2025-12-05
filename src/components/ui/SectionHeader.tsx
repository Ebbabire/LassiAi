export const SectionHeader = ({ title }: { title: string }) => {
  return (
    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 pb-1 border-b border-slate-100">
      {title}
    </h3>
  );
};
