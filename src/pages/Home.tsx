import { useCurrentMemberQuery } from '@/apis/queries/memberQueries';
import { HomeHeader } from '@/components/headers/HomeHeader';
import { Button } from '@/components/ui/button';
import { FoodInventorySection } from '@/sections/FoodInventorySection';
import { TimerSection } from '@/sections/home/TimerSection';
import { toast } from 'sonner';

export const Home = () => {
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
            <Button onClick={() => toast('Test', { duration: 2000 })}>
              toast 테스트
            </Button>
          </div>
        </main>
      </div>
    </>
  );
};
