import { Button } from '../ui/button';
import { cn } from '@/lib/utils';
import { formatTime } from '@/lib/date-format';
import { IFoodItemInventory } from '@/models/item.model';
import { ICharacter } from '@/models/character.model';
import { useModalStore } from '@/stores/useModalStore';
import { toast } from '../ui/use-toast';

interface Props {
  foodItemInventory: IFoodItemInventory;
}

export const FoodInventoryCard = ({ foodItemInventory }: Props) => {
  const isActive = foodItemInventory.progress === 0;

  const openModal = useModalStore((state) => state.openModal);
  const onClickHandler = () => {
    if (!isActive) {
      toast({
        title: '아직 음식이 다 익지 않았습니다.',
      });
      return;
    }
    // 임시
    openModal<ICharacter>('characterAcquisition', {
      character_id: '1',
      name: '쬐끔한 거북이',
      description: '쬐끔한 거북이입니다.',
      sell_price: 100,
      image_url: '/turtle.png',
      grade: 'B',
    });
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
