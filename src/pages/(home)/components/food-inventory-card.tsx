import { toast } from 'sonner';

import { buttonVariants } from '@/components/ui/button';
import { formatTime } from '@/lib/date-format';
import type { IFoodItemInventory } from '@/models/item.model';
import { cn } from '@/lib/utils';
import { useConsumeFoodItem } from '@/hooks/use-food-item';
import { Skeleton } from '../../../components/ui/skeleton';

interface FoodInventoryCardProps {
  foodItemInventory: IFoodItemInventory;
}

export const FoodInventoryCard = ({
  foodItemInventory,
}: FoodInventoryCardProps) => {
  const { consume, isLoading } = useConsumeFoodItem();
  const isActive = foodItemInventory.progress === 0;

  const handleConsumeClick = async () => {
    if (!isActive) {
      toast.error('아직 음식이 다 익지 않았습니다.');
      return;
    }
    await consume({ foodItemInventory });
  };

  return (
    <div
      onClick={handleConsumeClick}
      className={cn(
        buttonVariants({ variant: isActive ? 'default' : 'ghost' }),
        'h-auto p-1 flex flex-col items-center justify-center text-xs font-semibold cursor-pointer',
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
  return <Skeleton className="w-full aspect-[3/4]"></Skeleton>;
};
