import { Link } from 'react-router-dom';

import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { commonIcons } from '@/components/icons';

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
      <img src={commonIcons.plus} alt="plus icon" className="size-6" />
    </Link>
  );
};
