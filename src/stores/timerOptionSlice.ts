import { IStudyCategory } from '@/models/study.model';
import { StateCreator } from 'zustand';

export interface TimerOptionSlice {
  initialTime: number; // 초
  setInitialTime: (minutes: number) => void;

  selectedCategory: IStudyCategory | null;
  setSelectedCategory: (category: IStudyCategory | null) => void;
}

export const createTimerOptionSlice: StateCreator<TimerOptionSlice> = (
  set
) => ({
  initialTime: 25 * 60,
  setInitialTime: (time) => {
    set(() => ({
      initialTime: time,
    }));
  },
  selectedCategory: null,
  setSelectedCategory: (category) => {
    set(() => ({
      selectedCategory: category,
    }));
  },
});
