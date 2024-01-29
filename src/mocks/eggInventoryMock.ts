import { ICharacterInventory } from '@/models/character.model';
import { IEggInventory } from '@/models/egg.model';

export const dummyEggInventory: IEggInventory[] = [
  {
    egg_inventory_id: '1234',
    progress: 0,
    egg: {
      egg_id: 'String',
      name: 'String',
      description: '',
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
      required_study_time: 33,
      image_url: '/pockets/pocket_1.png',
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
      required_study_time: 6124,
      image_url: '/pockets/pocket_1.png',
      grade: 'String',
    },
  },
];
export const dummyCharacterInventory: ICharacterInventory[] = [
  {
    character_inventory_id: 1,
    character: {
      character_id: '1',
      image_url: '/character/monster_1.png',
      sell_price: 4000,
      name: '몬스터 1',
      description: '',
      grade: 'C',
    },
  },
  {
    character_inventory_id: 2,
    character: {
      character_id: '2',
      image_url: '/character/character_4.png',
      sell_price: 4000,
      name: '몬스터 1',
      description: '',
      grade: 'C',
    },
  },
  {
    character_inventory_id: 3,
    character: {
      character_id: '3',
      image_url: '/character/character_5.png',
      sell_price: 4000,
      name: '몬스터 1',
      description: '',
      grade: 'C',
    },
  },
  {
    character_inventory_id: 4,
    character: {
      character_id: '4',
      image_url: '/character/character_10.png',
      sell_price: 4000,
      name: '몬스터 4',
      description: '',
      grade: 'C',
    },
  },
  {
    character_inventory_id: 5,
    character: {
      character_id: '5',
      image_url: '/character/character_11.png',
      sell_price: 4000,
      name: '몬스터 5',
      description: '',
      grade: 'C',
    },
  },
];
