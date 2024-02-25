import { IStudyCategory } from '@/models/study.model';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface TimerOptionsStore {
  pomodoroTime: number;
  sectionCount: number;
  restTime: number;
  longRestTime: number;
  selectedCategory: IStudyCategory | null;
  setTimerOptions: (options: {
    pomodoroTime: number;
    sectionCount: number;
    restTime: number;
    longRestTime: number;
  }) => void;
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
        set(() => ({
          pomodoroTime: options.pomodoroTime,
          sectionCount: options.sectionCount,
          restTime: options.restTime,
          longRestTime: options.longRestTime,
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
