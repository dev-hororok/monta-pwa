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
