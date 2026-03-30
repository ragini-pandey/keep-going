import type { GoalData, DayEntry, DayStatus } from "../types";
import { todayKey } from "../utils";

type Props = {
  goalData: GoalData;
  entries: Record<string, DayEntry>;
  onMark: (status: "done" | "missed") => void;
  emotionalMessage: string | null;
};

export default function TodayCard({ goalData, entries, onMark, emotionalMessage }: Props) {
  const key = todayKey();
  const todayEntry = entries[key];
  const status: DayStatus = todayEntry?.status ?? "none";
  const isMarked = status !== "none";

  const today = new Date();
  const dateStr = today.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  const statusLabels: Record<DayStatus, string> = {
    none: "Not marked yet",
    done: "Completed ★",
    missed: "Missed",
  };

  const statusColors: Record<DayStatus, string> = {
    none: "text-text-muted",
    done: "text-accent-cyan",
    missed: "text-accent-red",
  };

  return (
    <div className="bg-bg-card border border-border-subtle rounded-2xl p-5 space-y-4">
      <div>
        <p className="text-[11px] font-medium text-text-muted uppercase tracking-wider">
          Today
        </p>
        <p className="text-sm text-text-secondary mt-0.5">{dateStr}</p>
      </div>

      {emotionalMessage && !isMarked && (
        <p className="text-sm text-accent-blue/90 italic leading-relaxed">
          "{emotionalMessage}"
        </p>
      )}

      <div className="bg-bg-secondary rounded-xl px-4 py-3">
        <p className="text-[10px] font-medium text-text-muted uppercase tracking-wider mb-1">
          Minimum action
        </p>
        <p className="text-sm text-text-primary font-medium">{goalData.dailyMinimum}</p>
      </div>

      {isMarked ? (
        <div className="text-center py-2">
          <p className={`text-sm font-semibold ${statusColors[status]}`}>
            {statusLabels[status]}
          </p>
          <p className="text-xs text-text-muted mt-1">
            Tap a button below to change
          </p>
        </div>
      ) : null}

      <div className="flex gap-2">
        <button
          onClick={() => onMark("done")}
          className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 cursor-pointer ${
            status === "done"
              ? "bg-accent-cyan text-white shadow-lg shadow-accent-cyan-glow"
              : "bg-accent-cyan/15 text-accent-cyan hover:bg-accent-cyan/25 border border-accent-cyan/30"
          }`}
        >
          Done
        </button>
        <button
          onClick={() => onMark("missed")}
          className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 cursor-pointer ${
            status === "missed"
              ? "bg-accent-red text-white"
              : "bg-accent-red/10 text-accent-red/70 hover:bg-accent-red/20 border border-accent-red/20"
          }`}
        >
          Missed
        </button>
      </div>
    </div>
  );
}
