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

export const CharacterAcquisitionDialog = () => {
  const { isOpen, data: character } = useModalStore(
    (state) => state.modals.characterAcquisition
  );
  const closeModal = useModalStore((state) => state.closeModal);

  const handleOnClick = () => {
    closeModal('characterAcquisition');
  };

  if (!isOpen || !character) {
    return null;
  }

  return (
    <AlertDialog open={isOpen}>
      <AlertDialogContent
        className={cn(
          `w-full h-screen md:max-w-[416px] md:max-h-[736px] flex flex-col items-center py-safe-offset-14 overflow-y-scroll scrollbar-hide`
        )}
      >
        <AlertDialogTitle className="text-3xl">캐릭터 획득</AlertDialogTitle>
        <img
          src={character.image_url}
          alt="character image"
          className="h-2/5 mx-auto"
        />
        <div className="flex justify-center">
          <Badge>{character.grade} 등급</Badge>
        </div>
        <p className="text-center font-semibold text-lg py-4">
          {character.name}
        </p>
        <p className="text-center text-foreground/70">
          {character.description}
        </p>
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
