export interface AuthResponseData {
  account: {
    account_id: string;
  };
  access_token: string;
  refresh_token: string;
  expires_in: number;
}
