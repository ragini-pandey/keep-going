import { useState } from "react";
import type { GoalData } from "../types";

type Props = {
  goalData: GoalData;
  onSave: (updated: GoalData) => void;
  onClose: () => void;
};

export default function EditGoalModal({ goalData, onSave, onClose }: Props) {
  const [goal, setGoal] = useState(goalData.goal);
  const [why, setWhy] = useState(goalData.why);
  const [dailyMinimum, setDailyMinimum] = useState(goalData.dailyMinimum);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!goal.trim() || !why.trim() || !dailyMinimum.trim()) return;
    onSave({
      ...goalData,
      goal: goal.trim(),
      why: why.trim(),
      dailyMinimum: dailyMinimum.trim(),
    });
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <form
        onSubmit={handleSubmit}
        className="animate-scale-in w-full max-w-lg bg-bg-card border border-border-subtle rounded-2xl p-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-lg font-bold text-text-primary mb-5">Edit Goal</h2>

        <div className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-text-secondary uppercase tracking-wider mb-1.5">
              Goal
            </label>
            <input
              type="text"
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              className="w-full bg-bg-secondary border border-border-subtle rounded-xl px-4 py-2.5 text-text-primary placeholder-text-muted focus:outline-none focus:border-accent-blue transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-text-secondary uppercase tracking-wider mb-1.5">
              Why This Matters
            </label>
            <textarea
              value={why}
              onChange={(e) => setWhy(e.target.value)}
              rows={3}
              className="w-full bg-bg-secondary border border-border-subtle rounded-xl px-4 py-2.5 text-text-primary placeholder-text-muted focus:outline-none focus:border-accent-blue transition-colors resize-none"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-text-secondary uppercase tracking-wider mb-1.5">
              Daily Minimum
            </label>
            <input
              type="text"
              value={dailyMinimum}
              onChange={(e) => setDailyMinimum(e.target.value)}
              className="w-full bg-bg-secondary border border-border-subtle rounded-xl px-4 py-2.5 text-text-primary placeholder-text-muted focus:outline-none focus:border-accent-blue transition-colors"
            />
          </div>
        </div>

        <div className="flex gap-3 mt-6 justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl text-sm text-text-secondary hover:text-text-primary bg-bg-secondary border border-border-subtle hover:bg-bg-card-hover transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={!goal.trim() || !why.trim() || !dailyMinimum.trim()}
            className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-accent-blue hover:bg-accent-blue/90 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}
