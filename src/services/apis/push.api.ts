import { nestHttpRequest } from '../common/http-request';
import { ApiSuccessResponse } from '../types/api-response';

// VAPID 퍼블릭 키 조회
export const getNotificationPublicKey = async () => {
  const response = await nestHttpRequest.get<
    ApiSuccessResponse<{ public_key: string }>
  >('/timer-api/notification/public-key');

  return response.data.data.public_key;
};

// 웹 푸시 알림 활성화
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

// 웹 푸시 알림 비활성화
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

// 뽀모도로 타이머 알림 예약
export const scheduleTimer = async (body: {
  timerType: 'Work' | 'Rest';
  targetSeconds: number;
}) => {
  const response = await nestHttpRequest.post<ApiSuccessResponse<null>>(
    `/timer-api/study-timer/schedule`,
    body
  );
  return response.data.data;
};

// 뽀모도로 타이머 알림 취소
export const cancelTimerSchedule = async () => {
  const response = await nestHttpRequest.post<ApiSuccessResponse<null>>(
    `/timer-api/study-timer/cancel`
  );
  return response.data.data;
};
