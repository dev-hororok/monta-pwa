import { PlusIcon } from '@radix-ui/react-icons';
import { buttonVariants } from '../ui/button';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

export const FoodAddCard = () => {
  return (
    <Link
      replace
      to="/shop"
      className={cn(
        buttonVariants({ variant: 'ghost' }),
        'h-auto min-h-24 p-1 flex flex-col items-center justify-center text-xs font-semibold'
      )}
    >
      <PlusIcon />
    </Link>
  );
};
