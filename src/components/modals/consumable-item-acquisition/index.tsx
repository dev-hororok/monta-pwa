import { cn } from '@/lib/utils';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { useModalStore } from '@/stores/use-modal-store';

export const ConsumableItemAcquisitionDialog = () => {
  const { isOpen, data } = useModalStore(
    (state) => state.modals.consumableItemAcquisition
  );
  const closeModal = useModalStore((state) => state.closeModal);

  const handleOnClick = () => {
    closeModal('consumableItemAcquisition');
  };

  if (!isOpen || !data) {
    return null;
  }
  const { item } = data;

  return (
    <AlertDialog open={isOpen}>
      <AlertDialogContent
        className={cn(
          `w-full h-screen md:max-w-mobile md:max-h-mobile flex flex-col items-center py-safe-offset-14 overflow-y-scroll scrollbar-hide`
        )}
      >
        <AlertDialogTitle className="text-3xl">아이템 획득</AlertDialogTitle>
        <img
          src={item.image_url}
          alt="consumable item image"
          className="h-2/5 mx-auto"
        />
        <p className="text-center font-semibold text-lg py-4">{item.name}</p>
        <p className="text-center text-foreground/70">{item.description}</p>
        <div className="w-full flex flex-col justify-end h-full gap-2">
          <AlertDialogFooter className="w-full">
            <AlertDialogAction onClick={handleOnClick} className="h-12 w-full">
              확인
            </AlertDialogAction>
          </AlertDialogFooter>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
};
