import { useEffect } from 'react';

import { useEndStudyTimerMutation } from '@/apis/mutations/studyTimerMutations';
import { useTimerOptionsStore } from '@/stores/timer-options-store';
import { useTimerStateStore } from '@/stores/timer-state-store';
import { useModalStore } from '@/stores/use-modal-store';

export const useTimer = () => {
  const { pomodoroTime, restTime } = useTimerOptionsStore(
    (state) => state.timerOptions
  );

  const timerState = useTimerStateStore((state) => state.timerState);
  const setTimerState = useTimerStateStore((state) => state.setTimerState);

  const openModal = useModalStore((state) => state.openModal);
  const { mutate: endStudyTimer } = useEndStudyTimerMutation();

  // 타이머 시간
  useEffect(() => {
    if (!timerState.isActive) return;
    const interval = setInterval(() => {
      setTimerState({
        ...timerState,
        duration:
          timerState.duration < timerState.targetTime
            ? timerState.duration + 1
            : timerState.targetTime,
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [timerState, setTimerState]);

  // 타이머 종료 처리
  useEffect(() => {
    if (timerState.duration < timerState.targetTime) return;
    if (timerState.timerType === 'Work') {
      endStudyTimer({ status: 'Completed', duration: timerState.targetTime }); // 공부시간 기록
      setTimerState({
        isActive: false,
        timerType: 'Rest',
        targetTime: restTime * 60,
        duration: 0,
      });

      openModal('timerAlarm'); // 알람 모달 열기
    } else if (
      timerState.timerType === 'Rest' ||
      timerState.timerType === 'LongRest'
    ) {
      setTimerState({
        isActive: false,
        timerType: 'Work',
        targetTime: pomodoroTime * 60,
        duration: 0,
      });

      openModal('timerAlarm'); // 알람 모달 열기
    }
  }, [
    endStudyTimer,
    openModal,
    setTimerState,
    timerState,
    pomodoroTime,
    restTime,
  ]);

  const startTimer = () =>
    setTimerState({
      ...timerState,
      isActive: true,
    });
  const pauseTimer = () =>
    setTimerState({
      ...timerState,
      isActive: false,
    });

  const passRestTime = () => {
    setTimerState({
      timerType: 'Work',
      targetTime: pomodoroTime * 60,
      duration: 0,
      isActive: false,
    });
  };

  return {
    startTimer,
    pauseTimer,
    passRestTime,
  };
};
