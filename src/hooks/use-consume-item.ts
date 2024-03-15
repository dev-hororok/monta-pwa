import { useState } from 'react';
import { toast } from 'sonner';

import type { ItemInventory } from '@/types/models/item.model';
import { useModalStore } from '@/stores/use-modal-store';
import { useConsumeItemMutation } from '@/services/mutations/item-inventory-mutations';

interface UseConsumeItemArgs {
  itemInventory: ItemInventory;
}

export const useConsumeItem = () => {
  const [isLoading, setIsLoading] = useState(false);
  const openModal = useModalStore((state) => state.openModal);
  const { mutateAsync: consumeItem } = useConsumeItemMutation();

  const consume = async ({ itemInventory }: UseConsumeItemArgs) => {
    if (isLoading) return;
    if (itemInventory.item_type === 'Food' && 0 < itemInventory.progress) {
      toast.error('아직 아이템을 사용할 수 없습니다.');
      return;
    }
    if (itemInventory.quantity < 1) {
      toast.error('개수가 부족합니다.');
      return;
    }
    setIsLoading(true);
    try {
      const data = await consumeItem({
        item_inventory: itemInventory,
      });

      if (data.result === 'Character Acquisition') {
        openModal('characterAcquisition', {
          character: data.character,
        });
      } else if (data.result === 'Palette Acquisition') {
        openModal('paletteAcquisition', {
          palette: data.palette,
          consumableItemInventory: itemInventory,
        });
      } else if (data.result === 'Point Acquisition') {
        openModal('pointAcquisition', {
          earned_point: data.member.earned_point,
        });
      } else if (data.result === 'Point Box Acquisition') {
        openModal('consumableItemAcquisition', {
          item: data.item,
        });
      }
    } catch (error) {
      toast.error('아이템 사용 중 오류가 발생했습니다.');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return { consume, isLoading };
};
