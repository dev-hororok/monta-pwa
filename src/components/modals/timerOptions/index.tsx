import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Settings } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import TimePicker from './TimePicker';
import CategoryPicker from './CategoryPicker';
import { useModalStore } from '@/stores/useModalStore';

export const TimerOptionDialog = () => {
  const { data, isOpen } = useModalStore((state) => state.modals.timerOptions);
  const closeModal = useModalStore((state) => state.closeModal);

  const onClickCloseHandler = () => {
    closeModal('timerOptions');
  };

  if (!isOpen || !data) {
    return null;
  }

  return (
    <AlertDialog open={isOpen}>
      <AlertDialogContent
        className={cn(
          `w-full h-screen md:max-w-[416px] md:max-h-[736px] flex flex-col justify-start items-center pt-safe-offset-14`
        )}
      >
        <AlertDialogHeader>
          <AlertDialogTitle>타이머 설정</AlertDialogTitle>
        </AlertDialogHeader>
        <div className="pb-6">
          <div className="w-full space-y-4 font-semibold py-3">
            <p className="">집중 시간(분)</p>
            <TimePicker />
          </div>
          <div className="w-full space-y-4 font-semibold py-3">
            <div className="flex items-center justify-between">
              <p>카테고리</p>
              <Link to="/categories">
                <Settings />
              </Link>
            </div>
            <CategoryPicker memberId={data.memberId} />
          </div>
        </div>
        <AlertDialogFooter>
          <AlertDialogAction asChild>
            <Button type="button" onClick={onClickCloseHandler}>
              확인
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
