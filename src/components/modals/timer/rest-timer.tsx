import * as React from 'react';

import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { formatTime } from '@/lib/date-format';
import { useTimerStateStore } from '@/stores/timer-state-store';
import { useModalStore } from '@/stores/use-modal-store';

interface RestTimerProps extends React.HTMLAttributes<HTMLDivElement> {
  classNames?: string;
}

export const RestTimer = React.memo(
  ({ classNames, ...props }: RestTimerProps) => {
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
          <TimerDisplay />
        </div>
        <div className="flex-center h-1/5">
          <TimerPassButton />
        </div>
      </div>
    );
  }
);

// 타이머 시간 표시
const TimerDisplay = () => {
  const targetTime = useTimerStateStore((state) => state.targetTime);
  const duration = useTimerStateStore((state) => state.duration);
  return (
    <p className="text-7xl text-primary dark:text-foreground antialiased font-semibold">
      {formatTime(targetTime - duration)}
    </p>
  );
};

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
