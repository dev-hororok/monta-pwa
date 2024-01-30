import { HomeHeader } from '@/components/headers/HomeHeader';
import TimePicker from '@/components/timer/TimePicker';
import { Timer } from '@/components/timer/Timer';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useCurrentMemberQuery } from '@/queries/memberQueries';
import { EggInventorySection } from '@/sections/EggInventorySection';
import { PlayIcon } from '@radix-ui/react-icons';
import { useState } from 'react';

export const Home = () => {
  const { data, isPending } = useCurrentMemberQuery();
  const [isTimerModalOpen, setIsTimerModalOpen] = useState(false);
  const [initialTime, setInitialTime] = useState(25);

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
        <main className="h-full overflow-y-scroll scrollbar-hide">
          <div className="h-2/3 flex flex-col justify-center items-center">
            <img src="./pots/pot_2.png" alt="main" className="h-1/2 mx-auto" />
            <div className="flex items-center justify-center h-1/4">
              <TimePicker
                setInitialTime={setInitialTime}
                initialTime={initialTime}
              />
            </div>
            <div className="flex items-center justify-center h-1/4">
              <Button
                onClick={openTimerModal}
                variant={'ghost'}
                className={cn('p-2 h-auto')}
              >
                <PlayIcon className="w-8 h-8" />
              </Button>
              {isTimerModalOpen && (
                <Timer
                  initialTime={initialTime * 60}
                  isOpen={isTimerModalOpen}
                  onClose={closeTimerModal}
                />
              )}
            </div>
          </div>

          <div className="h-1/3">
            <EggInventorySection memberId={data.member_id} />
          </div>
        </main>
      </div>
    </>
  );
};
