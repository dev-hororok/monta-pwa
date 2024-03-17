import { useConsumableInventoryQuery } from '@/services/queries/member-queries';
import { ConsumableItemInventoryCard } from './consumable-inventory-card';
import type { IMember } from '@/types/models/member.model';
import { ConsumeItemDialog } from './consume-item-dialog';
import { RequireLogin } from '@/components/require-login';

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
          {items.length === 0 ? <RequireLogin className="py-4" /> : null}
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
