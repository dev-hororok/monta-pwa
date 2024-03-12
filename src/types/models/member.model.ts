export interface IMember {
  member_id: string;
  status_message: string;
  nickname: string;
  image_url: string;
  point: number;
  active_record_id: number | null;
}
