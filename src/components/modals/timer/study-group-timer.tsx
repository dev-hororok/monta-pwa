import { formatTime } from '@/lib/date-format';
import { IMemberInfo } from '.';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/icons';
import { cn } from '@/lib/utils';
import { useTimerStateStore } from '@/stores/timer-state-store';
import { StudyGroupMember } from './study-group-member';

interface StudyGroupTimerProps extends React.HTMLAttributes<HTMLDivElement> {
  classNames?: string;
  onClick: () => void;
  members: IMemberInfo[];
}

export const StudyGroupTimer = ({
  onClick,
  classNames,
  members,
  ...props
}: StudyGroupTimerProps) => {
  const timerState = useTimerStateStore((state) => state.timerState);

  return (
    <div className={cn('h-full', classNames)} {...props}>
      <div className="grid grid-cols-3 grid-rows-3 gap-2 w-full h-3/5 p-4">
        {Array.from({ length: 9 }).map((_, index) => {
          const isCenterCell = index === 4;
          const member = members[4 < index ? index - 1 : index];

          return isCenterCell ? (
            <img
              key="fire"
              src="./fire-1.png"
              alt="모닥불"
              className="w-full aspect-square"
            />
          ) : member ? (
            <StudyGroupMember member={member} />
          ) : (
            <img
              key={`empty-${index}`}
              src="./chair.png"
              alt="빈 자리"
              className="w-full aspect-square"
            />
          );
        })}
      </div>
      <div className="flex-center h-1/5">
        <p className="text-7xl text-primary dark:text-foreground antialiased font-semibold">
          {formatTime(timerState.targetTime - timerState.duration)}
        </p>
      </div>
      <div className="flex-center h-1/5">
        <Button
          type="button"
          onClick={onClick}
          variant={'ghost'}
          className={'p-2 h-auto'}
        >
          <Icons.pause className="w-10 h-10" />
        </Button>
      </div>
    </div>
  );
};
