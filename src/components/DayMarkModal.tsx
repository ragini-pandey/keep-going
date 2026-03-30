import type { DayStatus } from "../types";

type Props = {
  dateKey: string;
  currentStatus: DayStatus;
  onMark: (status: "done" | "partial" | "missed") => void;
  onClose: () => void;
};

export default function DayMarkModal({ dateKey, currentStatus, onMark, onClose }: Props) {
  const d = new Date(dateKey + "T00:00:00");
  const label = d.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });

  const statusLabels: Record<DayStatus, string> = {
    none: "Unmarked",
    done: "Done ✓",
    partial: "Partial ~",
    missed: "Missed",

  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="animate-scale-in w-full max-w-xs bg-bg-card border border-border-subtle rounded-2xl p-5 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <p className="text-sm font-semibold text-text-primary text-center mb-1">{label}</p>
        <p className="text-[11px] text-text-muted text-center mb-4">
          Currently: {statusLabels[currentStatus]}
        </p>

        <div className="flex flex-col gap-2">
          <button
            onClick={() => onMark("done")}
            className={`py-2.5 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
              currentStatus === "done"
                ? "bg-accent-green text-white"
                : "bg-accent-green/15 text-accent-green hover:bg-accent-green/25 border border-accent-green/30"
            }`}
          >
            Done
          </button>
          <button
            onClick={() => onMark("partial")}
            className={`py-2.5 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
              currentStatus === "partial"
                ? "bg-accent-amber text-white"
                : "bg-accent-amber/15 text-accent-amber hover:bg-accent-amber/25 border border-accent-amber/30"
            }`}
          >
            Partial
          </button>
          <button
            onClick={() => onMark("missed")}
            className={`py-2.5 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
              currentStatus === "missed"
                ? "bg-accent-red text-white"
                : "bg-accent-red/10 text-accent-red/70 hover:bg-accent-red/20 border border-accent-red/20"
            }`}
          >
            Missed
          </button>
        </div>

        <button
          onClick={onClose}
          className="mt-3 w-full py-2 rounded-xl text-xs text-text-muted hover:text-text-secondary transition-colors cursor-pointer"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
