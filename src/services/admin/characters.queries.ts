import { useQuery } from '@tanstack/react-query';
import { fetchAllCharacters, fetchCharacter } from './characters.api';

// 모든 캐릭터 조회
export const ADMIN_ALL_CHARACTERS_QUERY_KEY = 'adminAllCharacters';
export const useAdminAllCharactersQuery = () => {
  return useQuery({
    queryKey: [ADMIN_ALL_CHARACTERS_QUERY_KEY],
    queryFn: () => fetchAllCharacters(),
    staleTime: 10 * 60 * 1000,
  });
};

//  캐릭터 하나 조회
export const ADMIN_CHARACTER_QUERY_KEY = 'adminCharacter';
export const useAdminCharacterQuery = (characterId: number) => {
  return useQuery({
    queryKey: [ADMIN_CHARACTER_QUERY_KEY, characterId],
    queryFn: () => fetchCharacter(characterId),
    staleTime: 10 * 60 * 1000,
  });
};
