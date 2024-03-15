import * as React from 'react';

import { cn } from '@/lib/utils';
import { useTimerStateStore } from '@/stores/timer-state-store';
import { useTimerOptionsStore } from '@/stores/timer-options-store';
import { useAuthStore } from '@/stores/auth-store';

interface Props {
  animation?: boolean;
  className?: string;
}

export const TimerImage = React.memo(({ animation, className }: Props) => {
  const timerType = useTimerStateStore((state) => state.timerType);
  const timerMode = useTimerOptionsStore((state) => state.timerMode);
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

  const timerImageSrc = React.useMemo(() => {
    if (!isLoggedIn || timerMode === 'normal' || timerType === 'Work') {
      return './chicken.png';
    } else if (timerType === 'Rest') {
      return './chicken_exhausted.png';
    } else {
      return './chicken_exhausted.png';
    }
  }, [timerType, timerMode, isLoggedIn]);

  return (
    <img
      onContextMenu={(e) => e.preventDefault()}
      loading="eager"
      src={timerImageSrc}
      alt="main-timer"
      className={cn(
        'mx-auto',
        animation ? 'animate-soft-bounce' : null,
        className
      )}
    />
  );
});
