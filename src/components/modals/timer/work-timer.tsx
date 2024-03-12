import * as React from 'react';

import { Icons } from '@/components/icons';
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
            src={'./chicken_2.png'}
            alt="rest-timer"
            className={'w-1/2 aspect-square'}
          />
          <p>닭이 자라고 있습니다...</p>
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
      <Button type="button" variant={'ghost'} className={'p-2 h-auto'}>
        <Icons.pause className="w-10 h-10" />
      </Button>
    </InteruptTimerDialog>
  );
};
