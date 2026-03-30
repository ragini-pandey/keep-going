import { useState, useEffect } from "react";

type Props = {
  currentMonth: number;
  currentYear: number;
  onPrev: () => void;
  onNext: () => void;
};

const monthNames = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

function getInitialTheme(): "dark" | "light" {
  try {
    const stored = localStorage.getItem("keep-going-theme");
    if (stored === "light" || stored === "dark") return stored;
  } catch { /* ignore */ }
  return "dark";
}

export default function Header({ currentMonth, currentYear, onPrev, onNext }: Props) {
  const [theme, setTheme] = useState<"dark" | "light">(getInitialTheme);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("keep-going-theme", theme);
  }, [theme]);

  const toggleTheme = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

  return (
    <header className="flex items-center justify-between px-6 py-4 border-b border-border-subtle bg-bg-secondary/50 backdrop-blur-sm">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-accent-green/20 flex items-center justify-center">
          <span className="text-accent-green font-bold text-sm">✓</span>
        </div>
        <div>
          <h1 className="text-lg font-bold text-text-primary tracking-tight leading-tight">
            Keep Going
          </h1>
          <p className="text-[11px] text-text-muted tracking-wide">
            Consistency beats motivation
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={toggleTheme}
          className="w-8 h-8 rounded-lg bg-bg-card border border-border-subtle flex items-center justify-center text-text-secondary hover:text-text-primary hover:bg-bg-card-hover transition-colors cursor-pointer"
          aria-label="Toggle theme"
        >
          {theme === "dark" ? "☀" : "☾"}
        </button>
        <button
          onClick={onPrev}
          className="w-8 h-8 rounded-lg bg-bg-card border border-border-subtle flex items-center justify-center text-text-secondary hover:text-text-primary hover:bg-bg-card-hover transition-colors cursor-pointer"
          aria-label="Previous month"
        >
          ‹
        </button>
        <span className="text-sm font-medium text-text-primary min-w-[140px] text-center">
          {monthNames[currentMonth]} {currentYear}
        </span>
        <button
          onClick={onNext}
          className="w-8 h-8 rounded-lg bg-bg-card border border-border-subtle flex items-center justify-center text-text-secondary hover:text-text-primary hover:bg-bg-card-hover transition-colors cursor-pointer"
          aria-label="Next month"
        >
          ›
        </button>
      </div>
    </header>
  );
}
