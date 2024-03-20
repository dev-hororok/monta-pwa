import { springHttpRequest } from '@/services/common/http-request';
import { ApiSuccessResponse } from '@/services/types/api-response';
import { IAdminCharacter } from './types/characters.model';

// 현재유저 계정 조회
export const fetchAllCharacters = async () => {
  const response = await springHttpRequest.get<
    ApiSuccessResponse<{ characters: IAdminCharacter[] }>
  >('/admin/characters');
  return response.data.data.characters;
};
