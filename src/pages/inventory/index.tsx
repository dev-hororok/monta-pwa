import { useCurrentMemberQuery } from '@/apis/queries/member-queries';
import { HomeHeader } from '@/components/headers/home-header';
import { MobileLoadingSpinner } from '@/components/mobile-loading-spinner';
import CharacterInventorySection from '@/pages/inventory/components/character-incentory-section';
import ItemInventorySection from '@/pages/inventory/components/item-inventory-section';

export interface InventoryUseItem {
  itemType: 'streak-color-change';
  count: number;
}

export interface InventoryCharacter {
  imgSrc: string;
  alt: string;
  price: number;
  name: string;
  grade: string;
}

const InventoryPage = () => {
  const { data: member, isPending, isError } = useCurrentMemberQuery();

  if (isPending) {
    return <MobileLoadingSpinner />;
  }
  if (isError) {
    return <div>Error</div>;
  }
  return (
    <div className="rounded-t-md rounded-b-3xl pt-safe-offset-14 h-full pb-safe-offset-14">
      <HomeHeader />
      <main className="h-full overflow-y-scroll scrollbar-hide pb-10">
        <div className="w-full h-full py-4 px-4 space-y-6">
          {/* 사용아이템 Section */}
          <ItemInventorySection member={member} />

          {/* 캐릭터 Section */}
          <CharacterInventorySection member={member} />
        </div>
      </main>
    </div>
  );
};

export default InventoryPage;
