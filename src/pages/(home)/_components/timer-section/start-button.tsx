import * as React from 'react';

import {
  useScheduleTimerMutation,
  useStartStudyTimerMutation,
} from '@/services/mutations/study-timer-mutations';
import { Button } from '@/components/ui/button';
import { useTimerStateStore } from '@/stores/timer-state-store';
import { useModalStore } from '@/stores/use-modal-store';
import { useTimerOptionsStore } from '@/stores/timer-options-store';

export const StartButton = () => {
  const { mutate: startStudyTimer } = useStartStudyTimerMutation();
  const { mutate: scheduleTimer } = useScheduleTimerMutation();

  const openModal = useModalStore((state) => state.openModal);

  const timerMode = useTimerOptionsStore((state) => state.timerMode);
  const timerType = useTimerStateStore((state) => state.timerType);
  const startTimer = useTimerStateStore((state) => state.startTimer);
  const targetTime = useTimerStateStore((state) => state.targetTime);

  const startAndOpenTimerModal = React.useCallback(() => {
    // 공부 시간은 서버에 기록
    if (timerType === 'Work') {
      startStudyTimer();
    }
    // 뽀모도로 모드면 targetTime에 맞춰 푸시 알람 예약
    if (timerMode === 'pomodoro') {
      scheduleTimer({ timerType: timerType, targetSeconds: targetTime });
    }
    startTimer();
    openModal('timer');
  }, [
    openModal,
    startTimer,
    startStudyTimer,
    scheduleTimer,
    timerType,
    timerMode,
    targetTime,
  ]);

  return (
    <Button
      onClick={startAndOpenTimerModal}
      className={'rounded-3xl py-6 w-40 text-xl'}
    >
      Start
    </Button>
  );
};
