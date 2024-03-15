import * as React from 'react';

import { cn } from '@/lib/utils';
import { useTimerStateStore } from '@/stores/timer-state-store';
import { TimerOption } from './timer-option';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { IsTogetherOption } from './is-together-option';
import { TimerModeOption } from './timer-mode-option';
import { useTimerOptionsStore } from '@/stores/timer-options-store';
import { useAuthStore } from '@/stores/auth-store';

export const UpdateTimerOptionDialog = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const timerMode = useTimerOptionsStore((state) => state.timerMode);
  const checkIsTimerOptionsChanged = useTimerOptionsStore(
    (state) => state.checkIsTimerOptionsChanged
  );
  const saveTimerOptions = useTimerOptionsStore(
    (state) => state.saveTimerOptions
  );
  const initTimer = useTimerStateStore((state) => state.initTimer);
  const [isOpen, setIsOpen] = React.useState(false);

  const handleConfirm = () => {
    if (checkIsTimerOptionsChanged()) {
      initTimer();
      saveTimerOptions();
    }
    setIsOpen(false);
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent
        className={cn(
          `w-full md:max-w-mobile max-h-mobile flex-center flex-col`
        )}
      >
        <AlertDialogHeader className="items-center gap-2">
          <AlertDialogTitle>타이머 설정</AlertDialogTitle>
          <AlertDialogDescription>
            타이머 모드나 시간 설정을 변경하면 진행 중인 뽀모도로 진행도가
            초기화됩니다.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="pb-6 w-full space-y-3">
          <TimerOption
            label="집중 시간"
            optionKey="pomodoroTime"
            disabled={!isLoggedIn || timerMode === 'normal'}
          />
          <TimerOption
            label="집중 횟수"
            optionKey="sectionCount"
            postfix="회"
            disabled={!isLoggedIn || timerMode === 'normal'}
          />
          <TimerOption
            label="쉬는 시간"
            optionKey="restTime"
            disabled={!isLoggedIn || timerMode === 'normal'}
          />
          {/* <TimerOption label="긴 쉬는 시간" optionKey="longRestTime" /> */}
          <IsTogetherOption />
          <TimerModeOption />
        </div>
        <AlertDialogAction onClick={handleConfirm}>확인</AlertDialogAction>
      </AlertDialogContent>
    </AlertDialog>
  );
};
