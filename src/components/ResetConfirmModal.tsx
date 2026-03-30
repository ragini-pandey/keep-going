type Props = {
  onConfirm: () => void;
  onCancel: () => void;
};

export default function ResetConfirmModal({ onConfirm, onCancel }: Props) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={onCancel}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="animate-scale-in w-full max-w-sm bg-bg-card border border-border-subtle rounded-2xl p-6 shadow-2xl text-center"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-12 h-12 rounded-full bg-accent-red/15 flex items-center justify-center mx-auto mb-4">
          <span className="text-accent-red text-lg">⚠</span>
        </div>

        <h2 className="text-lg font-bold text-text-primary mb-2">Delete This Goal?</h2>
        <p className="text-sm text-text-secondary mb-6">
          This will delete this goal and all its progress. This cannot be undone.
        </p>

        <div className="flex gap-3 justify-center">
          <button
            onClick={onCancel}
            className="px-5 py-2.5 rounded-xl text-sm text-text-secondary hover:text-text-primary bg-bg-secondary border border-border-subtle hover:bg-bg-card-hover transition-colors cursor-pointer"
          >
            Keep My Data
          </button>
          <button
            onClick={onConfirm}
            className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-accent-red hover:bg-accent-red/90 transition-colors cursor-pointer"
          >
            Delete Goal
          </button>
        </div>
      </div>
    </div>
  );
}
