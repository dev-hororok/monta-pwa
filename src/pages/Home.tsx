import { HomeHeader } from '@/components/headers/HomeHeader';
import { Button } from '@/components/ui/button';
import { useCurrentMemberQuery } from '@/queries/memberQueries';
import { EggInventorySection } from '@/sections/EggInventorySection';
import { PlayIcon } from '@radix-ui/react-icons';

export const Home = () => {
  const { data, isPending } = useCurrentMemberQuery();

  if (isPending || !data) {
    console.log('Pending');
    return 'Loading...';
  }

  return (
    <>
      <div className="rounded-t-md rounded-b-3xl pt-safe-offset-14 h-full pb-safe-offset-14">
        <HomeHeader />
        <main className="h-full overflow-y-scroll scrollbar-hide pb-10">
          <img src="./pots/pot_1.png" alt="main" className="h-1/2 mx-auto" />
          <div className="flex items-center justify-center pt-4">
            <p className="text-6xl text-primary font-semibold">1:30:00</p>
          </div>
          <div className="flex items-center justify-center py-10">
            <Button variant={'ghost'} className="p-2 h-auto">
              <PlayIcon className="w-8 h-8" />
            </Button>
          </div>

          <EggInventorySection memberId={data.member_id} />
        </main>
      </div>
    </>
  );
};
