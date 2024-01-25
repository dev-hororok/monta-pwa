import { isAxiosError } from 'axios';
import { ServiceFailResponse } from '../interface/serviceResponse.type';

export const handleApiError = (error: unknown): ServiceFailResponse => {
  if (isAxiosError(error)) {
    const serverError = error.response?.data;
    if (serverError && serverError.status === 'error') {
      return {
        success: false,
        error: serverError.message || 'Unknown server error.',
      };
    }
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
  return {
    success: false,
    error: 'An unexpected error occurred.',
  };
};
