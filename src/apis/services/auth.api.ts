import axios from 'axios';
import { nestHttpRequest } from '../common/http-request';
import { ApiSuccessResponse } from '../types/api-response';
import { AuthResponseData } from '../types/auth-response';
import { API_URL_NEST } from '@/constants/constants';

// 이메일 로그인
export const emailLogin = async (credentials: {
  email: string;
  password: string;
}) => {
  const response = await nestHttpRequest.post<
    ApiSuccessResponse<AuthResponseData>
  >('/timer-api/auth/email/login', credentials);

  return response.data.data;
};

// 이메일 회원가입
export const emailRegister = async (credentials: {
  email: string;
  password: string;
}) => {
  const response = await nestHttpRequest.post<
    ApiSuccessResponse<AuthResponseData>
  >('/timer-api/auth/email/register', credentials);

  return response.data.data;
};

// 계정 탈퇴
export const deleteAccount = async () => {
  const response = await nestHttpRequest.delete<ApiSuccessResponse<null>>(
    `/timer-api/auth/me`
  );
  return response.data.data;
};

// 토큰 리프레시
export const refreshToken = async (refreshToken: string) => {
  const response = await axios.post<ApiSuccessResponse<AuthResponseData>>(
    `${API_URL_NEST}/timer-api/auth/refresh`,
    {},
    {
      headers: {
        Authorization: `Bearer ${refreshToken}`,
      },
    }
  );
  return response.data.data;
};
