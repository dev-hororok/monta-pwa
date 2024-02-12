import { useCurrentMemberQuery } from '@/apis/queries/memberQueries';
import HomeHeader from '@/components/headers/home-header';
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

const InventoryPage = () => {
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
          <UseItemInventorySection memberId={data.member_id} />

          {/* 캐릭터 Section */}
          <CharacterInventorySection memberId={data.member_id} />
        </div>
      </main>
    </div>
  );
};

export default InventoryPage;
