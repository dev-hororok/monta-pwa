import { useMutation, useQueryClient } from '@tanstack/react-query';

import { endStudyTimer, startStudyTimer } from '../apis/study-timer.api';
import {
  FOOD_INVENTORY_QUERY_KEY,
  STATISTIC_DAILY,
  STATISTIC_HEAT_MAP,
  STATISTIC_MONTHLY,
} from '../queries/member-queries';
import type { StudyRecordStatusType } from '@/types/models/study.model';
import { cancelTimerSchedule, scheduleTimer } from '../apis/push.api';

// 타이머 시작 시간 기록
export const useStartStudyTimerMutation = () => {
  return useMutation({
    mutationFn: () => {
      return startStudyTimer();
    },
  });
};

// 타이머 종료 시간 기록
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

// 뽀모도로 타이머 알림 예약
export const useScheduleTimerMutation = () => {
  return useMutation({
    mutationFn: (body: {
      timerType: 'Work' | 'Rest';
      targetSeconds: number;
    }) => {
      return scheduleTimer(body);
    },
  });
};

// 뽀모도로 타이머 알림 예약 취소
export const useCancelScheduleTimerMutation = () => {
  return useMutation({
    mutationFn: () => {
      return cancelTimerSchedule();
    },
  });
};
