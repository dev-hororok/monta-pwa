import * as React from 'react';
import { useTimerStateStore } from '@/stores/timer-state-store';
import { useEndStudyTimerMutation } from '@/services/mutations/study-timer-mutations';
import { useModalStore } from '@/stores/use-modal-store';
import { useTimerOptionsStore } from '@/stores/timer-options-store';

export const useTimer = () => {
  const {
    duration,
    isActive,
    timerType,
    targetTime,
    sectionCompleted,
    nextTimer,
    startTimer,
    pauseTimer,
    _updateTimer,
  } = useTimerStateStore();
  const sectionCount = useTimerOptionsStore((state) => state.sectionCount);
  const timerMode = useTimerOptionsStore((state) => state.timerMode);
  const { mutate: endStudyTimer } = useEndStudyTimerMutation();
  const openModal = useModalStore((state) => state.openModal);

  // 백그라운드 처리
  React.useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        pauseTimer();
      } else if (document.visibilityState === 'visible') {
        startTimer();
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () =>
      document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [pauseTimer, startTimer]);

  // 타이머 로직
  React.useEffect(() => {
    if (!isActive) return;
    const interval = setInterval(() => {
      _updateTimer();
    }, 1000);
    return () => clearInterval(interval);
  }, [isActive, duration, _updateTimer]);

  // 뽀모도로 타이머 종료 트리거
  React.useEffect(() => {
    if (timerMode === 'normal') return;

    if (duration < targetTime) return;
    let alarmType = '';
    if (timerType === 'Work') {
      endStudyTimer({ status: 'Completed', duration });
      if (sectionCompleted + 1 === sectionCount) {
        alarmType = 'FinishSection';
      } else {
        alarmType = 'EndWork';
      }
    } else {
      alarmType = 'EndRest';
    }

    openModal('timerAlarm', {
      alarmType: alarmType,
    });
    nextTimer();
  }, [
    timerMode,
    timerType,
    targetTime,
    duration,
    sectionCompleted,
    sectionCount,
    nextTimer,
    endStudyTimer,
    openModal,
  ]);
};
