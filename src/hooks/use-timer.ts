import * as React from 'react';
import { useTimerStateStore } from '@/stores/timer-state-store';
import { useEndStudyTimerMutation } from '@/services/mutations/study-timer-mutations';
import { useModalStore } from '@/stores/use-modal-store';

export const useTimer = () => {
  const {
    duration,
    isActive,
    timerType,
    targetTime,
    nextTimer,
    startTimer,
    pauseTimer,
    _updateTimer,
  } = useTimerStateStore();
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

  // 타이머 종료상황
  React.useEffect(() => {
    if (duration < targetTime) return;
    if (timerType === 'Work') {
      endStudyTimer({ status: 'Completed', duration });
    }
    nextTimer();
    openModal('timerAlarm');
  }, [timerType, targetTime, duration, nextTimer, endStudyTimer, openModal]);
};
