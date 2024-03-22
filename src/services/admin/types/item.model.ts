import { ItemType } from '@/types/models/item.model';

export interface IAdminItem {
  item_type: ItemType;
  item_id: number;
  name: string;
  description: string;
  image_url: string;
  cost: number;
  grade?: string;
  required_study_time?: number;
  created_at: Date;
  updated_at: Date | string;
}
