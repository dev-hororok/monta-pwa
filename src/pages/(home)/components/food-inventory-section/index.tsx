import { useFoodInventoryQuery } from '@/apis/queries/member-queries';
import { cn } from '@/lib/utils';
import { IMember } from '@/models/member.model';
import { AddFoodCard } from '@/pages/(home)/components/food-inventory-section/add-food-card';
import { FoodInventoryCard } from '@/pages/(home)/components/food-inventory-section/food-inventory-card';

interface FoodInventorySectionProps {
  member: IMember;
  className?: string;
}

export const FoodInventorySection = ({
  member,
  className,
}: FoodInventorySectionProps) => {
  const {
    data: foodItemInventory,
    isPending,
    isError,
  } = useFoodInventoryQuery(member.member_id);

  if (isPending) {
    return (
      <section className={cn('px-4', className)}>
        <p className="text-center text-sm font-bold pb-4">재료 (최대 4개)</p>
        <div className="grid grid-cols-4 gap-1">
          <FoodInventoryCard.Skeleton />
          <FoodInventoryCard.Skeleton />
          <FoodInventoryCard.Skeleton />
          <FoodInventoryCard.Skeleton />
        </div>
      </section>
    );
  }
  if (isError) {
    return (
      <div className={cn('text-center text-red-500', className)}>
        오류가 발생했습니다.
      </div>
    );
  }

  return (
    <section className={cn('px-4', className)}>
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
        ) : null}
      </div>
    </section>
  );
};
