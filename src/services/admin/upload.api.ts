import { nestHttpRequest } from '../common/http-request';
import { ApiSuccessResponse } from '../types/api-response';

export const uploadFile = async (formData: FormData) => {
  const response = await nestHttpRequest.post<ApiSuccessResponse<string>>(
    `/timer-api/uploads/file`,
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }
  );
  return response.data.data;
};
