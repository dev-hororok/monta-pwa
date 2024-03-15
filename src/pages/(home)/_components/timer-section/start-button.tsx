import * as React from 'react';

import { useStartStudyTimerMutation } from '@/services/mutations/study-timer-mutations';
import { Button } from '@/components/ui/button';
import { useTimerStateStore } from '@/stores/timer-state-store';
import { useModalStore } from '@/stores/use-modal-store';
import { useRequireLogin } from '@/hooks/use-require-login';

export const StartButton = () => {
  const { isLoggedIn, openRequireLoginModal } = useRequireLogin();
  const { mutate: startStudyTimer } = useStartStudyTimerMutation();

  const openModal = useModalStore((state) => state.openModal);

  const timerType = useTimerStateStore((state) => state.timerType);
  const startTimer = useTimerStateStore((state) => state.startTimer);

  const startAndOpenTimerModal = React.useCallback(() => {
    if (!isLoggedIn) {
      openRequireLoginModal();
      return;
    }

    // 공부 시간은 서버에 기록
    if (timerType === 'Work') {
      startStudyTimer();
    }
    startTimer();
    openModal('timer');
  }, [
    openModal,
    startTimer,
    startStudyTimer,
    timerType,
    isLoggedIn,
    openRequireLoginModal,
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
