import { useStartStudyTimerMutation } from '@/apis/mutations/studyTimerMutations';
import { useCurrentMemberQuery } from '@/apis/queries/memberQueries';
import { HomeHeader } from '@/components/headers/HomeHeader';
import { Timer } from '@/components/timer/Timer';
import { TimerOptionDialog } from '@/components/timer/TimerOptionDialog';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { FoodInventorySection } from '@/sections/FoodInventorySection';
import useBoundStore from '@/stores/useBoundStore';
import { PlayIcon } from '@radix-ui/react-icons';
import { useState } from 'react';

export const Home = () => {
  const { data, isPending } = useCurrentMemberQuery();
  const [isTimerModalOpen, setIsTimerModalOpen] = useState(false);
  const { mutate: startStudyTimer } = useStartStudyTimerMutation();
  const selectedCategory = useBoundStore((state) => state.selectedCategory);

  const openTimerModal = () => {
    startStudyTimer({ category_id: selectedCategory?.study_category_id });
    setIsTimerModalOpen(true);
  };
  const closeTimerModal = () => setIsTimerModalOpen(false);

  if (isPending || !data) {
    return 'Loading...';
  }

  return (
    <>
      <div className="rounded-t-md rounded-b-3xl pt-safe-offset-14 h-full pb-safe-offset-14">
        <HomeHeader />
        <main className="h-full overflow-y-scroll scrollbar-hide">
          <div className="h-2/3 flex flex-col justify-center items-center">
            <img
              onContextMenu={(e) => e.preventDefault()}
              src="./fire.png"
              alt="main"
              className="h-1/2 mx-auto"
            />
            <div className="flex items-center justify-center h-1/4">
              <TimerOptionDialog memberId={data.member_id} />
            </div>
            <div className="flex items-center justify-center h-1/4">
              <Button
                onClick={openTimerModal}
                variant={'ghost'}
                className={cn('p-2 h-auto')}
              >
                <PlayIcon className="w-10 h-10" />
              </Button>
              {isTimerModalOpen ? <Timer onClose={closeTimerModal} /> : null}
            </div>
          </div>

          <div className="h-1/3">
            <FoodInventorySection memberId={data.member_id} />
          </div>
        </main>
      </div>
    </>
  );
};
