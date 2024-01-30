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

export function TimerOptionDialog() {
  const initialTime = useBoundStore((state) => state.initialTime);
  const selectedCategory = useBoundStore((state) => state.selectedCategory);
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="flex flex-col items-center gap-2">
          <Button variant="ghost" className="text-6xl h-auto">
            {formatTime(initialTime * 60)}
          </Button>
          <Badge>{selectedCategory}</Badge>
        </div>
      </DialogTrigger>
      <DialogContent className="md:max-w-[416px] h-auto">
        <DialogHeader>
          <DialogTitle>타이머 설정</DialogTitle>
        </DialogHeader>
        <div className="pb-6">
          <div className="w-full space-y-4 font-semibold py-3">
            <p className="">집중 시간(분)</p>
            <TimePicker />
          </div>
          <div className="w-full space-y-4 font-semibold py-3">
            <p className="">카테고리</p>
            <CategoryPicker />
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
}
