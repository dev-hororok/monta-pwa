import { useMutation, useQueryClient } from '@tanstack/react-query';

import {
  createStudyCategory,
  deleteStudyCategory,
  editStudyCategory,
} from '../services/study-category.api';
import { STUDY_CATEGORIES_QUERY_KEY } from '../queries/study-category-queries';

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
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [STUDY_CATEGORIES_QUERY_KEY],
      });
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

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [STUDY_CATEGORIES_QUERY_KEY],
      });
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
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [STUDY_CATEGORIES_QUERY_KEY],
      });
    },
  });
};
