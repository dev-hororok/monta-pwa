import { formatTime } from '@/lib/date-format';
import { useTimerOptionsStore } from '@/stores/timer-options-store';
import { useTimerStateStore } from '@/stores/timer-state-store';

export const TimerDisplay = () => {
  const timerMode = useTimerOptionsStore((state) => state.timerMode);
  const targetTime = useTimerStateStore((state) => state.targetTime);
  const duration = useTimerStateStore((state) => state.duration);
  return (
    <p className="text-7xl text-primary dark:text-foreground antialiased font-semibold tracking-widest">
      {timerMode === 'normal'
        ? formatTime(duration)
        : formatTime(targetTime - duration)}
    </p>
  );
};
