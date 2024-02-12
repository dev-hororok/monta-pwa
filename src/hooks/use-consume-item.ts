import { useState } from 'react';
import { toast } from 'sonner';

import type { IPalette } from '@/models/palette.model';
import type { IConsumableItemInventory } from '@/models/item.model';
import { useConsumeConsumableItemMutation } from '@/apis/mutations/itemInventoryMutations';
import { useModalStore } from '@/stores/use-modal-store';

interface UseConsumeItemArgs {
  itemInventory: IConsumableItemInventory;
}

export const useConsumeItem = () => {
  const [isLoading, setIsLoading] = useState(false);
  const openModal = useModalStore((state) => state.openModal);
  const { mutateAsync: consumeItem } = useConsumeConsumableItemMutation();

  const consume = async ({ itemInventory }: UseConsumeItemArgs) => {
    if (isLoading) return;
    setIsLoading(true);

    try {
      const result = await consumeItem({
        item_inventory_id: itemInventory.item_inventory_id,
      });
      openModal<{
        palette: IPalette;
        consumableItemInventory: IConsumableItemInventory;
      }>('paletteAcquisition', {
        palette: result.palette,
        consumableItemInventory: itemInventory,
      });
    } catch (e) {
      toast.error('오류가 발생했습니다.');
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  return { consume, isLoading };
};
