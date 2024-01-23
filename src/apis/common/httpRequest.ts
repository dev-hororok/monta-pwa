import { API_URL_NEST, API_URL_SPRING } from '@/constants';
import useBoundStore from '@/stores/useBoundStore';
import axios, { InternalAxiosRequestConfig } from 'axios';

// 인터셉터로 만료 시간 확인 및 토큰 리프레시
async function refreshTokenIfNeeded() {
  const { tokens, expiresIn, authenticate } = useBoundStore.getState();
  const now = new Date().getTime();

  if (now >= expiresIn) {
    try {
      const response = await axios.post(
        `${API_URL_NEST}/auth/refresh`,
        {},
        {
          headers: {
            Authorization: `Refresh ${tokens.refreshToken}`,
          },
        }
      );
      authenticate(response.data.tokens, response.data.expiresIn);
      return response.data.tokens.accessToken;
    } catch (error) {
      useBoundStore.getState().logout();
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
