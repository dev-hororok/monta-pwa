import { MobileLoadingSpinner } from '@/components/mobile-loading-spinner';
import { useAdminAllCharactersQuery } from '@/services/admin/characters.queries';
import { AdminCharacterCard } from './_components/character-card';
import { Link } from 'react-router-dom';

export const AdminCharactersPage = () => {
  const { data: characters, isLoading, isError } = useAdminAllCharactersQuery();

  if (isLoading) {
    return <MobileLoadingSpinner />;
  }
  if (isError) {
    return <div>Error</div>;
  }
  return (
    <div className="w-full h-full flex flex-col items-center justify-center pt-safe-offset-14 pb-safe-offset-14">
      <main className="h-full overflow-y-scroll scrollbar-hide pb-10 px-4">
        <h3 className="text-center text-2xl font-bold antialiased pb-6">
          캐릭터 관리
        </h3>
        <div className="grid grid-cols-3 gap-2">
          {characters &&
            characters.map((item) => {
              return (
                <Link to={`./${item.character_id}`} key={item.character_id}>
                  <AdminCharacterCard character={item} />
                </Link>
              );
            })}
        </div>
      </main>
    </div>
  );
};
