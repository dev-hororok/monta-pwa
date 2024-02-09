import { Button } from '../ui/button';
import { cn } from '@/lib/utils';
import { formatTime } from '@/lib/date-format';
import { IFoodItemInventory } from '@/models/item.model';
import { ICharacter } from '@/models/character.model';
import { useModalStore } from '@/stores/useModalStore';
import { useConsumeFoodItemMutation } from '@/apis/mutations/itemInventoryMutations';
import { useState } from 'react';
import { toast } from 'sonner';

interface Props {
  foodItemInventory: IFoodItemInventory;
}

export const FoodInventoryCard = ({ foodItemInventory }: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const isActive = foodItemInventory.progress === 0;

  const openModal = useModalStore((state) => state.openModal);
  const { mutateAsync: consumeItem } = useConsumeFoodItemMutation();

  const onClickHandler = async () => {
    if (isLoading) return;
    if (!isActive) {
      toast.error('아직 음식이 다 익지 않았습니다.');
      return;
    }
    try {
      setIsLoading(true);
      const result = await consumeItem({
        item_inventory_id: foodItemInventory.item_inventory_id,
      });
      setIsLoading(false);
      openModal<ICharacter>('characterAcquisition', result.character);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Button
      type="button"
      onClick={onClickHandler}
      variant={isActive ? 'default' : 'ghost'}
      className={cn(
        'h-auto p-1 flex flex-col items-center justify-center text-xs font-semibold',
        isActive && 'hover:-translate-y-1 duration-200 transition-transform'
      )}
    >
      {isActive ? <p>{isLoading ? 'Loading ...' : 'Open'}</p> : null}
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
