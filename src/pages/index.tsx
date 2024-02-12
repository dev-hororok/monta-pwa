import { useCurrentMemberQuery } from '@/apis/queries/member-queries';
import HomeHeader from '@/components/headers/home-header';
import { FoodInventorySection } from '@/sections/food-inventory-section';
import TimerSection from '@/sections/home/timer-section';

const MainPage = () => {
  const { data, isPending } = useCurrentMemberQuery();

  if (isPending || !data) {
    return 'Loading...';
  }

  return (
    <>
      <div className="rounded-t-md rounded-b-3xl pt-safe-offset-14 h-full pb-safe-offset-14">
        <HomeHeader />
        <main className="h-full overflow-y-scroll scrollbar-hide">
          <TimerSection />

          <div className="h-1/3">
            <FoodInventorySection memberId={data.member_id} />
          </div>
        </main>
      </div>
    </>
  );
};

export default MainPage;
