import { create } from 'zustand';

export interface DiaryEntry {
  id: string;
  text: string;
  createdAt: number;
  updatedAt: number;
}

interface DiaryState {
  entries: DiaryEntry[];
  addEntry: (text: string) => void;
  editEntry: (id: string, text: string) => void;
  deleteEntry: (id: string) => void;
}

export const useDiaryStore = create<DiaryState>((set) => ({
  entries: [],
  
  addEntry: (text) =>
    set((state) => ({
      entries: [
        {
          id: Date.now().toString(),
          text,
          createdAt: Date.now(),
          updatedAt: Date.now(),
        },
        ...state.entries,
      ],
    })),
    
  editEntry: (id, text) =>
    set((state) => ({
      entries: state.entries.map((entry) =>
        entry.id === id ? { ...entry, text, updatedAt: Date.now() } : entry
      ),
    })),
    
  deleteEntry: (id) =>
    set((state) => ({
      entries: state.entries.filter((entry) => entry.id !== id),
    })),
}));
