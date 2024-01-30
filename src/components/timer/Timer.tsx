import { Button } from '@/components/ui/button';
import { formatTime } from '@/lib/date-format';
import { PauseIcon } from '@radix-ui/react-icons';
import { useEffect, useState } from 'react';

interface Props {
  initialTime: number;
  isOpen: boolean;
  onClose: () => void;
}

export const Timer = ({ initialTime, isOpen, onClose }: Props) => {
  const [curTime, setCurTime] = useState(initialTime);

  useEffect(() => {
    if (!isOpen) return;
    const interval = setInterval(() => {
      setCurTime((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="absolute top-0 z-10 w-full md:border md:w-[416px] md:h-[736px] md:rounded-md bg-background border-t-0">
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
              {formatTime(curTime)}
            </p>
          </div>
          <div className="flex items-center justify-center py-10 h-1/4">
            <Button
              type="button"
              onClick={onClose}
              variant="ghost"
              className={'p-2 h-auto'}
            >
              <PauseIcon className="w-8 h-8" />
            </Button>
          </div>
        </main>
      </div>
    </div>
  );
};
