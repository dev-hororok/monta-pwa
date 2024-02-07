import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface TimerOptions {
  pomodoroTime: number;
  sectionCount: number;
  restTime: number;
  longRestTime: number;
}

interface TimerOptionsStore {
  timerOptions: TimerOptions;
  setTimerOptions: (options: TimerOptions) => void;
}

export const useTimerOptionsStore = create<TimerOptionsStore>()(
  persist(
    (set) => ({
      timerOptions: {
        pomodoroTime: 25, // 기본 뽀모도로 시간 25분
        sectionCount: 4, // 기본 섹션 4회
        restTime: 5, // 쉬는시간
        longRestTime: 15, // 긴 쉬는시간
      },
      setTimerOptions: (options) =>
        set(() => ({
          timerOptions: options,
        })),
    }),
    {
      name: 'timer-option-storage',
    }
  )
);
