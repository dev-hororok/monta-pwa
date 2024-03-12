import { IStudyCategory } from '@/types/models/study.model';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type TimerOptionKey =
  | 'pomodoroTime'
  | 'sectionCount'
  | 'restTime'
  | 'longRestTime';

export const timerOptions: Record<TimerOptionKey, number[]> = {
  pomodoroTime: [0.1, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 90, 120],
  sectionCount: [1, 2, 3, 4, 5, 6, 7, 8],
  restTime: [0.1, 3, 5, 10, 15, 20, 25, 30, 35, 40],
  longRestTime: [3, 5, 10, 15, 20, 25, 30, 35, 40],
};

interface TimerOptionsStore {
  pomodoroTime: number;
  sectionCount: number;
  restTime: number;
  longRestTime: number;
  selectedCategory: IStudyCategory | null;
  setTimerOptions: (options: Partial<Record<TimerOptionKey, number>>) => void;
  setSelectedCategory: (category: IStudyCategory | null) => void;
}

export const useTimerOptionsStore = create<TimerOptionsStore>()(
  persist(
    (set) => ({
      pomodoroTime: 25, // 기본 뽀모도로 시간 25분
      sectionCount: 4, // 기본 섹션 4회
      restTime: 5, // 쉬는시간
      longRestTime: 15, // 긴 쉬는시간
      selectedCategory: null,
      setTimerOptions: (options) =>
        set((state) => ({
          ...state,
          ...options,
        })),
      setSelectedCategory: (category) =>
        set(() => ({
          selectedCategory: category,
        })),
    }),
    {
      name: 'timer-option-storage',
    }
  )
);
