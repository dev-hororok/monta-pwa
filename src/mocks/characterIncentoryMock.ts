import { ICharacterInventory } from '@/models/character.model';

export const dummyCharacterInventory: ICharacterInventory[] = [
  {
    character_inventory_id: 1,
    character: {
      character_id: '1',
      image_url: '/characters/cat_1.png',
      sell_price: 4000,
      name: '고양이',
      description: '',
      grade: 'C',
    },
  },
  {
    character_inventory_id: 2,
    character: {
      character_id: '2',
      image_url: '/characters/cat_2.png',
      sell_price: 4000,
      name: '고양이',
      description: '',
      grade: 'C',
    },
  },
  {
    character_inventory_id: 3,
    character: {
      character_id: '3',
      image_url: '/characters/sheep_1.png',
      sell_price: 4000,
      name: '양',
      description: '',
      grade: 'C',
    },
  },
  {
    character_inventory_id: 4,
    character: {
      character_id: '4',
      image_url: '/characters/character_10.png',
      sell_price: 4000,
      name: '병아리',
      description: '',
      grade: 'C',
    },
  },
  {
    character_inventory_id: 5,
    character: {
      character_id: '5',
      image_url: '/characters/character_11.png',
      sell_price: 4000,
      name: '햄스터',
      description: '',
      grade: 'C',
    },
  },
];
