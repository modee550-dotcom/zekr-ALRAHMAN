export interface AzkarItem {
  id: string;
  text: string;
  count: number;
  completed: number;
  category: AzkarCategory;
  createdAt: number;
}

export type AzkarCategory = 
  | 'أذكار الصباح' 
  | 'أذكار المساء' 
  | 'أذكار النوم' 
  | 'أذكار الصلاة' 
  | 'توابج';

export const defaultAzkar: AzkarItem[] = [
  // أذكار الصباح
  {
    id: '1',
    text: 'أَسْتَغْفِرُ اللَّهَ',
    count: 33,
    completed: 0,
    category: 'أذكار الصباح',
    createdAt: Date.now(),
  },
  {
    id: '2',
    text: 'سُبْحَانَ اللَّهِ',
    count: 33,
    completed: 0,
    category: 'أذكار الصباح',
    createdAt: Date.now(),
  },
  {
    id: '3',
    text: 'الْحَمْدُ لِلَّهِ',
    count: 33,
    completed: 0,
    category: 'أذكار الصباح',
    createdAt: Date.now(),
  },
  {
    id: '4',
    text: 'لَا إِلَٰهَ إِلَّا اللَّهُ',
    count: 33,
    completed: 0,
    category: 'أذكار الصباح',
    createdAt: Date.now(),
  },
  // أذكار المساء
  {
    id: '5',
    text: 'أَسْتَغْفِرُ اللَّهَ',
    count: 33,
    completed: 0,
    category: 'أذكار المساء',
    createdAt: Date.now(),
  },
  {
    id: '6',
    text: 'سُبْحَانَ اللَّهِ',
    count: 33,
    completed: 0,
    category: 'أذكار المساء',
    createdAt: Date.now(),
  },
  {
    id: '7',
    text: 'الْحَمْدُ لِلَّهِ',
    count: 33,
    completed: 0,
    category: 'أذكار المساء',
    createdAt: Date.now(),
  },
  // أذكار النوم
  {
    id: '8',
    text: 'بِاسْمِكَ اللَّهُمَّ أَمُوتُ وَأَحْيَا',
    count: 1,
    completed: 0,
    category: 'أذكار النوم',
    createdAt: Date.now(),
  },
  // أذكار الصلاة
  {
    id: '9',
    text: 'سُبْحَانَ اللَّهِ',
    count: 33,
    completed: 0,
    category: 'أذكار الصلاة',
    createdAt: Date.now(),
  },
  {
    id: '10',
    text: 'الْحَمْدُ لِلَّهِ',
    count: 33,
    completed: 0,
    category: 'أذكار الصلاة',
    createdAt: Date.now(),
  },
  // توابج
  {
    id: '11',
    text: 'لَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ',
    count: 100,
    completed: 0,
    category: 'توابج',
    createdAt: Date.now(),
  },
];
