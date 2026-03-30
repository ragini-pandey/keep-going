import type { DayEntry } from "../types";
import { getMonthDays, getDayStatus } from "../utils";
import CalendarCell from "./CalendarCell";

type Props = {
  year: number;
  month: number;
  entries: Record<string, DayEntry>;
  onDayClick: (dateKey: string) => void;
};

const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function CalendarGrid({ year, month, entries, onDayClick }: Props) {
  const days = getMonthDays(year, month);

  return (
    <div className="bg-bg-card border border-border-subtle rounded-2xl p-4 h-full flex flex-col">
      <div className="grid grid-cols-7 gap-1.5 mb-2">
        {weekDays.map((d) => (
          <div key={d} className="text-center text-[10px] font-medium text-text-muted uppercase tracking-wider py-1">
            {d}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1.5 flex-1">
        {days.map((day) => (
          <CalendarCell
            key={day.dateKey}
            day={day}
            status={getDayStatus(day.dateKey, entries)}
            onClick={onDayClick}
          />
        ))}
      </div>

      <div className="flex items-center justify-center gap-4 mt-2 pt-2 border-t border-border-subtle/50">
        <LegendItem color="bg-accent-green" label="Done" />
        <LegendItem color="bg-accent-amber" label="Partial" />
        <LegendItem color="bg-accent-red/60" label="Missed" />

      </div>
    </div>
  );
}

function LegendItem({ color, label }: { color: string; label: string }) {
  return (
    <div className="flex items-center gap-1.5">
      <div className={`w-2.5 h-2.5 rounded-full ${color}`} />
      <span className="text-[10px] text-text-muted">{label}</span>
    </div>
  );
}
