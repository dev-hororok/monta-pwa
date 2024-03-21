import { springHttpRequest } from '@/services/common/http-request';
import { ApiSuccessResponse } from '@/services/types/api-response';
import { IAdminCharacter } from './types/characters.model';

// 모든 캐릭터 조회
export const fetchAllCharacters = async () => {
  const response = await springHttpRequest.get<
    ApiSuccessResponse<{ characters: IAdminCharacter[] }>
  >('/admin/characters');
  return response.data.data.characters;
};

// 캐릭터 하나 조회
export const fetchCharacter = async (character_id: number) => {
  const response = await springHttpRequest.get<
    ApiSuccessResponse<{ getCharacterDto: IAdminCharacter }>
  >(`/admin/characters/${character_id}`);
  return response.data.data.getCharacterDto;
};

// 캐릭터 생성
export const createCharacter = async (body: {
  name: string;
  description: string;
  image_url: string;
  grade: string;
  sell_price: number;
}) => {
  const response = await springHttpRequest.post<
    ApiSuccessResponse<{ character_id: number }>
  >(`/admin/characters`, body);
  return response.data.data;
};

// 캐릭터 수정
export const editCharacter = async (
  character_id: number,
  body: {
    name?: string;
    description?: string;
    image_url?: string;
    grade?: string;
    sell_price?: number;
  }
) => {
  const response = await springHttpRequest.patch<ApiSuccessResponse<any>>(
    `/admin/characters/${character_id}`,
    body
  );
  return response.data.data;
};

// 캐릭터 삭제
export const deleteCharacter = async (character_id: number) => {
  const response = await springHttpRequest.delete<ApiSuccessResponse<any>>(
    `/admin/characters/${character_id}`
  );
  return response.data.data;
};
