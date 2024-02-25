import * as React from 'react';

import { Button } from '@/components/ui/button';
import { formatTime } from '@/lib/date-format';
import { useTimerStateStore } from '@/stores/timer-state-store';
import { useModalStore } from '@/stores/use-modal-store';

export const OpenTimerOptionsButton = React.memo(() => {
  const targetTime = useTimerStateStore((state) => state.targetTime);
  const openModal = useModalStore((state) => state.openModal);
  const openTimerOptionsModal = () => {
    openModal('timerOptions');
  };
  return (
    <div
      className="flex flex-col items-center gap-2"
      onClick={openTimerOptionsModal}
    >
      <Button variant="ghost" className="text-6xl h-auto">
        {formatTime(targetTime)}
      </Button>
    </div>
  );
});
