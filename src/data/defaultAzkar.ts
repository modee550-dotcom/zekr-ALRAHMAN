export interface AzkarItem {
  id: string;
  text: string;
  count: number;
  completed: number;
  category: AzkarCategory;
  createdAt: number;
  virtue?: string;
  meaning?: string;
  color?: string;
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
    virtue: 'توبة من الذنوب والمعاصي',
    meaning: 'طلب المغفرة من الله، وهو طلب المغفرة والتوبة',
    color: '#22d3ee',
  },
  {
    id: '2',
    text: 'سُبْحَانَ اللَّهِ',
    count: 33,
    completed: 0,
    category: 'أذكار الصباح',
    createdAt: Date.now(),
    virtue: 'تنزيه الله من كل نقص وعيب',
    meaning: 'تنزيه الله وتسبيحه، وهو تنزيه الله من كل نقص وعيب',
    color: '#fb923c',
  },
  {
    id: '3',
    text: 'الْحَمْدُ لِلَّهِ',
    count: 33,
    completed: 0,
    category: 'أذكار الصباح',
    createdAt: Date.now(),
    virtue: 'الحمد لله على كل حال',
    meaning: 'الحمد لله على كل شيء، وهو الحمد لله على كل النعم',
    color: '#4ade80',
  },
  {
    id: '4',
    text: 'لَا إِلَٰهَ إِلَّا اللَّهُ',
    count: 33,
    completed: 0,
    category: 'أذكار الصباح',
    createdAt: Date.now(),
    virtue: 'الشهادة بالتوحيد',
    meaning: 'الشهادة بأن لا إله إلا الله، وهو التوحيد لله',
    color: '#a855f7',
  },
  // أذكار المساء
  {
    id: '5',
    text: 'أَسْتَغْفِرُ اللَّهَ',
    count: 33,
    completed: 0,
    category: 'أذكار المساء',
    createdAt: Date.now(),
    virtue: 'توبة المساء',
    meaning: 'طلب المغفرة في وقت المساء',
    color: '#22d3ee',
  },
  {
    id: '6',
    text: 'سُبْحَانَ اللَّهِ',
    count: 33,
    completed: 0,
    category: 'أذكار المساء',
    createdAt: Date.now(),
    virtue: 'تنزيه الله مساءً',
    meaning: 'تنزيه الله وتسبيحه في وقت المساء',
    color: '#fb923c',
  },
  {
    id: '7',
    text: 'الْحَمْدُ لِلَّهِ',
    count: 33,
    completed: 0,
    category: 'أذكار المساء',
    createdAt: Date.now(),
    virtue: 'الحمد لله على نعمة المساء',
    meaning: 'الحمد لله على نعمة المساء، وهو الحمد لله على كل النعم',
    color: '#4ade80',
  },
  // أذكار النوم
  {
    id: '8',
    text: 'بِاسْمِكَ اللَّهُمَّ أَمُوتُ وَأَحْيَا',
    count: 1,
    completed: 0,
    category: 'أذكار النوم',
    createdAt: Date.now(),
    virtue: 'الاستعداد للموت والاستعداد للحياة الآخرة',
    meaning: 'قول بسم الله الذي لا ينفع شيء إلا بفضله، ولا يضر شيء إلا بذنبه',
    color: '#a855f7',
  },
  // أذكار الصلاة
  {
    id: '9',
    text: 'سُبْحَانَ اللَّهِ',
    count: 33,
    completed: 0,
    category: 'أذكار الصلاة',
    createdAt: Date.now(),
    virtue: 'تنزيه الله في الصلاة',
    meaning: 'تنزيه الله أثناء الصلاة، وهو تنزيه الله من كل نقص وعيب',
    color: '#fb923c',
  },
  {
    id: '10',
    text: 'الْحَمْدُ لِلَّهِ',
    count: 33,
    completed: 0,
    category: 'أذكار الصلاة',
    createdAt: Date.now(),
    virtue: 'الحمد لله في الصلاة',
    meaning: 'الحمد لله أثناء الصلاة، وهو الحمد لله على كل النعم',
    color: '#4ade80',
  },
  // توابج
  {
    id: '11',
    text: 'لَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ',
    count: 100,
    completed: 0,
    category: 'توابج',
    createdAt: Date.now(),
    virtue: 'اللجوء إلى الله في كل الأمور',
    meaning: 'التوكل على الله والاستعانة به في كل الأمور، وهو لا حول ولا قوة إلا بالله',
    color: '#ec4899',
  },
];
