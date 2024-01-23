import useBoundStore from '@/stores/useBoundStore';
import { nestHttpRequest } from './httpRequest';
import { isAxiosError } from 'axios';

class AuthService {
  async login(credentials: { email: string; password: string }) {
    try {
      const response = await nestHttpRequest.post('/auth/login', credentials);

      if (!response.data.success) {
        return {
          success: false,
          error: '서버에 문제가 발생했습니다.',
        };
      }

      useBoundStore.getState().authenticate(
        {
          accessToken: response.data.data.access_token,
          refreshToken: response.data.data.refresh_token,
        },
        response.data.data.expiresIn
      );

      return response.data;
    } catch (error) {
      useBoundStore.getState().logout();
      return {
        success: false,
        error: '이메일 또는 패스워드가 잘못되었습니다.',
      };
    }
  }

  async register(body: { email: string; password: string }) {
    try {
      const registerResponse = await nestHttpRequest.post(
        '/auth/register',
        body
      );

      if (!registerResponse.data.success) {
        return {
          success: false,
          error: '서버에 문제가 발생했습니다.',
        };
      }

      return await this.login({ email: body.email, password: body.password });
    } catch (error) {
      useBoundStore.getState().logout();
      if (isAxiosError(error)) {
        return {
          success: false,
          error: error.response?.data.message || '서버에 문제가 발생했습니다.',
        };
      }
      return {
        success: false,
        error: '서버에 문제가 발생했습니다.',
      };
    }
  }

  logout() {
    useBoundStore.getState().logout();
  }

  isAuthenticated() {
    const { expiresIn } = useBoundStore.getState();
    return new Date().getTime() < expiresIn;
  }
}

export default new AuthService();
