import { toast } from 'sonner';

import type { IConsumableItemInventory } from '@/models/item.model';
import { Button } from '@/components/ui/button';
import { useConsumeItem } from '@/hooks/use-consume-item';
import { cn } from '@/lib/utils';

interface Props {
  consumableItemInventory: IConsumableItemInventory;
}

const ConsumableItemInventoryCard = ({ consumableItemInventory }: Props) => {
  const { consume } = useConsumeItem();

  const onClickHandler = () => {
    if (consumableItemInventory.quantity < 1) {
      toast.error('개수가 부족합니다.');
      return;
    }
    consume({ itemInventory: consumableItemInventory });
  };

  return (
    <Button
      variant={'outline'}
      onClick={onClickHandler}
      className={cn(
        'h-auto p-1 flex flex-col items-center justify-center text-xs font-semibold'
      )}
    >
      <img
        src={consumableItemInventory.item.image_url}
        alt={consumableItemInventory.item.name}
        className="p-2"
        onContextMenu={(e) => e.preventDefault()}
      />
      <div className="w-full flex flex-col items-center justify-between gap-1.5">
        <p className="w-full font-semibold truncate text-center">
          {consumableItemInventory.item.name}
        </p>
        <p className="flex items-center gap-1 text-foreground/60">
          {consumableItemInventory.quantity} 개
        </p>
      </div>
    </Button>
  );
};

export default ConsumableItemInventoryCard;
