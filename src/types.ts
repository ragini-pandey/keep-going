export type DayStatus = "none" | "done" | "partial" | "missed" | "repaired";

export type GoalData = {
  goal: string;
  why: string;
  dailyMinimum: string;
  createdAt: string;
};

export type DayEntry = {
  date: string;
  status: DayStatus;
  note?: string;
};

export type AppData = {
  goalData: GoalData | null;
  entries: Record<string, DayEntry>;
};

export type CalendarDay = {
  date: Date;
  dateKey: string;
  isCurrentMonth: boolean;
  isToday: boolean;
  isFuture: boolean;
};

export type MotivationContext =
  | "unmarked-today"
  | "missed-yesterday"
  | "comeback"
  | "consistent-streak"
  | "at-risk";
