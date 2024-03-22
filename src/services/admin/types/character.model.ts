import { ICharacter } from '@/types/models/character.model';

export interface IAdminCharacter extends ICharacter {
  created_at: Date;
  updated_at: Date | string;
}
