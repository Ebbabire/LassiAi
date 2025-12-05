import { useEffect, useState } from "react";
import { useDebounce } from "@/hooks/useDebounce";
import {
  Copy,
  Check,
  Stethoscope,
  AlertCircle,
  AlertTriangle,
} from "lucide-react";
import ClinicalFlag from "@/pages/case/components/RecommendationPanel/ClinicalFlag";

import type { ClinicalData } from "@/type";
import { RecommendationCard } from "./RecommendationCard";
import RecommendationsPanelLoading from "./RecommendationPanel_loading";

interface RecommendationsPanelProps {
  data: ClinicalData;
}

export const RecommendationsPanel = ({ data }: RecommendationsPanelProps) => {
  const [copied, setCopied] = useState(false);
  const [summary, setSummary] = useState(data.summary);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const debouncedValue = useDebounce(summary, 500);

  useEffect(() => {
    if (!debouncedValue) return;

    const runCheck = async () => {
      setLoading(true);
      setError(null);
      await new Promise((r) => setTimeout(r, 500)); // simulate async latency

      const normalize = (str: string) =>
        str.toLowerCase().replace(/[^a-z0-9]/g, "");

      if (normalize(debouncedValue) !== normalize(data.summary)) {
        setError(
          "The AI was unable to interpret the provided summary. Please try another summery input for accurate analysis."
        );
      } else {
        setError(null);
      }

      setLoading(false);
    };

    runCheck();
  }, [debouncedValue, data.summary]);

  const handleCopy = () => {
    const textToCopy = `Summary: ${summary}\n\nRecommendations:\n${data.recommendations
      .map((r) => `- ${r.title}: ${r.value}`)
      .join("\n")}\n\nFlags: ${data.flags.join(", ")}`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="p-4">
      {/* Summary Section */}
      <section>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <h3 className="text-sm font-semibold text-slate-500  uppercase tracking-wide flex items-center gap-2">
              <Stethoscope size={16} />
              Case Summary
            </h3>
          </div>

          {/* Tooltip Wrapper */}
          <div className="relative group/tooltip">
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 text-xs font-medium text-slate-300 hover:text-slate-200 dark:text-slate-700 dark:hover:text-slate-800 transition-colors"
              aria-label="Copy notes"
            >
              {copied ? (
                <Check size={14} className="text-emerald-500" />
              ) : (
                <Copy size={14} />
              )}
              <span
                className={
                  copied ? "text-emerald-600 dark:text-emerald-500" : ""
                }
              >
                {copied ? "Copied" : "Copy Notes"}
              </span>
            </button>
          </div>
        </div>

        <div
          className={`relative rounded-lg border transition-all duration-200 mb-3 ${
            loading
              ? "bg-slate-50 border-slate-200  opacity-70 cursor-wait"
              : error
              ? "bg-red-50 border-red-300"
              : "border-blue-300 hover:border-blue-400  focus-within:ring-2 focus-within:ring-blue-300 focus-within:border-indigo-300"
          }`}
        >
          <textarea
            title="summary"
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            disabled={loading} // Optional: keep enabled if you want to allow typing while debouncing
            className={`w-full  p-4 text-slate-700 leading-relaxed resize-none focus:outline-none rounded-lg ${
              loading ? "cursor-wait" : ""
            }`}
            rows={2}
            spellCheck={false}
          ></textarea>
        </div>
      </section>

      {/* Content Area: Logic for Loading / Error / Data */}
      {loading ? (
        <RecommendationsPanelLoading />
      ) : error ? (
        <div className="p-6 bg-red-50 border border-red-400 rounded-lg flex items-start gap-4 animate-in fade-in slide-in-from-bottom-2">
          <div className="p-2 bg-red-300 rounded-full text-red-600  shrink-0">
            <AlertTriangle size={24} />
          </div>

          <p className="text-red-500 text-sm leading-relaxed">{error}</p>
        </div>
      ) : (
        <>
          {/* Recommendations Grid */}
          <section className="animate-in fade-in duration-500 mb-4">
            <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-4 flex items-center gap-2">
              Plan & Dosage
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {data.recommendations.map((rec, index) => (
                <RecommendationCard key={index} item={rec} />
              ))}
            </div>
          </section>

          {/* Flags Section */}
          <section className="animate-in fade-in duration-500 delay-100">
            <div className="flex items-center gap-2 mb-3">
              <AlertCircle size={16} className="text-slate-500" />
              <h3 className="text-sm font-semibold text-slate-500  uppercase tracking-wide">
                Clinical Flags
              </h3>
            </div>
            <div className="flex flex-wrap gap-3">
              {data.flags.map((flag, index) => (
                <ClinicalFlag key={index} flag={flag} />
              ))}
            </div>
          </section>
        </>
      )}
    </div>
  );
};
