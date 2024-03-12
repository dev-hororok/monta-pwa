import { useTimerStateStore } from '@/stores/timer-state-store';
import { TimerImage } from './timer-image';
// import { PassButton } from './pass-button';
// import { StartButton } from './start-button';
import { UpdateTimerOptionDialog } from './update-timer-options-dialog';
import { formatTime } from '@/lib/date-format';
import { cn } from '@/lib/utils';
import { PassButton } from './pass-button';
import { StartButton } from './start-button';
import { Button } from '@/components/ui/button';
import { FoodInventoryButton } from './food-inventory-button';
import { TimerSectionCounter } from './timer-section-counter';

interface TimerSectionProps {
  className?: string;
}

export const TimerSection = ({ className }: TimerSectionProps) => {
  const timerType = useTimerStateStore((state) => state.timerType);
  const targetTime = useTimerStateStore((state) => state.targetTime);

  return (
    <div className={cn('flex-center flex-col', className)}>
      <div className="h-2/5 flex justify-center items-end">
        <TimerImage className="w-1/2 aspect-square" />
      </div>

      <div className="h-1/5 flex flex-col items-center justify-start gap-2">
        <UpdateTimerOptionDialog>
          <Button
            variant="ghost"
            className="text-5xl h-auto flex items-center gap-2 tracking-widest"
          >
            {formatTime(targetTime)}
          </Button>
        </UpdateTimerOptionDialog>

        <TimerSectionCounter />
      </div>
      <div className="h-2/5 flex justify-center items-center gap-2">
        {timerType === 'Work' ? <FoodInventoryButton /> : <PassButton />}
        <StartButton />
      </div>
    </div>
  );
};
