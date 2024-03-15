import { cn } from '@/lib/utils';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { useModalStore } from '@/stores/use-modal-store';
import { useNavigate } from 'react-router-dom';

export const RequireLoginDialog = () => {
  const navigate = useNavigate();
  const { isOpen } = useModalStore((state) => state.modals.requireLogin);
  const closeModal = useModalStore((state) => state.closeModal);

  const onClickHandler = () => {
    navigate('/auth/login');
    closeModal('requireLogin');
  };

  const onClickCloseModal = () => {
    closeModal('requireLogin');
  };

  if (!isOpen) {
    return null;
  }

  return (
    <>
      <AlertDialog open={isOpen}>
        <AlertDialogContent
          className={cn(
            `w-full md:max-w-mobile max-h-[400px] flex flex-col items-center`
          )}
        >
          <AlertDialogTitle className="text-2xl">
            로그인이 필요한 서비스에요 😢
          </AlertDialogTitle>

          <div className="w-full flex flex-col justify-end h-full gap-2">
            <AlertDialogFooter className="w-full">
              <AlertDialogCancel
                type="button"
                onClick={onClickCloseModal}
                className="h-12 w-full text-base"
              >
                닫기
              </AlertDialogCancel>
              <AlertDialogAction
                type="button"
                onClick={onClickHandler}
                className="h-12 w-full text-base"
              >
                계속하기
              </AlertDialogAction>
            </AlertDialogFooter>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
