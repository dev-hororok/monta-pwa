import * as React from 'react';
import { useTimerStateStore } from '@/stores/timer-state-store';
import {
  useCancelScheduleTimerMutation,
  useEndStudyTimerMutation,
  useScheduleTimerMutation,
} from '@/services/mutations/study-timer-mutations';
import { useModalStore } from '@/stores/use-modal-store';
import { useTimerOptionsStore } from '@/stores/timer-options-store';

export const useTimer = () => {
  const {
    duration,
    isActive,
    timerType,
    targetTime,
    sectionCompleted,
    startTime,
    nextTimer,
    startTimer,
    pauseTimer,
    _updateTimer,
  } = useTimerStateStore();
  const sectionCount = useTimerOptionsStore((state) => state.sectionCount);
  const timerMode = useTimerOptionsStore((state) => state.timerMode);
  const { mutate: endStudyTimer } = useEndStudyTimerMutation();
  const { mutate: scheduleTimer } = useScheduleTimerMutation();
  const { mutate: cancelTimerSchedule } = useCancelScheduleTimerMutation();
  const openModal = useModalStore((state) => state.openModal);

  // 백그라운드 처리
  // 뽀모도로 모드면 백그라운드 상태일때 푸시알림을 보내야 함
  // 다시 활성화 되면 푸시알림 취소
  React.useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        // 브라우저가 비활성화 당시 뽀모도로 타이머 && 타이머 진행중
        if (timerMode === 'pomodoro' && isActive) {
          scheduleTimer({ timerType, targetSeconds: targetTime - duration });
        }
        pauseTimer();
      } else if (document.visibilityState === 'visible') {
        if (!startTime) return;

        // 활성화 될때 남은시간이 존재하면 푸시알림 취소
        const elapsedSeconds = Math.floor((Date.now() - startTime) / 1000);
        if (timerMode === 'pomodoro' && elapsedSeconds < targetTime) {
          cancelTimerSchedule();
        }
        startTimer();
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () =>
      document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [
    pauseTimer,
    startTimer,
    scheduleTimer,
    cancelTimerSchedule,
    targetTime,
    isActive,
    startTime,
    timerMode,
    timerType,
    duration,
  ]);

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
