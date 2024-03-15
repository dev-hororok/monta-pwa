import { useCurrentMemberQuery } from '@/services/queries/member-queries';
import { HomeHeader } from '@/pages/(home)/_components/home-header';
import { MobileLoadingSpinner } from '@/components/mobile-loading-spinner';
import { ItemInventorySection } from './_components/item-inventory-section';
import { CharacterInventorySection } from './_components/character-inventory-section';
import { useAuthStore } from '@/stores/auth-store';
import { ItemInventorySectionExample } from './_components/item-inventory-section/exmple';
import { CharacterInventorySectionExample } from './_components/character-inventory-section/example';

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
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const { data: member, isLoading, isError } = useCurrentMemberQuery();

  if (isLoading) {
    return <MobileLoadingSpinner />;
  }
  if (isError) {
    return <div>Error</div>;
  }
  return (
    <div className="h-full pt-safe-offset-14 pb-safe-offset-14">
      <HomeHeader />
      <main className="h-full overflow-y-scroll scrollbar-hide pb-10">
        <div className="w-full h-full py-4 px-4 space-y-6">
          {/* 사용아이템 Section */}
          {isLoggedIn && member ? (
            <ItemInventorySection member={member} />
          ) : (
            <ItemInventorySectionExample />
          )}

          {/* 캐릭터 Section */}
          {isLoggedIn && member ? (
            <CharacterInventorySection member={member} />
          ) : (
            <CharacterInventorySectionExample />
          )}
        </div>
      </main>
    </div>
  );
};

export default InventoryPage;
