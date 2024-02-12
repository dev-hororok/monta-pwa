import { Dispatch, SetStateAction } from 'react';
import { MinusIcon, PlusIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';

interface Props {
  state: number;
  setState: Dispatch<SetStateAction<number>>;
  postfix?: string;
  options: number[];
}

const OptionPicker = ({ state, setState, postfix = '분', options }: Props) => {
  const MaxCount = options.length - 1;

  const onClick = (adjustment: number) => {
    setState(state + adjustment);
  };

  return (
    <div className="flex items-center justify-between space-x-2 gap-4">
      <Button
        variant="outline"
        size="icon"
        className="h-6 w-6 shrink-0 rounded-full"
        onClick={() => onClick(-1)}
        disabled={state <= 0}
      >
        <MinusIcon className="h-4 w-4" />
        <span className="sr-only">Decrease</span>
      </Button>
      <div className="text-center flex justify-center items-center gap-1 w-12">
        <div className="text-xl font-bold tracking-tighter">
          {options[state]}
        </div>
        <div className="text-[0.70rem] uppercase text-muted-foreground">
          {postfix}
        </div>
      </div>
      <Button
        variant="outline"
        size="icon"
        className="h-6 w-6 shrink-0 rounded-full"
        onClick={() => onClick(1)}
        disabled={state >= MaxCount}
      >
        <PlusIcon className="h-4 w-4" />
        <span className="sr-only">Increase</span>
      </Button>
    </div>
  );
};

export default OptionPicker;
