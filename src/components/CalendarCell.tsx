import type { DayStatus, CalendarDay } from "../types";

type Props = {
  day: CalendarDay;
  status: DayStatus;
  onClick: (dateKey: string) => void;
};

export default function CalendarCell({ day, status, onClick }: Props) {
  const { dateKey, isCurrentMonth, isToday, isFuture } = day;
  const dayNum = day.date.getDate();

  if (!isCurrentMonth) {
    return (
      <div className="min-h-0 rounded-xl bg-bg-primary/30 flex items-center justify-center">
        <span className="text-xs text-text-muted/30">{dayNum}</span>
      </div>
    );
  }

  if (isFuture) {
    return (
      <div className="min-h-0 rounded-xl bg-bg-card/50 border border-border-subtle/30 flex items-center justify-center">
        <span className="text-xs text-text-muted/50">{dayNum}</span>
      </div>
    );
  }

  const stateStyles: Record<DayStatus, string> = {
    none: "bg-bg-card border-border-subtle hover:bg-bg-card-hover",
    done: "bg-accent-green/15 border-accent-green/40 text-accent-green",
    partial: "bg-accent-amber/10 border-accent-amber/30 text-accent-amber",
    missed: "bg-accent-red-muted/30 border-accent-red/20 text-accent-red/60",

  };

  const stateIcons: Record<DayStatus, string> = {
    none: "",
    done: "★",
    partial: "~",
    missed: "",
  };

  const todayRing = isToday ? "ring-2 ring-accent-blue ring-offset-1 ring-offset-bg-primary" : "";
  const todayGlow = isToday && status === "none" ? "animate-glow-pulse" : "";

  return (
    <button
      onClick={() => onClick(dateKey)}
      className={`min-h-0 rounded-xl border flex flex-col items-center justify-center gap-0.5 transition-all duration-200 hover:scale-105 cursor-pointer ${stateStyles[status]} ${todayRing} ${todayGlow}`}
      aria-label={`${dateKey} - ${status}`}
    >
      <span className={`text-xs font-medium ${status === "none" ? "text-text-secondary" : ""}`}>
        {dayNum}
      </span>
      {stateIcons[status] && (
        <span className="text-sm font-bold leading-none">{stateIcons[status]}</span>
      )}
    </button>
  );
}
