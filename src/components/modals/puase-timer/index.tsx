import { cn } from '@/lib/utils';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { useEndStudyTimerMutation } from '@/apis/mutations/study-timer-mutations';
import { AlertDialogDescription } from '@radix-ui/react-alert-dialog';
import { formatTime } from '@/lib/date-format';
import { useModalStore } from '@/stores/use-modal-store';

const PuaseTimerDialog = () => {
  const { isOpen, data } = useModalStore((state) => state.modals.pauseTimer);
  const closeModal = useModalStore((state) => state.closeModal);

  const { mutate: endStudyTimer } = useEndStudyTimerMutation();

  const onClickHandler = () => {
    if (data && data.duration) {
      endStudyTimer({ duration: data.duration, status: 'Incompleted' });
    }
    closeModal('pauseTimer');
    closeModal('timer');
  };

  // 취소 시 타이머 재시작
  const onClickCancelHandler = () => {
    if (data && data.startTimer) {
      data.startTimer();
    }
    closeModal('pauseTimer');
  };

  if (!isOpen || !data) {
    return null;
  }

  return (
    <AlertDialog open={isOpen}>
      <AlertDialogContent
        className={cn(
          `w-full h-screen md:max-w-[416px] md:max-h-[736px] flex flex-col items-center py-safe-offset-14 overflow-y-scroll scrollbar-hide`
        )}
      >
        <AlertDialogTitle>타이머를 종료하시겠습니까?</AlertDialogTitle>
        <AlertDialogDescription className="text-sm">
          총 {formatTime(data.duration)}가 기록됩니다.
        </AlertDialogDescription>

        <div className="w-full flex flex-col justify-end h-full gap-2">
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
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default PuaseTimerDialog;
