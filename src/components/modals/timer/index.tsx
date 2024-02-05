import { Button } from '@/components/ui/button';
import { formatTime } from '@/lib/date-format';
import { PauseIcon } from '@radix-ui/react-icons';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { useTimer } from '@/hooks/useTimer';
import { useModalStore } from '@/stores/useModalStore';

export const TimerModal = () => {
  const { pomodoroTime, duration, pauseTimer, startTimer, selectedCategory } =
    useTimer();
  const openModal = useModalStore((state) => state.openModal);

  const onClickPauseHandler = () => {
    openModal('pauseTimer', {
      duration: pomodoroTime * 60 - duration,
      startTimer: startTimer,
    });
    pauseTimer();
  };

  return (
    <div className="absolute top-0 z-40 w-full h-full md:w-[414px] md:h-[734px] md:rounded-md bg-background">
      <div className="rounded-t-md rounded-b-3xl pt-safe-offset-14 h-full pb-safe">
        <main className="h-full overflow-y-scroll scrollbar-hide">
          <img
            src="./fire.png"
            alt="main"
            className="h-1/2 mx-auto animate-soft-bounce"
          />
          <div className="flex flex-col items-center justify-center pt-4 h-1/4 gap-4">
            <p className="text-center">맛있게 익히는중..</p>
            <p className="text-7xl text-primary dark:text-foreground font-semibold">
              {formatTime(duration)}
            </p>
            <Badge>
              {selectedCategory ? selectedCategory.subject : '선택 안함'}
            </Badge>
          </div>
          <div className="flex items-center justify-center py-10 h-1/4">
            <Button
              type="button"
              onClick={onClickPauseHandler}
              variant={'ghost'}
              className={cn('p-2 h-auto')}
            >
              <PauseIcon className="w-10 h-10" />
            </Button>
          </div>
        </main>
      </div>
    </div>
  );
};
