import * as React from 'react';

import { useStartStudyTimerMutation } from '@/services/mutations/study-timer-mutations';
import { Button } from '@/components/ui/button';
import { useTimerOptionsStore } from '@/stores/timer-options-store';
import { useTimerStateStore } from '@/stores/timer-state-store';
import { useModalStore } from '@/stores/use-modal-store';

export const StartButton = () => {
  const { mutate: startStudyTimer } = useStartStudyTimerMutation();
  const selectedCategory = useTimerOptionsStore(
    (state) => state.selectedCategory
  );
  const openModal = useModalStore((state) => state.openModal);

  const timerType = useTimerStateStore((state) => state.timerType);
  const startTimer = useTimerStateStore((state) => state.startTimer);

  const startAndOpenTimerModal = React.useCallback(() => {
    if (timerType === 'Work') {
      startStudyTimer({
        category_id: selectedCategory?.study_category_id,
      });
    }
    startTimer();
    openModal('timer');
  }, [openModal, startTimer, startStudyTimer, timerType, selectedCategory]);

  return (
    <Button
      onClick={startAndOpenTimerModal}
      className={'rounded-3xl py-6 w-40 text-xl'}
    >
      Start
    </Button>
  );
};