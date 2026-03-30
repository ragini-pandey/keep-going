import type { DayStatus, DayEntry, CalendarDay, GoalWithEntries, MotivationContext } from "./types";

export function formatDateKey(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export function todayKey(): string {
  return formatDateKey(new Date());
}

export function yesterdayKey(): string {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return formatDateKey(d);
}

export function getMonthDays(year: number, month: number): CalendarDay[] {
  const today = formatDateKey(new Date());
  const todayDate = new Date();
  todayDate.setHours(0, 0, 0, 0);

  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);

  const startDate = new Date(firstDay);
  startDate.setDate(startDate.getDate() - startDate.getDay());

  const endDate = new Date(lastDay);
  endDate.setDate(endDate.getDate() + (6 - endDate.getDay()));

  const days: CalendarDay[] = [];

  const current = new Date(startDate);
  while (current <= endDate) {
    const dateKey = formatDateKey(current);
    const cellDate = new Date(current);
    cellDate.setHours(0, 0, 0, 0);
    days.push({
      date: new Date(current),
      dateKey,
      isCurrentMonth: current.getMonth() === month,
      isToday: dateKey === today,
      isFuture: cellDate > todayDate,
    });
    current.setDate(current.getDate() + 1);
  }

  return days;
}

export function getDayStatus(dateKey: string, entries: Record<string, DayEntry>): DayStatus {
  return entries[dateKey]?.status ?? "none";
}

export function calculateCurrentStreak(entries: Record<string, DayEntry>): number {
  let streak = 0;
  const d = new Date();
  d.setHours(0, 0, 0, 0);

  while (true) {
    const key = formatDateKey(d);
    const status = entries[key]?.status;
    if (status === "done") {
      streak++;
      d.setDate(d.getDate() - 1);
    } else if (streak === 0 && (!status || status === "none")) {
      d.setDate(d.getDate() - 1);
      const yStatus = entries[formatDateKey(d)]?.status;
      if (yStatus === "done") {
        streak++;
        d.setDate(d.getDate() - 1);
      } else {
        break;
      }
    } else {
      break;
    }
  }

  return streak;
}

export function calculateBestStreak(entries: Record<string, DayEntry>): number {
  const keys = Object.keys(entries).sort();
  if (keys.length === 0) return 0;

  let best = 0;
  let current = 0;

  for (const key of keys) {
    const status = entries[key]?.status;
    if (status === "done") {
      current++;
      best = Math.max(best, current);
    } else {
      current = 0;
    }
  }

  return best;
}

export function calculateConsistency(
  entries: Record<string, DayEntry>,
  year: number,
  month: number
): number {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const endDay = lastDay < today ? lastDay : today;

  if (firstDay > today) return 0;

  let totalDays = 0;
  let completedDays = 0;

  const current = new Date(firstDay);
  while (current <= endDay) {
    totalDays++;
    const key = formatDateKey(current);
    const status = entries[key]?.status;
    if (status === "done" || status === "partial") {
      completedDays++;
    }
    current.setDate(current.getDate() + 1);
  }

  return totalDays > 0 ? Math.round((completedDays / totalDays) * 100) : 0;
}

export function countPartialWins(entries: Record<string, DayEntry>): number {
  return Object.values(entries).filter((e) => e.status === "partial").length;
}


export function backfillMissedDays(gwe: GoalWithEntries): Record<string, DayEntry> {
  const entries = { ...gwe.entries };
  const createdAt = new Date(gwe.goalData.createdAt);
  createdAt.setHours(0, 0, 0, 0);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const current = new Date(createdAt);
  while (current < today) {
    const key = formatDateKey(current);
    if (!entries[key]) {
      entries[key] = { date: key, status: "missed" };
    }
    current.setDate(current.getDate() + 1);
  }

  return entries;
}

export function countRecentMissedDays(entries: Record<string, DayEntry>): number {
  let count = 0;
  const d = new Date();
  d.setDate(d.getDate() - 1);
  while (true) {
    const key = formatDateKey(d);
    const status = entries[key]?.status;
    if (status === "missed") {
      count++;
      d.setDate(d.getDate() - 1);
    } else {
      break;
    }
  }
  return count;
}

export function shouldShowMotivationPopup(gwe: GoalWithEntries): MotivationContext | null {
  const tKey = todayKey();
  const todayStatus = gwe.entries[tKey]?.status;

  if (todayStatus === "done") {
    const streak = calculateCurrentStreak(gwe.entries);
    if (streak >= 3) return "consistent-streak";
    return null;
  }

  if (!todayStatus || todayStatus === "none") {
    const missedRun = countRecentMissedDays(gwe.entries);
    if (missedRun >= 1) return "returning-after-absence";
    return "unmarked-today";
  }

  return null;
}

export function determineStatus(
  status: "done" | "partial" | "missed",
  _entries: Record<string, DayEntry>,
  _dateKey?: string
): "done" | "partial" | "missed" {
  return status;
}
