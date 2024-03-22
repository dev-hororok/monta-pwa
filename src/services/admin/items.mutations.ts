import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createItem, deleteItem, editItem } from './items.api';
import {
  ADMIN_ALL_ITEMS_QUERY_KEY,
  ADMIN_ITEM_QUERY_KEY,
} from './items.queries';
import { IAdminItem } from './types/item.model';
import { type ItemType } from '@/types/models/item.model';

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

// 아이템 정보 수정
export const useEditItemMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      itemId,
      body,
    }: {
      itemId: number;
      body: {
        name?: string;
        description?: string;
        image_url?: string;
        cost?: number;
        effect_code?: number;
        required_study_time?: number;
        is_hidden?: boolean;
        item_type?: ItemType;
      };
    }) => {
      return editItem(itemId, body);
    },

    onSuccess: async (_, variables) => {
      await queryClient.invalidateQueries({
        queryKey: [ADMIN_ITEM_QUERY_KEY, variables.itemId],
      });
      await queryClient.invalidateQueries({
        queryKey: [ADMIN_ALL_ITEMS_QUERY_KEY],
      });
    },
  });
};

// 아이템 삭제
export const useDeleteItemMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ itemId }: { itemId: number }) => {
      return deleteItem(itemId);
    },

    onSuccess: async (_, variables) => {
      queryClient.removeQueries({
        queryKey: [ADMIN_ITEM_QUERY_KEY, variables.itemId],
      });
      await queryClient.invalidateQueries({
        queryKey: [ADMIN_ALL_ITEMS_QUERY_KEY],
      });
    },
  });
};
