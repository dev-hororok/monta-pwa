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
import useBoundStore from '@/stores/useBoundStore';
import TimePicker from './TimePicker';
import { Badge } from '../ui/badge';
import CategoryPicker from './CategoryPicker';
import { Link } from 'react-router-dom';
import { Settings } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Props {
  memberId: string;
}

export const TimerOptionDialog = ({ memberId }: Props) => {
  const initialTime = useBoundStore((state) => state.initialTime);
  const selectedCategory = useBoundStore((state) => state.selectedCategory);
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="flex flex-col items-center gap-2">
          <Button variant="ghost" className="text-6xl h-auto">
            {formatTime(initialTime)}
          </Button>
          <Badge>
            {selectedCategory ? selectedCategory.subject : '선택 안함'}
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
