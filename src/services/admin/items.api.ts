import { ItemType } from '@/types/models/item.model';
import { springHttpRequest } from '../common/http-request';
import { ApiSuccessResponse } from '../types/api-response';
import { type IAdminItem } from './types/item.model';

// 모든 아이템 조회
export const fetchAllItems = async () => {
  const response = await springHttpRequest.get<
    ApiSuccessResponse<{ items: IAdminItem[] }>
  >('v2/admin/items');
  return response.data.data.items;
};

// 아이템 하나 조회
export const fetchItem = async (itemId: number) => {
  const response = await springHttpRequest.get<
    ApiSuccessResponse<{ item: IAdminItem }>
  >(`v2/admin/items/${itemId}`);

  return response.data.data.item;
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

// 캐릭터 수정
export const editItem = async (
  itemId: number,
  body: {
    name?: string;
    description?: string;
    image_url?: string;
    cost?: number;
    effect_code?: number;
    required_study_time?: number;
    is_hidden?: boolean;
    item_type?: ItemType;
  }
) => {
  const response = await springHttpRequest.patch<ApiSuccessResponse<any>>(
    `v2/admin/items/${itemId}`,
    body
  );
  return response.data.data;
};

// 아이템 삭제
export const deleteItem = async (itemId: number) => {
  const response = await springHttpRequest.delete<ApiSuccessResponse<any>>(
    `v2/admin/items/${itemId}`
  );
  return response.data.data;
};
