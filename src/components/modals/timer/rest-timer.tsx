import * as React from 'react';
import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { formatTime } from '@/lib/date-format';
import { useTimerStateStore } from '@/stores/timer-state-store';

interface RestTimerProps extends React.HTMLAttributes<HTMLDivElement> {
  classNames?: string;
  onClick: () => void;
}

export const RestTimer = ({
  classNames,
  onClick,
  ...props
}: RestTimerProps) => {
  const timerState = useTimerStateStore((state) => state.timerState);

  return (
    <div className={cn('h-full', classNames)} {...props}>
      <img
        onContextMenu={(e) => e.preventDefault()}
        loading="eager"
        src={'./octopus.png'}
        alt="rest-timer"
        className={'h-3/5 mx-auto animate-soft-bounce'}
      />
      <div className="flex-center h-1/5">
        <p className="text-7xl text-primary dark:text-foreground antialiased font-semibold">
          {formatTime(timerState.targetTime - timerState.duration)}
        </p>
      </div>
      <div className="flex-center h-1/5">
        <Button
          type="button"
          variant="ghost"
          onClick={onClick}
          className={'p-2 h-auto'}
        >
          <Icons.close className="w-10 h-10" />
        </Button>
      </div>
    </div>
  );
};
