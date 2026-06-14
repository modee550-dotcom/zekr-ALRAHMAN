import { create } from 'zustand';
import { defaultAzkar, AzkarItem, AzkarCategory } from '@/data/defaultAzkar';

interface AdhkarState {
  azkar: AzkarItem[];
  selectedCategory: AzkarCategory;
  setAzkar: (azkar: AzkarItem[]) => void;
  setSelectedCategory: (category: AzkarCategory) => void;
  increment: (id: string) => void;
  decrement: (id: string) => void;
  resetAzkar: (id: string) => void;
  resetAllAzkar: () => void;
  addAzkar: (text: string, count: number, category: AzkarCategory) => void;
  editAzkar: (id: string, text: string, count: number) => void;
  deleteAzkar: (id: string) => void;
  importAzkar: (items: Omit<AzkarItem, 'id' | 'createdAt'>[]) => void;
}

export const useAdhkarStore = create<AdhkarState>((set) => ({
  azkar: defaultAzkar,
  selectedCategory: 'أذكار الصباح',
  
  setAzkar: (azkar) => set({ azkar }),
  setSelectedCategory: (category) => set({ selectedCategory: category }),
  
  increment: (id) =>
    set((state) => ({
      azkar: state.azkar.map((item) =>
        item.id === id && item.completed < item.count
          ? { ...item, completed: item.completed + 1 }
          : item
      ),
    })),
    
  decrement: (id) =>
    set((state) => ({
      azkar: state.azkar.map((item) =>
        item.id === id && item.completed > 0
          ? { ...item, completed: item.completed - 1 }
          : item
      ),
    })),
    
  resetAzkar: (id) =>
    set((state) => ({
      azkar: state.azkar.map((item) =>
        item.id === id ? { ...item, completed: 0 } : item
      ),
    })),
    
  resetAllAzkar: () =>
    set((state) => ({
      azkar: state.azkar.map((item) => ({ ...item, completed: 0 })),
    })),
    
  addAzkar: (text, count, category) =>
    set((state) => ({
      azkar: [
        ...state.azkar,
        {
          id: Date.now().toString(),
          text,
          count,
          completed: 0,
          category,
          createdAt: Date.now(),
        },
      ],
    })),
    
  editAzkar: (id, text, count) =>
    set((state) => ({
      azkar: state.azkar.map((item) =>
        item.id === id ? { ...item, text, count } : item
      ),
    })),
    
  deleteAzkar: (id) =>
    set((state) => ({
      azkar: state.azkar.filter((item) => item.id !== id),
    })),
    
  importAzkar: (items) =>
    set((state) => ({
      azkar: [
        ...state.azkar,
        ...items.map((item, idx) => ({
          ...item,
          id: `imported-${Date.now()}-${idx}`,
          createdAt: Date.now(),
        })),
      ],
    })),
}));
