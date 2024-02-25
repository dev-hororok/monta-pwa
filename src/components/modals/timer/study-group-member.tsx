import * as React from 'react';

import { IMemberInfo } from '.';

interface MemberTimerProps {
  member: IMemberInfo;
}

export const StudyGroupMember = ({ member }: MemberTimerProps) => {
  const [elapsedTime, setElapsedTime] = React.useState('');

  React.useEffect(() => {
    const updateElapsedTime = () => {
      setElapsedTime(calculateElapsedTime(member.joinedAtUTC));
    };

    updateElapsedTime(); // 초기 렌더링 시 경과 시간 계산
    const intervalId = setInterval(updateElapsedTime, 1000); // 1초마다 경과 시간 업데이트

    return () => clearInterval(intervalId); // 컴포넌트 언마운트 시 인터벌 정리
  }, [member.joinedAtUTC]);

  return (
    <div className="relative flex-center flex-col hover:bg-accent cursor-pointer py-2">
      <span className="absolute top-1 text-xs font-semibold text-foreground/70">
        {elapsedTime}
      </span>
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
};

const calculateElapsedTime = (joinedAtUTC: string) => {
  const now = new Date().getTime(); // 현재 시간 타임스탬프 (밀리초)
  const joinedTime = new Date(joinedAtUTC).getTime(); // 멤버의 입장 시간 타임스탬프 (밀리초)
  const differenceInSeconds = Math.floor((now - joinedTime) / 1000);
  const hours = Math.floor(differenceInSeconds / 3600);
  const minutes = Math.floor((differenceInSeconds % 3600) / 60);
  const seconds = differenceInSeconds % 60;

  return `${hours.toString().padStart(2, '0')}:${minutes
    .toString()
    .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
};
