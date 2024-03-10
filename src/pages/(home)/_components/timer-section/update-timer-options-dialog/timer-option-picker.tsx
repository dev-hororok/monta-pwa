import { MinusIcon, PlusIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';

interface TimerOptionPickerProps {
  idx: number;
  setIdx: (index: number) => void;
  postfix: string;
  options: number[];
}

export const TimerOptionPicker = ({
  idx,
  setIdx,
  postfix,
  options,
}: TimerOptionPickerProps) => {
  const adjustState = (adjustment: number) => {
    setIdx(Math.max(0, Math.min(idx + adjustment, options.length - 1)));
  };

  return (
    <div className="flex items-center justify-between space-x-2 gap-4">
      <Button
        variant="outline"
        size="icon"
        className="h-6 w-6 shrink-0 rounded-full"
        onClick={() => adjustState(-1)}
        disabled={idx <= 0}
      >
        <MinusIcon className="h-4 w-4" />
        <span className="sr-only">Decrease</span>
      </Button>
      <div className="text-center flex justify-center items-center gap-1 w-12">
        <div className="text-xl font-bold tracking-tighter">{options[idx]}</div>
        <div className="text-[0.70rem] uppercase text-muted-foreground">
          {postfix}
        </div>
      </div>
      <Button
        variant="outline"
        size="icon"
        className="h-6 w-6 shrink-0 rounded-full"
        onClick={() => adjustState(1)}
        disabled={idx >= options.length - 1}
      >
        <PlusIcon className="h-4 w-4" />
        <span className="sr-only">Increase</span>
      </Button>
    </div>
  );
};
