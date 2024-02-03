import {
  IConsumableItem,
  IConsumableItemInventory,
  IFoodItem,
  IFoodItemInventory,
  Item,
  ItemInventory,
} from '../item.model';

export const isFoodItem = (item: Item): item is IFoodItem => {
  return item.item_type === 'Food';
};

export const isConsumableItem = (item: Item): item is IConsumableItem => {
  return item.item_type === 'Consumable';
};

export const isFoodItemInventory = (
  itemInventory: ItemInventory
): itemInventory is IFoodItemInventory => {
  return itemInventory.item_type === 'Food';
};

export const isConsumableItemInventory = (
  itemInventory: ItemInventory
): itemInventory is IConsumableItemInventory => {
  return itemInventory.item_type === 'Consumable';
};
