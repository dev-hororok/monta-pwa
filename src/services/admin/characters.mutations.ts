import { useMutation, useQueryClient } from '@tanstack/react-query';
import { editCharacter } from './characters.api';
import {
  ADMIN_ALL_CHARACTERS_QUERY_KEY,
  ADMIN_CHARACTER_QUERY_KEY,
} from './characters.queries';

// 캐릭터 정보 수정
export const useEditCharacterMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      characterId,
      body,
    }: {
      characterId: number;
      body: {
        name?: string;
        description?: string;
        image_url?: string;
        grade?: string;
        sell_price?: string;
      };
    }) => {
      return editCharacter(characterId, body);
    },

    onSuccess: async (_, variables) => {
      await queryClient.invalidateQueries({
        queryKey: [ADMIN_CHARACTER_QUERY_KEY, variables.characterId],
      });
      await queryClient.invalidateQueries({
        queryKey: [ADMIN_ALL_CHARACTERS_QUERY_KEY],
      });
    },
  });
};
