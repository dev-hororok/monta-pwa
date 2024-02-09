import { fetchStudyCategory } from '@/apis/services/studyCategory.api';
import { useQuery } from '@tanstack/react-query';

// 유저 카테고리 조회
export const STUDY_CATEGORIES_QUERY_KEY = 'studyCategories';
export const useStudyCategoriesQuery = (memberId?: string) => {
  return useQuery({
    queryKey: [STUDY_CATEGORIES_QUERY_KEY],
    queryFn: () => fetchStudyCategory(memberId),
    staleTime: 10 * 60 * 1000,
    enabled: !!memberId,
  });
};
