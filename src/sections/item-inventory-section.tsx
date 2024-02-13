import { useConsumableInventoryQuery } from '@/apis/queries/member-queries';
import { ConsumableItemInventoryCard } from '@/components/cards/consumable-inventory-card';

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
    return <div className="text-center">로딩 중...</div>;
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
