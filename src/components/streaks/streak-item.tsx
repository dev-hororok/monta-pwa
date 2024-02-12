import { cn } from '@/lib/utils';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { formatTime } from '@/lib/date-format';

interface Props {
  date: {
    date: string;
    value?: number | undefined;
  };
}

const StreakItem = ({ date }: Props) => {
  const hours = date.value ? date.value / 3600 : 0;
  return (
    <Popover>
      <PopoverTrigger>
        <div
          key={date.date}
          className={cn(
            'day w-full aspect-square bg-accent rounded-sm',
            date.value && hours < 2 && 'color-scale-1',
            2 < hours && hours < 4 && 'color-scale-2',
            4 < hours && hours < 6 && 'color-scale-3',
            6 < hours && 'color-scale-4'
          )}
        />
      </PopoverTrigger>
      <PopoverContent className="w-28 space-y-1">
        <p className="text-sm font-semibold text-center">
          {formatTime(date.value ? date.value : 0)}
        </p>
        <p className="text-xs text-foreground/70 text-center">{date.date}</p>
      </PopoverContent>
    </Popover>
  );
};

export default StreakItem;
