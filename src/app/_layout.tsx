import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { View, I18nManager } from 'react-native';
import { useTheme } from '@/hooks/useTheme';
import { setupNotificationHandler } from '@/utils/notifications';
import '../global.css';

// Force RTL for Arabic
I18nManager.allowRTL(true);
I18nManager.forceRTL(true);

export default function RootLayout() {
  const { theme, isDark } = useTheme();

  useEffect(() => {
    setupNotificationHandler();
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: theme.background }}>
      <StatusBar style={isDark ? 'light' : 'dark'} />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: theme.background },
        }}
      />
    </View>
  );
}
