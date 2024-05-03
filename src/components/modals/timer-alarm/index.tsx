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
import { useTimerStateStore } from '@/stores/timer-state-store';
import { useTimerOptionsStore } from '@/stores/timer-options-store';
import { useRewardPointMutation } from '@/services/mutations/study-timer-mutations';
import { GiveUpWorkAlarm } from './giveup-work-alarm';

export const TimerAlarmDialog = () => {
  const { vibrationEnabled } = useAppSettingsStore(
    (state) => state.appSettings
  );
  const interuptTimer = useTimerStateStore((state) => state.interuptTimer);
  const { mutate: rewardPoints } = useRewardPointMutation();
  const isOpen = useModalStore((state) => state.modals.timerAlarm.isOpen);
  const alarmType =
    useModalStore((state) => state.modals.timerAlarm.data?.alarmType) ||
    'EndWork';
  const closeModal = useModalStore((state) => state.closeModal);

  const duration = useTimerStateStore((state) => state.duration);
  const pomodoroTime = useTimerOptionsStore((state) => state.pomodoroTime);
  const [earnedPoints, setEarnedPoints] = React.useState(0);

  React.useEffect(() => {
    if (vibrationEnabled) {
      const vibrationPattern = [400, 100, 400, 100];
      window.navigator.vibrate(vibrationPattern);
    }
  }, [vibrationEnabled]);

  // 지급할 포인트 계산
  React.useEffect(() => {
    // 뽀모도로 집중 완료 시
    if (alarmType === 'EndWork') {
      setEarnedPoints(_getPoints(pomodoroTime));
    } else {
      // 그외 집중 시간만큼 포인트 지급
      setEarnedPoints(_getPoints(duration));
    }

    // eslint-disable-next-line
  }, []);

  const handleConfirmClick = () => {
    if (vibrationEnabled) window.navigator.vibrate(0);

    // 타이머 중단 처리 (EndWork는 hook에서 처리됨)
    if (alarmType !== 'EndRest') {
      rewardPoints(duration); // 포인트 지급
      interuptTimer(); // 타이머 중단 & 기록
    }

    closeModal('timerAlarm');
    closeModal('timer');
  };

  const _getPoints = (seconds: number) => {
    return Math.floor(seconds / 60) * 9;
  };

  return (
    <AlertDialog open={isOpen}>
      <AlertDialogContent
        className={cn(
          `w-full h-screen md:max-w-[416px] md:max-h-[736px] flex flex-col items-center py-safe-offset-14 overflow-y-scroll scrollbar-hide`
        )}
      >
        {alarmType === 'EndWork' ? (
          <EndWorkAlarm earnedPoints={earnedPoints} /> // 집중 끝
        ) : null}
        {alarmType === 'GiveUpWork' ? (
          <GiveUpWorkAlarm earnedPoints={earnedPoints} />
        ) : null}
        {alarmType === 'EndRest' ? <EndRestAlarm /> : null}
        {alarmType === 'FinishSection' ? (
          <FinishSectionAlarm earnedPoints={earnedPoints} />
        ) : null}
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
