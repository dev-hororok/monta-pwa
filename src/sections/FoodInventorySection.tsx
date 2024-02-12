import { useFoodInventoryQuery } from '@/apis/queries/memberQueries';
import AddFoodCard from '@/components/cards/add-food-card';
import FoodInventoryCard from '@/components/cards/food-inventory-card';

interface Props {
  memberId: string;
}

export const FoodInventorySection = ({ memberId }: Props) => {
  const { data: foodItemInventory, isPending } =
    useFoodInventoryQuery(memberId);

  if (isPending) {
    return <div>Loading...</div>;
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
