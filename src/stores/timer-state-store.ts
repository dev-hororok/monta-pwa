import { create } from 'zustand';
import { useTimerOptionsStore } from './timer-options-store';

export type TimerType = 'Work' | 'Rest' | 'LongRest';

interface TimerStateStore {
  duration: number;
  isActive: boolean;
  timerType: TimerType;
  sectionCompleted: number;
  targetTime: number;
  startTimer: () => void;
  pauseTimer: () => void;
  interuptTimer: () => void;
  resetTimer: () => void;
  initTimer: () => void;
  _updateTimer: () => void;
}

export const useTimerStateStore = create<TimerStateStore>((set, get) => ({
  duration: 0,
  isActive: false,
  timerType: 'Work',
  sectionCompleted: 0,
  targetTime: useTimerOptionsStore.getState().pomodoroTime * 60,
  startTimer: () => set({ isActive: true }),
  pauseTimer: () => set({ isActive: false }),
  interuptTimer: () => {
    set({
      isActive: false,
      duration: 0,
      targetTime: useTimerOptionsStore.getState().pomodoroTime * 60,
    });
  },
  resetTimer: () => {
    const { pomodoroTime, restTime, longRestTime, sectionCount } =
      useTimerOptionsStore.getState();
    const { timerType, sectionCompleted } = get();

    let newTimerType: TimerType = 'Work';
    let newTargetTime = pomodoroTime * 60;
    let newSectionCompleted = sectionCompleted;

    if (timerType === 'Work') {
      newTimerType = sectionCompleted + 1 < sectionCount ? 'Rest' : 'LongRest';
      newTargetTime =
        newTimerType === 'Rest' ? restTime * 60 : longRestTime * 60;
      newSectionCompleted += 1;
    } else {
      newTimerType = 'Work';
      newTargetTime = pomodoroTime * 60;
      newSectionCompleted = timerType === 'LongRest' ? 0 : sectionCompleted;
    }

    set({
      timerType: newTimerType,
      targetTime: newTargetTime,
      duration: 0,
      isActive: false,
      sectionCompleted: newSectionCompleted,
    });
  },
  initTimer: () => {
    set({
      timerType: 'Work',
      targetTime: useTimerOptionsStore.getState().pomodoroTime * 60,
      duration: 0,
      isActive: false,
      sectionCompleted: 0,
    });
  },
  _updateTimer: () => {
    const { duration, targetTime, isActive } = get();
    if (!isActive || duration >= targetTime) return;
    set({ duration: duration + 1 });
  },
}));
