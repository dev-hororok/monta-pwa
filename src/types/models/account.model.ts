interface IRole {
  role_id: number;
  name: string;
}

export interface IAccount {
  account_id: string;
  email: string | null;
  provider: string;
  social_id?: string | null;

  role: IRole;
  created_at: Date;
}
