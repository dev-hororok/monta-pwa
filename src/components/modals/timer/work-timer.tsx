import * as React from 'react';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { TimerDisplay } from './timer-display';
import { InteruptTimerDialog } from './interupt-timer-dialog';

interface WorkTimerProps extends React.HTMLAttributes<HTMLDivElement> {
  classNames?: string;
}

export const WorkTimer = React.memo(
  ({ classNames, ...props }: WorkTimerProps) => {
    return (
      <div className={cn('h-full', classNames)} {...props}>
        <div className={'w-full h-1/2 flex flex-col items-center justify-end'}>
          <img
            onContextMenu={(e) => e.preventDefault()}
            loading="eager"
            src={'./chicken_animation.png'}
            alt="rest-timer"
            className={'w-1/2 aspect-square'}
          />
          <p>목표가 얼마 안남았닭...!</p>
        </div>
        <div className="h-1/2">
          <div className="flex justify-center items-start h-1/2 pt-4">
            <TimerDisplay />
          </div>
          <div className="flex justify-center items-start h-1/2">
            <TimerInteruptButton />
          </div>
        </div>
      </div>
    );
  }
);

const TimerInteruptButton = () => {
  return (
    <InteruptTimerDialog>
      <Button
        type="button"
        variant={'secondary'}
        className={'rounded-3xl py-6 w-40 text-xl'}
      >
        Give up
      </Button>
    </InteruptTimerDialog>
  );
};
