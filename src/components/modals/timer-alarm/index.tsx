import * as React from 'react';

import { cn } from '@/lib/utils';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
} from '@/components/ui/alert-dialog';
import { useModalStore } from '@/stores/use-modal-store';
import { useAppSettingsStore } from '@/stores/app-setting-store';
import { EndWorkAlarm } from './end-work-alarm';
import { EndRestAlarm } from './end-rest-alarm';
import { FinishSectionAlarm } from './finish-section-alarm';

export const TimerAlarmDialog = () => {
  const { vibrationEnabled } = useAppSettingsStore(
    (state) => state.appSettings
  );
  const isOpen = useModalStore((state) => state.modals.timerAlarm.isOpen);
  const alarmType =
    useModalStore((state) => state.modals.timerAlarm.data?.alarmType) ||
    'EndWork';
  const closeModal = useModalStore((state) => state.closeModal);

  React.useEffect(() => {
    if (vibrationEnabled) {
      const vibrationPattern = [400, 100, 400, 100];
      window.navigator.vibrate(vibrationPattern);
    }
  }, [vibrationEnabled]);

  const handleConfirmClick = () => {
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
        {alarmType === 'EndWork' ? <EndWorkAlarm /> : null}
        {alarmType === 'EndRest' ? <EndRestAlarm /> : null}
        {alarmType === 'FinishSection' ? <FinishSectionAlarm /> : null}
        <div className="h-1/2 flex items-end">
          <div className="flex justify-center items-start h-1/2">
            <AlertDialogAction
              onClick={handleConfirmClick}
              className={'rounded-3xl py-6 w-40 text-xl'}
            >
              확인
            </AlertDialogAction>
          </div>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
};
