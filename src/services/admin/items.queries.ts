import { useQuery } from '@tanstack/react-query';
import { fetchAllItems } from './items.api';

// 모든 캐릭터 조회
export const ADMIN_ALL_ITEMS_QUERY_KEY = 'adminAllItems';
export const useAdminAllItemsQuery = () => {
  return useQuery({
    queryKey: [ADMIN_ALL_ITEMS_QUERY_KEY],
    queryFn: () => fetchAllItems(),
    staleTime: 10 * 60 * 1000,
  });
};
