import { useCharacterInventoryQuery } from '@/apis/queries/member-queries';
import CharacterItemCard from '@/components/cards/character-card';
import { ICharacterInventory } from '@/models/character.model';
import { useModalStore } from '@/stores/use-modal-store';

interface Props {
  memberId: string;
}

const CharacterInventorySection = ({ memberId }: Props) => {
  const { data, isPending, isError } = useCharacterInventoryQuery(memberId);
  const openModal = useModalStore((state) => state.openModal);

  if (isPending) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error</div>;
  }
  const openSellModal = (characterInventory: ICharacterInventory) => {
    openModal('sellCharacter', { characterInventory });
  };

  return (
    <section>
      <div className="flex items-center justify-between pb-4">
        <div className="flex items-center gap-2 text-sm">
          <p className="font-semibold">캐릭터</p>

          <p className="flex items-center gap-1 text-foreground/60">
            {data.reduce((acc, cur) => acc + cur.character.sell_price, 0)}원
          </p>
        </div>
        <p className="font-semibold text-sm text-muted-foreground">
          {data.length} 개
        </p>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {data.map((inventory, idx) => {
          return (
            <div key={idx} onClick={() => openSellModal(inventory)}>
              <CharacterItemCard characterInventory={inventory} />
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default CharacterInventorySection;
