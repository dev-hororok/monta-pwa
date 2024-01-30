import { StateCreator } from 'zustand';

export interface TimerOptionSlice {
  initialTime: number;
  setInitialTime: (time: number) => void;

  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
}

export const createTimerOptionSlice: StateCreator<TimerOptionSlice> = (
  set
) => ({
  initialTime: 25,
  setInitialTime: (time) => {
    set(() => ({
      initialTime: time,
    }));
  },
  selectedCategory: '공부',
  setSelectedCategory: (category) => {
    set(() => ({
      selectedCategory: category,
    }));
  },
});
