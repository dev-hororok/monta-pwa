import axios, { InternalAxiosRequestConfig } from 'axios';

import { API_URL_NEST, API_URL_SPRING } from '@/constants/constants';
import { useAuthStore } from '@/stores/auth-store';
import { refreshToken } from '../apis/auth.api';

// 인터셉터로 만료 시간 확인 및 토큰 리프레시
async function refreshTokenIfNeeded() {
  const { tokens, expiresIn, authenticate, accountId } =
    useAuthStore.getState();
  const now = new Date().getTime();

  if (now >= expiresIn) {
    try {
      const data = await refreshToken(tokens.refreshToken);

      authenticate(
        accountId,
        {
          accessToken: data.access_token,
          refreshToken: data.refresh_token,
        },
        data.expires_in
      );
      return data.access_token;
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
