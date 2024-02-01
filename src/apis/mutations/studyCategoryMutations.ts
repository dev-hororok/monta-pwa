import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  createStudyCategory,
  deleteStudyCategory,
  editStudyCategory,
} from '../services/studyCategory.api';
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
        (old: IStudyCategory[]) => [optimisticCategory, ...old]
      );
      return { optimisticCategory };
    },
    // 성공시 실제 데이터로 교체
    onSuccess: (result, _variables, context) => {
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
    onError: (_error, _variables, context) => {
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
  });
};

export const useEditStudyCategoryMutation = (
  memberId: string,
  categoryId: number
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ data }: { data: { subject: string } }) => {
      return editStudyCategory(memberId, categoryId, data);
    },
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
        (old: IStudyCategory[]) => [
          optimisticCategory,
          ...old.filter(
            (c) =>
              c.study_category_id !== categoryId &&
              c.subject !== variables.data.subject
          ),
        ]
      );
      return { optimisticCategory };
    },
    // 성공시 실제 데이터로 교체
    onSuccess: (result, _variables, context) => {
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
    onError: (_error, _variables, context) => {
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
  });
};

export const useDeleteStudyCategoryMutation = (
  memberId: string,
  categoryId: number
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => {
      return deleteStudyCategory(memberId, categoryId);
    },
    onMutate: async () => {
      await queryClient.cancelQueries({
        queryKey: [STUDY_CATEGORIES_QUERY_KEY, memberId],
      });
      const previousCategories = queryClient.getQueryData([
        STUDY_CATEGORIES_QUERY_KEY,
        memberId,
      ]);

      queryClient.setQueryData(
        [STUDY_CATEGORIES_QUERY_KEY, memberId],
        (old: IStudyCategory[]) => [
          ...old.filter((c) => c.study_category_id !== categoryId),
        ]
      );
      return { previousCategories };
    },
    // 성공시 아무일도 안함
    onSuccess: () => {},
    // 실패시 이전 카테고리로 되돌리기
    onError: (_error, _variables, context) => {
      queryClient.setQueryData(
        [STUDY_CATEGORIES_QUERY_KEY, memberId],
        context?.previousCategories
      );
    },
  });
};
