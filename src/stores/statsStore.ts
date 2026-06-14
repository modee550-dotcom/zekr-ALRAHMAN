import { create } from 'zustand';

export interface DayStats {
  date: string;
  completed: number;
  target: number;
  percentage: number;
}

interface StatsState {
  totalRecitations: number;
  daysActive: number;
  streak: number;
  weekData: DayStats[];
  gender: 'ذكر' | 'أنثى';
  ageGroup: 'طفل' | 'بالغ' | 'كبير';
  region: string;
  targetCount: number;
  lastActiveDate: string | null;
  
  setGender: (gender: 'ذكر' | 'أنثى') => void;
  setAgeGroup: (ageGroup: 'طفل' | 'بالغ' | 'كبير') => void;
  setRegion: (region: string) => void;
  setTargetCount: (count: number) => void;
  incrementRecitations: (count: number) => void;
  updateStats: (completedToday: number, target: number) => void;
}

const getDayName = (dateStr: string): string => {
  const date = new Date(dateStr);
  const days = ['الأحد', 'الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'];
  return days[date.getDay()];
};

const generateInitialWeekData = (): DayStats[] => {
  const weekData: DayStats[] = [];
  const today = new Date();
  const startOfWeek = new Date(today);
  startOfWeek.setDate(today.getDate() - today.getDay());
  
  for (let i = 0; i < 7; i++) {
    const date = new Date(startOfWeek);
    date.setDate(startOfWeek.getDate() + i);
    const dateStr = date.toISOString().split('T')[0];
    weekData.push({
      date: dateStr,
      completed: 0,
      target: 33,
      percentage: 0,
    });
  }
  return weekData;
};

export const useStatsStore = create<StatsState>((set, get) => ({
  totalRecitations: 0,
  daysActive: 1,
  streak: 1,
  weekData: generateInitialWeekData(),
  gender: 'ذكر',
  ageGroup: 'بالغ',
  region: '',
  targetCount: 33,
  lastActiveDate: new Date().toISOString().split('T')[0],
  
  setGender: (gender) => set({ gender }),
  setAgeGroup: (ageGroup) => set({ ageGroup }),
  setRegion: (region) => set({ region }),
  setTargetCount: (count) => set({ targetCount: count }),
  
  incrementRecitations: (count) =>
    set((state) => ({
      totalRecitations: state.totalRecitations + count,
    })),
    
  updateStats: (completedToday, target) =>
    set((state) => {
      const today = new Date().toISOString().split('T')[0];
      const percentage = target > 0 ? Math.min(100, Math.round((completedToday / target) * 100)) : 0;
      
      const weekData = state.weekData.map((day) =>
        day.date === today
          ? { ...day, completed: completedToday, target, percentage }
          : day
      );
      
      const newStreak = completedToday >= target ? state.streak + 1 : 1;
      
      return {
        weekData,
        totalRecitations: state.totalRecitations + completedToday,
        lastActiveDate: today,
        daysActive: state.lastActiveDate !== today ? state.daysActive + 1 : state.daysActive,
        streak: newStreak,
      };
    }),
}));
