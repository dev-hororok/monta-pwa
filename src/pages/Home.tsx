import { HomeHeader } from '@/components/headers/HomeHeader';
import { Timer } from '@/components/modals/Timer';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useCurrentMemberQuery } from '@/queries/memberQueries';
import { EggInventorySection } from '@/sections/EggInventorySection';
import { PlayIcon } from '@radix-ui/react-icons';
import { useState } from 'react';

export const Home = () => {
  const { data, isPending } = useCurrentMemberQuery();
  const [isTimerModalOpen, setIsTimerModalOpen] = useState(false);

  const openTimerModal = () => setIsTimerModalOpen(true);
  const closeTimerModal = () => setIsTimerModalOpen(false);

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
            <p className="text-6xl text-primary font-semibold">1:00:00</p>
          </div>
          <div className="flex items-center justify-center py-10">
            <Button
              onClick={openTimerModal}
              variant={'ghost'}
              className={cn('p-2 h-auto')}
            >
              <PlayIcon className="w-8 h-8" />
            </Button>
            {isTimerModalOpen && (
              <Timer
                initialTime={3600}
                isOpen={isTimerModalOpen}
                onClose={closeTimerModal}
              />
            )}
          </div>

          <EggInventorySection memberId={data.member_id} />
        </main>
      </div>
    </>
  );
};
