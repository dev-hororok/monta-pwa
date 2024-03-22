import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createItem } from './items.api';
import { ADMIN_ALL_ITEMS_QUERY_KEY } from './items.queries';
import { IAdminItem } from './types/item.model';

// 아이템 생성
export const useCreateItemMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      body,
    }: {
      body: Omit<IAdminItem, 'created_at' | 'updated_at' | 'item_id'>;
    }) => {
      return createItem(body);
    },

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [ADMIN_ALL_ITEMS_QUERY_KEY],
      });
    },
  });
};
