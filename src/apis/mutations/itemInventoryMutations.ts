import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  consumeConsumableItem,
  consumeFoodItem,
} from '../services/itemInventory.api';
import {
  CONSUMABLE_INVENTORY_QUERY_KEY,
  FOOD_INVENTORY_QUERY_KEY,
  STUDY_STREAK_QUERY_KEY,
} from '../queries/memberQueries';
import {
  IConsumableItemInventory,
  IFoodItemInventory,
} from '@/models/item.model';
import { IStudyStreak } from '@/models/streak.model';

// 음식 아이템 사용
export const useConsumeFoodItemMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: { item_inventory_id: string }) => {
      return consumeFoodItem(data.item_inventory_id);
    },

    onSuccess: async (_result, variables) => {
      queryClient.setQueryData(
        [FOOD_INVENTORY_QUERY_KEY],
        (old: IFoodItemInventory[] | null) => {
          if (!old) return [];
          return old.filter(
            (o) => o.item_inventory_id !== variables.item_inventory_id
          );
        }
      );
    },
  });
};

// 사용 아이템 사용
export const useConsumeConsumableItemMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: { item_inventory_id: string }) => {
      return consumeConsumableItem(data.item_inventory_id);
    },
    onSuccess: async (result, variables) => {
      // await queryClient.cancelQueries({
      //   queryKey: [STUDY_STREAK_QUERY_KEY],
      // });

      queryClient.setQueryData(
        [CONSUMABLE_INVENTORY_QUERY_KEY],
        (old: IConsumableItemInventory[] | null) => {
          if (!old) return [];
          return old.map((inven) => {
            if (inven.item_inventory_id === variables.item_inventory_id) {
              return {
                ...inven,
                quantity: inven.quantity - 1,
              };
            }
            return inven;
          });
        }
      );
      queryClient.setQueryData(
        [STUDY_STREAK_QUERY_KEY],
        (old: IStudyStreak | null) => {
          if (!old) return null;
          console.log(old);
          return {
            ...old,
            palette: result.palette,
          };
        }
      );
    },
  });
};
