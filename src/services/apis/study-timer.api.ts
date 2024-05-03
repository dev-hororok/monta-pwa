import type { StudyRecordStatusType } from '@/types/models/study.model';
import type { ApiSuccessResponse } from '../types/api-response';
import { nestHttpRequest, springHttpRequest } from '../common/http-request';

// 스터디 타이머 시작
export const startStudyTimer = async () => {
  const response = await nestHttpRequest.post<ApiSuccessResponse<null>>(
    `/timer-api/study-timer/start`
  );
  return response.data.data;
};

// 스터디 타이머 종료
export const endStudyTimer = async (body: {
  status: StudyRecordStatusType;
}) => {
  const response = await nestHttpRequest.post<ApiSuccessResponse<null>>(
    `/timer-api/study-timer/end`,
    body
  );
  return response.data.data;
};

// 포인트 지급
export const rewardPoints = async (body: { point: number }) => {
  const response = await springHttpRequest.post<
    ApiSuccessResponse<{ total_point: number; reward_point: number }>
  >(`/transaction/reward`, body);
  return response.data.data;
};
