import { useState, useEffect, useCallback, useMemo } from "react";
import { useAppData } from "./useAppData";
import { backfillMissedDays, shouldShowMotivationPopup, todayKey, determineStatus, getDayStatus, countRecentMissedDays } from "./utils";
import { getMotivationalMessage } from "./messages";
import { fireConfetti } from "./confetti";
import type { GoalData, GoalWithEntries, MotivationContext } from "./types";
import OnboardingForm from "./components/OnboardingForm";
import Header from "./components/Header";
import GoalList from "./components/GoalList";
import GoalCard from "./components/GoalCard";
import CalendarGrid from "./components/CalendarGrid";
import TodayCard from "./components/TodayCard";
import StatsRow from "./components/StatsRow";
import MotivationModal from "./components/MotivationModal";
import EditGoalModal from "./components/EditGoalModal";
import ResetConfirmModal from "./components/ResetConfirmModal";
import DayMarkModal from "./components/DayMarkModal";

export default function App() {
  const { data, updateData } = useAppData();
  const now = new Date();
  const [viewMonth, setViewMonth] = useState(now.getMonth());
  const [viewYear, setViewYear] = useState(now.getFullYear());
  const [showEditModal, setShowEditModal] = useState(false);
  const [showResetModal, setShowResetModal] = useState(false);
  const [showMotivation, setShowMotivation] = useState(false);
  const [motivationMsg, setMotivationMsg] = useState<string | null>(null);
  const [motivationHasAction, setMotivationHasAction] = useState(false);
  const [motivationCtx, setMotivationCtx] = useState<MotivationContext | null>(null);
  const [addingGoal, setAddingGoal] = useState(false);
  const [dayMarkKey, setDayMarkKey] = useState<string | null>(null);

  const activeGoal: GoalWithEntries | null = useMemo(() => {
    if (!data.selectedGoalId) return null;
    return data.goals.find((g) => g.goalData.id === data.selectedGoalId) ?? null;
  }, [data]);

  useEffect(() => {
    if (!activeGoal) return;
    const filled = backfillMissedDays(activeGoal);
    const changed = Object.keys(filled).length !== Object.keys(activeGoal.entries).length;
    if (changed) {
      updateData((prev) => ({
        ...prev,
        goals: prev.goals.map((g) =>
          g.goalData.id === prev.selectedGoalId ? { ...g, entries: filled } : g
        ),
      }));
    }

    const entriesForCheck = changed ? filled : activeGoal.entries;
    const ctx = shouldShowMotivationPopup({ ...activeGoal, entries: entriesForCheck });
    if (ctx) {
      setMotivationMsg(getMotivationalMessage(ctx));
      setMotivationHasAction(ctx === "unmarked-today" || ctx === "missed-yesterday" || ctx === "returning-after-absence");
      setMotivationCtx(ctx);
      setShowMotivation(true);
    }
  }, [activeGoal?.goalData.id]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleSaveGoal = useCallback(
    (goal: GoalData) => {
      updateData((prev) => ({
        ...prev,
        goals: [...prev.goals, { goalData: goal, entries: {} }],
        selectedGoalId: goal.id,
      }));
      setAddingGoal(false);
    },
    [updateData]
  );

  const handleEditSave = useCallback(
    (updated: GoalData) => {
      updateData((prev) => ({
        ...prev,
        goals: prev.goals.map((g) =>
          g.goalData.id === updated.id ? { ...g, goalData: updated } : g
        ),
      }));
      setShowEditModal(false);
    },
    [updateData]
  );

  const handleMark = useCallback(
    (status: "done" | "missed") => {
      if (!activeGoal) return;
      const key = todayKey();
      const finalStatus = determineStatus(status, activeGoal.entries, key);
      updateData((prev) => ({
        ...prev,
        goals: prev.goals.map((g) =>
          g.goalData.id === prev.selectedGoalId
            ? { ...g, entries: { ...g.entries, [key]: { date: key, status: finalStatus } } }
            : g
        ),
      }));
      setShowMotivation(false);
      if (status === "done") fireConfetti();
    },
    [activeGoal, updateData]
  );

  const handleDayMark = useCallback(
    (dateKey: string, status: "done" | "missed") => {
      if (!activeGoal) return;
      const finalStatus = determineStatus(status, activeGoal.entries, dateKey);
      updateData((prev) => ({
        ...prev,
        goals: prev.goals.map((g) =>
          g.goalData.id === prev.selectedGoalId
            ? { ...g, entries: { ...g.entries, [dateKey]: { date: dateKey, status: finalStatus } } }
            : g
        ),
      }));
      setDayMarkKey(null);
      if (status === "done") fireConfetti();
    },
    [activeGoal, updateData]
  );

  const handleDeleteGoal = useCallback(() => {
    updateData((prev) => {
      const remaining = prev.goals.filter((g) => g.goalData.id !== prev.selectedGoalId);
      return {
        ...prev,
        goals: remaining,
        selectedGoalId: remaining.length > 0 ? remaining[0].goalData.id : null,
      };
    });
    setShowResetModal(false);
  }, [updateData]);

  const handlePrevMonth = useCallback(() => {
    setViewMonth((m) => {
      if (m === 0) {
        setViewYear((y) => y - 1);
        return 11;
      }
      return m - 1;
    });
  }, []);

  const handleNextMonth = useCallback(() => {
    setViewMonth((m) => {
      if (m === 11) {
        setViewYear((y) => y + 1);
        return 0;
      }
      return m + 1;
    });
  }, []);

  const handleDayClick = useCallback((dateKey: string) => {
    const today = todayKey();
    if (dateKey < today) {
      setDayMarkKey(dateKey);
    }
  }, []);

  const emotionalMessage = useMemo(() => {
    if (!activeGoal) return null;
    const ctx = shouldShowMotivationPopup(activeGoal);
    return ctx ? getMotivationalMessage(ctx) : null;
  }, [activeGoal]);

  if (data.goals.length === 0 && !addingGoal) {
    return <OnboardingForm onSave={handleSaveGoal} />;
  }

  if (addingGoal) {
    return <OnboardingForm onSave={handleSaveGoal} onCancel={() => setAddingGoal(false)} />;
  }

  if (!activeGoal) return null;

  return (
    <div className="h-screen flex flex-col bg-bg-primary overflow-hidden">
      <Header
        currentMonth={viewMonth}
        currentYear={viewYear}
        onPrev={handlePrevMonth}
        onNext={handleNextMonth}
      />

      <main className="flex-1 min-h-0 px-6 py-6">
        <div className="h-full grid grid-cols-1 lg:grid-cols-[220px_280px_1fr] gap-5">
          <div className="space-y-5 overflow-y-auto min-h-0">
            <GoalList
              goals={data.goals}
              selectedGoalId={data.selectedGoalId}
              onSelect={(id) => updateData((prev) => ({ ...prev, selectedGoalId: id }))}
              onAddGoal={() => setAddingGoal(true)}
            />
          </div>

          <div className="space-y-5 overflow-y-auto min-h-0">
            <GoalCard
              goalData={activeGoal.goalData}
              onEdit={() => setShowEditModal(true)}
              onReset={() => setShowResetModal(true)}
            />
            <TodayCard
              goalData={activeGoal.goalData}
              entries={activeGoal.entries}
              onMark={handleMark}
              emotionalMessage={emotionalMessage}
            />
          </div>

          <div className="flex flex-col min-h-0 gap-5">
            <StatsRow entries={activeGoal.entries} year={viewYear} month={viewMonth} />
            <div className="flex-1 min-h-0">
              <CalendarGrid
                year={viewYear}
                month={viewMonth}
                entries={activeGoal.entries}
                onDayClick={handleDayClick}
              />
            </div>
          </div>
        </div>
      </main>

      {showMotivation && motivationMsg && (
        <MotivationModal
          message={motivationMsg}
          onDismiss={() => setShowMotivation(false)}
          onAction={motivationHasAction ? () => setShowMotivation(false) : undefined}
          actionLabel="Mark Today"
          goalData={motivationCtx === "returning-after-absence" ? activeGoal.goalData : undefined}
          missedDays={motivationCtx === "returning-after-absence" ? countRecentMissedDays(activeGoal.entries) : undefined}
        />
      )}

      {showEditModal && (
        <EditGoalModal
          goalData={activeGoal.goalData}
          onSave={handleEditSave}
          onClose={() => setShowEditModal(false)}
        />
      )}

      {showResetModal && (
        <ResetConfirmModal
          onConfirm={handleDeleteGoal}
          onCancel={() => setShowResetModal(false)}
        />
      )}

      {dayMarkKey && activeGoal && (
        <DayMarkModal
          dateKey={dayMarkKey}
          currentStatus={getDayStatus(dayMarkKey, activeGoal.entries)}
          onMark={(status) => handleDayMark(dayMarkKey, status)}
          onClose={() => setDayMarkKey(null)}
        />
      )}
    </div>
  );
}
