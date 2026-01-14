import { memo } from "react";
import { ClipboardList, AlertTriangle } from "lucide-react";
import type { OperationalReference } from "@/type/intelligence";

interface OperationalReferenceBlockProps {
  data: OperationalReference;
}

export const OperationalReferenceBlock = memo(
  ({ data }: OperationalReferenceBlockProps) => {
    // Check if there's any data to display
    const hasData =
      data.dosing ||
      data.timing ||
      (data.referenceValues && data.referenceValues.length > 0) ||
      (data.calculations && data.calculations.length > 0) ||
      (data.contraindications && data.contraindications.length > 0) ||
      data.escalation;

    if (!hasData) return null;

    return (
      <div className="mt-2 border border-slate-600/40 rounded bg-slate-900/30 overflow-hidden">
        {/* Header */}
        <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-800/50 border-b border-slate-600/30">
          <ClipboardList size={12} className="text-slate-400" />
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            Operational Reference
          </span>
        </div>

        {/* Compact Grid Content */}
        <div className="p-2 grid grid-cols-2 md:grid-cols-4 gap-x-3 gap-y-2 text-xs">
          {/* Dosing - inline */}
          {data.dosing && (
            <>
              <DataCell label="Dose" value={data.dosing.dose} />
              <DataCell label="Route" value={data.dosing.route} />
              <DataCell label="Freq" value={data.dosing.frequency} />
              {data.dosing.duration && (
                <DataCell label="Duration" value={data.dosing.duration} />
              )}
            </>
          )}

          {/* Timing - inline */}
          {data.timing?.recheckInterval && (
            <DataCell label="Recheck" value={data.timing.recheckInterval} />
          )}
          {data.timing?.monitoringWindow && (
            <DataCell label="Monitor" value={data.timing.monitoringWindow} />
          )}

          {/* Reference Values - inline */}
          {data.referenceValues?.map((ref, idx) => (
            <DataCell
              key={idx}
              label={ref.label}
              value={`${ref.target}${ref.unit ? ` ${ref.unit}` : ""}`}
            />
          ))}

          {/* Calculations - inline */}
          {data.calculations?.map((calc, idx) => (
            <DataCell
              key={idx}
              label={calc.label}
              value={calc.value}
              hint={calc.formula}
            />
          ))}
        </div>

        {/* Checkpoints - compact row */}
        {data.timing?.criticalCheckpoints &&
          data.timing.criticalCheckpoints.length > 0 && (
            <div className="px-2 pb-2 flex items-center gap-2">
              <span className="text-[10px] text-slate-500 uppercase">
                Checkpoints:
              </span>
              <div className="flex flex-wrap gap-1">
                {data.timing.criticalCheckpoints.map((cp, idx) => (
                  <span
                    key={idx}
                    className="text-[10px] font-mono text-slate-300 bg-slate-700/50 px-1.5 py-0.5 rounded"
                  >
                    {cp}
                  </span>
                ))}
              </div>
            </div>
          )}

        {/* Contraindications & Escalation - compact footer row */}
        {(data.contraindications?.length || data.escalation) && (
          <div className="px-2 pb-2 flex flex-wrap items-center gap-3 text-[10px]">
            {data.contraindications && data.contraindications.length > 0 && (
              <div className="flex items-center gap-1 text-amber-400">
                <AlertTriangle size={10} />
                <span className="font-medium">Avoid:</span>
                <span className="text-slate-300">
                  {data.contraindications.join(", ")}
                </span>
              </div>
            )}
            {data.escalation?.threshold && (
              <div className="text-slate-400">
                <span className="text-rose-400 font-medium">Escalate:</span>{" "}
                <span className="text-slate-300">
                  {data.escalation.threshold}
                </span>
              </div>
            )}
            {data.escalation?.contact && (
              <div className="text-slate-400">
                <span className="font-medium">Contact:</span>{" "}
                <span className="text-slate-300">
                  {data.escalation.contact}
                </span>
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
);

OperationalReferenceBlock.displayName = "OperationalReferenceBlock";

// Compact data cell component
interface DataCellProps {
  label: string;
  value: string;
  hint?: string;
}

const DataCell = ({ label, value, hint }: DataCellProps) => (
  <div className="flex flex-col">
    <span className="text-[9px] text-slate-500 uppercase tracking-wide leading-none">
      {label}
    </span>
    <span className="text-xs font-mono text-slate-200 font-medium leading-tight">
      {value}
      {hint && <span className="text-[9px] text-slate-500 ml-1">({hint})</span>}
    </span>
  </div>
);
