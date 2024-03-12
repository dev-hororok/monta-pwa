import * as React from 'react';

import { cn } from '@/lib/utils';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { useEndStudyTimerMutation } from '@/services/mutations/study-timer-mutations';
import { AlertDialogDescription } from '@radix-ui/react-alert-dialog';
import { formatTime } from '@/lib/date-format';
import { useModalStore } from '@/stores/use-modal-store';
import { useTimerStateStore } from '@/stores/timer-state-store';

interface InteruptTimerDialogProps {
  children: React.ReactNode;
}

export const InteruptTimerDialog = ({ children }: InteruptTimerDialogProps) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const duration = useTimerStateStore((state) => state.duration);
  const interuptTimer = useTimerStateStore((state) => state.interuptTimer);
  const closeModal = useModalStore((state) => state.closeModal);

  const { mutate: endStudyTimer } = useEndStudyTimerMutation();

  const onClickHandler = () => {
    endStudyTimer({ duration: duration, status: 'Incompleted' });
    interuptTimer();
    closeModal('timer');
  };

  // 취소 시 타이머 재시작
  const onClickCancelHandler = () => {
    // startTimer();
    setIsOpen(false);
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent
        className={cn(`w-full md:max-w-mobile flex flex-col items-center`)}
      >
        <AlertDialogTitle>타이머를 중단하시겠습니까?</AlertDialogTitle>
        <AlertDialogDescription className="text-sm">
          총 {formatTime(duration)}가 기록됩니다.
        </AlertDialogDescription>

        <AlertDialogFooter className="w-full">
          <AlertDialogCancel
            onClick={onClickCancelHandler}
            className="h-12 w-full"
          >
            취소
          </AlertDialogCancel>
          <AlertDialogAction onClick={onClickHandler} className="h-12 w-full">
            확인
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
