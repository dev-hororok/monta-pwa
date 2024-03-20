import { MobileLoadingSpinner } from '@/components/mobile-loading-spinner';
import { useAdminCharacterQuery } from '@/services/admin/characters.queries';
import { useParams } from 'react-router-dom';
import { PrevHeader } from '@/components/headers/prev-header';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { formatDateStr } from '@/lib/date-format';
import { EditCharacterNameDialog } from '../_components/edit-character-name';

export const AdminCharacterPage = () => {
  const params = useParams<{ character_id: string }>();
  const {
    data: character,
    isLoading,
    isError,
  } = useAdminCharacterQuery(Number(params.character_id));

  if (isLoading) {
    return <MobileLoadingSpinner />;
  }
  if (isError) {
    return <div>Error</div>;
  }

  if (!character) {
    return (
      <div className="text-center text-lg">캐릭터를 찾을 수 없습니다.</div>
    );
  }

  return (
    <div className="w-full h-full flex flex-col items-center justify-center pt-safe-offset-14 pb-safe-offset-14">
      <main className="w-full h-full overflow-y-scroll scrollbar-hide pb-10 px-4">
        <PrevHeader
          to="/admin/characters"
          title="캐릭터 수정/삭제"
          rightButton={
            <Button
              variant="ghost"
              className="text-destructive hover:text-destructive"
            >
              삭제
            </Button>
          }
        />

        <div className="w-full h-auto flex-center flex-col py-4 gap-4">
          <p>{character.character_id}</p>
          <img
            onContextMenu={(e) => e.preventDefault()} // 이미지 우클릭 방지
            src={character.image_url}
            alt={character.name}
            width={200}
            height={200}
            className="p-2"
          />

          <EditCharacterNameDialog character={character}>
            <Button
              type="button"
              variant={'ghost'}
              className="text-xl font-bold antialiased"
            >
              {character.name}
            </Button>
          </EditCharacterNameDialog>
          <p className="text-lg">{character.description}</p>
          <Badge>{character.grade}</Badge>
          <p className="text-lg">가격: {character.sell_price}</p>
          <p className="text-lg">
            생성일: {formatDateStr(character.created_at)}
          </p>
          <p className="text-lg">
            최근 수정일: {formatDateStr(character.updated_at)}
          </p>
        </div>
      </main>
    </div>
  );
};
