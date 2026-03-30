import type { DayEntry } from "../types";
import {
  calculateCurrentStreak,
  calculateBestStreak,
  calculateConsistency,
} from "../utils";

type Props = {
  entries: Record<string, DayEntry>;
  year: number;
  month: number;
};

export default function StatsRow({ entries, year, month }: Props) {
  const currentStreak = calculateCurrentStreak(entries);
  const bestStreak = calculateBestStreak(entries);
  const consistency = calculateConsistency(entries, year, month);

  const stats = [
    { label: "Current Streak", value: `${currentStreak}d`, accent: "text-accent-green" },
    { label: "Best Streak", value: `${bestStreak}d`, accent: "text-accent-blue" },
    { label: "Consistency", value: `${consistency}%`, accent: "text-accent-blue" },
  ];

  return (
    <div className="grid grid-cols-3 gap-2">
      {stats.map((s) => (
        <div
          key={s.label}
          className="bg-bg-card border border-border-subtle rounded-xl px-3 py-3 text-center"
        >
          <p className={`text-lg font-bold ${s.accent}`}>{s.value}</p>
          <p className="text-[10px] text-text-muted uppercase tracking-wider mt-0.5">
            {s.label}
          </p>
        </div>
      ))}
    </div>
  );
}
