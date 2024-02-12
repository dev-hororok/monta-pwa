import { ChevronLeftIcon } from '@radix-ui/react-icons';
import { ReactNode } from 'react';
import { Link } from 'react-router-dom';

interface Props {
  to: string;
  rightButton?: ReactNode;
}

const PrevHeader = ({ to, rightButton }: Props) => {
  return (
    <div className="flex items-end justify-between fixed top-0 left-0 right-0 md:absolute h-14 px-3 mt-safe md:rounded-t-md bg-background">
      <Link to={to} replace>
        <ChevronLeftIcon className="w-8 h-8" />
      </Link>
      {rightButton}
    </div>
  );
};

export default PrevHeader;
