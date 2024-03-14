import * as React from 'react';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useTimerStateStore } from '@/stores/timer-state-store';
import { useModalStore } from '@/stores/use-modal-store';
import { TimerDisplay } from './timer-display';
import { useCancelScheduleTimerMutation } from '@/services/mutations/study-timer-mutations';

interface RestTimerProps extends React.HTMLAttributes<HTMLDivElement> {
  classNames?: string;
}

export const RestTimer = React.memo(
  ({ classNames, ...props }: RestTimerProps) => {
    return (
      <div className={cn('h-full', classNames)} {...props}>
        <div className={'w-full h-1/2 flex flex-col items-center justify-end'}>
          <img
            onContextMenu={(e) => e.preventDefault()}
            loading="eager"
            src={'./chicken_animation_sleep.png'}
            alt="rest-timer"
            className={'w-1/2 aspect-square'}
          />
          <p>닭이 휴식중 입니다...</p>
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

// 뽀모도로 쉬는 시간 타이머 푸시 알림 예약 취소 후 현재 모달 닫기
const TimerPassButton = () => {
  const { mutate: cancelScheduleTimer } = useCancelScheduleTimerMutation();
  const nextTimer = useTimerStateStore((state) => state.nextTimer);
  const closeModal = useModalStore((state) => state.closeModal);

  const handleButtonClick = () => {
    cancelScheduleTimer();
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
