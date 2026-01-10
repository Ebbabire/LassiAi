import { memo } from "react";
import { ClipboardList } from "lucide-react";
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
        <div className="flex items-center gap-2 px-3 py-2 bg-slate-800/50 border-b border-slate-600/30">
          <ClipboardList size={12} className="text-slate-400" />
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            Operational Reference
          </span>
        </div>

        {/* Content Grid */}
        <div className="p-3 space-y-3">
          {/* Dosing Parameters */}
          {data.dosing && (
            <FieldSection label="Dosing">
              <FieldRow label="Dose" value={data.dosing.dose} />
              <FieldRow label="Route" value={data.dosing.route} />
              <FieldRow label="Frequency" value={data.dosing.frequency} />
              {data.dosing.duration && (
                <FieldRow label="Duration" value={data.dosing.duration} />
              )}
            </FieldSection>
          )}

          {/* Timing Checkpoints */}
          {data.timing && (
            <FieldSection label="Timing">
              {data.timing.recheckInterval && (
                <FieldRow label="Recheck" value={data.timing.recheckInterval} />
              )}
              {data.timing.monitoringWindow && (
                <FieldRow
                  label="Monitor Window"
                  value={data.timing.monitoringWindow}
                />
              )}
              {data.timing.criticalCheckpoints &&
                data.timing.criticalCheckpoints.length > 0 && (
                  <div className="col-span-2">
                    <span className="text-[10px] text-slate-500 uppercase tracking-wide">
                      Checkpoints
                    </span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {data.timing.criticalCheckpoints.map((cp, idx) => (
                        <span
                          key={idx}
                          className="text-xs font-mono text-slate-300 bg-slate-700/50 px-1.5 py-0.5 rounded"
                        >
                          {cp}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
            </FieldSection>
          )}

          {/* Reference Values */}
          {data.referenceValues && data.referenceValues.length > 0 && (
            <FieldSection label="Reference Values">
              {data.referenceValues.map((ref, idx) => (
                <FieldRow
                  key={idx}
                  label={ref.label}
                  value={`${ref.target}${ref.unit ? ` ${ref.unit}` : ""}`}
                />
              ))}
            </FieldSection>
          )}

          {/* Calculations */}
          {data.calculations && data.calculations.length > 0 && (
            <FieldSection label="Calculations">
              {data.calculations.map((calc, idx) => (
                <div key={idx} className="col-span-2 flex items-baseline gap-2">
                  <span className="text-[10px] text-slate-500 uppercase tracking-wide min-w-[80px]">
                    {calc.label}
                  </span>
                  <span className="text-xs font-mono text-slate-200 font-medium">
                    {calc.value}
                  </span>
                  {calc.formula && (
                    <span className="text-[10px] text-slate-500 font-mono">
                      ({calc.formula})
                    </span>
                  )}
                </div>
              ))}
            </FieldSection>
          )}

          {/* Contraindications */}
          {data.contraindications && data.contraindications.length > 0 && (
            <FieldSection label="Contraindications">
              <div className="col-span-2 space-y-1">
                {data.contraindications.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <span className="text-slate-500 mt-0.5">-</span>
                    <span className="text-xs text-slate-300">{item}</span>
                  </div>
                ))}
              </div>
            </FieldSection>
          )}

          {/* Escalation */}
          {data.escalation && (
            <FieldSection label="Escalation">
              {data.escalation.threshold && (
                <FieldRow label="Threshold" value={data.escalation.threshold} />
              )}
              {data.escalation.contact && (
                <FieldRow label="Contact" value={data.escalation.contact} />
              )}
            </FieldSection>
          )}
        </div>
      </div>
    );
  }
);

OperationalReferenceBlock.displayName = "OperationalReferenceBlock";

// Helper Components

interface FieldSectionProps {
  label: string;
  children: React.ReactNode;
}

const FieldSection = ({ label, children }: FieldSectionProps) => (
  <div>
    <div className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 border-b border-slate-700/50 pb-1">
      {label}
    </div>
    <div className="grid grid-cols-2 gap-x-4 gap-y-1">{children}</div>
  </div>
);

interface FieldRowProps {
  label: string;
  value: string;
}

const FieldRow = ({ label, value }: FieldRowProps) => (
  <>
    <span className="text-[10px] text-slate-500 uppercase tracking-wide">
      {label}
    </span>
    <span className="text-xs font-mono text-slate-200 font-medium">
      {value}
    </span>
  </>
);
