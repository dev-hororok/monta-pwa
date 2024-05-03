import { useMutation, useQueryClient } from '@tanstack/react-query';

import {
  endStudyTimer,
  rewardPoints,
  startStudyTimer,
} from '../apis/study-timer.api';
import {
  CURRENT_MEMBER_QUERY_KEY,
  FOOD_INVENTORY_QUERY_KEY,
  STATISTIC_DAILY,
  STATISTIC_HEAT_MAP,
  STATISTIC_MONTHLY,
} from '../queries/member-queries';
import type { StudyRecordStatusType } from '@/types/models/study.model';
import { cancelTimerSchedule, scheduleTimer } from '../apis/push.api';
import { IMember } from '@/types/models/member.model';

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

// 포인트 지급
export const useRewardPointMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (seconds: number) => {
      const point = Math.floor(seconds / 60) * 9;
      return rewardPoints({ point });
    },
    onSuccess: async (data) => {
      queryClient.setQueryData(
        [CURRENT_MEMBER_QUERY_KEY],
        (old: IMember | null) => {
          if (!old) return old;
          return {
            ...old,
            point: data.total_point,
          };
        }
      );
    },
  });
};
