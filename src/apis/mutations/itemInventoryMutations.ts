import { useMutation, useQueryClient } from '@tanstack/react-query';
import { consumeFoodItem } from '../services/itemInventory.api';
import {
  CHARACTER_INVENTORY_QUERY_KEY,
  FOOD_INVENTORY_QUERY_KEY,
} from '../queries/memberQueries';
import { IFoodItemInventory } from '@/models/item.model';

// 음식 아이템 사용 (로딩 표시)
export const useConsumeFoodItemMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: { item_inventory_id: number }) => {
      return consumeFoodItem(data.item_inventory_id);
    },
    onSuccess: async (_result, variables) => {
      await queryClient.cancelQueries({
        queryKey: [FOOD_INVENTORY_QUERY_KEY],
      });
      await queryClient.cancelQueries({
        queryKey: [CHARACTER_INVENTORY_QUERY_KEY],
      });

      queryClient.setQueryData(
        [FOOD_INVENTORY_QUERY_KEY],
        (old: IFoodItemInventory[]) => {
          return old.filter(
            (o) => o.item_inventory_id !== variables.item_inventory_id
          );
        }
      );
    },
  });
};
