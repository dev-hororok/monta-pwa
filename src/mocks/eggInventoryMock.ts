import { IEggInventory } from '@/models/egg.model';

export const dummyEggInventory: IEggInventory[] = [
  {
    egg_inventory_id: '1234',
    progress: 0,
    egg: {
      egg_id: 'String',
      name: 'String',
      description: '',
      purchase_price: 0,
      required_study_time: 303,
      image_url: '/foods/meat_1.png',
      grade: 'String',
    },
  },
  {
    egg_inventory_id: '1234',
    progress: 33,
    egg: {
      egg_id: 'String',
      name: 'String',
      description: '',
      purchase_price: 0,
      required_study_time: 33,
      image_url: '/foods/tofu_1.png',
      grade: 'String',
    },
  },
  {
    egg_inventory_id: '2135',
    progress: 5552,
    egg: {
      egg_id: 'String',
      name: 'String',
      description: '',
      purchase_price: 0,
      required_study_time: 6124,
      image_url: '/foods/onion_1.png',
      grade: 'String',
    },
  },
  {
    egg_inventory_id: '2135',
    progress: 5552,
    egg: {
      egg_id: 'String',
      name: 'String',
      description: '',
      purchase_price: 0,
      required_study_time: 6124,
      image_url: '/foods/carrot_1.png',
      grade: 'String',
    },
  },
];
