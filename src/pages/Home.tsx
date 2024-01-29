import { HomeHeader } from '@/components/headers/HomeHeader';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useCurrentMemberQuery } from '@/queries/memberQueries';
import { EggInventorySection } from '@/sections/EggInventorySection';
import { PlayIcon } from '@radix-ui/react-icons';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export const Home = () => {
  const { data, isPending } = useCurrentMemberQuery();
  // const [studyTime, setStudyTime] = useState(0);

  // Timer 페이지 모달로 바꾸기

  if (isPending || !data) {
    console.log('Pending');
    return 'Loading...';
  }

  return (
    <>
      <div className="rounded-t-md rounded-b-3xl pt-safe-offset-14 h-full pb-safe-offset-14">
        <HomeHeader />
        <main className="h-full overflow-y-scroll scrollbar-hide pb-10">
          <img src="./pots/pot_2.png" alt="main" className="h-1/2 mx-auto" />
          <div className="flex items-center justify-center pt-4">
            <p className="text-6xl text-primary font-semibold">1:30:00</p>
          </div>
          <div className="flex items-center justify-center py-10">
            <Link
              to="/study"
              className={cn(buttonVariants({ variant: 'ghost' }), 'p-2 h-auto')}
            >
              <PlayIcon className="w-8 h-8" />
            </Link>
          </div>

          <EggInventorySection memberId={data.member_id} />
        </main>
      </div>
    </>
  );
};
