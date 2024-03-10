import { nestHttpRequest } from '../common/http-request';
import { ApiSuccessResponse } from '../types/api-response';

export const deleteAccount = async () => {
  const response = await nestHttpRequest.delete<ApiSuccessResponse<null>>(
    `/timer-api/auth/me`
  );
  return response.data.data;
};
