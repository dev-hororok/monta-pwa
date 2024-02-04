import { IConsumableItem, IFoodItem } from '@/models/item.model';
import { nestHttpRequest } from '../common/httpRequest';
import { ApiSuccessResponse } from '../interface/apiResponse.type';

// 상점 음식아이템 조회
export const fetchShopFoodItems = async () => {
  const response = await nestHttpRequest.get<
    ApiSuccessResponse<{ items: IFoodItem[] }>
  >(`/timer-api/items?item_type=${'Food'}`);
  return response.data.data.items;
};

// 상점 사용아이템 조회
export const fetchShopConsumableItems = async () => {
  const response = await nestHttpRequest.get<
    ApiSuccessResponse<{ items: IConsumableItem[] }>
  >(`/timer-api/items?item_type=${'Consumable'}`);
  return response.data.data.items;
};
