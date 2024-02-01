import { IStudyCategory } from '@/models/study.model';
import { nestHttpRequest } from '../common/httpRequest';
import { ApiSuccessResponse } from '../interface/apiResponse.type';

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
