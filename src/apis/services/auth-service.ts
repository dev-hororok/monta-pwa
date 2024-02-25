import type { ServiceResponse } from '../types/service-response';
import type { ApiSuccessResponse } from '../types/api-response';
import { nestHttpRequest } from '../common/http-request';
import { handleApiError } from '../common/api-error-handler';
import { useAuthStore } from '@/stores/auth-store';

export interface AuthData {
  access_token: string;
  refresh_token: string;
  expires_in: number;
}

class AuthService {
  async login(credentials: {
    email: string;
    password: string;
  }): Promise<ServiceResponse<null>> {
    try {
      const response = await nestHttpRequest.post<ApiSuccessResponse<AuthData>>(
        '/timer-api/auth/email/login',
        credentials
      );

      useAuthStore.getState().authenticate(
        {
          accessToken: response.data.data.access_token,
          refreshToken: response.data.data.refresh_token,
        },
        response.data.data.expires_in
      );

      return {
        success: true,
        data: null,
      };
    } catch (error) {
      // useBoundStore.getState().logout();
      return handleApiError(error);
    }
  }

  async register(body: {
    email: string;
    password: string;
  }): Promise<ServiceResponse<null>> {
    try {
      await nestHttpRequest.post<ApiSuccessResponse<null>>(
        '/timer-api/auth/email/register',
        body
      );

      const loginResult = await this.login({
        email: body.email,
        password: body.password,
      });

      if (!loginResult.success) {
        throw new Error('Registration succeeded but login failed');
      }

      return {
        success: true,
        data: null,
      };
    } catch (error) {
      // useBoundStore.getState().logout();
      return handleApiError(error);
    }
  }

  logout() {
    useAuthStore.getState().logout();
  }

  isAuthenticated() {
    const expiresIn = useAuthStore.getState().expiresIn;
    return new Date().getTime() < expiresIn;
  }
}

export default new AuthService();
