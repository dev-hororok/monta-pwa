import { buttonVariants } from '@/components/ui/button';
import { formatTime } from '@/lib/date-format';
import type { IFoodItemInventory } from '@/types/models/item.model';
import { cn } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';
import { useConsumeItem } from '@/hooks/use-consume-item';

interface FoodInventoryCardProps {
  foodItemInventory: IFoodItemInventory;
}

export const FoodInventoryCard = ({
  foodItemInventory,
}: FoodInventoryCardProps) => {
  const { consume, isLoading } = useConsumeItem();

  const handleConsumeClick = async () => {
    await consume({ itemInventory: foodItemInventory });
  };

  const isActive = foodItemInventory.progress === 0;

  return (
    <div
      onClick={handleConsumeClick}
      className={cn(
        buttonVariants({ variant: isActive ? 'outline' : 'ghost' }),
        'h-auto p-1 flex-center flex-col text-xs font-semibold cursor-pointer',
        isActive && 'hover:-translate-y-1 duration-200 transition-transform'
      )}
    >
      {isActive ? <p>{isLoading ? 'Loading ...' : 'Open'}</p> : null}
      <img
        src={foodItemInventory.item.image_url}
        alt={'FoodItem'}
        className="p-0"
        onContextMenu={(e) => e.preventDefault()} // 이미지 우클릭 방지
      />
      <p>{formatTime(foodItemInventory.progress)}</p>
    </div>
  );
};
FoodInventoryCard.Skeleton = () => {
  return <Skeleton className="w-full h-full aspect-[3/4]"></Skeleton>;
};
