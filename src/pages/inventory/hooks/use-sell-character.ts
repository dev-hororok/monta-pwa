import { useCallback, useMemo, useState } from 'react';
import { toast } from 'sonner';

import { useSellCharacterMutation } from '@/services/mutations/shop-mutations';
import type { ICharacterInventory } from '@/types/models/character.model';
import type { IMember } from '@/types/models/member.model';

const useSellCharacter = (
  characterInventory: ICharacterInventory | null,
  member: IMember | null
) => {
  const [isLoading, setIsLoading] = useState(false);
  const [count, setCount] = useState(1);
  const { mutateAsync: sellCharacter } = useSellCharacterMutation();

  const MaxCount = useMemo(
    () => (characterInventory ? characterInventory.quantity : 0),
    [characterInventory]
  );

  const incrementCount = useCallback(
    () => setCount((prevCount) => Math.min(prevCount + 1, MaxCount)),
    [MaxCount]
  );
  const decrementCount = useCallback(
    () => setCount((prevCount) => Math.max(prevCount - 1, 1)),
    []
  );
  const resetCount = useCallback(() => {
    setCount(1);
  }, [setCount]);

  const onSubmitSell = useCallback(async () => {
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
      resetCount();
    } catch (e) {
      // react-query에서 처리됨
      console.error('Error', e);
    } finally {
      setIsLoading(false);
    }
  }, [characterInventory, count, member, sellCharacter, resetCount]);

  return {
    isLoading,
    count,
    incrementCount,
    decrementCount,
    resetCount,
    onSubmitSell,
    MaxCount,
  };
};

export default useSellCharacter;
