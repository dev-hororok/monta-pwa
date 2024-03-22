import { MobileLoadingSpinner } from '@/components/mobile-loading-spinner';
import { Link } from 'react-router-dom';
import { PrevHeader } from '@/components/headers/prev-header';
import { Button } from '@/components/ui/button';
import { AdminItemCard } from './_components/item-card';
import { useAdminAllItemsQuery } from '@/services/admin/items.queries';
import { CreateItemDialog } from './_components/create-item-dialog';

export const AdminItemsPage = () => {
  const { data: items, isLoading, isError } = useAdminAllItemsQuery();

  if (isLoading) {
    return <MobileLoadingSpinner />;
  }
  if (isError) {
    return <div>Error</div>;
  }
  return (
    <div className="w-full h-full flex flex-col items-center justify-center pt-safe-offset-14 pb-safe-offset-14">
      <main className="w-full h-full overflow-y-scroll scrollbar-hide pb-10 px-4">
        <PrevHeader
          to="/admin"
          title="아이템 관리"
          rightButton={
            <CreateItemDialog>
              <Button
                variant="ghost"
                className="text-destructive hover:text-destructive"
              >
                추가
              </Button>
            </CreateItemDialog>
          }
        />

        <div className="grid grid-cols-3 gap-2">
          {items &&
            items.map((item) => {
              return (
                <Link to={`./${item.item_id}`} key={item.item_id}>
                  <AdminItemCard item={item} />
                </Link>
              );
            })}
        </div>
      </main>
    </div>
  );
};
