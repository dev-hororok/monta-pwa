export interface IMember {
  member_id: string;
  email: string;
  nickname: string;
  image_url: string;
  point: number;
  role: MemberRole;
  active_record_id: number | null;
}

export enum MemberRole {
  ADMIN = 'ADMIN',
  USER = 'USER',
}
