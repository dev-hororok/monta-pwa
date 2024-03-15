import { useTimerOptionsStore } from '@/stores/timer-options-store';
import { Switch } from '@/components/ui/switch';
import { useRequireLogin } from '@/hooks/use-require-login';

export const TimerModeOption = () => {
  const { isLoggedIn, openRequireLoginModal } = useRequireLogin();
  const timerMode = useTimerOptionsStore((state) => state.timerMode);
  const toggle = useTimerOptionsStore((state) => state.toggleTimerMode);

  const handleClick = () => {
    if (!isLoggedIn) {
      openRequireLoginModal();
      return;
    }
    toggle();
  };

  return (
    <div className="flex items-center justify-between">
      <span className="antialiased font-semibold w-1/2">뽀모도로 모드</span>
      <div className="w-1/2 flex-center">
        <Switch
          id="timer-mode"
          onClick={handleClick}
          checked={isLoggedIn ? timerMode === 'pomodoro' : false}
        />
      </div>
    </div>
  );
};
