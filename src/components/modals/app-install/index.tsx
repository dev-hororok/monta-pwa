import { cn } from '@/lib/utils';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { useModalStore } from '@/stores/use-modal-store';

export const AppInsatllDialog = () => {
  const { isOpen } = useModalStore((state) => state.modals.appInstall);
  const closeModal = useModalStore((state) => state.closeModal);

  const onClickHandler = () => {
    window.location.href =
      'https://play.google.com/store/apps/details?id=com.pomodak.twa';
    closeModal('appInstall');
  };

  const onClickCloseModal = () => {
    closeModal('appInstall');
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
          <AlertDialogTitle className="text-xl">
            🥳 뽀모닭이 앱으로 출시되었어요!
          </AlertDialogTitle>
          <AlertDialogDescription className="">
            Web은 더이상 업데이트가 되지 않아요. ㅜㅜ <br /> 앱을 설치해서 더욱
            다양한 기능을 만나보세요!
          </AlertDialogDescription>

          <div className="w-full flex flex-col justify-end h-full gap-2">
            <AlertDialogFooter className="w-full">
              <AlertDialogCancel
                type="button"
                onClick={onClickCloseModal}
                className="h-12 w-full text-base"
              >
                웹에서 사용해보기
              </AlertDialogCancel>
              <AlertDialogAction
                type="button"
                onClick={onClickHandler}
                className="h-12 w-full text-base"
              >
                플레이스토어
              </AlertDialogAction>
            </AlertDialogFooter>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
