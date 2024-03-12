import type { ICharacter } from '@/types/models/character.model';
import type { ApiSuccessResponse } from '../types/api-response';
import type { IPalette } from '@/types/models/palette.model';
import { springHttpRequest } from '../common/http-request';

// 음식 아이템 사용
export const consumeFoodItem = async (item_inventory_id: string) => {
  const response = await springHttpRequest.post<
    ApiSuccessResponse<{
      character_inventory_id: string;
      character: ICharacter;
    }>
  >(`/v2/item-inventory/${item_inventory_id}`);
  return response.data.data;
};

// 사용 아이템 사용
export const consumeConsumableItem = async (item_inventory_id: string) => {
  const response = await springHttpRequest.post<
    ApiSuccessResponse<{
      palette: IPalette;
    }>
  >(`/v2/item-inventory/${item_inventory_id}`);
  return response.data.data;
};
