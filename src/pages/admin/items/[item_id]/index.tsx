import { MobileLoadingSpinner } from '@/components/mobile-loading-spinner';
import { useParams } from 'react-router-dom';
import { PrevHeader } from '@/components/headers/prev-header';
import { Button } from '@/components/ui/button';
import { DeleteItemDialog } from '../_components/delete-item-dialog';
import { useAdminItemQuery } from '@/services/admin/items.queries';

export const AdminItemPage = () => {
  const params = useParams<{ item_id: string }>();
  const {
    data: item,
    isLoading,
    isError,
  } = useAdminItemQuery(Number(params.item_id));

  if (isLoading) {
    return <MobileLoadingSpinner />;
  }
  if (isError) {
    return <div>Error</div>;
  }

  if (!item) {
    return (
      <div className="text-center text-lg">아이템을 찾을 수 없습니다.</div>
    );
  }

  return (
    <div className="w-full h-full flex flex-col items-center justify-center pt-safe-offset-14 pb-safe-offset-14">
      <main className="w-full h-full overflow-y-scroll scrollbar-hide pb-10 px-4">
        <PrevHeader
          to="/admin/items"
          title="캐릭터 수정/삭제"
          rightButton={
            <DeleteItemDialog item={item}>
              <Button
                variant="ghost"
                className="text-destructive hover:text-destructive"
              >
                삭제
              </Button>
            </DeleteItemDialog>
          }
        />
      </main>
    </div>
  );
};
