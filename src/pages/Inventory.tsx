import { useCurrentMemberQuery } from '@/queries/memberQueries';
import { CharacterInventorySection } from '@/sections/CharacterIncentorySection';

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
    <div className="w-full h-full py-4 px-4 space-y-6">
      {/* 사용아이템 Section */}
      {/* <div>
        <p className="font-semibold pb-4">사용 아이템</p>
        <div className="grid grid-cols-3 gap-2">
          {dummyUseItems.map((item, idx) => {
            if (item.itemType === 'streak-color-change') {
              return <StreakItemCard key={idx} count={item.count} />;
            }
            return <StreakItemCard key={idx} count={item.count} />;
          })}
        </div>
      </div> */}

      <CharacterInventorySection memberId={data.member_id} />
    </div>
  );
}
