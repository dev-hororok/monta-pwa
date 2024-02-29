import axios, { InternalAxiosRequestConfig } from 'axios';

import type { ApiSuccessResponse } from '../types/api-response';
import { API_URL_NEST, API_URL_SPRING } from '@/constants/constants';
import { AuthData } from '../services/auth-service';
import { useAuthStore } from '@/stores/auth-store';

// 인터셉터로 만료 시간 확인 및 토큰 리프레시
async function refreshTokenIfNeeded() {
  const { tokens, expiresIn, authenticate, accountId } =
    useAuthStore.getState();
  const now = new Date().getTime();

  if (now >= expiresIn) {
    try {
      const response = await axios.post<ApiSuccessResponse<AuthData>>(
        `${API_URL_NEST}/timer-api/auth/refresh`,
        {},
        {
          headers: {
            Authorization: `Bearer ${tokens.refreshToken}`,
          },
        }
      );

      authenticate(
        accountId,
        {
          accessToken: response.data.data.access_token,
          refreshToken: response.data.data.refresh_token,
        },
        response.data.data.expires_in
      );
      return response.data.data.access_token;
    } catch (error) {
      useAuthStore.getState().logout();
    }
  }
  return tokens.accessToken;
}
const requestInterceptor = async (config: InternalAxiosRequestConfig) => {
  const accessToken = await refreshTokenIfNeeded();
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
};

const nestHttpRequest = axios.create({
  baseURL: API_URL_NEST,
});
const springHttpRequest = axios.create({
  baseURL: API_URL_SPRING,
});

nestHttpRequest.interceptors.request.use(requestInterceptor);
springHttpRequest.interceptors.request.use(requestInterceptor);

export { nestHttpRequest, springHttpRequest };
