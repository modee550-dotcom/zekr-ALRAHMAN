import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

export async function requestNotificationPermissions(): Promise<boolean> {
  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;
  
  if (existingStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }
  
  return finalStatus === 'granted';
}

export async function scheduleDailyReminder(hour: number, minute: number): Promise<void> {
  await Notifications.cancelAllScheduledNotificationsAsync();
  
  await Notifications.scheduleNotificationAsync({
    content: {
      title: 'حصن نفسك 📿',
      body: 'حان وقت أذكارك اليومية! استمر في الذكر فإنها طمأنينة للقلب.',
      sound: true,
    },
    trigger: {
      hour,
      minute,
      repeats: true,
    },
  });
}

export async function scheduleCompletionNotification(): Promise<void> {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: 'أحسنت! 🎉',
      body: 'لقد أكملت وردك اليومي. بارك الله فيك وجزاك خيراً.',
      sound: true,
    },
    trigger: null, // Immediate
  });
}

export function setupNotificationHandler(): void {
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: true,
      shouldShowBanner: true,
      shouldShowList: true,
    }),
  });
}

export function parseTime(timeString: string): { hour: number; minute: number } {
  const parts = timeString.split(':');
  return {
    hour: parseInt(parts[0]) || 6,
    minute: parseInt(parts[1]) || 0,
  };
}
