import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useModalStore } from '@/stores/useModalStore';

export const CharacterAcquisitionModal = () => {
  const closeModal = useModalStore((state) => state.closeModal);
  const modal = useModalStore((state) => state.modals.characterAcquisition);
  const character = modal.data;

  if (!modal.isOpen || !character) {
    return null;
  }

  return (
    <div className="absolute top-0 z-40 w-full h-full md:w-[414px] md:h-[734px] md:rounded-md bg-background">
      <div className="rounded-t-md rounded-b-3xl pt-safe-offset-14 h-full pb-safe">
        <main className="flex flex-col h-full overflow-y-scroll scrollbar-hide px-4">
          <h3 className="text-center text-4xl font-semibold">캐릭터 획득</h3>
          <img src="./turtle.png" alt="main" className="h-1/2 mx-auto" />

          <div className="flex justify-center">
            <Badge>{character.grade} 등급</Badge>
          </div>
          <p className="text-center font-semibold text-lg py-4">
            {character.name}
          </p>
          <p className="text-center text-foreground/70">
            {character.description}
          </p>
          <div className="flex flex-col justify-end h-full pb-10">
            <Button
              type="button"
              onClick={() => closeModal('characterAcquisition')}
            >
              확인
            </Button>
          </div>
        </main>
      </div>
    </div>
  );
};
