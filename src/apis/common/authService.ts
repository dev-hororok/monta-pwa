import useBoundStore from '@/stores/useBoundStore';
import { nestHttpRequest } from './httpRequest';

class AuthService {
  async login(credentials: { email: string; password: string }) {
    try {
      const response = await nestHttpRequest.post('/auth/login', credentials);

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

  logout() {
    useBoundStore.getState().logout();
  }

  isAuthenticated() {
    const { expiresIn } = useBoundStore.getState();
    return new Date().getTime() < expiresIn;
  }
}

export default new AuthService();
