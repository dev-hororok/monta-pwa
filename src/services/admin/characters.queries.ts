import { useQuery } from '@tanstack/react-query';
import { fetchAllCharacters } from './characters.api';

// 모든 캐릭터 조회
export const ALL_CHARACTERS_QUERY_KEY = 'currentUser';
export const useAllCharactersQuery = () => {
  return useQuery({
    queryKey: [ALL_CHARACTERS_QUERY_KEY],
    queryFn: () => fetchAllCharacters(),
    staleTime: 10 * 60 * 1000,
  });
};
