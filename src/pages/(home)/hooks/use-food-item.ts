import { useState } from 'react';
import { toast } from 'sonner';

import type { IFoodItemInventory } from '@/types/models/item.model';
import { useConsumeFoodItemMutation } from '@/services/mutations/item-inventory-mutations';
import { useModalStore } from '@/stores/use-modal-store';

interface UseConsumeItemArgs {
  foodItemInventory: IFoodItemInventory;
}

export const useConsumeFoodItem = () => {
  const [isLoading, setIsLoading] = useState(false);
  const openModal = useModalStore((state) => state.openModal);
  const { mutateAsync: consumeFoodItem } = useConsumeFoodItemMutation();

  const consume = async ({ foodItemInventory }: UseConsumeItemArgs) => {
    if (isLoading) return;
    setIsLoading(true);

    try {
      const result = await consumeFoodItem({
        item_inventory_id: foodItemInventory.item_inventory_id,
      });
      openModal('characterAcquisition', result.character);
    } catch (error) {
      toast.error('아이템 사용 중 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  return { consume, isLoading };
};
