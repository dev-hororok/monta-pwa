import { PlusIcon } from '@radix-ui/react-icons';
import { Button } from '../ui/button';

export const EggAddCard = () => {
  return (
    <Button
      variant={'ghost'}
      className="h-auto min-h-24 p-1 flex flex-col items-center justify-center text-xs font-semibold"
    >
      <PlusIcon />
    </Button>
  );
};
