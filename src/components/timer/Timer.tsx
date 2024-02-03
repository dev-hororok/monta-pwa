import { Button } from '@/components/ui/button';
import { formatTime } from '@/lib/date-format';
import useBoundStore from '@/stores/useBoundStore';
import { PauseIcon } from '@radix-ui/react-icons';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { useEndStudyTimerMutation } from '@/apis/mutations/studyTimerMutations';
import { EndStudyTimerDialog } from './EndStudyTimerDialog';
import { AlarmDialog } from './AlarmDialog';

interface Props {
  onClose: () => void;
}

export const Timer = ({ onClose }: Props) => {
  const [alarmIsOpen, setAlarmIsOpen] = useState(false);
  const initialTime = useBoundStore((state) => state.initialTime);
  const selectedCategory = useBoundStore((state) => state.selectedCategory);
  const duration = useBoundStore((state) => state.duration);
  const updateTimer = useBoundStore((state) => state.updateTimer);
  const resetTimer = useBoundStore((state) => state.resetTimer);
  const { mutate: endStudyTimer } = useEndStudyTimerMutation();

  // 타이머 시간 표시
  useEffect(() => {
    const isTimerEnded = initialTime - duration <= 0;
    if (!isTimerEnded) {
      const interval = setInterval(() => {
        updateTimer();
      }, 1000);
      return () => clearInterval(interval);
    } else {
      endStudyTimer(initialTime);
      setAlarmIsOpen(true);
    }
  }, [initialTime, duration, updateTimer, endStudyTimer, resetTimer, onClose]);
  return (
    <div className="absolute top-0 z-40 w-full h-full md:border md:w-[416px] md:h-[736px] md:rounded-md bg-background border-t-0">
      <div className="rounded-t-md rounded-b-3xl pt-safe-offset-14 h-full pb-safe">
        <main className="h-full overflow-y-scroll scrollbar-hide">
          <img
            src="./pots/pot_2.png"
            alt="main"
            className="h-1/2 mx-auto animate-soft-bounce"
          />
          <div className="flex flex-col items-center justify-center pt-4 h-1/4 gap-4">
            <p className="text-center">맛있게 익히는중..</p>
            <p className="text-7xl text-primary dark:text-foreground font-semibold">
              {formatTime(initialTime - duration)}
            </p>
            <Badge>
              {selectedCategory ? selectedCategory.subject : '선택 안함'}
            </Badge>
          </div>
          <div className="flex items-center justify-center py-10 h-1/4">
            <EndStudyTimerDialog closeTimerModal={onClose}>
              <Button variant={'ghost'} className={cn('p-2 h-auto')}>
                <PauseIcon className="w-10 h-10" />
              </Button>
            </EndStudyTimerDialog>
          </div>
          <AlarmDialog isOpen={alarmIsOpen} closeTimerModal={onClose} />
        </main>
      </div>
    </div>
  );
};
