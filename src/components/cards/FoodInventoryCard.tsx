import { Button } from '../ui/button';
import { cn } from '@/lib/utils';
import { formatTime } from '@/lib/date-format';
import { IFoodItemInventory } from '@/models/item.model';

interface Props {
  foodItemInventory: IFoodItemInventory;
}

export const FoodInventoryCard = ({ foodItemInventory }: Props) => {
  const isActive = foodItemInventory.progress === 0;
  return (
    <Button
      variant={isActive ? 'default' : 'ghost'}
      className={cn(
        'h-auto p-1 flex flex-col items-center justify-center text-xs font-semibold',
        isActive && 'hover:-translate-y-1 duration-200 transition-transform'
      )}
    >
      {isActive ? <p>Open</p> : null}
      <img
        src={foodItemInventory.item.image_url}
        alt={'FoodItem'}
        className="p-0"
        onContextMenu={(e) => e.preventDefault()}
      />
      <p>{formatTime(foodItemInventory.progress)}</p>
    </Button>
  );
};
