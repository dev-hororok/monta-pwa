import { cn } from '@/lib/utils';
import { ReactNode, useState } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '../ui/alert-dialog';
import { useEndStudyTimerMutation } from '@/apis/mutations/studyTimerMutations';
import useBoundStore from '@/stores/useBoundStore';
import { AlertDialogDescription } from '@radix-ui/react-alert-dialog';
import { formatTime } from '@/lib/date-format';

interface Props {
  closeTimerModal: () => void;
  children: ReactNode;
}

export const EndStudyTimerDialog = ({ children, closeTimerModal }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const duration = useBoundStore((state) => state.duration);
  const resetTimer = useBoundStore((state) => state.resetTimer);
  const { mutate: endStudyTimer } = useEndStudyTimerMutation();

  const handleOnClick = () => {
    endStudyTimer(duration);
    resetTimer();
    setIsOpen(false);
    closeTimerModal();
  };

  return (
    <AlertDialog open={isOpen}>
      <AlertDialogTrigger asChild onClick={() => setIsOpen(true)}>
        {children}
      </AlertDialogTrigger>
      <AlertDialogContent
        className={cn(
          `w-full h-screen sm:max-w-[416px] sm:max-h-[736px] flex flex-col justify-center items-center pt-safe-offset-14`
        )}
      >
        <AlertDialogTitle>타이머를 종료하시겠습니까?</AlertDialogTitle>
        <AlertDialogDescription className="text-sm">
          총 {formatTime(duration)}가 기록됩니다.
        </AlertDialogDescription>
        <AlertDialogFooter className="w-full">
          <AlertDialogCancel
            onClick={() => setIsOpen(false)}
            className="h-12 w-full"
          >
            취소
          </AlertDialogCancel>
          <AlertDialogAction onClick={handleOnClick} className="h-12 w-full">
            확인
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
