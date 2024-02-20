import { useFoodInventoryQuery } from '@/apis/queries/member-queries';
import { AddFoodCard } from '@/components/cards/add-food-card';
import { FoodInventoryCard } from '@/components/cards/food-inventory-card';

interface Props {
  memberId: string;
}

export const FoodInventorySection = ({ memberId }: Props) => {
  const {
    data: foodItemInventory,
    isPending,
    isError,
  } = useFoodInventoryQuery(memberId);

  if (isPending) {
    return (
      <section className="px-4">
        <p className="text-center text-sm font-bold pb-4">재료 (최대 4개)</p>{' '}
        <div className="grid grid-cols-4 gap-1">
          <FoodInventoryCard.Skeleton />
          <FoodInventoryCard.Skeleton />
          <FoodInventoryCard.Skeleton />
        </div>
      </section>
    );
  }
  if (isError) {
    return <div className="text-center text-red-500">오류가 발생했습니다.</div>;
  }

  return (
    <section className="px-4">
      <p className="text-center text-sm font-bold pb-4">재료 (최대 4개)</p>
      <div className="grid grid-cols-4 gap-1">
        {foodItemInventory ? (
          <>
            {foodItemInventory.map((inventory, idx) => {
              return (
                <FoodInventoryCard key={idx} foodItemInventory={inventory} />
              );
            })}
            {foodItemInventory.length < 4 ? <AddFoodCard /> : null}
          </>
        ) : (
          <div></div>
        )}
      </div>
    </section>
  );
};
