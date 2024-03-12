import * as React from 'react';

import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useTimerStateStore } from '@/stores/timer-state-store';
import { useModalStore } from '@/stores/use-modal-store';
import { TimerDisplay } from './timer-display';

interface RestTimerProps extends React.HTMLAttributes<HTMLDivElement> {
  classNames?: string;
}

export const RestTimer = React.memo(
  ({ classNames, ...props }: RestTimerProps) => {
    return (
      <div className={cn('h-full', classNames)} {...props}>
        <div className={'w-full h-3/5 flex items-end justify-center'}>
          <img
            onContextMenu={(e) => e.preventDefault()}
            loading="eager"
            src={'./chicken_1.png'}
            alt="rest-timer"
            className={'w-1/2 aspect-square'}
          />
        </div>
        <div className="flex-center h-1/5">
          <TimerDisplay />
        </div>
        <div className="flex-center h-1/5">
          <TimerPassButton />
        </div>
      </div>
    );
  }
);

// 쉬는 시간 타이머 생략 후 현재 모달 닫기
const TimerPassButton = () => {
  const nextTimer = useTimerStateStore((state) => state.nextTimer);
  const closeModal = useModalStore((state) => state.closeModal);

  const handleButtonClick = () => {
    nextTimer();
    closeModal('timer');
  };
  return (
    <Button
      type="button"
      onClick={handleButtonClick}
      variant={'ghost'}
      className={'p-2 h-auto'}
    >
      <Icons.pause className="w-10 h-10" />
    </Button>
  );
};
