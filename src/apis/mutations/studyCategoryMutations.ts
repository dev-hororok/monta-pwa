import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createStudyCategory } from '../services/studyCategory.api';
import { STUDY_CATEGORIES_QUERY_KEY } from '../queries/studyCategoryQueries';
import { IStudyCategory } from '@/models/study.model';

export const useCreateStudyCategoryMutation = (memberId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ data }: { data: { subject: string } }) => {
      return createStudyCategory(memberId, data);
    },
    // api 완료를 기다리지 않고 즉시적용
    onMutate: async (variables) => {
      await queryClient.cancelQueries({
        queryKey: [STUDY_CATEGORIES_QUERY_KEY, memberId],
      });
      const optimisticCategory: IStudyCategory = {
        study_category_id: -1,
        subject: variables.data.subject,
      };
      queryClient.setQueryData(
        [STUDY_CATEGORIES_QUERY_KEY, memberId],
        (old: IStudyCategory[]) => [...old, optimisticCategory]
      );
      return { optimisticCategory };
    },
    // 성공시 실제 데이터로 교체
    onSuccess: (result, variables, context) => {
      queryClient.setQueryData(
        [STUDY_CATEGORIES_QUERY_KEY, memberId],
        (old: IStudyCategory[]) => {
          return old.map((category) =>
            category.study_category_id ===
            context.optimisticCategory.study_category_id
              ? result
              : category
          );
        }
      );
    },
    // 실패시 즉시적용된 데이터 제거
    onError: (error, variables, context) => {
      queryClient.setQueryData(
        [STUDY_CATEGORIES_QUERY_KEY, memberId],
        (old: IStudyCategory[]) => {
          return old.filter(
            (todo) =>
              todo.study_category_id !==
              context?.optimisticCategory.study_category_id
          );
        }
      );
    },
    retry: 3,
  });
};
