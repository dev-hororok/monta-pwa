import * as React from 'react';

import { formatTime } from '@/lib/date-format';
import { IMemberInfo } from '.';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/icons';
import { cn } from '@/lib/utils';
import { useTimerStateStore } from '@/stores/timer-state-store';
import { StudyGroupMember } from './study-group-member';
import { useModalStore } from '@/stores/use-modal-store';
import { useAuthStore } from '@/stores/auth-store';

interface StudyGroupTimerProps extends React.HTMLAttributes<HTMLDivElement> {
  classNames?: string;
  members: IMemberInfo[];
}

export const StudyGroupTimer = React.memo(
  ({ classNames, members, ...props }: StudyGroupTimerProps) => {
    const curMemberId = useAuthStore((state) => state.memberId);
    return (
      <div className={cn('h-full', classNames)} {...props}>
        <div className="grid grid-cols-3 grid-rows-3 gap-2 w-full h-3/5 p-4">
          {Array.from({ length: 9 }).map((_, index) => {
            const member = members[index];

            return member ? (
              <StudyGroupMember
                key={member.member_id}
                member={member}
                isCurrentUser={curMemberId === member.member_id}
              />
            ) : (
              <img
                key={`empty-${index}`}
                src="./chair.png"
                alt="빈 자리"
                className="w-full aspect-square"
              />
            );
          })}
        </div>
        <div className="flex-center h-1/5">
          <TimerDisplay />
        </div>
        <div className="flex-center h-1/5">
          <TimerPauseButton />
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

// 타이머 일시정지 후 타이머 종료 확인 모달 열기
const TimerPauseButton = () => {
  const duration = useTimerStateStore((state) => state.duration);
  const startTimer = useTimerStateStore((state) => state.startTimer);
  const openModal = useModalStore((state) => state.openModal);

  const handlePauseClick = () => {
    // pauseTimer();
    openModal('pauseTimer', {
      duration: duration,
      startTimer: startTimer,
    });
  };
  return (
    <Button
      type="button"
      onClick={handlePauseClick}
      variant={'ghost'}
      className={'p-2 h-auto'}
    >
      <Icons.pause className="w-10 h-10" />
    </Button>
  );
};
