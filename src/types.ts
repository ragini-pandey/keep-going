export type DayStatus = "none" | "done" | "missed";

export type GoalData = {
  id: string;
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

export type GoalWithEntries = {
  goalData: GoalData;
  entries: Record<string, DayEntry>;
};

export type AppData = {
  goals: GoalWithEntries[];
  selectedGoalId: string | null;
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
  | "consistent-streak"
  | "at-risk"
  | "returning-after-absence";
