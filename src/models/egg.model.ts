export interface IEgg {
  egg_id: string;
  name: string;
  description: string;
  purchase_price: number;
  required_study_time: number;
  image_url: string;
  grade: string;
}

export interface IEggInventory {
  egg_inventory_id: string;
  progress: number;
  egg: IEgg;
}
