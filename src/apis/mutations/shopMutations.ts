import { useMutation } from '@tanstack/react-query';
import { purchaseItem, sellCharacter } from '../services/shop.api';

// 아이템 구매 (로딩 표시)
export const usePurchaseItemMutation = () => {
  return useMutation({
    mutationFn: (body: { item_id: number; count: number }) => {
      return purchaseItem(body);
    },
  });
};

// 캐릭터 판매 (로딩 표시)
export const useSellCharacterMutation = () => {
  return useMutation({
    mutationFn: (body: { character_id: number; count: number }) => {
      return sellCharacter(body);
    },
  });
};
