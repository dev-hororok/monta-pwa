import { useState } from 'react';
import { toast } from 'sonner';

import { usePurchaseItemMutation } from '@/services/mutations/shop-mutations';
import { Item } from '@/models/item.model';

export const usePurchaseItem = (item: Item | null) => {
  const [isLoading, setIsLoading] = useState(false);
  const [count, setCount] = useState(1);
  const { mutateAsync: purchaseItem } = usePurchaseItemMutation();

  const MaxCount = item?.item_type === 'Food' ? 4 : 20;

  const incrementCount = () =>
    setCount((prevCount) => Math.min(prevCount + 1, MaxCount));
  const decrementCount = () =>
    setCount((prevCount) => Math.max(prevCount - 1, 1));

  const onSubmitPurchase = async () => {
    if (!item) return;
    setIsLoading(true);
    try {
      const result = await purchaseItem({
        item_id: item.item_id,
        count,
      });
      toast.success(result.notes);
    } catch (e) {
      console.error('Error', e);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    count,
    incrementCount,
    decrementCount,
    onSubmitPurchase,
    MaxCount,
  };
};
