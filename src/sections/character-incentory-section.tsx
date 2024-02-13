import { useCharacterInventoryQuery } from '@/apis/queries/member-queries';
import { CharacterItemCard } from '@/components/cards/character-card';
import { ICharacterInventory } from '@/models/character.model';
import { useModalStore } from '@/stores/use-modal-store';

interface CharacterInventorySectionProps {
  memberId: string;
}

const CharacterInventorySection = ({
  memberId,
}: CharacterInventorySectionProps) => {
  const { data, isPending, isError } = useCharacterInventoryQuery(memberId);
  const openModal = useModalStore((state) => state.openModal);

  const handleCharacterItemCardClick = (
    characterInventory: ICharacterInventory
  ) => {
    openModal('sellCharacter', { characterInventory });
  };

  if (isPending) {
    return <div className="text-center">로딩 중...</div>;
  }
  if (isError) {
    return <div className="text-center text-red-500">오류가 발생했습니다.</div>;
  }

  const totalSellPrice = data.reduce(
    (acc, cur) => acc + cur.character.sell_price,
    0
  );

  return (
    <section>
      <header className="flex items-center justify-between pb-4">
        <div>
          <h2 className="font-semibold">캐릭터</h2>
          <p className="text-foreground/60">{totalSellPrice}원</p>
        </div>
        <span className="font-semibold text-muted-foreground">
          {data.length} 개
        </span>
      </header>
      <div className="grid grid-cols-3 gap-2">
        {data.map((inventory) => (
          <CharacterItemCard
            key={inventory.character_inventory_id}
            characterInventory={inventory}
            onClick={() => handleCharacterItemCardClick(inventory)}
          />
        ))}
      </div>
    </section>
  );
};

export default CharacterInventorySection;
