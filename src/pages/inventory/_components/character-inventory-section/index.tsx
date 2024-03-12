import { useCharacterInventoryQuery } from '@/services/queries/member-queries';
import type { IMember } from '@/types/models/member.model';
import { CharacterItemCard } from './character-card';
import { SellCharacterDialog } from './sell-character-dialog';

interface CharacterInventorySectionProps {
  member: IMember;
}

export const CharacterInventorySection = ({
  member,
}: CharacterInventorySectionProps) => {
  const { data, isPending, isError } = useCharacterInventoryQuery(
    member.member_id
  );

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
      {isPending ? (
        <div className="grid grid-cols-3 gap-2">
          <CharacterItemCard.Skeleton />
          <CharacterItemCard.Skeleton />
          <CharacterItemCard.Skeleton />
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-2">
          {data.map((inventory) => (
            <SellCharacterDialog
              key={inventory.character_inventory_id}
              characterInventory={inventory}
              member={member}
            >
              <CharacterItemCard characterInventory={inventory} />
            </SellCharacterDialog>
          ))}
        </div>
      )}
    </section>
  );
};
