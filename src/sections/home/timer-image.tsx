import * as React from 'react';

import { cn } from '@/lib/utils';

interface Props {
  src: string;
  animation?: boolean;
}

export const TimerImage = React.memo(({ src, animation }: Props) => {
  return (
    <img
      onContextMenu={(e) => e.preventDefault()}
      loading="eager"
      src={src}
      alt="main-timer"
      className={cn('h-1/2 mx-auto', animation ? 'animate-soft-bounce' : null)}
    />
  );
});
