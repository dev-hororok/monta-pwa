import * as React from 'react';

import { cn } from '@/lib/utils';
import { type TimerType, useTimerStateStore } from '@/stores/timer-state-store';
import { useTimerOptionsStore } from '@/stores/timer-options-store';
import { useAuthStore } from '@/stores/auth-store';
import { CHARACTER_CHATS } from '@/constants/character-chat';

interface Props {
  className?: string;
}

export const TimerImage = React.memo(({ className }: Props) => {
  const timerType = useTimerStateStore((state) => state.timerType);
  const timerMode = useTimerOptionsStore((state) => state.timerMode);
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

  const showImageType = React.useMemo<TimerType | 'Visitor' | 'Normal'>(() => {
    if (!isLoggedIn) {
      return 'Visitor';
    } else if (timerMode === 'normal') {
      return 'Normal';
    } else if (timerType === 'Work') {
      return 'Work';
    } else {
      return 'Rest';
    }
  }, [isLoggedIn, timerMode, timerType]);

  const timerImageSrc = React.useMemo(() => {
    if (showImageType === 'Work') {
      return './chicken.png';
    } else if (showImageType === 'Rest') {
      return './chicken_exhausted.png';
    } else {
      // Visitor | Normal
      return './chicken.png';
    }
  }, [showImageType]);

  const [message, setMessage] = React.useState('');

  // 메시지를 변경하는 함수
  const changeMessage = React.useCallback(() => {
    const modeMessages = CHARACTER_CHATS[showImageType] || [];
    if (modeMessages.length > 0) {
      const randomIndex = Math.floor(Math.random() * modeMessages.length);
      setMessage(modeMessages[randomIndex]);
    }
  }, [showImageType]);

  // 이미지 클릭 시 메시지 변경
  const handleClick = () => {
    if (message !== '') return; // 연타 방지
    changeMessage();
    setTimeout(() => setMessage(''), 2000); // 2초 후 메시지 숨김
  };

  // 10초마다 메시지 자동 변경
  React.useEffect(() => {
    const intervalId = setInterval(() => {
      changeMessage();
      setTimeout(() => setMessage(''), 4000); // 2초 후 메시지 숨김
    }, 10000);
    return () => clearInterval(intervalId);
  }, [changeMessage]);

  return (
    <div className="relative">
      <img
        onContextMenu={(e) => e.preventDefault()}
        loading="eager"
        fetchpriority="high"
        src={timerImageSrc}
        alt="main-timer"
        onClick={handleClick}
        className={cn('mx-auto cursor-pointer', className)}
      />
      <Message message={message} />
    </div>
  );
});

const Message = ({ message }: { message: string }) => {
  if (!message) return null;

  return <p className="absolute top-0 right-1/2">{message}</p>;
};
