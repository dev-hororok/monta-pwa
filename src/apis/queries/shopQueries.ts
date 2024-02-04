import { useQuery } from '@tanstack/react-query';
import {
  fetchShopConsumableItems,
  fetchShopFoodItems,
} from '../services/shop.api';

// 상점 음식 아이템 조회
export const SHOP_FOOD_ITEMS_QUERY_KEY = 'shopFoodItems';
export const useShopFoodItemsQuery = () => {
  return useQuery({
    queryKey: [SHOP_FOOD_ITEMS_QUERY_KEY],
    queryFn: fetchShopFoodItems,
    staleTime: 60 * 60 * 1000,
  });
};

// 상점 사용 아이템 조회
export const SHOP_CONSUMABLE_ITEMS_QUERY_KEY = 'shopConsumableItems';
export const useShopConsumableItemsQuery = () => {
  return useQuery({
    queryKey: [SHOP_CONSUMABLE_ITEMS_QUERY_KEY],
    queryFn: fetchShopConsumableItems,
    staleTime: 60 * 60 * 1000,
  });
};
