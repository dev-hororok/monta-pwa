export type ItemType = 'Food' | 'Consumable';

interface IBaseItem {
  item_type: ItemType;
  item_id: number;
  name: string;
  description: string;
  image_url: string;
  cost: number;
}
// 음식 아이템
export interface IFoodItem extends IBaseItem {
  item_type: 'Food';
  grade: string;
  required_study_time: number;
}
// 사용 아이템
export interface IConsumableItem extends IBaseItem {
  item_type: 'Consumable';
}

export type Item = IFoodItem | IConsumableItem;

interface IBaseItemInventory {
  item_inventory_id: number;
  item_type: ItemType;
  quantity: number;
  item: Item;
}

export interface IFoodItemInventory extends IBaseItemInventory {
  item_type: 'Food';
  progress: number;
  item: IFoodItem;
}

export interface IConsumableItemInventory extends IBaseItemInventory {
  item_type: 'Consumable';
  item: IConsumableItem;
}

export type ItemInventory = IFoodItemInventory | IConsumableItemInventory;
