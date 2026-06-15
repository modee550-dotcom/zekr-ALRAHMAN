import { create } from 'zustand';

export type ThemeMode = 'system' | 'light' | 'dark';
export type AppTheme = 'night-city' | 'desert-sunrise' | 'ocean-dusk' | 'custom';
export type HardwareCounterMode = 'disabled' | 'volume-up' | 'volume-down' | 'both';

interface SettingsState {
  themeMode: ThemeMode;
  appTheme: AppTheme;
  soundEnabled: boolean;
  vibrationEnabled: boolean;
  notificationsEnabled: boolean;
  notificationTime: string;
  pinCode: string | null;
  isDiaryUnlocked: boolean;
  fontScale: number;
  hardwareCounterMode: HardwareCounterMode;
  bluetoothHeadsetEnabled: boolean;
  wallpaperUri: string | null;
  
  setThemeMode: (mode: ThemeMode) => void;
  setAppTheme: (theme: AppTheme) => void;
  setSoundEnabled: (enabled: boolean) => void;
  setVibrationEnabled: (enabled: boolean) => void;
  setNotificationsEnabled: (enabled: boolean) => void;
  setNotificationTime: (time: string) => void;
  setPinCode: (pin: string | null) => void;
  setIsDiaryUnlocked: (unlocked: boolean) => void;
  setFontScale: (scale: number) => void;
  setHardwareCounterMode: (mode: HardwareCounterMode) => void;
  setBluetoothHeadsetEnabled: (enabled: boolean) => void;
  setWallpaperUri: (uri: string | null) => void;
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
  fontScale: 1.0,
  hardwareCounterMode: 'disabled',
  bluetoothHeadsetEnabled: false,
  wallpaperUri: null,
  
  setThemeMode: (mode) => set({ themeMode: mode }),
  setAppTheme: (theme) => set({ appTheme: theme }),
  setSoundEnabled: (enabled) => set({ soundEnabled: enabled }),
  setVibrationEnabled: (enabled) => set({ vibrationEnabled: enabled }),
  setNotificationsEnabled: (enabled) => set({ notificationsEnabled: enabled }),
  setNotificationTime: (time) => set({ notificationTime: time }),
  setPinCode: (pin) => set({ pinCode: pin }),
  setIsDiaryUnlocked: (unlocked) => set({ isDiaryUnlocked: unlocked }),
  setFontScale: (scale) => set({ fontScale: scale }),
  setHardwareCounterMode: (mode) => set({ hardwareCounterMode: mode }),
  setBluetoothHeadsetEnabled: (enabled) => set({ bluetoothHeadsetEnabled: enabled }),
  setWallpaperUri: (uri) => set({ wallpaperUri: uri }),
}));
