import type { StudyRecordStatusType } from '@/models/study.model';
import type { ApiSuccessResponse } from '../types/api-response';
import { nestHttpRequest } from '../common/http-request';

// 스터디 타이머 시작
export const startStudyTimer = async (body: { category_id?: string }) => {
  const response = await nestHttpRequest.post<ApiSuccessResponse<null>>(
    `/timer-api/study-timer/start`,
    {
      category_id: body.category_id ? Number(body.category_id) : null,
    }
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
