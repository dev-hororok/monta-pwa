import { useFoodInventoryQuery } from '@/services/queries/member-queries';
import { cn } from '@/lib/utils';
import { AddFoodCard } from './add-food-card';
import { FoodInventoryCard } from './food-inventory-card';
import { useAuthStore } from '@/stores/auth-store';

interface FoodInventorySectionProps {
  className?: string;
}

export const FoodInventorySection = ({
  className,
}: FoodInventorySectionProps) => {
  const memberId = useAuthStore((state) => state.memberId);
  const {
    data: foodItemInventory,
    isLoading,
    isError,
  } = useFoodInventoryQuery(memberId);

  if (isLoading) {
    return (
      <section className={cn('px-4', className)}>
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
          <AddFoodCard />
        )}
      </div>
    </section>
  );
};
