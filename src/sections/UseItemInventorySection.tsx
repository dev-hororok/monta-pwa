import { useConsumableInventoryQuery } from '@/apis/queries/memberQueries';
import { StreakItemCard } from '@/components/cards/StreakItemCard';

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
          return <StreakItemCard key={idx} count={item.quantity} />;
        })}
      </div>
    </section>
  );
};
