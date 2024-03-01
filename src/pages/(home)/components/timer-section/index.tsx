import { useTimerStateStore } from '@/stores/timer-state-store';
import { TimerImage } from './timer-image';
import { PassButton } from './pass-button';
import { StartButton } from './start-button';
import { UpdateTimerOptionDialog } from './update-timer-options-dialog';
import { Button } from '@/components/ui/button';
import { formatTime } from '@/lib/date-format';
import { cn } from '@/lib/utils';

interface TimerSectionProps {
  className?: string;
}

export const TimerSection = ({ className }: TimerSectionProps) => {
  const timerType = useTimerStateStore((state) => state.timerType);
  const targetTime = useTimerStateStore((state) => state.targetTime);

  return (
    <div className={cn('flex-center flex-col', className)}>
      <TimerImage className="h-1/2" />
      <div className="flex-center h-1/4">
        <UpdateTimerOptionDialog>
          <Button variant="ghost" className="text-6xl h-auto">
            {formatTime(targetTime)}
          </Button>
        </UpdateTimerOptionDialog>
      </div>
      <div className="flex-center h-1/4 gap-2">
        {timerType !== 'Work' ? <PassButton /> : null}
        <StartButton />
      </div>
    </div>
  );
};
