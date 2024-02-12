import { useConsumableInventoryQuery } from '@/apis/queries/member-queries';
import ConsumableItemInventoryCard from '@/components/cards/consumable-inventory-card';

interface Props {
  memberId: string;
}

const ItemInventorySection = ({ memberId }: Props) => {
  const {
    data: items,
    isPending,
    isError,
  } = useConsumableInventoryQuery(memberId);

  if (isPending) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error</div>;
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
