import { create } from 'zustand';
import { namesOfAllah, AllahName } from '@/data/namesOfAllah';

interface NameStatsState {
  names: AllahName[];
  getTodayKey: () => string;
  getWeekKey: () => string;
  incrementName: (id: number) => void;
  resetName: (id: number) => void;
  updateName: (id: number, updates: Partial<AllahName>) => void;
}

export const useNameStatsStore = create<NameStatsState>((set, get) => ({
  names: namesOfAllah.map(n => ({ ...n })),

  getTodayKey: () => {
    const d = new Date();
    return `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
  },

  getWeekKey: () => {
    const now = new Date();
    const startOfWeek = new Date(now);
    startOfWeek.setDate(now.getDate() - now.getDay());
    return startOfWeek.toISOString().split('T')[0];
  },

  incrementName: (id) =>
    set((state) => ({
      names: state.names.map((name) =>
        name.id === id
          ? {
              ...name,
              dailyCount: name.dailyCount + 1,
              weeklyCount: name.weeklyCount + 1,
              totalCount: name.totalCount + 1,
              lastUsed: Date.now(),
            }
          : name
      ),
    })),

  resetName: (id) =>
    set((state) => ({
      names: state.names.map((name) =>
        name.id === id
          ? { ...name, dailyCount: 0, weeklyCount: 0 }
          : name
      ),
    })),

  updateName: (id, updates) =>
    set((state) => ({
      names: state.names.map((name) =>
        name.id === id ? { ...name, ...updates } : name
      ),
    })),
}));
