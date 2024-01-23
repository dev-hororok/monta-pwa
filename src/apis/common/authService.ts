import useBoundStore from '@/stores/useBoundStore';
import { nestHttpRequest } from './httpRequest';

class AuthService {
  async login(credentials: { email: string; password: string }) {
    try {
      const response = await nestHttpRequest.post('/auth/login', credentials);
      useBoundStore.getState().authenticate(
        {
          accessToken: response.data.access_token,
          refreshToken: response.data.refresh_token,
        },
        response.data.expiresIn
      );

      return response.data;
    } catch (error) {
      useBoundStore.getState().logout();
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
