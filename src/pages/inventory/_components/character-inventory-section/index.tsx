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
          {inventory.length === 0 ? <EmptyCharacterMessage /> : null}
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

const EmptyCharacterMessage = () => {
  return (
    <div className="flex-center flex-col py-4 gap-2">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="icon icon-tabler icon-tabler-eggs size-8"
        width="44"
        height="44"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="#2c3e50"
        fill="none"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M13 22c-3 0 -4.868 -2.118 -5 -5c0 -3 2 -5 5 -5c4 0 8.01 2.5 8 5c0 2.5 -4 5 -8 5z" />
        <path d="M8 18c-3.03 -.196 -5 -2.309 -5 -5.38c0 -4.307 2.75 -8.625 5.5 -8.62c2.614 0 5.248 3.915 5.5 8" />
      </svg>
      <p className="text-sm">캐릭터가 없닭!</p>
    </div>
  );
};
