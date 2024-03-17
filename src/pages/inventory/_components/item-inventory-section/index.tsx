import { useConsumableInventoryQuery } from '@/services/queries/member-queries';
import { ConsumableItemInventoryCard } from './consumable-inventory-card';
import type { IMember } from '@/types/models/member.model';
import { ConsumeItemDialog } from './consume-item-dialog';

interface ItemInventorySectionProps {
  member: IMember;
}

export const ItemInventorySection = ({ member }: ItemInventorySectionProps) => {
  const {
    data: items,
    isPending,
    isError,
  } = useConsumableInventoryQuery(member.member_id);

  if (isError) {
    return <div className="text-center text-red-500">오류가 발생했습니다.</div>;
  }

  return (
    <section>
      <p className="font-semibold pb-4">사용 아이템</p>
      {isPending ? (
        <div className="grid grid-cols-3 gap-2">
          <ConsumableItemInventoryCard.Skeleton />
          <ConsumableItemInventoryCard.Skeleton />
          <ConsumableItemInventoryCard.Skeleton />
        </div>
      ) : (
        <>
          {items.length === 0 ? <EmptyItemMessage /> : null}
          <div className="grid grid-cols-3 gap-2">
            {items.map((item) => {
              return (
                <ConsumeItemDialog
                  key={item.item_inventory_id}
                  itemInventory={item}
                  member={member}
                >
                  <ConsumableItemInventoryCard consumableItemInventory={item} />
                </ConsumeItemDialog>
              );
            })}
          </div>
        </>
      )}
    </section>
  );
};

const EmptyItemMessage = () => {
  return (
    <div className="flex-center flex-col py-4 gap-2">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="icon icon-tabler icon-tabler-mood-sad size-8"
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
        <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
        <path d="M9 10l.01 0" />
        <path d="M15 10l.01 0" />
        <path d="M9.5 15.25a3.5 3.5 0 0 1 5 0" />
      </svg>
      <p className="text-sm">아이템이 없닭!</p>
    </div>
  );
};
