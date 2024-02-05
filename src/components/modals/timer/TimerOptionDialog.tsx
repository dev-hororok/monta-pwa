import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { formatTime } from '@/lib/date-format';
import TimePicker from './TimePicker';
import { Badge } from '@/components/ui/badge';
import CategoryPicker from './CategoryPicker';
import { Link } from 'react-router-dom';
import { Settings } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useTimerOptionsStore } from '@/stores/timerOptionsStore';

interface Props {
  memberId: string;
}

export const TimerOptionDialog = ({ memberId }: Props) => {
  const timerOptions = useTimerOptionsStore((state) => state.timerOptions);
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="flex flex-col items-center gap-2">
          <Button variant="ghost" className="text-6xl h-auto">
            {formatTime(timerOptions.pomodoroTime * 60)}
          </Button>
          <Badge>
            {timerOptions.selectedCategory
              ? timerOptions.selectedCategory.subject
              : '선택 안함'}
          </Badge>
        </div>
      </DialogTrigger>
      <DialogContent
        className={cn(
          `w-full h-screen sm:max-w-[416px] sm:max-h-[736px] flex flex-col justify-start items-center pt-safe-offset-14`
        )}
      >
        <DialogHeader>
          <DialogTitle>타이머 설정</DialogTitle>
        </DialogHeader>
        <div className="pb-6">
          <div className="w-full space-y-4 font-semibold py-3">
            <p className="">집중 시간(분)</p>
            <TimePicker />
          </div>
          <div className="w-full space-y-4 font-semibold py-3">
            <div className="flex items-center justify-between">
              <p>카테고리</p>
              <Link to="/categories">
                <Settings />
              </Link>
            </div>
            <CategoryPicker memberId={memberId} />
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="submit">확인</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
