import { useTimerOptionsStore } from '@/stores/timer-options-store';
import { Switch } from '@/components/ui/switch';
import { useRequireLogin } from '@/hooks/use-require-login';
import { useState } from 'react';
import { MobileLoadingSpinner } from '@/components/mobile-loading-spinner';

export const TimerModeOption = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { isLoggedIn, openRequireLoginModal } = useRequireLogin();
  const timerMode = useTimerOptionsStore((state) => state.timerMode);
  const toggle = useTimerOptionsStore((state) => state.toggleTimerMode);

  const handleClick = async () => {
    if (!isLoggedIn) {
      openRequireLoginModal();
      return;
    }
    setIsLoading(true);
    await toggle();
    setIsLoading(false);
  };

  return (
    <>
      {isLoading ? <MobileLoadingSpinner isOveray /> : null}
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
    </>
  );
};
