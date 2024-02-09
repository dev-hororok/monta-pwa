import {
  fetchCharacterInventory,
  fetchConsumableInventory,
  fetchCurrentMember,
  fetchFoodInventory,
  fetchStudyRecords,
  fetchStudyStreak,
} from '@/apis/services/member.api';
import { useQuery } from '@tanstack/react-query';

// 현재유저 조회
export const CURRENT_MEMBER_QUERY_KEY = 'currentUser';
export const useCurrentMemberQuery = () => {
  return useQuery({
    queryKey: [CURRENT_MEMBER_QUERY_KEY],
    queryFn: () => fetchCurrentMember(),
    staleTime: 10 * 60 * 1000,
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

// 공부 기록 조회
export const STUDY_RECORDS_QUERY_KEY = 'studyRecords';
export const useStudyRecordsQuery = (memberId: string) => {
  return useQuery({
    queryKey: [STUDY_RECORDS_QUERY_KEY],
    queryFn: () => fetchStudyRecords(memberId),
    staleTime: 10 * 60 * 1000,
    enabled: !!memberId,
  });
};
