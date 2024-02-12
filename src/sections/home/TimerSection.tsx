import { useStartStudyTimerMutation } from '@/apis/mutations/studyTimerMutations';
import { useTimerOptionsStore } from '@/stores/timer-options-store';
import { useTimerStateStore } from '@/stores/timer-state-store';
import { useModalStore } from '@/stores/use-modal-store';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { PlayIcon, StepForwardIcon } from 'lucide-react';
import { useMemo } from 'react';
import { TimerImage } from './TimerImage';
import OpenTimerOptionsButton from '@/components/modals/timer-options/open-timer-options-button';

export const TimerSection = () => {
  const { mutate: startStudyTimer } = useStartStudyTimerMutation();
  const openModal = useModalStore((state) => state.openModal);
  const selectedCategory = useTimerStateStore(
    (state) => state.selectedCategory
  );
  const timerOptions = useTimerOptionsStore((state) => state.timerOptions);
  const timerState = useTimerStateStore((state) => state.timerState);
  const setTimerState = useTimerStateStore((state) => state.setTimerState);
  const timerType = useTimerStateStore((state) => state.timerState.timerType);

  const timerImageSrc = useMemo(() => {
    if (timerType === 'Work') {
      return './fire.png';
    } else if (timerType === 'Rest') {
      return './octopus.png';
    } else {
      return './turtle.png';
    }
  }, [timerType]);

  const targetTime = useMemo(() => {
    if (timerType === 'Work') {
      return timerOptions.pomodoroTime * 60;
    } else if (timerType === 'Rest') {
      return timerOptions.restTime * 60;
    } else {
      return timerOptions.longRestTime * 60;
    }
  }, [timerType, timerOptions]);

  const startAndOpenTimerModal = () => {
    if (timerType === 'Work') {
      startStudyTimer({ category_id: selectedCategory?.study_category_id });
    }

    setTimerState({
      timerType: timerState.timerType,
      targetTime: targetTime,
      duration: 0,
      isActive: true,
    });
    openModal('timer');
  };

  const passRestTime = () => {
    setTimerState({
      timerType: 'Work',
      targetTime: timerOptions.pomodoroTime * 60,
      duration: 0,
      isActive: false,
    });
  };

  return (
    <div className="h-2/3 flex flex-col justify-center items-center">
      <TimerImage src={timerImageSrc} />
      <div className="flex items-center justify-center h-1/4">
        <OpenTimerOptionsButton targetTime={targetTime} />
      </div>
      <div className="flex items-center justify-center h-1/4 gap-2">
        {timerType !== 'Work' ? (
          <Button
            onClick={passRestTime}
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
