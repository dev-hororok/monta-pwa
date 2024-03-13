import { useTimerOptionsStore } from '@/stores/timer-options-store';
import { Switch } from '@/components/ui/switch';

export const TimerModeOption = () => {
  const timerMode = useTimerOptionsStore((state) => state.timerMode);
  const toggle = useTimerOptionsStore((state) => state.toggleTimerMode);

  return (
    <div className="flex items-center justify-between">
      <span className="antialiased font-semibold w-1/2">뽀모도로 모드</span>
      <div className="w-1/2 flex-center">
        <Switch
          id="timer-mode"
          onClick={toggle}
          checked={timerMode === 'pomodoro'}
        />
      </div>
    </div>
  );
};
