import { useConsumeConsumableItemMutation } from '@/apis/mutations/itemInventoryMutations';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';
import { IConsumableItemInventory } from '@/models/item.model';
import { useModalStore } from '@/stores/useModalStore';
import { useState } from 'react';
import { useToast } from '../ui/use-toast';
import { IPalette } from '@/models/palette.model';

interface Props {
  consumableItemInventory: IConsumableItemInventory;
}

export const ConsumableItemInventoryCard = ({
  consumableItemInventory,
}: Props) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const openModal = useModalStore((state) => state.openModal);
  const { mutateAsync: consumeItem } = useConsumeConsumableItemMutation();

  const onClickHandler = async () => {
    if (isLoading) return;
    if (consumableItemInventory.quantity < 1) {
      toast({
        title: '개수가 부족합니다.',
      });
      return;
    }
    try {
      setIsLoading(true);
      const result = await consumeItem({
        item_inventory_id: consumableItemInventory.item_inventory_id,
      });
      setIsLoading(false);
      openModal<IPalette>('paletteAcquisition', result.palette);
    } catch (e) {
      console.log(e);
    }
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
