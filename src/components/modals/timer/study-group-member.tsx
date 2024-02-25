import * as React from 'react';

import { IMemberInfo } from '.';
import { useTimerStateStore } from '@/stores/timer-state-store';
import { formatTime } from '@/lib/date-format';

interface MemberTimerProps {
  member: IMemberInfo;
}

export const StudyGroupMember = React.memo(({ member }: MemberTimerProps) => {
  return (
    <div className="relative flex-center flex-col hover:bg-accent cursor-pointer py-2">
      <div className="absolute top-1">
        <TimerDisplay joinedAtUTC={member.joinedAtUTC} />
      </div>
      <img
        src={member.image_url}
        alt={member.nickname}
        className="w-4/5 aspect-square"
      />
      <span className="absolute bottom-1 text-sm antialiased font-semibold">
        {member.nickname}
      </span>
    </div>
  );
});

const TimerDisplay = ({ joinedAtUTC }: { joinedAtUTC: string }) => {
  const globalDuration = useTimerStateStore((state) => state.duration);
  // 멤버 첫 렌더링 시 현재시간을 기준으로 공부시간 계산
  const initialElapsedSeconds = React.useMemo(() => {
    // 내 기준으로 그룹 시작 시간
    const groupStartTimeUTC = new Date().getTime() - globalDuration * 1000;
    const joinedTimeUTC = new Date(joinedAtUTC).getTime();
    return Math.floor((groupStartTimeUTC - joinedTimeUTC) / 1000);
  }, [joinedAtUTC]);

  // 멤버의 경과 시간에 글로벌 duration(타이머가 가동된 시간)을 더함
  const totalElapsedSeconds = initialElapsedSeconds + globalDuration;
  const formattedElapsedTime = formatTime(totalElapsedSeconds);
  return (
    <span className="text-xs font-semibold text-foreground/70">
      {formattedElapsedTime}
    </span>
  );
};
