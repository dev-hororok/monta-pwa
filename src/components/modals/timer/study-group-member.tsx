import * as React from 'react';

import { IMemberInfo } from '.';
import { useTimerStateStore } from '@/stores/timer-state-store';
import { formatTime } from '@/lib/date-format';
import { cn } from '@/lib/utils';

interface MemberTimerProps {
  member: IMemberInfo;
  isCurrentUser: boolean;
}

export const StudyGroupMember = React.memo(
  ({ member, isCurrentUser }: MemberTimerProps) => {
    return (
      <div className="relative flex-center flex-col cursor-pointer py-2">
        <div className="absolute top-0">
          <MemberTimerDisplay joinedAtUTC={member.joinedAtUTC} />
        </div>
        <img
          src={member.image_url ? member.image_url : '/octopus.png'}
          alt={member.nickname}
          className="w-4/5 aspect-square"
        />
        <span
          className={cn(
            'absolute bottom-1 text-xs antialiased font-semibold',
            isCurrentUser && 'text-primary'
          )}
        >
          {member.nickname}
        </span>
      </div>
    );
  }
);

const MemberTimerDisplay = ({ joinedAtUTC }: { joinedAtUTC: string }) => {
  const startTime = useTimerStateStore((state) => state.startTime);
  const globalDuration = useTimerStateStore((state) => state.duration);
  // 멤버 첫 렌더링 시 현재 유저가 그룹에 참여한 시간을 기준으로 차이 계산 (먼저들어온 유저: + | 나중에 들어온 유저: - )
  const initialElapsedSeconds = React.useMemo(() => {
    if (!startTime) return 0;
    const joinedTimeUTC = new Date(joinedAtUTC).getTime();
    // 내 기준으로 그룹 시작 시간
    return Math.ceil((startTime - joinedTimeUTC) / 1000);
  }, [joinedAtUTC, startTime]);

  // 멤버의 경과 시간에 글로벌 duration(타이머가 가동된 시간)을 더함
  const totalElapsedSeconds = initialElapsedSeconds + globalDuration;
  const formattedElapsedTime = formatTime(totalElapsedSeconds);
  return (
    <span className="text-xs font-semibold text-foreground/70">
      {formattedElapsedTime}
    </span>
  );
};
