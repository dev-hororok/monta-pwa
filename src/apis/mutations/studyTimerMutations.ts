import { useMutation, useQueryClient } from '@tanstack/react-query';
import { endStudyTimer, startStudyTimer } from '../services/studyTimer.api';
import { FOOD_INVENTORY_QUERY_KEY } from '../queries/memberQueries';
import { IFoodItemInventory } from '@/models/item.model';
import { StudyRecordStatusType } from '@/models/study.model';

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
    mutationFn: ({
      status,
    }: {
      status: StudyRecordStatusType;
      duration: number;
    }) => {
      return endStudyTimer({ status });
    },
    // 음식 남은시간 즉시적용
    onMutate: async (variables) => {
      await queryClient.cancelQueries({
        queryKey: [FOOD_INVENTORY_QUERY_KEY],
      });
      queryClient.setQueryData(
        [FOOD_INVENTORY_QUERY_KEY],
        (old: IFoodItemInventory[] | null) => {
          if (!old) return [];

          return old.map((item) => {
            const rest = item.progress - variables.duration;
            return {
              ...item,
              progress: (item.progress = 0 < rest ? rest : 0),
            };
          });
        }
      );
    },
    // 실패시 즉시적용된 데이터 취소
    onError: (_error, variables) => {
      queryClient.setQueryData(
        [FOOD_INVENTORY_QUERY_KEY],
        (old: IFoodItemInventory[] | null) => {
          if (!old) return [];
          return old.map((inventory) => {
            const prevProgress = inventory.progress + variables.duration;
            inventory.progress = prevProgress;
            return inventory;
          });
        }
      );
    },
  });
};
