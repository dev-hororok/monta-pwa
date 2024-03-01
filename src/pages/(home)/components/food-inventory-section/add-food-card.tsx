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
        'w-full h-full aspect-[3/4]'
      )}
    >
      <Icons.add />
    </Link>
  );
};
