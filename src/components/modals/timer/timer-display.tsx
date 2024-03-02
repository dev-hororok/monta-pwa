import { formatTime } from '@/lib/date-format';
import { useTimerStateStore } from '@/stores/timer-state-store';

export const TimerDisplay = () => {
  const targetTime = useTimerStateStore((state) => state.targetTime);
  const duration = useTimerStateStore((state) => state.duration);
  return (
    <p className="text-7xl text-primary dark:text-foreground antialiased font-semibold">
      {formatTime(targetTime - duration)}
    </p>
  );
};
