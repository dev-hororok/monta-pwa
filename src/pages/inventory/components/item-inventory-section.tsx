import { useConsumableInventoryQuery } from '@/apis/queries/member-queries';
import { ConsumableItemInventoryCard } from '@/pages/inventory/components/consumable-inventory-card';
import type { IMember } from '@/models/member.model';

interface ItemInventorySectionProps {
  member: IMember;
}

const ItemInventorySection = ({ member }: ItemInventorySectionProps) => {
  const {
    data: items,
    isPending,
    isError,
  } = useConsumableInventoryQuery(member.member_id);

  if (isPending) {
    return (
      <section>
        <p className="font-semibold pb-4">사용 아이템</p>
        <div className="grid grid-cols-3 gap-2">
          <ConsumableItemInventoryCard.Skeleton />
          <ConsumableItemInventoryCard.Skeleton />
          <ConsumableItemInventoryCard.Skeleton />
        </div>
      </section>
    );
  }
  if (isError) {
    return <div className="text-center text-red-500">오류가 발생했습니다.</div>;
  }

  return (
    <section>
      <p className="font-semibold pb-4">사용 아이템</p>
      <div className="grid grid-cols-3 gap-2">
        {items.map((item, idx) => {
          return (
            <ConsumableItemInventoryCard
              key={idx}
              consumableItemInventory={item}
            />
          );
        })}
      </div>
    </section>
  );
};

export default ItemInventorySection;
