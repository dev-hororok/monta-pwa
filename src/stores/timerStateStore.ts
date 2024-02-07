import { IStudyCategory } from '@/models/study.model';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type TimerType = 'Work' | 'Rest' | 'LongRest';

interface TimerState {
  targetTime: number; // 목표 시간
  duration: number; // 지속 시간 (초)
  isActive: boolean;
  timerType: TimerType;
}

interface TimerStateStore {
  selectedCategory: IStudyCategory | null;
  timerState: TimerState;
  setTimerState: (state: TimerState) => void;
  setSelectedCategory: (category: IStudyCategory | null) => void;
}

export const useTimerStateStore = create<TimerStateStore>()(
  persist(
    (set) => ({
      selectedCategory: null,
      timerState: {
        targetTime: 0,
        timerType: 'Work',
        duration: 0, // 타이머 지속시간
        isActive: false,
      },
      setTimerState: (state) =>
        set(() => ({
          timerState: state,
        })),
      setSelectedCategory: (category) =>
        set(() => ({
          selectedCategory: category,
        })),
    }),
    {
      name: 'timer-state-storage',
      partialize: (state) => ({
        selectedCategory: state.selectedCategory,
        timerState: {
          timerType: state.timerState.timerType,
        },
      }),
    }
  )
);
