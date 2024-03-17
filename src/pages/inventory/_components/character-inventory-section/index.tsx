import { useCharacterInventoryQuery } from '@/services/queries/member-queries';
import type { IMember } from '@/types/models/member.model';
import { CharacterItemCard } from './character-card';
import { SellCharacterDialog } from './sell-character-dialog';
import { RequireLogin } from '@/components/require-login';

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

  if (isError) {
    return <div className="text-center text-red-500">오류가 발생했습니다.</div>;
  }

  return (
    <section>
      <p className="font-semibold pb-4">캐릭터</p>
      {isPending ? (
        <div className="grid grid-cols-3 gap-2">
          <CharacterItemCard.Skeleton />
          <CharacterItemCard.Skeleton />
          <CharacterItemCard.Skeleton />
        </div>
      ) : (
        <>
          {inventory.length === 0 ? <RequireLogin className="py-4" /> : null}
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
        </>
      )}
    </section>
  );
};
