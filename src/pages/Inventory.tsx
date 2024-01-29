import { HomeHeader } from '@/components/headers/HomeHeader';
import { useCurrentMemberQuery } from '@/queries/memberQueries';
import { CharacterInventorySection } from '@/sections/CharacterIncentorySection';
import { UseItemInventorySection } from '@/sections/UseItemInventorySection';

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

export function Inventory() {
  const { data, isPending } = useCurrentMemberQuery();

  if (isPending || !data) {
    console.log('Pending');
    return 'Loading...';
  }

  return (
    <div className="rounded-t-md rounded-b-3xl pt-safe-offset-14 h-full pb-safe-offset-14">
      <HomeHeader />
      <main className="h-full overflow-y-scroll scrollbar-hide pb-10">
        <div className="w-full h-full py-4 px-4 space-y-6">
          {/* 사용아이템 Section */}
          <UseItemInventorySection />

          <CharacterInventorySection memberId={data.member_id} />
        </div>
      </main>
    </div>
  );
}
