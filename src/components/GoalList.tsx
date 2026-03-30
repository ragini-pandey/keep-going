import type { GoalWithEntries } from "../types";
import { calculateCurrentStreak } from "../utils";

type Props = {
  goals: GoalWithEntries[];
  selectedGoalId: string | null;
  onSelect: (id: string) => void;
  onAddGoal: () => void;
};

export default function GoalList({ goals, selectedGoalId, onSelect, onAddGoal }: Props) {
  return (
    <div className="bg-bg-card border border-border-subtle rounded-2xl p-4 space-y-2">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-xs font-medium text-text-muted uppercase tracking-wider">
          My Goals
        </h2>
        <button
          onClick={onAddGoal}
          className="text-[11px] text-accent-blue hover:text-accent-blue/80 font-medium px-2 py-1 rounded-lg hover:bg-accent-blue/10 transition-colors cursor-pointer"
        >
          + Add
        </button>
      </div>

      {goals.length === 0 && (
        <p className="text-sm text-text-muted py-4 text-center">No goals yet</p>
      )}

      {goals.map((gwe) => {
        const isActive = gwe.goalData.id === selectedGoalId;
        const streak = calculateCurrentStreak(gwe.entries);
        return (
          <button
            key={gwe.goalData.id}
            onClick={() => onSelect(gwe.goalData.id)}
            className={`w-full text-left rounded-xl px-3.5 py-3 transition-all duration-200 cursor-pointer ${
              isActive
                ? "bg-accent-blue/10 border border-accent-blue/30"
                : "hover:bg-bg-card-hover border border-transparent"
            }`}
          >
            <p className={`text-sm font-medium truncate ${isActive ? "text-text-primary" : "text-text-secondary"}`}>
              {gwe.goalData.goal}
            </p>
            <div className="flex items-center gap-2 mt-1">
              {streak > 0 && (
                <span className="text-[10px] text-accent-green font-medium">
                  🔥 {streak}d streak
                </span>
              )}
              <span className="text-[10px] text-text-muted">
                {gwe.goalData.dailyMinimum}
              </span>
            </div>
          </button>
        );
      })}
    </div>
  );
}
