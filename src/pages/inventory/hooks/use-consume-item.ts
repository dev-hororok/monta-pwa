import { useState } from 'react';
import { toast } from 'sonner';

import type { IConsumableItemInventory } from '@/types/models/item.model';
import { useConsumeConsumableItemMutation } from '@/services/mutations/item-inventory-mutations';
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
      openModal('paletteAcquisition', {
        palette: result.palette,
        consumableItemInventory: itemInventory,
      });
    } catch (error) {
      toast.error('아이템 사용 중 오류가 발생했습니다.');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return { consume, isLoading };
};
