import { useQuery } from '@tanstack/react-query';

import {
  fetchCharacterInventory,
  fetchConsumableInventory,
  fetchCurrentMember,
  fetchDailyStatistic,
  fetchFoodInventory,
  fetchMonthlyStatistic,
  fetchStatisticHeatMap,
  fetchStudyStreak,
} from '@/services/apis/member.api';
import { useAuthStore } from '@/stores/auth-store';

// 현재유저 조회
export const CURRENT_MEMBER_QUERY_KEY = 'currentUser';
export const useCurrentMemberQuery = () => {
  return useQuery({
    queryKey: [CURRENT_MEMBER_QUERY_KEY],
    queryFn: () => fetchCurrentMember(),
    staleTime: 10 * 60 * 1000,
    enabled: !!useAuthStore.getState().isLoggedIn,
  });
};

// 보유중인 음식 조회
export const FOOD_INVENTORY_QUERY_KEY = 'foodInventory';
export const useFoodInventoryQuery = (memberId: string) => {
  return useQuery({
    queryKey: [FOOD_INVENTORY_QUERY_KEY],
    queryFn: () => fetchFoodInventory(memberId),
    staleTime: 10 * 60 * 1000,
    enabled: !!memberId,
  });
};

// 보유중인 사용아이템 조회
export const CONSUMABLE_INVENTORY_QUERY_KEY = 'consumableInventory';
export const useConsumableInventoryQuery = (memberId: string) => {
  return useQuery({
    queryKey: [CONSUMABLE_INVENTORY_QUERY_KEY],
    queryFn: () => fetchConsumableInventory(memberId),
    staleTime: 10 * 60 * 1000,
    enabled: !!memberId,
  });
};

// 보유중인 캐릭터 조회
export const CHARACTER_INVENTORY_QUERY_KEY = 'characterInventory';
export const useCharacterInventoryQuery = (memberId: string) => {
  return useQuery({
    queryKey: [CHARACTER_INVENTORY_QUERY_KEY],
    queryFn: () => fetchCharacterInventory(memberId),
    staleTime: 10 * 60 * 1000,
    enabled: !!memberId,
  });
};

// 스트릭 조회
export const STUDY_STREAK_QUERY_KEY = 'studyStreak';
export const useStudyStreakQuery = (memberId: string) => {
  return useQuery({
    queryKey: [STUDY_STREAK_QUERY_KEY],
    queryFn: () => fetchStudyStreak(memberId),
    staleTime: 10 * 60 * 1000,
    enabled: !!memberId,
  });
};

// 공부 통계 조회(daily)
export const STATISTIC_DAILY = 'statisticDaily';
export const useDailyStatisticQuery = (memberId: string, dateStr: string) => {
  return useQuery({
    queryKey: [STATISTIC_DAILY, dateStr],
    queryFn: () => fetchDailyStatistic(memberId, dateStr),
    staleTime: 24 * 60 * 1000,
    enabled: !!memberId,
  });
};

// 공부 통계 조회(monthly)
export const STATISTIC_MONTHLY = 'statisticMonthly';
export const useMonthlyStatisticQuery = (
  memberId: string,
  year: number | null,
  month: number | null
) => {
  return useQuery({
    queryKey: [STATISTIC_MONTHLY, year, month],
    queryFn: () => {
      if (!memberId || year === null || month === null) return;
      return fetchMonthlyStatistic(memberId, year, month);
    },
    staleTime: 24 * 60 * 1000,
    enabled: !!memberId && !!year && !!month,
  });
};

// 공부 통계 조회(heat-map)
export const STATISTIC_HEAT_MAP = 'statisticHeatMap';
export const useStatisticHeatMapQuery = (
  memberId: string,
  start: string,
  end: string
) => {
  return useQuery({
    queryKey: [STATISTIC_HEAT_MAP, start, end],
    queryFn: () => fetchStatisticHeatMap(memberId, start, end),
    staleTime: 24 * 60 * 1000,
    enabled: !!memberId,
  });
};
