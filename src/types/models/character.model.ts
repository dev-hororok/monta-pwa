export type CharacterGrade = 'Common' | 'Rare' | 'Epic' | 'Legendary';

export interface ICharacter {
  character_id: number;
  name: string;
  description: string;
  image_url: string;
  grade: CharacterGrade;
  sell_price: number;
}

export interface ICharacterInventory {
  character_inventory_id: string; // bigint라 string으로 옴
  character: ICharacter;
  quantity: number;
}
