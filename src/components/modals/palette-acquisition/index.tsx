import Fireworks from 'react-canvas-confetti/dist/presets/fireworks';
import { toast } from 'sonner';

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
import { Badge } from '@/components/ui/badge';
import { useConsumeItem } from '@/hooks/use-consume-item';

const PaletteAcquisitionDialog = () => {
  const { isOpen, data } = useModalStore(
    (state) => state.modals.paletteAcquisition
  );
  const closeModal = useModalStore((state) => state.closeModal);
  const { consume } = useConsumeItem();

  const onClickHandler = () => {
    if (!data) return;
    if (data.consumableItemInventory.quantity < 1) {
      toast.error('개수가 부족합니다.');
      return;
    }
    consume({ itemInventory: data.consumableItemInventory });
  };

  const onClickCloseModal = () => {
    closeModal('paletteAcquisition');
  };

  if (!isOpen || !data) {
    return null;
  }

  return (
    <>
      <AlertDialog open={isOpen}>
        <AlertDialogContent
          className={cn(
            `w-full md:max-w-[416px] max-h-[400px] flex flex-col items-center py-safe-offset-14 overflow-y-scroll scrollbar-hide`
          )}
        >
          {data.palette.grade === 'Epic' ? (
            <Fireworks autorun={{ speed: 1, duration: 300 }} />
          ) : null}
          {data.palette.grade === 'Legendary' ? (
            <Fireworks autorun={{ speed: 4, duration: 2000 }} />
          ) : null}
          <AlertDialogTitle className="text-2xl">팔레트 변경</AlertDialogTitle>

          <div className="flex items-center gap-4">
            <div
              style={{ backgroundColor: data.palette.light_color }}
              className="w-8 h-8"
            />
            <div
              style={{ backgroundColor: data.palette.normal_color }}
              className="w-8 h-8"
            />
            <div
              style={{ backgroundColor: data.palette.dark_color }}
              className="w-8 h-8"
            />
            <div
              style={{ backgroundColor: data.palette.darker_color }}
              className="w-8 h-8"
            />
          </div>
          <div className="flex justify-center">
            <Badge>{data.palette.grade} 등급</Badge>
          </div>
          <p className="text-center font-semibold text-lg py-4">
            {data.palette.name}
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
              <AlertDialogAction
                type="button"
                onClick={onClickHandler}
                className="h-12 w-full"
              >
                다시뽑기
              </AlertDialogAction>
            </AlertDialogFooter>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default PaletteAcquisitionDialog;
