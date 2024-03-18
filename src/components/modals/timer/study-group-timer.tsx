import * as React from 'react';

import { IMemberInfo } from '.';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { StudyGroupMember } from './study-group-member';
import { useAuthStore } from '@/stores/auth-store';
import { TimerDisplay } from './timer-display';
import { InteruptTimerDialog } from './interupt-timer-dialog';
import { timerIcons } from '@/components/icons';

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
                src={timerIcons.emptySpace}
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
          <TimerInteruptButton />
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
