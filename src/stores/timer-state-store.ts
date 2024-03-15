import { create } from 'zustand';
import { useTimerOptionsStore } from './timer-options-store';
import { persist } from 'zustand/middleware';

export type TimerType = 'Work' | 'Rest';

interface TimerStateStore {
  startTime: number | null; // 타이머를 시작한 시간 (Unix timestamp)
  duration: number; // 타이머 시작 후 경과 시간
  isActive: boolean; // 초마다 타이머를 업데이트할지 여부
  timerType: TimerType;
  sectionCompleted: number; // 타이머를 완료한 카운트
  targetTime: number; // 타이머 목표시간 (seconds)
  startTimer: () => void; // 타이머 시작
  pauseTimer: () => void; // 타이머 일시정지
  interuptTimer: () => void; // 타이머 중지 (공부 타이머로 세팅)
  nextTimer: () => void; // 다음 타이머로 초기화 (목표 시간 완료 시 호출)
  initTimer: () => void; // 타이머 기록 초기화 (타이머 옵션 변경 시 호출)
  _updateTimer: () => void; // 1초 업데이트
}

export const useTimerStateStore = create<TimerStateStore>()(
  persist(
    (set, get) => ({
      startTime: null,
      duration: 0,
      isActive: false,
      timerType: 'Work',
      sectionCompleted: 0,
      targetTime: useTimerOptionsStore.getState().pomodoroTime * 60,
      startTimer: () => {
        const now = Date.now();
        const { startTime } = get();

        if (startTime) {
          const elapsedSeconds = Math.floor((now - startTime) / 1000);
          set({ duration: elapsedSeconds, isActive: true });
          return;
        }
        set({ startTime: now, isActive: true });
      },
      pauseTimer: () => set({ isActive: false }),
      interuptTimer: () => {
        set({
          startTime: null,
          isActive: false,
          duration: 0,
          targetTime: useTimerOptionsStore.getState().pomodoroTime * 60,
        });
      },
      nextTimer: () => {
        const { pomodoroTime, restTime, sectionCount } =
          useTimerOptionsStore.getState();
        const { timerType, sectionCompleted } = get();

        let newTimerType: TimerType = 'Work';
        let newTargetTime = pomodoroTime * 60;
        let newSectionCompleted = sectionCompleted;

        if (timerType === 'Work' && sectionCompleted + 1 < sectionCount) {
          // 휴식 시간
          newTimerType = 'Rest';
          newTargetTime = restTime * 60;
          newSectionCompleted += 1;
        } else if (timerType === 'Work') {
          // 타이머 완료
          newTimerType = 'Work';
          newTargetTime = pomodoroTime * 60;
          newSectionCompleted = 0;
        } else {
          // 공부 시간
          newTimerType = 'Work';
          newTargetTime = pomodoroTime * 60;
        }

        set({
          startTime: null,
          timerType: newTimerType,
          targetTime: newTargetTime,
          duration: 0,
          isActive: false,
          sectionCompleted: newSectionCompleted,
        });
      },
      initTimer: () => {
        set({
          startTime: null,
          timerType: 'Work',
          targetTime: useTimerOptionsStore.getState().pomodoroTime * 60,
          duration: 0,
          isActive: false,
          sectionCompleted: 0,
        });
      },
      _updateTimer: () => {
        const timerMode = useTimerOptionsStore.getState().timerMode;
        const { startTime, isActive, targetTime, duration } = get();
        if (
          !isActive ||
          !startTime ||
          (timerMode === 'pomodoro' && duration === targetTime)
        )
          return;

        const now = Date.now();
        const elapsedSeconds = Math.floor((now - startTime) / 1000);
        const newDuration =
          timerMode === 'pomodoro'
            ? Math.min(elapsedSeconds, targetTime)
            : elapsedSeconds;
        set({ duration: newDuration });
      },
    }),
    {
      name: 'timer-status-storage',
      partialize: (state) => ({
        timerType: state.timerType,
        sectionCompleted: state.sectionCompleted,
        targetTime: state.targetTime,
      }), // persist 할 상태 선택
    }
  )
);
