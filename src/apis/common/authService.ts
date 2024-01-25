import useBoundStore from '@/stores/useBoundStore';
import { nestHttpRequest } from './httpRequest';
import { isAxiosError } from 'axios';
import {
  ServiceFailResponse,
  ServiceResponse,
} from '../interface/service.response.type';
import { ApiSuccessResponse } from '../interface/api.response.type';

interface AuthData {
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
      useBoundStore.getState().logout();
      return this.handleError(error);
    }
  }

  async register(body: {
    email: string;
    password: string;
  }): Promise<ServiceResponse<null>> {
    try {
      await nestHttpRequest.post('/hororok-api/auth/register', body);

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
      useBoundStore.getState().logout();
      return this.handleError(error);
    }
  }

  logout() {
    useBoundStore.getState().logout();
  }

  isAuthenticated() {
    const { expiresIn } = useBoundStore.getState();
    return new Date().getTime() < expiresIn;
  }

  handleError(error: unknown): ServiceFailResponse {
    if (isAxiosError(error)) {
      const serverError = error.response?.data;
      if (serverError && serverError.status === 'error') {
        return {
          success: false,
          error: serverError.message || 'Unknown server error.',
        };
      }
      // Network or other Axios-specific error
      return {
        success: false,
        error: 'Network error or issue with Axios.',
      };
    } else if (error instanceof Error) {
      return {
        success: false,
        error: error.message || 'An unexpected error occurred.',
      };
    }

    // Generic error
    return {
      success: false,
      error: 'An unexpected error occurred.',
    };
  }
}

export default new AuthService();
