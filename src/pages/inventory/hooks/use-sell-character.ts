import { useState } from 'react';
import { toast } from 'sonner';

import { useSellCharacterMutation } from '@/apis/mutations/shop-mutations';
import type { ICharacterInventory } from '@/models/character.model';
import { IMember } from '@/models/member.model';

const useSellCharacter = (
  characterInventory: ICharacterInventory | null,
  member: IMember | null
) => {
  const [isLoading, setIsLoading] = useState(false);
  const [count, setCount] = useState(1);
  const { mutateAsync: sellCharacter } = useSellCharacterMutation();

  const MaxCount = characterInventory ? characterInventory.quantity : 0;

  const incrementCount = () =>
    setCount((prevCount) => Math.min(prevCount + 1, MaxCount));
  const decrementCount = () =>
    setCount((prevCount) => Math.max(prevCount - 1, 1));

  const onSubmitSell = async () => {
    if (!characterInventory || !member) return;
    if (
      member.image_url === characterInventory.character.image_url &&
      characterInventory.quantity - count <= 0
    ) {
      toast.error(
        '현재 사용중인 캐릭터입니다. 최소 하나의 캐릭터를 남겨주세요.'
      );
      return;
    }
    setIsLoading(true);
    try {
      const result = await sellCharacter({
        character_inventory_id: characterInventory.character_inventory_id,
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
    onSubmitSell,
    MaxCount,
  };
};

export default useSellCharacter;
