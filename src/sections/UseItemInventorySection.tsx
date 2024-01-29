import { StreakItemCard } from '@/components/cards/StreakItemCard';
import { dummyUseItems } from '@/mocks/toolInventoryMock';

export const UseItemInventorySection = () => {
  return (
    <section>
      <p className="font-semibold pb-4">사용 아이템</p>
      <div className="grid grid-cols-3 gap-2">
        {dummyUseItems.map((item, idx) => {
          if (item.itemType === 'streak-color-change') {
            return <StreakItemCard key={idx} count={item.count} />;
          }
          return <StreakItemCard key={idx} count={item.count} />;
        })}
      </div>
    </section>
  );
};
