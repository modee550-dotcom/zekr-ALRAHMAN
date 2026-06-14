import { Ionicons } from '@expo/vector-icons';

export type IconName = keyof typeof Ionicons.glyphMap;

export const getCategoryIcon = (category: string): IconName => {
  switch (category) {
    case 'أذكار الصباح':
      return 'sunny';
    case 'أذكار المساء':
      return 'moon';
    case 'أذكار النوم':
      return 'bed';
    case 'أذكار الصلاة':
      return 'person';
    case 'توابج':
      return 'repeat';
    default:
      return 'book';
  }
};
