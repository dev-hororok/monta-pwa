import { nestHttpRequest, springHttpRequest } from '../common/http-request';
import type { ApiSuccessResponse } from '../types/api-response';
import type { IConsumableItem, IFoodItem } from '@/models/item.model';
import type { ITransactionRecord } from '@/models/transaction.model';

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

// 상점 구매
export const purchaseItem = async (body: {
  item_id: number;
  count: number;
}) => {
  const response = await springHttpRequest.post<
    ApiSuccessResponse<{ transaction_record: ITransactionRecord }>
  >(`/v2/shop/purchase`, {
    item_id: body.item_id,
    count: body.count,
  });
  return response.data.data.transaction_record;
};

// 상점 캐릭터 판매
export const sellCharacter = async (body: {
  character_inventory_id: string;
  count: number;
}) => {
  const response = await springHttpRequest.post<
    ApiSuccessResponse<{ transaction_record: ITransactionRecord }>
  >(`/v2/shop/sell`, {
    character_inventory_id: body.character_inventory_id,
    count: body.count,
  });
  return response.data.data.transaction_record;
};
