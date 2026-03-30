import type { GoalData } from "../types";

type Props = {
  goalData: GoalData;
  onEdit: () => void;
  onReset: () => void;
};

export default function GoalCard({ goalData, onEdit, onReset }: Props) {
  return (
    <div className="bg-bg-card border border-border-subtle rounded-2xl p-5 space-y-4">
      <div className="flex items-start justify-between">
        <h2 className="text-xs font-medium text-text-muted uppercase tracking-wider">
          My Goal
        </h2>
        <div className="flex gap-1.5">
          <button
            onClick={onEdit}
            className="text-[11px] text-text-muted hover:text-accent-blue px-2 py-1 rounded-lg hover:bg-accent-blue/10 transition-colors cursor-pointer"
          >
            Edit
          </button>
          <button
            onClick={onReset}
            className="text-[11px] text-text-muted hover:text-accent-red px-2 py-1 rounded-lg hover:bg-accent-red/10 transition-colors cursor-pointer"
          >
            Reset
          </button>
        </div>
      </div>

      <p className="text-lg font-semibold text-text-primary leading-snug">
        {goalData.goal}
      </p>

      <div>
        <p className="text-[11px] font-medium text-text-muted uppercase tracking-wider mb-1">
          Why this matters
        </p>
        <p className="text-sm text-text-secondary italic leading-relaxed">
          "{goalData.why}"
        </p>
      </div>

      <div>
        <p className="text-[11px] font-medium text-text-muted uppercase tracking-wider mb-1">
          Daily minimum
        </p>
        <p className="text-sm text-accent-green font-medium">
          {goalData.dailyMinimum}
        </p>
      </div>
    </div>
  );
}
