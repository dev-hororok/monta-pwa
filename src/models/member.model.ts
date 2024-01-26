export interface IMember {
  member_id: string;
  email: string;
  nickname: string;
  image_url: string;
  point: number;
  role: IMemberRole;
  active_record_id: number | null;
}

export enum IMemberRole {
  ADMIN = 'ADMIN',
  USER = 'USER',
}
