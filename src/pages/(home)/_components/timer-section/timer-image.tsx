import * as React from 'react';

import { cn } from '@/lib/utils';
import { useTimerStateStore } from '@/stores/timer-state-store';

interface Props {
  animation?: boolean;
  className?: string;
}

export const TimerImage = React.memo(({ animation, className }: Props) => {
  const timerType = useTimerStateStore((state) => state.timerType);

  const timerImageSrc = React.useMemo(() => {
    if (timerType === 'Work') {
      return './chicken_2.png';
    } else if (timerType === 'Rest') {
      return './chicken_1.png';
    } else {
      return './chicken_1.png';
    }
  }, [timerType]);

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
