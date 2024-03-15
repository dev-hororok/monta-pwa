import type { ApiSuccessResponse } from '../types/api-response';
import { springHttpRequest } from '../common/http-request';
import { ConsumeItemResponseData } from '../types/consume-response';

// 음식 아이템 사용
export const consumeItem = async (item_inventory_id: string) => {
  const response = await springHttpRequest.post<
    ApiSuccessResponse<ConsumeItemResponseData>
  >(`/v2/item-inventory/${item_inventory_id}`);

  return response.data.data;
};
