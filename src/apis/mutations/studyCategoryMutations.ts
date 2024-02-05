import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  createStudyCategory,
  deleteStudyCategory,
  editStudyCategory,
} from '../services/studyCategory.api';
import { STUDY_CATEGORIES_QUERY_KEY } from '../queries/studyCategoryQueries';
import { IStudyCategory } from '@/models/study.model';

export const useCreateStudyCategoryMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      memberId,
      data,
    }: {
      memberId: string;
      data: { subject: string };
    }) => {
      return createStudyCategory(memberId, data);
    },
    // api 완료를 기다리지 않고 즉시적용
    onMutate: async (variables) => {
      await queryClient.cancelQueries({
        queryKey: [STUDY_CATEGORIES_QUERY_KEY, variables.memberId],
      });
      const optimisticCategory: IStudyCategory = {
        study_category_id: '-1',
        subject: variables.data.subject,
      };
      queryClient.setQueryData(
        [STUDY_CATEGORIES_QUERY_KEY, variables.memberId],
        (old: IStudyCategory[]) => [optimisticCategory, ...old]
      );
      return { optimisticCategory };
    },
    // 성공시 실제 데이터로 교체
    onSuccess: (result, variables, context) => {
      queryClient.setQueryData(
        [STUDY_CATEGORIES_QUERY_KEY, variables.memberId],
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
    onError: (_error, variables, context) => {
      queryClient.setQueryData(
        [STUDY_CATEGORIES_QUERY_KEY, variables.memberId],
        (old: IStudyCategory[]) => {
          return old.filter(
            (todo) =>
              todo.study_category_id !==
              context?.optimisticCategory.study_category_id
          );
        }
      );
    },
  });
};

export const useEditStudyCategoryMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      memberId,
      categoryId,
      data,
    }: {
      memberId: string;
      categoryId: string;
      data: { subject: string };
    }) => {
      return editStudyCategory(memberId, categoryId, data);
    },

    // 같은 이름이 존재O -> 현재 카테고리 제거
    // 같은 이름이 존재X -> 현재 카테고리 이름 수정
    onMutate: async (variables) => {
      await queryClient.cancelQueries({
        queryKey: [STUDY_CATEGORIES_QUERY_KEY, variables.memberId],
      });
      const previousCategories = queryClient.getQueryData<IStudyCategory[]>([
        STUDY_CATEGORIES_QUERY_KEY,
        variables.memberId,
      ]);
      // 같은 이름이 존재O
      if (
        previousCategories &&
        previousCategories
          .map((c) => c.subject)
          .includes(variables.data.subject)
      ) {
        queryClient.setQueryData(
          [STUDY_CATEGORIES_QUERY_KEY, variables.memberId],
          (old: IStudyCategory[]) =>
            old.filter((o) => o.study_category_id !== variables.categoryId)
        );
      } else {
        // 존재 x
        queryClient.setQueryData(
          [STUDY_CATEGORIES_QUERY_KEY, variables.memberId],
          (old: IStudyCategory[]) =>
            old.map((o) => {
              if (o.study_category_id === variables.categoryId) {
                return {
                  study_category_id: o.study_category_id,
                  subject: variables.data.subject,
                };
              }
              return o;
            })
        );
      }

      return { previousCategories };
    },
    // 성공시 현재 상태 유지
    onSuccess: () => {},
    // 실패시 이전 상태로 되돌아감
    onError: (_error, variables, context) => {
      queryClient.setQueryData(
        [STUDY_CATEGORIES_QUERY_KEY, variables.memberId],
        context ? context.previousCategories : []
      );
    },
  });
};

export const useDeleteStudyCategoryMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      memberId,
      categoryId,
    }: {
      memberId: string;
      categoryId: string;
    }) => {
      return deleteStudyCategory(memberId, categoryId);
    },
    onMutate: async (variables) => {
      await queryClient.cancelQueries({
        queryKey: [STUDY_CATEGORIES_QUERY_KEY, variables.memberId],
      });
      const previousCategories = queryClient.getQueryData([
        STUDY_CATEGORIES_QUERY_KEY,
        variables.memberId,
      ]);

      queryClient.setQueryData(
        [STUDY_CATEGORIES_QUERY_KEY, variables.memberId],
        (old: IStudyCategory[]) => [
          ...old.filter((c) => c.study_category_id !== variables.categoryId),
        ]
      );
      return { previousCategories };
    },
    // 성공시 아무일도 안함
    onSuccess: () => {},
    // 실패시 이전 카테고리로 되돌리기
    onError: (_error, variables, context) => {
      queryClient.setQueryData(
        [STUDY_CATEGORIES_QUERY_KEY, variables.memberId],
        context?.previousCategories
      );
    },
  });
};
