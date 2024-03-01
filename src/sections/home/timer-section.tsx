import * as React from 'react';
import { PlayIcon, StepForwardIcon } from 'lucide-react';

import { useStartStudyTimerMutation } from '@/apis/mutations/study-timer-mutations';
import { useTimerOptionsStore } from '@/stores/timer-options-store';
import { useTimerStateStore } from '@/stores/timer-state-store';
import { useModalStore } from '@/stores/use-modal-store';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { OpenTimerOptionsButton } from '@/components/modals/timer-options/open-timer-options-button';
import { TimerImage } from './timer-image';

export const TimerSection = () => {
  const { mutate: startStudyTimer } = useStartStudyTimerMutation();
  const openModal = useModalStore((state) => state.openModal);

  const selectedCategory = useTimerOptionsStore(
    (state) => state.selectedCategory
  );
  const timerType = useTimerStateStore((state) => state.timerType);
  const startTimer = useTimerStateStore((state) => state.startTimer);
  const nextTimer = useTimerStateStore((state) => state.nextTimer);

  const timerImageSrc = React.useMemo(() => {
    if (timerType === 'Work') {
      return './fire-1.png';
    } else if (timerType === 'Rest') {
      return './octopus.png';
    } else {
      return './turtle.png';
    }
  }, [timerType]);

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
    <div className="h-2/3 flex-center flex-col">
      <TimerImage src={timerImageSrc} />
      <div className="flex-center h-1/4">
        <OpenTimerOptionsButton />
      </div>
      <div className="flex-center h-1/4 gap-2">
        {timerType !== 'Work' ? (
          <Button
            onClick={nextTimer}
            variant={'ghost'}
            className={cn('p-2 h-auto')}
          >
            <StepForwardIcon className="w-10 h-10" />
          </Button>
        ) : null}
        <Button
          onClick={startAndOpenTimerModal}
          variant={'ghost'}
          className={cn('p-2 h-auto')}
        >
          <PlayIcon className="w-10 h-10" />
        </Button>
      </div>
    </div>
  );
};
