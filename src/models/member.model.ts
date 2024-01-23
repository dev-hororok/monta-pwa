export interface IMember {
  member_id: string;
  nickname: string;
  email: string;
  image_url: string | null;
  role: IMemberRole;
  active_record_id: number | null;
  point: number;
}

export enum IMemberRole {
  ADMIN = 'ADMIN',
  USER = 'USER',
}
