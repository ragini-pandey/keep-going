import { useState } from "react";
import type { GoalData } from "../types";

type Props = {
  onSave: (goal: GoalData) => void;
  onCancel?: () => void;
};

export default function OnboardingForm({ onSave, onCancel }: Props) {
  const [goal, setGoal] = useState("");
  const [why, setWhy] = useState("");
  const [dailyMinimum, setDailyMinimum] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!goal.trim() || !why.trim() || !dailyMinimum.trim()) return;
    onSave({
      id: crypto.randomUUID(),
      goal: goal.trim(),
      why: why.trim(),
      dailyMinimum: dailyMinimum.trim(),
      createdAt: new Date().toISOString(),
    });
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-bg-primary">
      <form
        onSubmit={handleSubmit}
        className="animate-fade-in w-full max-w-lg bg-bg-card border border-border-subtle rounded-2xl p-8 shadow-2xl"
      >
        <h1 className="text-3xl font-bold text-text-primary tracking-tight mb-1">
          Keep Going
        </h1>
        <p className="text-text-secondary text-sm mb-8">
          Make this about one goal you don't want to abandon again.
        </p>

        <div className="space-y-5">
          <div>
            <label className="block text-xs font-medium text-text-secondary uppercase tracking-wider mb-2">
              Your Goal
            </label>
            <input
              type="text"
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              placeholder="e.g. Write every day"
              className="w-full bg-bg-secondary border border-border-subtle rounded-xl px-4 py-3 text-text-primary placeholder-text-muted focus:outline-none focus:border-accent-blue transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-text-secondary uppercase tracking-wider mb-2">
              Why This Matters
            </label>
            <textarea
              value={why}
              onChange={(e) => setWhy(e.target.value)}
              placeholder="e.g. I want to become someone who finishes things."
              rows={3}
              className="w-full bg-bg-secondary border border-border-subtle rounded-xl px-4 py-3 text-text-primary placeholder-text-muted focus:outline-none focus:border-accent-blue transition-colors resize-none"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-text-secondary uppercase tracking-wider mb-2">
              Daily Minimum
            </label>
            <input
              type="text"
              value={dailyMinimum}
              onChange={(e) => setDailyMinimum(e.target.value)}
              placeholder="e.g. Write 50 words"
              className="w-full bg-bg-secondary border border-border-subtle rounded-xl px-4 py-3 text-text-primary placeholder-text-muted focus:outline-none focus:border-accent-blue transition-colors"
            />
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-3">
          <button
            type="submit"
            disabled={!goal.trim() || !why.trim() || !dailyMinimum.trim()}
            className="w-full bg-accent-blue hover:bg-accent-blue/90 disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold py-3.5 rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-accent-blue-glow cursor-pointer"
          >
            Start Keeping Going
          </button>
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="w-full py-2.5 rounded-xl text-sm text-text-secondary hover:text-text-primary transition-colors cursor-pointer"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
