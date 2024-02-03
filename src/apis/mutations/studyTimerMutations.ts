import { useMutation, useQueryClient } from '@tanstack/react-query';
import { endStudyTimer, startStudyTimer } from '../services/studyTimer.api';
import { FOOD_INVENTORY_QUERY_KEY } from '../queries/memberQueries';
import { IFoodItemInventory } from '@/models/item.model';

export const useStartStudyTimerMutation = () => {
  return useMutation({
    mutationFn: (body: { category_id?: string }) => {
      return startStudyTimer(body);
    },
  });
};

export const useEndStudyTimerMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (duration: number) => {
      console.log(duration);
      return endStudyTimer();
    },
    // 음식 남은시간 즉시적용
    onMutate: async (variables) => {
      await queryClient.cancelQueries({
        queryKey: [FOOD_INVENTORY_QUERY_KEY],
      });
      queryClient.setQueryData(
        [FOOD_INVENTORY_QUERY_KEY],
        (old: IFoodItemInventory[]) => {
          return old.map((category) => {
            const rest = category.progress - variables;
            category.progress = 0 < rest ? rest : 0;
            return category;
          });
        }
      );
    },
    // 실패시 즉시적용된 데이터 취소
    onError: (_error, variables) => {
      queryClient.setQueryData(
        [FOOD_INVENTORY_QUERY_KEY],
        (old: IFoodItemInventory[]) => {
          return old.map((inventory) => {
            const prevProgress = inventory.progress + variables;
            inventory.progress = prevProgress;
            return inventory;
          });
        }
      );
    },
  });
};
