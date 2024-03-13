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

export const UpdateTimerOptionDialog = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const timerMode = useTimerOptionsStore((state) => state.timerMode);
  const initTimer = useTimerStateStore((state) => state.initTimer);
  const [isOpen, setIsOpen] = React.useState(false);

  const handleConfirm = () => {
    initTimer();
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
            타이머 설정을 변경하면 진행 중인 포모도로가 초기화됩니다.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="pb-6 w-full space-y-3">
          <TimerOption
            label="집중 시간"
            optionKey="pomodoroTime"
            disabled={timerMode === 'normal'}
          />
          <TimerOption
            label="집중 횟수"
            optionKey="sectionCount"
            postfix="회"
            disabled={timerMode === 'normal'}
          />
          <TimerOption
            label="쉬는 시간"
            optionKey="restTime"
            disabled={timerMode === 'normal'}
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
