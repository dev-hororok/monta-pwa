import { buttonVariants } from '@/components/ui/button';
import { formatTime } from '@/lib/date-format';
import { cn } from '@/lib/utils';
import { PauseIcon } from '@radix-ui/react-icons';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

interface Props {
  initialTime: number;
}

export const Timer = ({ initialTime }: Props) => {
  const [curTime, setCurTime] = useState(initialTime);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurTime((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className="rounded-t-md rounded-b-3xl pt-safe-offset-14 h-full pb-safe">
        <main className="h-full overflow-y-scroll scrollbar-hide pb-10">
          <img
            src="./pots/pot_2.png"
            alt="main"
            className="h-1/2 mx-auto animate-soft-bounce"
          />
          <p className="text-center">맛있게 익히는중..</p>
          <div className="flex items-center justify-center pt-4 h-1/4">
            <p className="text-7xl text-primary font-semibold">
              {formatTime(curTime)}
            </p>
          </div>
          <div className="flex items-center justify-center py-10 h-1/4">
            <Link
              to="/"
              className={cn(buttonVariants({ variant: 'ghost' }), 'p-2 h-auto')}
            >
              <PauseIcon className="w-8 h-8" />
            </Link>
          </div>
        </main>
      </div>
    </>
  );
};
