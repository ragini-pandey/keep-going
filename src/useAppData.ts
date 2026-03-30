import { useState, useEffect, useCallback } from "react";
import type { AppData } from "./types";
import { STORAGE_KEY } from "./constants";

const defaultData: AppData = {
  goals: [],
  selectedGoalId: null,
};

function migrateData(raw: unknown): AppData {
  const obj = raw as Record<string, unknown>;
  if (obj && "goalData" in obj && obj.goalData && !("goals" in obj)) {
    const legacy = obj as { goalData: Record<string, unknown>; entries: Record<string, unknown> };
    const id = crypto.randomUUID();
    return {
      goals: [
        {
          goalData: { id, ...legacy.goalData } as AppData["goals"][0]["goalData"],
          entries: (legacy.entries ?? {}) as AppData["goals"][0]["entries"],
        },
      ],
      selectedGoalId: id,
    };
  }
  return obj as AppData;
}

function loadData(): AppData {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      return migrateData(JSON.parse(raw));
    }
  } catch {
    // corrupted data — start fresh
  }
  return defaultData;
}

function saveData(data: AppData): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function useAppData() {
  const [data, setData] = useState<AppData>(loadData);

  useEffect(() => {
    saveData(data);
  }, [data]);

  const updateData = useCallback((updater: (prev: AppData) => AppData) => {
    setData((prev) => {
      const next = updater(prev);
      return next;
    });
  }, []);

  const resetAll = useCallback(() => {
    setData(defaultData);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  return { data, updateData, resetAll };
}
