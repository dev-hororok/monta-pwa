import * as React from 'react';
import { XIcon } from 'lucide-react';
import { PauseIcon } from '@radix-ui/react-icons';
import { io } from 'socket.io-client';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useTimer } from '@/hooks/use-timer';
import { useModalStore } from '@/stores/use-modal-store';
import { useTimerStateStore } from '@/stores/timer-state-store';
import { cn } from '@/lib/utils';
import { formatTime } from '@/lib/date-format';
import TimerImage from '@/sections/home/timer-image';
import { API_URL_NEST } from '@/constants/constants';
import useBoundStore from '@/stores/use-bound-store';
import type { IMember } from '@/models/member.model';
import { StudyGroup } from './study-group';

export interface IMemberInfo {
  member_id: IMember['member_id'];
  image_url: IMember['image_url'];
  nickname: IMember['nickname'];
}

const TimerModal = () => {
  const accessToken = useBoundStore((state) => state.tokens.accessToken);
  const { pauseTimer, startTimer, passRestTime } = useTimer();
  const openModal = useModalStore((state) => state.openModal);
  const closeModal = useModalStore((state) => state.closeModal);
  const timerState = useTimerStateStore((state) => state.timerState);
  const selectedCategory = useTimerStateStore(
    (state) => state.selectedCategory
  );
  const timerType = useTimerStateStore((state) => state.timerState.timerType);

  const timerImageSrc = React.useMemo(() => {
    if (timerType === 'Rest') {
      return './octopus.png';
    } else {
      return './turtle.png';
    }
  }, [timerType]);

  const onClickPauseHandler = () => {
    openModal('pauseTimer', {
      duration: timerState.duration,
      startTimer: startTimer,
    });
    pauseTimer();
  };

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
          {timerType === 'Work' ? <StudyGroup members={members} /> : null}
          {timerType !== 'Work' ? (
            <TimerImage src={timerImageSrc} animation />
          ) : null}

          <div className="flex flex-col items-center justify-center pt-4 h-1/5 gap-4">
            {timerType === 'Rest' ? (
              <p className="text-center">쉬는중..</p>
            ) : null}
            {timerType === 'LongRest' ? (
              <p className="text-center">겁나 쉬는중..</p>
            ) : null}
            <p className="text-7xl text-primary dark:text-foreground antialiased font-semibold">
              {formatTime(timerState.targetTime - timerState.duration)}
            </p>
            {timerType === 'Work' ? (
              <Badge>
                {selectedCategory ? selectedCategory.subject : '선택 안함'}
              </Badge>
            ) : null}
          </div>
          <div className="flex items-center justify-center py-10 h-1/5">
            {timerType === 'Work' ? (
              <Button
                type="button"
                onClick={onClickPauseHandler}
                variant={'ghost'}
                className={cn('p-2 h-auto')}
              >
                <PauseIcon className="w-10 h-10" />
              </Button>
            ) : (
              <Button
                type="button"
                onClick={onClickCloseHandler}
                variant={'ghost'}
                className={cn('p-2 h-auto')}
              >
                <XIcon className="w-10 h-10" />
              </Button>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default TimerModal;
