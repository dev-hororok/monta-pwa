import { useCharacterInventoryQuery } from '@/services/queries/member-queries';
import type { IMember } from '@/types/models/member.model';
import { CharacterItemCard } from './character-card';
import { SellCharacterDialog } from './sell-character-dialog';
import { useMemo } from 'react';

interface CharacterInventorySectionProps {
  member: IMember;
}

export const CharacterInventorySection = ({
  member,
}: CharacterInventorySectionProps) => {
  const {
    data: inventory,
    isPending,
    isError,
  } = useCharacterInventoryQuery(member.member_id);

  const totalSellPrice = useMemo(() => {
    if (!inventory) return 0;
    return inventory.reduce((acc, cur) => acc + cur.character.sell_price, 0);
  }, [inventory]);

  if (isError) {
    return <div className="text-center text-red-500">오류가 발생했습니다.</div>;
  }

  return (
    <section>
      <header className="flex items-center justify-between pb-4">
        <div>
          <h2 className="font-semibold">캐릭터</h2>
          <p className="text-foreground/60">{totalSellPrice}원</p>
        </div>
        <span className="font-semibold text-muted-foreground">
          {inventory ? inventory.length : 0} 개
        </span>
      </header>
      {isPending ? (
        <div className="grid grid-cols-3 gap-2">
          <CharacterItemCard.Skeleton />
          <CharacterItemCard.Skeleton />
          <CharacterItemCard.Skeleton />
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-2">
          {inventory.map((item) => (
            <SellCharacterDialog
              key={item.character_inventory_id}
              characterInventory={item}
              member={member}
            >
              <CharacterItemCard characterInventory={item} />
            </SellCharacterDialog>
          ))}
        </div>
      )}
    </section>
  );
};
