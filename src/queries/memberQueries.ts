import {
  fetchCharacterInventory,
  fetchCurrentMember,
  fetchEggInventory,
  fetchMemberStatistic,
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

// 보유중인 알 조회
export const EGG_INVENTORY_QUERY_KEY = 'eggInventory';
export const useEggInventoryQuery = (memberId: string) => {
  return useQuery({
    queryKey: [CURRENT_MEMBER_QUERY_KEY, memberId],
    queryFn: () => fetchEggInventory(memberId),
    staleTime: 10 * 60 * 1000,
    enabled: !!memberId,
  });
};

// 보유중인 캐릭터 조회
export const CHARACTER_INVENTORY_QUERY_KEY = 'characterInventory';
export const useCharacterInventoryQuery = (memberId: string) => {
  return useQuery({
    queryKey: [CHARACTER_INVENTORY_QUERY_KEY, memberId],
    queryFn: () => fetchCharacterInventory(memberId),
    staleTime: 10 * 60 * 1000,
    enabled: !!memberId,
  });
};

// 스트릭 조회
export const STUDY_STREAK_QUERY_KEY = 'studyStreak';
export const useStudyStreakQuery = (memberId: string) => {
  return useQuery({
    queryKey: [STUDY_STREAK_QUERY_KEY, memberId],
    queryFn: () => fetchStudyStreak(memberId),
    staleTime: 10 * 60 * 1000,
    enabled: !!memberId,
  });
};

// 공부 기록 조회
export const STUDY_RECORDS_QUERY_KEY = 'studyRecords';
export const useStudyRecordsQuery = (memberId: string) => {
  return useQuery({
    queryKey: [STUDY_RECORDS_QUERY_KEY, memberId],
    queryFn: () => fetchStudyRecords(memberId),
    staleTime: 10 * 60 * 1000,
    enabled: !!memberId,
  });
};

// 유저 통계 조회
export const MEMBER_STATISTIC_QUERY_KEY = 'statistic';
export const useMemberStatisticQuery = (memberId: string) => {
  return useQuery({
    queryKey: [MEMBER_STATISTIC_QUERY_KEY, memberId],
    queryFn: () => fetchMemberStatistic(memberId),
    staleTime: 10 * 60 * 1000,
    enabled: !!memberId,
  });
};
