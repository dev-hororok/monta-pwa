import type { ServiceResponse } from '../types/service-response';
import type { ApiSuccessResponse } from '../types/api-response';
import { nestHttpRequest } from '../common/http-request';
import { handleApiError } from '../common/api-error-handler';
import useBoundStore from '@/stores/use-bound-store';

export interface AuthData {
  access_token: string;
  refresh_token: string;
  expiresIn: number;
}

class AuthService {
  async login(credentials: {
    email: string;
    password: string;
  }): Promise<ServiceResponse<null>> {
    try {
      const response = await nestHttpRequest.post<ApiSuccessResponse<AuthData>>(
        '/hororok-api/auth/login',
        credentials
      );

      useBoundStore.getState().authenticate(
        {
          accessToken: response.data.data.access_token,
          refreshToken: response.data.data.refresh_token,
        },
        response.data.data.expiresIn
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
        '/hororok-api/auth/register',
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
    useBoundStore.getState().logout();
  }

  isAuthenticated() {
    const { expiresIn } = useBoundStore.getState();
    return new Date().getTime() < expiresIn;
  }
}

export default new AuthService();
