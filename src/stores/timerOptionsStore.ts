import { IStudyCategory } from '@/models/study.model';
import { create } from 'zustand';

type TimerType = 'Pomodoro' | 'Standard';

interface TimerOptions {
  timerType: TimerType;
  pomodoroTime: number;
  selectedCategory: IStudyCategory | null;
}

interface TimerOptionsStore {
  timerOptions: TimerOptions;
  setTimerOptions: (options: TimerOptions) => void;
}

export const useTimerOptionsStore = create<TimerOptionsStore>()((set) => ({
  timerOptions: {
    timerType: 'Pomodoro',
    pomodoroTime: 25, // 기본 뽀모도로 시간 25분
    selectedCategory: null,
  },
  setTimerOptions: (options) =>
    set(() => ({
      timerOptions: options,
    })),
}));
