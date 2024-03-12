import { useCurrentMemberQuery } from '@/services/queries/member-queries';
import { HomeHeader } from '@/pages/(home)/_components/home-header';
import { MobileLoadingSpinner } from '@/components/mobile-loading-spinner';
import { TimerSection } from '@/pages/(home)/_components/timer-section';

const MainPage = () => {
  const { isPending, isError } = useCurrentMemberQuery();

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
        <TimerSection className="h-full" />
      </main>
    </div>
  );
};

export default MainPage;
