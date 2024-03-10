import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteAccount } from '../services/auth.api';
import { useAuthStore } from '@/stores/auth-store';

export const useDeleteAccountMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => {
      return deleteAccount();
    },

    onSuccess: async () => {
      queryClient.clear();
      useAuthStore.getState().logout();
    },
  });
};
