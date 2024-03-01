import { useCurrentMemberQuery } from '@/apis/queries/member-queries';
import { HomeHeader } from '@/components/headers/home-header';
import { MobileLoadingSpinner } from '@/components/mobile-loading-spinner';
import { FoodInventorySection } from '@/pages/(home)/components/food-inventory-section';
import { TimerSection } from '@/pages/(home)/components/timer-section';

const MainPage = () => {
  const { data: member, isPending, isError } = useCurrentMemberQuery();

  if (isPending) {
    return <MobileLoadingSpinner />;
  }
  if (isError) {
    return <div>Error</div>;
  }

  return (
    <div className="h-full pt-safe-offset-14 pb-safe-offset-14">
      <HomeHeader />
      <main className="h-full overflow-y-scroll scrollbar-hide">
        <TimerSection className="h-2/3" />

        <FoodInventorySection member={member} className="h-1/3" />
      </main>
    </div>
  );
};

export default MainPage;
