export interface ICharacter {
  character_id: string;
  name: string;
  description: string;
  image_url: string;
  grade: string;
  sell_price: number;
}

export interface ICharacterInventory {
  character_inventory_id: number;
  character: ICharacter;
}
