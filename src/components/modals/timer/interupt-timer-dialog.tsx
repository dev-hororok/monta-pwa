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
import {
  useCancelScheduleTimerMutation,
  useEndStudyTimerMutation,
} from '@/services/mutations/study-timer-mutations';
import { AlertDialogDescription } from '@radix-ui/react-alert-dialog';
import { formatTime } from '@/lib/date-format';
import { useModalStore } from '@/stores/use-modal-store';
import { useTimerStateStore } from '@/stores/timer-state-store';
import { useTimerOptionsStore } from '@/stores/timer-options-store';

interface InteruptTimerDialogProps {
  children: React.ReactNode;
}

export const InteruptTimerDialog = ({ children }: InteruptTimerDialogProps) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const { mutate: cancelScheduleTimer } = useCancelScheduleTimerMutation();
  const timerMode = useTimerOptionsStore((state) => state.timerMode);
  const duration = useTimerStateStore((state) => state.duration);
  const pauseTimer = useTimerStateStore((state) => state.pauseTimer);
  const interuptTimer = useTimerStateStore((state) => state.interuptTimer);
  const { openModal, closeModal } = useModalStore((state) => state);

  const { mutate: endStudyTimer } = useEndStudyTimerMutation();

  const onClickHandler = () => {
    endStudyTimer({ duration: duration, status: 'Incompleted' });

    // 일반 타이머: 중단 시 일시정지 후 완료 알람 모달에서 interuptTimer()처리
    if (timerMode === 'normal') {
      pauseTimer();
      openModal('timerAlarm', {
        alarmType: 'FinishSection',
      });
    } else {
      // 뽀모도로 타이머: 타이머 초기화 후 알람 없이 모달 닫기
      interuptTimer();
      cancelScheduleTimer(); // 푸시 알림 예약 취소
      closeModal('timer');
    }
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
          <AlertDialogCancel className="h-12 w-full">취소</AlertDialogCancel>
          <AlertDialogAction onClick={onClickHandler} className="h-12 w-full">
            확인
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
