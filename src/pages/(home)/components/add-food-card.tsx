import { Link } from 'react-router-dom';

import { buttonVariants } from '@/components/ui/button';
import { Icons } from '@/components/icons';
import { cn } from '@/lib/utils';

export const AddFoodCard = () => {
  return (
    <Link
      replace
      to="/shop"
      className={cn(
        buttonVariants({ variant: 'ghost' }),
        'h-auto min-h-24 p-1 flex flex-col items-center justify-center text-xs font-semibold'
      )}
    >
      <Icons.add />
    </Link>
  );
};
