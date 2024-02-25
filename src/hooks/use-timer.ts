import * as React from 'react';
import { useTimerStateStore } from '@/stores/timer-state-store';
import { useEndStudyTimerMutation } from '@/apis/mutations/study-timer-mutations';
import { useModalStore } from '@/stores/use-modal-store';

export const useTimer = () => {
  const {
    duration,
    isActive,
    timerType,
    targetTime,
    resetTimer,
    _updateTimer,
  } = useTimerStateStore();
  const { mutate: endStudyTimer } = useEndStudyTimerMutation();
  const openModal = useModalStore((state) => state.openModal);

  // 타이머 로직
  React.useEffect(() => {
    if (!isActive) return;
    const interval = setInterval(() => {
      _updateTimer();
    }, 1000);
    return () => clearInterval(interval);
  }, [isActive, duration, _updateTimer]);

  React.useEffect(() => {
    if (duration < targetTime) return;
    if (timerType === 'Work') {
      endStudyTimer({ status: 'Completed', duration });
    }
    resetTimer();
    openModal('timerAlarm');
  }, [timerType, targetTime, duration, resetTimer, endStudyTimer, openModal]);
};
