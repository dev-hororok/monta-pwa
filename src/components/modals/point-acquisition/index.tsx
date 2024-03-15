import Fireworks from 'react-canvas-confetti/dist/presets/fireworks';

import { cn } from '@/lib/utils';
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { useModalStore } from '@/stores/use-modal-store';

export const PointAcquisitionDialog = () => {
  const { isOpen, data } = useModalStore(
    (state) => state.modals.pointAcquisition
  );

  const closeModal = useModalStore((state) => state.closeModal);

  const onClickCloseModal = () => {
    closeModal('pointAcquisition');
  };

  if (!isOpen || !data) {
    return null;
  }

  const { earned_point } = data;

  return (
    <>
      <AlertDialog open={isOpen}>
        <AlertDialogContent
          className={cn(
            `w-full md:max-w-mobile max-h-[400px] flex flex-col items-center py-6`
          )}
        >
          <Fireworks autorun={{ speed: 1, duration: 300 }} />

          <AlertDialogTitle className="text-2xl">포인트 획득</AlertDialogTitle>

          <p className="text-center font-semibold text-lg py-4">
            {earned_point} 포인트를 획득했습니다!
          </p>
          <div className="w-full flex flex-col justify-end h-full gap-2">
            <AlertDialogFooter className="w-full">
              <AlertDialogCancel
                type="button"
                onClick={onClickCloseModal}
                className="h-12 w-full"
              >
                확인
              </AlertDialogCancel>
            </AlertDialogFooter>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
