import { StateCreator } from 'zustand';

export interface TimerSlice {
  startTime: number | null; // 타이머 시작 시간 (milliseconds)
  duration: number; // 지속 시간 (초)
  updateTimer: () => void;
  resetTimer: () => void;
}

export const createTimerSlice: StateCreator<TimerSlice> = (set) => ({
  startTime: 25,
  duration: 0,

  startTimer: () => {
    set(() => ({
      startTime: new Date().getTime(),
    }));
  },
  updateTimer: () => {
    set((state) => ({
      duration: state.duration + 1,
    }));
  },
  resetTimer: () => set({ startTime: null, duration: 0 }),
});
