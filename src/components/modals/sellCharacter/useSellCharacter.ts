import { useState } from 'react';
import { useSellCharacterMutation } from '@/apis/mutations/shopMutations';
import { useModalStore } from '@/stores/useModalStore';
import { ICharacterInventory } from '@/models/character.model';
import { toast } from 'sonner';

export const useSellCharacter = (
  characterInventory: ICharacterInventory | null
) => {
  const [isLoading, setIsLoading] = useState(false);
  const [count, setCount] = useState(1);
  const { mutateAsync: sellCharacter } = useSellCharacterMutation();
  const closeModal = useModalStore((state) => state.closeModal);

  const MaxCount = characterInventory ? characterInventory.quantity : 0;

  const incrementCount = () =>
    setCount((prevCount) => Math.min(prevCount + 1, MaxCount));
  const decrementCount = () =>
    setCount((prevCount) => Math.max(prevCount - 1, 1));

  const onSubmitSell = async () => {
    if (!characterInventory) return;
    setIsLoading(true);
    try {
      const result = await sellCharacter({
        character_inventory_id: characterInventory.character_inventory_id,
        count,
      });
      toast.success(result.notes);
      closeModal('sellCharacter');
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
    onSubmitSell,
    MaxCount,
  };
};
