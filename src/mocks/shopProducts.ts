import { ProductCardProps } from '@/components/cards/ProductCard';
import { IEgg } from '@/models/egg.model';

export const dummyFoodProducts: IEgg[] = [
  {
    egg_id: '1',
    image_url: '/foods/meat_1.png',
    purchase_price: 200,
    required_study_time: 3600,
    name: '고기',
    description: 'C ~ A 등급의 캐릭터를 얻을 수 있어요.',
    grade: 'C',
  },
  {
    egg_id: '2',
    image_url: '/foods/onion_1.png',
    purchase_price: 400,
    required_study_time: 3600,
    name: '양파',
    description: 'B ~ A+ 등급의 캐릭터를 얻을 수 있어요.',
    grade: 'B',
  },
  {
    egg_id: '3',
    image_url: '/foods/carrot_1.png',
    purchase_price: 400,
    required_study_time: 3600,
    name: '당근',
    description: 'A ~ S 등급의 캐릭터를 얻을 수 있어요.',
    grade: 'A',
  },
  {
    egg_id: '4',
    image_url: '/foods/tofu_1.png',
    purchase_price: 600,
    required_study_time: 3600,
    name: '두부',
    description: 'C ~ SS 등급의 캐릭터를 얻을 수 있어요.',
    grade: 'A',
  },
];

export const dummyToolProducts: ProductCardProps[] = [
  {
    imgSrc: '/color-palette.png',
    alt: 'streak-color-change',
    price: 200,
    name: '스트릭 변경권 x 4',
    description: '잔디의 색을 변경할 수 있어요',
  },
  {
    imgSrc: '/color-palette.png',
    alt: 'streak-color-change',
    price: 1500,
    name: '스트릭 변경권 x 40',
    description: '잔디의 색을 변경할 수 있어요',
  },
];
