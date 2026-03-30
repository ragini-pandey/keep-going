import type { GoalData } from "../types";

type Props = {
  message: string;
  onDismiss: () => void;
  onAction?: () => void;
  actionLabel?: string;
  goalData?: GoalData;
  missedDays?: number;
};

export default function MotivationModal({ message, onDismiss, onAction, actionLabel, goalData, missedDays }: Props) {
  const isReturnFlow = !!goalData;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={onDismiss}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="animate-scale-in w-full max-w-md bg-bg-card border border-border-subtle rounded-2xl p-8 shadow-2xl text-center"
        onClick={(e) => e.stopPropagation()}
      >
        <div className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-5 ${isReturnFlow ? "bg-accent-cyan/20" : "bg-accent-blue/20"}`}>
          <span className={`text-xl ${isReturnFlow ? "text-accent-cyan" : "text-accent-blue"}`}>
            {isReturnFlow ? "↩" : "✦"}
          </span>
        </div>

        {isReturnFlow && missedDays && (
          <p className="text-xs text-text-muted uppercase tracking-wider mb-3">
            {missedDays} day{missedDays > 1 ? "s" : ""} away
          </p>
        )}

        <p className="text-lg text-text-primary font-medium leading-relaxed mb-6 italic">
          "{message}"
        </p>

        {isReturnFlow && goalData && (
          <div className="bg-bg-secondary rounded-xl p-4 mb-6 text-left space-y-2">
            <p className="text-xs text-text-muted uppercase tracking-wider">Remember why you started</p>
            <p className="text-sm font-semibold text-text-primary">{goalData.goal}</p>
            <p className="text-sm text-text-secondary italic">"{goalData.why}"</p>
          </div>
        )}

        <div className="flex gap-3 justify-center">
          <button
            onClick={onDismiss}
            className="px-5 py-2.5 rounded-xl text-sm text-text-secondary hover:text-text-primary bg-bg-secondary border border-border-subtle hover:bg-bg-card-hover transition-colors cursor-pointer"
          >
            Dismiss
          </button>
          {onAction && (
            <button
              onClick={onAction}
              className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-accent-blue hover:bg-accent-blue/90 transition-colors shadow-lg shadow-accent-blue-glow cursor-pointer"
            >
              {actionLabel ?? "Let's Go"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
