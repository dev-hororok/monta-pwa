export interface ServiceSuccessResponse<T> {
  success: true;
  data: T;
}

export interface ServiceFailResponse {
  success: false;
  error: string;
}

export type ServiceResponse<T> =
  | ServiceSuccessResponse<T>
  | ServiceFailResponse;
