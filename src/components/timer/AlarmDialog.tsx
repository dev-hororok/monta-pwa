import { cn } from '@/lib/utils';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogTitle,
} from '../ui/alert-dialog';
import useBoundStore from '@/stores/useBoundStore';

interface Props {
  closeTimerModal: () => void;
  isOpen: boolean;
}

export const AlarmDialog = ({ closeTimerModal, isOpen }: Props) => {
  const resetTimer = useBoundStore((state) => state.resetTimer);

  // 푸시, 진동, 알람 등 worker 실행

  const handleOnClick = () => {
    resetTimer();
    closeTimerModal();
  };

  return (
    <AlertDialog open={isOpen}>
      <AlertDialogContent
        className={cn(
          `w-full h-screen sm:max-w-[416px] sm:max-h-[736px] flex flex-col justify-center items-center pt-safe-offset-14`
        )}
      >
        <AlertDialogTitle>어디서 맛있는 냄새가 납니다</AlertDialogTitle>
        <img src="./alarm.png" alt="main" className="h-1/2 mx-auto" />

        <AlertDialogFooter className="w-full">
          <AlertDialogAction onClick={handleOnClick} className="h-12 w-full">
            확인
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
