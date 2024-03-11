import * as React from 'react';

import { useStartStudyTimerMutation } from '@/services/mutations/study-timer-mutations';
import { Icons } from '@/components/icons';
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
      variant={'ghost'}
      className={'p-2 h-auto'}
    >
      <Icons.play className="w-10 h-10" />
    </Button>
  );
};
