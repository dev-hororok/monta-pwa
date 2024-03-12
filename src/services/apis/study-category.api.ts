import { nestHttpRequest } from '../common/http-request';
import type { IStudyCategory } from '@/types/models/study.model';
import type { ApiSuccessResponse } from '../types/api-response';

// 유저 공부 카테고리 조회
export const fetchStudyCategory = async (memberId?: string) => {
  if (!memberId) return [];
  const response = await nestHttpRequest.get<
    ApiSuccessResponse<{ study_categories: IStudyCategory[] }>
  >(`/timer-api/members/${memberId}/study-categories`);
  return response.data.data.study_categories;
};

// 유저 공부 카테고리 생성
export const createStudyCategory = async (
  memberId: string,
  newCategoryData: { subject: string }
) => {
  const response = await nestHttpRequest.post<
    ApiSuccessResponse<{ category: IStudyCategory }>
  >(`/timer-api/members/${memberId}/study-categories`, newCategoryData);
  return response.data.data.category;
};

// 유저 공부 카테고리 수정
export const editStudyCategory = async (
  memberId: string,
  categoryId: string,
  updatedCategoryData: { subject: string }
) => {
  const response = await nestHttpRequest.patch<ApiSuccessResponse<null>>(
    `/timer-api/members/${memberId}/study-categories/${categoryId}`,
    updatedCategoryData
  );
  return response.data.data;
};

// 유저 공부 카테고리 삭제
export const deleteStudyCategory = async (
  memberId: string,
  categoryId: string
) => {
  const response = await nestHttpRequest.delete<ApiSuccessResponse<null>>(
    `/timer-api/members/${memberId}/study-categories/${categoryId}`
  );
  return response.data.data;
};
