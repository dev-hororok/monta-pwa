export interface ApiFailResponse {
  status: 'error';
  message: string | string[];
  error: string;
}
export interface ApiSuccessResponse<T> {
  status: 'success';
  data: T;
}

export type ApiResponse<T> = ApiSuccessResponse<T> | ApiFailResponse;
