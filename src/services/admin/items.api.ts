import { springHttpRequest } from '../common/http-request';
import { ApiSuccessResponse } from '../types/api-response';
import { IAdminItem } from './types/item.model';

// 모든 아이템 조회
export const fetchAllItems = async () => {
  const response = await springHttpRequest.get<
    ApiSuccessResponse<{ items: IAdminItem[] }>
  >('v2/admin/items');
  return response.data.data.items;
};

// 아이템 생성
export const createItem = async (
  body: Omit<IAdminItem, 'created_at' | 'updated_at' | 'item_id'>
) => {
  const response = await springHttpRequest.post<
    ApiSuccessResponse<{ item_id: number }>
  >(`v2/admin/items`, body);
  return response.data.data;
};
