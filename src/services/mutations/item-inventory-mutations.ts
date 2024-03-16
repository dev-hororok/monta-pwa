import { useMutation, useQueryClient } from '@tanstack/react-query';

import {
  CHARACTER_INVENTORY_QUERY_KEY,
  CONSUMABLE_INVENTORY_QUERY_KEY,
  CURRENT_MEMBER_QUERY_KEY,
  FOOD_INVENTORY_QUERY_KEY,
  STUDY_STREAK_QUERY_KEY,
} from '../queries/member-queries';
import { consumeItem } from '../apis/item-inventory.api';
import { IMember } from '@/types/models/member.model';
import { ItemInventory } from '@/types/models/item.model';

// 아이템 사용
export const useConsumeItemMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: { item_inventory: ItemInventory }) => {
      return consumeItem(data.item_inventory.item_inventory_id);
    },

    onSuccess: async (data, variables) => {
      if (variables.item_inventory.item_type === 'Food') {
        await queryClient.invalidateQueries({
          queryKey: [FOOD_INVENTORY_QUERY_KEY],
        });
      } else if (variables.item_inventory.item_type === 'Consumable') {
        await queryClient.invalidateQueries({
          queryKey: [CONSUMABLE_INVENTORY_QUERY_KEY],
        });
      }

      // 캐릭터 획득
      if (data.result === 'Character Acquisition') {
        await queryClient.invalidateQueries({
          queryKey: [CHARACTER_INVENTORY_QUERY_KEY],
        });
        // 팔레트 변경
      } else if (data.result === 'Palette Acquisition') {
        await queryClient.invalidateQueries({
          queryKey: [STUDY_STREAK_QUERY_KEY],
        });
        // 포인트 획득
      } else if (data.result === 'Point Acquisition') {
        queryClient.setQueryData(
          [CURRENT_MEMBER_QUERY_KEY],
          (old: IMember | null) => {
            if (!old) return old;
            return {
              ...old,
              point: data.member.point,
            };
          }
        );
        // 포인트 박스 획득
      } else if (data.result === 'Consumable Item Acquisition') {
        await queryClient.invalidateQueries({
          queryKey: [CONSUMABLE_INVENTORY_QUERY_KEY],
        });
      }
    },
  });
};
