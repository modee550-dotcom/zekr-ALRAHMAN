import { Tabs } from 'expo-router';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '@/hooks/useTheme';
import { Ionicons } from '@expo/vector-icons';

function TabIcon({ name, color, size, focused }: { name: string; color: string; size: number; focused: boolean }) {
  return (
    <View style={[styles.iconContainer, focused && { backgroundColor: color + '20' }]}>
      <Ionicons name={name as any} size={size} color={color} />
    </View>
  );
}

export default function TabLayout() {
  const { theme, isDark } = useTheme();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: theme.tabBg,
          borderTopColor: theme.border,
          borderTopWidth: 1,
          height: 80,
          paddingBottom: 20,
          paddingTop: 10,
        },
        tabBarActiveTintColor: theme.tabActive,
        tabBarInactiveTintColor: theme.tabInactive,
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600',
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'الأذكار',
          tabBarIcon: ({ color, size, focused }) => (
            <TabIcon name="book" color={color} size={size} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="stats"
        options={{
          title: 'الإحصائيات',
          tabBarIcon: ({ color, size, focused }) => (
            <TabIcon name="stats-chart" color={color} size={size} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="names"
        options={{
          title: 'أسماء الله',
          tabBarIcon: ({ color, size, focused }) => (
            <TabIcon name="star" color={color} size={size} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'الإعدادات',
          tabBarIcon: ({ color, size, focused }) => (
            <TabIcon name="settings" color={color} size={size} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="diary"
        options={{
          title: 'الدفتر السري',
          tabBarIcon: ({ color, size, focused }) => (
            <TabIcon name="lock-closed" color={color} size={size} focused={focused} />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  iconContainer: {
    borderRadius: 12,
    padding: 6,
  },
});
