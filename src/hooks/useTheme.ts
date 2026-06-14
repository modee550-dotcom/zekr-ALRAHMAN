import { useColorScheme } from 'react-native';
import { useSettingsStore } from '@/stores/settingsStore';
import { lightTheme, darkTheme, Theme } from '@/theme/colors';

export function useTheme() {
  const systemScheme = useColorScheme();
  const { themeMode } = useSettingsStore();

  let isDark = false;
  
  if (themeMode === 'system') {
    isDark = systemScheme === 'dark';
  } else {
    isDark = themeMode === 'dark';
  }

  const theme: Theme = isDark ? darkTheme : lightTheme;

  return {
    theme,
    isDark,
    themeMode,
  };
}
