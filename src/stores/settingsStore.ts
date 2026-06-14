import { create } from 'zustand';

export type ThemeMode = 'system' | 'light' | 'dark';
export type AppTheme = 'night-city' | 'desert-sunrise' | 'ocean-dusk';

interface SettingsState {
  themeMode: ThemeMode;
  appTheme: AppTheme;
  soundEnabled: boolean;
  vibrationEnabled: boolean;
  notificationsEnabled: boolean;
  notificationTime: string;
  pinCode: string | null;
  isDiaryUnlocked: boolean;
  
  setThemeMode: (mode: ThemeMode) => void;
  setAppTheme: (theme: AppTheme) => void;
  setSoundEnabled: (enabled: boolean) => void;
  setVibrationEnabled: (enabled: boolean) => void;
  setNotificationsEnabled: (enabled: boolean) => void;
  setNotificationTime: (time: string) => void;
  setPinCode: (pin: string | null) => void;
  setIsDiaryUnlocked: (unlocked: boolean) => void;
}

export const useSettingsStore = create<SettingsState>((set) => ({
  themeMode: 'dark',
  appTheme: 'night-city',
  soundEnabled: true,
  vibrationEnabled: true,
  notificationsEnabled: true,
  notificationTime: '06:00',
  pinCode: null,
  isDiaryUnlocked: false,
  
  setThemeMode: (mode) => set({ themeMode: mode }),
  setAppTheme: (theme) => set({ appTheme: theme }),
  setSoundEnabled: (enabled) => set({ soundEnabled: enabled }),
  setVibrationEnabled: (enabled) => set({ vibrationEnabled: enabled }),
  setNotificationsEnabled: (enabled) => set({ notificationsEnabled: enabled }),
  setNotificationTime: (time) => set({ notificationTime: time }),
  setPinCode: (pin) => set({ pinCode: pin }),
  setIsDiaryUnlocked: (unlocked) => set({ isDiaryUnlocked: unlocked }),
}));
