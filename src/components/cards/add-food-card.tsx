import { Link } from 'react-router-dom';
import { PlusIcon } from '@radix-ui/react-icons';

import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const AddFoodCard = () => {
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

export default AddFoodCard;
