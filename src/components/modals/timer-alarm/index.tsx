import * as React from 'react';

import { cn } from '@/lib/utils';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { useModalStore } from '@/stores/use-modal-store';
import { useTimerStateStore } from '@/stores/timer-state-store';
import { useAppSettingsStore } from '@/stores/app-setting-store';

const TimerAlarmDialog = () => {
  const { vibrationEnabled } = useAppSettingsStore(
    (state) => state.appSettings
  );
  const isOpen = useModalStore((state) => state.modals.timerAlarm.isOpen);
  const closeModal = useModalStore((state) => state.closeModal);

  const timerType = useTimerStateStore((state) => state.timerState.timerType);

  React.useEffect(() => {
    if (vibrationEnabled) {
      const vibrationPattern = [400, 100, 400, 100];
      window.navigator.vibrate(vibrationPattern);
    }
  }, [vibrationEnabled]);

  const handleOnClick = () => {
    if (vibrationEnabled) window.navigator.vibrate(0);
    closeModal('timerAlarm');
    closeModal('timer');
  };

  return (
    <AlertDialog open={isOpen}>
      <AlertDialogContent
        className={cn(
          `w-full h-screen md:max-w-[416px] md:max-h-[736px] flex flex-col items-center py-safe-offset-14 overflow-y-scroll scrollbar-hide`
        )}
      >
        <AlertDialogTitle>
          {timerType === 'Work'
            ? '쉬는시간 끝!!!'
            : '어디서 맛있는 냄새가 납니다'}
        </AlertDialogTitle>

        {timerType === 'Work' ? (
          <img src="./whale.png" alt="main" className="h-1/2 mx-auto" />
        ) : (
          <img src="./shrimp.png" alt="main" className="h-1/2 mx-auto" />
        )}

        <div className="w-full flex flex-col justify-end h-full gap-2">
          <AlertDialogFooter className="w-full">
            <AlertDialogAction onClick={handleOnClick} className="h-12 w-full">
              확인
            </AlertDialogAction>
          </AlertDialogFooter>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default TimerAlarmDialog;
