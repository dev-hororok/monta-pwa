import { nestHttpRequest } from '../common/http-request';
import { ApiSuccessResponse } from '../types/api-response';

export const getNotificationPublicKey = async () => {
  const response = await nestHttpRequest.get<
    ApiSuccessResponse<{ public_key: string }>
  >('/timer-api/notification/public-key');

  return response.data.data.public_key;
};

export const enablePush = async (body: {
  member_id: string;
  device_type: string;
  notification_token: string;
}) => {
  const response = await nestHttpRequest.post<ApiSuccessResponse<null>>(
    `/timer-api/members/${body.member_id}/push/enable`,
    {
      device_type: body.device_type,
      notification_token: body.notification_token,
    }
  );
  return response.data.data;
};

export const disablePush = async (body: {
  member_id: string;
  device_type: string;
}) => {
  const response = await nestHttpRequest.post<ApiSuccessResponse<null>>(
    `/timer-api/members/${body.member_id}/push/disable`,
    {
      device_type: body.device_type,
    }
  );
  return response.data.data;
};
