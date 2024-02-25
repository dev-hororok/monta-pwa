import * as React from 'react';
import { io } from 'socket.io-client';

import { useTimer } from '@/hooks/use-timer';
import { useModalStore } from '@/stores/use-modal-store';
import { useTimerStateStore } from '@/stores/timer-state-store';
import { API_URL_NEST } from '@/constants/constants';
import useBoundStore from '@/stores/use-bound-store';
import type { IMember } from '@/models/member.model';
import { StudyGroupTimer } from './study-group-timer';
import { RestTimer } from './rest-timer';

export interface IMemberInfo {
  member_id: IMember['member_id'];
  image_url: IMember['image_url'];
  nickname: IMember['nickname'];
  joinedAtUTC: string; // utc Date
}

const TimerModal = () => {
  const accessToken = useBoundStore((state) => state.tokens.accessToken);
  const { pauseTimer, startTimer, passRestTime } = useTimer();
  const { duration, timerType } = useTimerStateStore(
    (state) => state.timerState
  );

  const openModal = useModalStore((state) => state.openModal);
  const closeModal = useModalStore((state) => state.closeModal);

  // 타이머 일시정지 후 타이머 종료 확인 모달 열기
  const onClickPauseHandler = () => {
    pauseTimer();
    openModal('pauseTimer', {
      duration: duration,
      startTimer: startTimer,
    });
  };

  // 쉬는 시간 타이머 생략 후 현재 모달 닫기
  const onClickCloseHandler = () => {
    passRestTime();
    closeModal('timer');
  };

  // 유저 목록 상태
  const [members, setMembers] = React.useState<IMemberInfo[]>([]);

  React.useEffect(() => {
    if (timerType !== 'Work') return;
    const socket = io(API_URL_NEST);

    socket.on('connect', () => {
      socket.emit('joinGroup', { jwtToken: accessToken });
    });
    socket.on('groupInfo', (data) => {
      setMembers(data.members);
    });
    socket.on('newMember', (data) => {
      setMembers((members) => [...members, data]);
    });
    socket.on('memberLeft', (data) => {
      setMembers((members) =>
        members.filter((m) => data.memberId !== m.member_id)
      );
    });

    return () => {
      socket.close();
    };
  }, [accessToken, timerType]);
  return (
    <div className="absolute top-0 z-40 w-full h-full md:max-w-mobile md:max-h-mobile md:rounded-md bg-[#DAE3E1] dark:bg-background">
      <div className="rounded-t-md rounded-b-3xl pt-safe-offset-4 h-full pb-safe">
        <main className="h-full overflow-y-scroll scrollbar-hide">
          {timerType === 'Work' ? (
            <StudyGroupTimer onClick={onClickPauseHandler} members={members} />
          ) : null}
          {timerType === 'Rest' || timerType === 'LongRest' ? (
            <RestTimer onClick={onClickCloseHandler} />
          ) : null}
        </main>
      </div>
    </div>
  );
};

export default TimerModal;
