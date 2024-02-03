import { nestHttpRequest } from '../common/httpRequest';
import { ApiSuccessResponse } from '../interface/apiResponse.type';

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
export const endStudyTimer = async () => {
  const response = await nestHttpRequest.post<ApiSuccessResponse<null>>(
    `/timer-api/study-timer/end`
  );
  return response.data.data;
};
