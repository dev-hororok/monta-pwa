import { useMutation, useQueryClient } from '@tanstack/react-query';

import { endStudyTimer, startStudyTimer } from '../services/study-timer.api';
import {
  FOOD_INVENTORY_QUERY_KEY,
  STATISTIC_DAILY,
  STATISTIC_HEAT_MAP,
  STATISTIC_MONTHLY,
} from '../queries/member-queries';
import type { StudyRecordStatusType } from '@/models/study.model';

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
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [FOOD_INVENTORY_QUERY_KEY],
      });
      await queryClient.invalidateQueries({
        queryKey: [STATISTIC_DAILY],
      });
      await queryClient.invalidateQueries({
        queryKey: [STATISTIC_MONTHLY],
      });
      await queryClient.invalidateQueries({
        queryKey: [STATISTIC_HEAT_MAP],
      });
    },
  });
};
