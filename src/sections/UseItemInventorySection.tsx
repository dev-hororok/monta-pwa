import { useConsumableInventoryQuery } from '@/apis/queries/memberQueries';
import { ConsumableItemInventoryCard } from '@/components/cards/ConsumableInventoryCard';

interface Props {
  memberId: string;
}

export const UseItemInventorySection = ({ memberId }: Props) => {
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
