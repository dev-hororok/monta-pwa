import { cn } from '@/lib/utils';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { useModalStore } from '@/stores/useModalStore';
import { Badge } from '@/components/ui/badge';
import Fireworks from 'react-canvas-confetti/dist/presets/fireworks';

export const PaletteAcquisitionDialog = () => {
  const { isOpen, data: palette } = useModalStore(
    (state) => state.modals.paletteAcquisition
  );
  const closeModal = useModalStore((state) => state.closeModal);

  const handleOnClick = () => {
    closeModal('paletteAcquisition');
  };

  if (!isOpen || !palette) {
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
          {palette.grade === 'Epic' ? (
            <Fireworks autorun={{ speed: 1, duration: 300 }} />
          ) : null}
          {palette.grade === 'Legendary' ? (
            <Fireworks autorun={{ speed: 4, duration: 2000 }} />
          ) : null}
          <AlertDialogTitle className="text-2xl">팔레트 변경</AlertDialogTitle>

          <div className="flex items-center gap-4">
            <div
              style={{ backgroundColor: palette.light_color }}
              className="w-8 h-8"
            />
            <div
              style={{ backgroundColor: palette.normal_color }}
              className="w-8 h-8"
            />
            <div
              style={{ backgroundColor: palette.dark_color }}
              className="w-8 h-8"
            />
            <div
              style={{ backgroundColor: palette.darker_color }}
              className="w-8 h-8"
            />
          </div>
          <div className="flex justify-center">
            <Badge>{palette.grade} 등급</Badge>
          </div>
          <p className="text-center font-semibold text-lg py-4">
            {palette.name}
          </p>
          <div className="w-full flex flex-col justify-end h-full gap-2">
            <AlertDialogFooter className="w-full">
              <AlertDialogAction
                onClick={handleOnClick}
                className="h-12 w-full"
              >
                확인
              </AlertDialogAction>
            </AlertDialogFooter>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
