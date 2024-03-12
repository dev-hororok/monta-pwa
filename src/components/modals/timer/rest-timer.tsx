import * as React from 'react';

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
        <div className={'w-full h-1/2 flex items-end justify-center'}>
          <img
            onContextMenu={(e) => e.preventDefault()}
            loading="eager"
            src={'./chicken_1.png'}
            alt="rest-timer"
            className={'w-1/2 aspect-square'}
          />
        </div>
        <div className="h-1/2">
          <div className="flex justify-center items-start h-1/2 pt-4">
            <TimerDisplay />
          </div>
          <div className="flex justify-center items-start h-1/2">
            <TimerPassButton />
          </div>
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
      variant={'secondary'}
      className={'rounded-3xl py-6 w-40 text-xl'}
    >
      Skip
    </Button>
  );
};
