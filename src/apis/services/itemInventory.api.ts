import { ICharacter } from '@/models/character.model';
import { springHttpRequest } from '../common/httpRequest';
import { ApiSuccessResponse } from '../interface/apiResponse.type';
import { IPalette } from '@/models/palette.model';

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
